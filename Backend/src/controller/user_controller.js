import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export const getRecommendedUsers = async (req,res)=>{

    try {
        
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and : [
                {_id : {$ne : currentUserId}}, //current user ni dikhayega list me
                {id : {$nin : currentUser.friends}}, //current user ke friend bhi ni dikhayega
                {isOnBoarded:true} //kvl onboarded logo ko dikhayega

            ]
        })
        res.status(200).json(recommendedUsers);

    } catch (error) {
     console.log("Error in recommended user ",error.message);
     res.status(500).json({message:"Internal Server Problem"});   
    }
}

export const getMyFriends = async (req,res) =>{

        try {

            const user = await User.findById(req.user.id).select("friends").populate("friends","fullname profilePic,nativeLanguage,learningLanguage");//populate will giv these things fullname profilpic etc if populate is not there then it only give id

            res.status(201).json(user.friends);
        } catch (error) {
                console.log("Error in myFriend controller file ",error.message);
                 res.status(500).json({message:"Internal Server Problem"});   
        }
}

export const sendFriendRequest = async(req,res)=>{

    try {
        
        const myId = req.user._id;

        const {id : recipientId} = req.params;

        //prevent sending req yourself

        if(myId === recipientId)
            return res.status(400).json({message : "You cant send friend request to yourself"});
      
      const recipient = await User.findById(recipientId);

        if(!recipient)
            return res.status(400).json({message : "Recipient not exist"});

        //if you already friends

        if(recipient.friends.includes(myId))
            return res.status(400).json({message: `You are already friend with ${recipient.fullname}`});

        //check if req already exist

        const reqExisted = await FriendRequest.findOne({
            $or :[
                {sender : myId, recipient : recipientId}, //$request is the objeect so we can take bi . operator and in this vice versa will happend in sender and recipient
                {sender : recipientId , recipient : myId}
            ]
        });

        if(reqExisted)
            return res.status(400).json({message: "Friend request already there between you and user"});

        const sendFriendReq = await FriendRequest.create({
            sender:myId,
            recipient:recipientId,
        });

        res.status(201).json(sendFriendReq);

    } catch (error) {
        console.log("params",req.params);
         console.log("Error in sending friend request controller",error.message);
         res.status(500).json({message:"Internal Server Problem"});   
    }
}

export const acceptFriendRequest = async (req,res)=>{
    try {

        const {id: requestedId} = req.params;

        const friendRequest = await FriendRequest.findById({requestedId});

        if(!friendRequest)
            return res.status(401).json({message: "Friend request Not Found"});

        //verify if the current user is recipient
        if(friendRequest.recipient.toString() !== req.user.id)
        {
            return res.status(401).json({message:"You are not authorised to accept this request"});
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        //save at each user to the others friend array
        //setting will add elements to the array if and only if they are not already exist
        await User.findByIdAndUpdate(friendRequest.sender , {
            $addToSet: {friends : friendRequest.recipient}
            
        });
        await User.findByIdAndUpdate(friendRequest.recipient , {
            $addToSet: {friends : friendRequest.sender}
            
        });

        res.status(201).json({message: "Friend Request Accepted"});
        
    } 
    
    catch (error) {
         console.log("Error in accept friend controller",error.message);
         res.status(500).json({message:"Internal Server Problem"}); 
    }
}

export const getFriendRequest = async (req,res) =>{



    try {
        
        const incomingReq = await FriendRequest.find({
            recipient : req.user.id,
            status: "pending",

        }).populate("sender","fullname,profilePic,nativeLanguage");

        const acceptedRequest = await FriendRequest.find({
            sender : req.user.id,
            status: "pending",

        }).populate("sender","fullname profilePic");

        res.status(201).json({incomingReq,acceptedRequest});
    } catch (error) {
         console.log("Error in get friend request controller",error.message);
         res.status(500).json({message:"Internal Server Problem"});   
    }
}


export const getOutgoingFriendReq = async (req,res) => {

    try {
        const outgoingFriend = await FriendRequest.find({
            sender : req.user.id,
            status : "pending",

        }).populate("recipient","fullname profilePic  nativeLanguage learningLanguage location");

        res.status(201).json({outgoingFriend});
    } catch (error) {
        console.log("Error in get outgoing friend request controller",error.message);
         res.status(500).json({message:"Internal Server Problem"});   
    }
}