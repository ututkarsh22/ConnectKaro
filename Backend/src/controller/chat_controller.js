import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res) =>{

    try {
        
        const token = generateStreamToken(req.user._id); 

        res.status(201).json({token});
    } catch (error) {
        console.log("Error in getStreamToken controller",error.message);
        res.status(400).json({message : "Internal Server Problem"});
    }
}