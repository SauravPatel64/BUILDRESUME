import React, { Children, useState } from "react";
import { createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPaths";
import { useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({children})=>{
 const [user, setUser] = useState(null);
 const [loading, setLoading] =  useState(true);

 useEffect(()=>{
  if(user) return

  const accessToken = localStorage.getItem('token')
  if(!accessToken){
    setLoading(false)
    return;
  }
  
  const fetchUser = async () => {
  try {
    const response = await axiosInstance.get(API_PATH.AUTH.GET_PROFILE);
    console.log("Profile response:", response.data); // 👈 log structure
    setUser(response.data.user || response.data);   // safer
  } catch (error) {
    console.error("User fetch failed:", error.response?.data || error.message);
    clearUser();
  } finally {
    setLoading(false);
  }
};
  fetchUser();
 }, []);


 const updateUser = (userData) => {
  setUser(userData);
  localStorage.setItem('token', userData.token);
  setLoading(false);
}


 const clearUser = () => {
  setUser(null)
  localStorage.removeItem('token')
 }

 return (
    <UserContext.Provider value={{user, loading, updateUser, clearUser}} >
    {children}
  </UserContext.Provider>
 )
}

export default UserProvider;