import { createSlice } from "@reduxjs/toolkit";

const singlealgorithmSlice=createSlice({
    name:"singleAlgorithm",
    initialState:{
        loading:false
    },
    reducers:{
        
            algorithmRequest(state,action)
        {
            return{
                loading:true
            }
        },
        algorithmSuccess(state,action)
        {
            return {
                loading:false,
                SinglePosts:action.payload.SinglePosts
            }
        },
        algorithmFailed(state,action)
        {
            return{
                loading:false,
                error:action.payload
            }
        },
    }
});

const {actions,reducer}=singlealgorithmSlice;

export const {algorithmFailed,algorithmRequest,algorithmSuccess}=actions
export default reducer;
