import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
          name:"User",
          initialState:{
                    user:null,
                    isFetching:false,
                    error:false
          },
          reducers:{
                    loginStart:(state)=>{
                              state.isFetching = true
                    },
                    loginSuccess:(state , action)=>{
                              state.isFetching = false;
                              state.user = action.payload
                    },
                    loginFailure:(state)=>{
                              state.isFetching = false;
                              state.error = true
                    },
                    logout:(state)=>{
                              state.user = null
                    },
                    updateUserProfilePicture: (state, action) => {
                        state.user.user.profilepicture = action.payload;
                    },
          },
})

export const {loginStart , loginSuccess , loginFailure , logout, updateUserProfilePicture } = UserReducer.actions;

export default UserReducer.reducer;