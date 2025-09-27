import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './lib/db.js';
import authConnect from './routes/auth_route.js';
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user_route.js";
import chatRoutes from "./routes/chat_route.js";
import cors from "cors";

dotenv.config(); //we always have to call this before using process.env

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials : true  //this will allow frontend to send cookie
 }))

app.use("/auth",authConnect);
app.use("/users",userRoutes);
app.use("/chats",chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnect();
})