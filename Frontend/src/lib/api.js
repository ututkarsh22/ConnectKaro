import { axiosInstance } from "./axios";


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

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users/recommendation");
  return response.data;

};

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friendRequest");
  return response.data;

};

export const sendFriendRequest = async (id) => {
  const { data } = await axiosInstance.post(`/users/friendRequest/${id}`);
  return data;
};

export const getFriendRequest = async () =>{
  const {data} = await axiosInstance.get("/users/friendRequest")
  return data;
}

export const acceptFriendRequest = async(requestID)=>{
  const response = await axiosInstance.put(`/users/friendRequest/${requestID}/accept`)
  return response.data;
}

export const getToken = async()=>{
  try {
    const response = await axiosInstance.get("/chats/token");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch token:", error);
    throw error; // re-throw if you want the caller to handle it
  }
}