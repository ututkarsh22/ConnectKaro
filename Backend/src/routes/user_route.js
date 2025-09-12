import express, { Router } from "express"
import { protectRoute } from "../middleware/auth_middleware.js"
import { getRecommendedUsers,getMyFriends ,sendFriendRequest,acceptFriendRequest,getFriendRequest,getOutgoingFriendReq} from "../controller/user_controller.js";


const route = express.Router();

//apply protectRoute to every route function before there inside func
route.use(protectRoute);

route.get("/recommendation",getRecommendedUsers); //getRecommendedUsers se phle protectRoute will work
route.get("/friends",getMyFriends);


route.post("/friendRequest/:id", sendFriendRequest);
route.put("/friendRequest/:id/accept", acceptFriendRequest); //this is put because you are chaning something

route.get("/friendRequest", getFriendRequest);
route.get("/outgoing-friendRequest", getOutgoingFriendReq);

export default route;