import { axiosInstance } from "./axios";
import axios from "axios";

export const getAuthUser = async()=>
      {
        try {
          
          const res = await axiosInstance.get("/auth/me");
          return res.data;
        } catch (error) {
          console.log("error",error);
          return null;
        }
      
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;

};

export async function getRecommendationUsers() {
  const response = await axiosInstance.get("/users/recommendation");
  return response.data;

};

export async function getOutgoingFriendReq() {
  const response = await axiosInstance.get("/users/outgoing-friendRequest");
  return response.data;

};

export const sendFriendReq = async (id) => {
  const { data } = await axiosInstance.post(`/users/friendRequest/${id}`);
  return data;
};
