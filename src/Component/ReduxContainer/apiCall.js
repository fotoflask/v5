import axios from "axios";
import {loginStart , loginSuccess , loginFailure , logout, updateUserProfilePicture} from "./UserReducer";
const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const login = async(dispatch , user)=>{
          dispatch(loginStart());
          try {
                   const res = await axios.post(`${BACKEND_URI}/api/user/login` , user);
                   dispatch(loginSuccess(res.data)); 
          } catch (error) {
                    dispatch(loginFailure());
          }
}

export const profilePicUpdate = async (dispatch, newProfilePicture) => {
  try {
    dispatch(updateUserProfilePicture(newProfilePicture));
  } catch (error) {
    console.log("Error updating profile picture:", error);
  }
};

export const loginOrganisation = async(dispatch , user)=>{
            dispatch(loginStart());
            try {
                     const res = await axios.post(`${BACKEND_URI}/api/organisation/login` , user);
                     dispatch(loginSuccess(res.data)); 
            } catch (error) {
                        dispatch(loginFailure());
            }
    }


export const createuser = async(dispatch , user)=>{

    dispatch(loginStart());
    try {
             const res = await axios.post(`${BACKEND_URI}/api/user/create/user` , user);
             dispatch(loginSuccess(res.data)); 
             console.log(res.data);
             
    } catch (error) {
              dispatch(loginFailure());
    }
}

export const createOrganisation = async(dispatch , user)=>{
    dispatch(loginStart());
    try {
             const res = await axios.post(`${BACKEND_URI}/api/organisation/create/user` , user);
             dispatch(loginSuccess(res.data)); 
    } catch (error) {
              dispatch(loginFailure());
    }
}

export const updateProfilePicture = async (dispatch, newProfilePicture) => {
    alert("newProfilePicture",newProfilePicture);
    try {
      dispatch(updateUserProfilePicture("/Images/ProfilePictures/1708626383429_1662808716527.jpg"));
      console.log("Profile picture updated successfully");
    } catch (error) {
      console.log("Error updating profile picture:", error);
    }
  };