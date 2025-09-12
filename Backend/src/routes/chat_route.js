import express from "express";
import {getStreamToken} from "../controller/chat_controller.js"
import { protectRoute } from "../middleware/auth_middleware.js";
const route = express.Router();

route.get("/token",protectRoute,getStreamToken);

export default route;