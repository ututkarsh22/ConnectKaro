import bcrypt from "bcryptjs";
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import {upsertStreamUser} from "../lib/stream.js";

export async function Signup(req,res){

   const {fullname,email,password} = req.body;

   try{

    if(!email || !password || !fullname)
        return res.status(400).json({message : "Please fill all details"});
    if(password.length < 6)
        return res.status(400).json({message : "Password should be atleast 6 characters"});
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
     return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "Email already exist"});
    }

    //for image profilePic

    const index = Math.floor(Math.random() * 100) + 1; // id from 1 to 100 so i can take it from api by the index
    const randomImage = `https://avatar.iran.liara.run/public/${index}`

    const newUser = await User.create({
        email,
        password,
        fullname,
        profilePic : randomImage,

    })


    //Create the user in steam
    //we are making it try catch so if there any problem it will not send us to signup catch box
    try {
        await upsertStreamUser({
            id: newUser._id.toString(),
            name : newUser.fullname,
            image : newUser.profilePic || " "
    
        });
        console.log(`Stream user create ${newUser.fullname}`);
    } catch (error) {
        console.log("error creating stream user",error);
    }

    const token = jwt.sign({userId: newUser._id},process.env.JWTSECRET_KEY,{
        expiresIn : "7d",
    }) //this is unique identifier asign to user so that it know which user have which unique token

    res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,        // Must be true for SameSite=None
    sameSite: "None",    // Required for cross-site cookies
});

    res.status(201).json({success:true, user : newUser}) //finally saved user
}
   catch(e){
        console.log("Error in signUp",e);
        res.status(500).json({message: "Internal server error"});
   }
}

export async function Logout(req,res){

    try{
        res.cookie("jwt","" ,{
        maxAge : 0, // clearing cookie
        httpOnly : true, //it helps to prevent XSS attack
        sameSite : "None",
        secure : true
    });

     return res.status(200).json({ success: true, message: "Logged out successfully" });
}
catch(e)
{
    console.log("Logout error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
}
}



export async function Login(req,res){
    
    const {email,password} = req.body;
    try{

   if(!email || !password)
    return res.status(400).json({message : "All fields are required"});


    const emailTrue = await User.findOne({email});

    if(!emailTrue)
        return res.status(401).json({message:"Invalid email or password"});
    

    const matchPassword = await bcrypt.compare(password,emailTrue.password);
    if(!matchPassword)
        return res.status(401).json({message:"Invalid password"});

    const token = jwt.sign({userId: emailTrue._id},process.env.JWTSECRET_KEY,{
        expiresIn : "7d",
    }) //this is unique identifier asign to user so that it know which user have which unique token

    res.cookie("jwt",token ,{
        maxAge : 7*24*60*60*1000, //7 days
        httpOnly : true, //it helps to prevent XSS attack
        sameSite : "strict",
        secure : process.env.NODE_ENV === "production"
    })

    res.status(201).json({success:true, emailTrue})
}
  
    catch(e)
    {
        console.log("error is there",e.message);
        res.status(500).json({message : "Internal server problem"});
    }
}

export async function Onboarding(req,res)
{
    try {

        const userId = req.user._id;

        const {fullname,bio,nativeLanguage,learningLanguage,location,} =  req.body;

        if(!fullname || !bio || !nativeLanguage || !learningLanguage || !location)
            return res.status(400).json({message: "All field are required",
                missingField : [
                    !fullname && "fullname",
                    !bio && "bio",
                    !nativeLanguage && "native language",
                    !learningLanguage && "learning language",
                    !location && "location",
                    

                ].filter(Boolean),
        
            });

            const updatedUser = await User.findByIdAndUpdate(userId,{
                ...req.body, //it means all data from req.body like fullname bio nativeLanguage...
                isOnBoarded : true,

            },{new:true}); //new will give you updated user 

            if(!updatedUser)
                return res.status(400).json({message: "User is not updated"});

            //upserting the stream id 

             try {
        await upsertStreamUser({
            id: updatedUser._id.toString(),
            name : updatedUser.fullname,
            image : updatedUser.profilePic || " "
    
        });
        console.log(`Stream user create ${updatedUser.fullname}`);
    } catch (error) {
        console.log("error creating stream user",error);
    }

            res.status(200).json({success:true, user:updatedUser});

        }
        
    catch (error) {
        res.status(500).json({message: "Internal server problem"});
    }
}