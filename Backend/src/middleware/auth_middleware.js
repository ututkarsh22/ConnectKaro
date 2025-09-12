import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req,res,next)=>{

    try {
        const token = req.cookies.jwt; //access cookie by import cookieParser in server.js

        if(!token){
            console.log("invalid token utkarsh")
            return res.status(401).json({message: "Unauthorised action - No token provided"});
        }

        const decode = jwt.verify(token,process.env.JWTSECRET_KEY);

        if(!decode)
        {
            return res.status(401).json({message: "Unauthorised - Invalid token"});
        }

        const user = await User.findById(decode.userId).select("-password"); //it will not send password
        if(!user)
            return res.status(401).json({message: "Unauthorised - Invalid User"});

        req.user = user;
        next(); //next function after protectRoute means Onboarding

    } catch (error) {
        console.log("Error in protectRoute middleware",error);
    }
}