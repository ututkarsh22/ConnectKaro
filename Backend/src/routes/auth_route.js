import express from 'express';
import {Login , Logout , Signup, Onboarding} from '../controller/auth_controller.js';
import { protectRoute } from '../middleware/auth_middleware.js';

const route = express.Router();

route.post('/login',Login);
route.post('/logout',Logout); //its updating server side thats why it is post method  
route.post('/signup',Signup);

route.post('/onboarding',protectRoute,Onboarding);

//check if user is logged in or not
route.get("/me",protectRoute, (req,res) => {
    res.status(201).json({success:true , user : req.user});
})

export default route;