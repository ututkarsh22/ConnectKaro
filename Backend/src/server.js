import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './lib/db.js';
import authConnect from './routes/auth_route.js';
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user_route.js";
import chatRoutes from "./routes/chat_route.js";
import cors from "cors";
import path from "path"

dotenv.config(); //we always have to call this before using process.env

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials : true  //this will allow frontend to send cookie

 }))

 
app.use("/api/auth",authConnect);
app.use("/api/users",userRoutes);
app.use("/api/chats",chatRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnect();
})