import {StreamChat} from "stream-chat";//stream-chat is in package.json
import dotenv from "dotenv"; //or also used as import "dotenv/config" only

dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

if(!api_key || !api_secret)
    console.error("Missing api key or api secret key");

const streamClient = StreamChat.getInstance(api_key,api_secret);

export const upsertStreamUser = async (userData) =>{
    try {

        streamClient.upsertUsers([userData]); //upserts helps to create the user or if exist then update the user
        return userData;
    } catch (error) {
        
        console.error("Error upserting user",error);
    }
}

export const generateStreamToken = (userId) =>{
    try {
        
        //user id should be String
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.log("Error in generating stream token",error);
    }

}
