import { createSlice } from "@reduxjs/toolkit";

const algorithmSlice=createSlice({
    name:"Algorithm",
    initialState:{
        loading:false
    },
    reducers:{
        algorithmsRequest(state,action)
        {
            return{
                loading:true
            }
        },
        algorithmsSuccess(state,action)
        {
            return {
                loading:false,
                algorithm:action.payload.algorithm
            }
        },
        algorithmsFailed(state,action)
        {
            return{
                loading:false,
                error:action.payload
            }
        },
        addAlgorithmRequest(state,action)
            {
                return{
                    ...state,
                    loading:true,
                    isAdded:false
                }
            },
            addAlgorithmSuccess(state,action)
            {
                return{
                    loading:false,
                    algorithm: action.payload.algorithm,
                    isAdded:true
                }
            },
            addAlgorithmFail(state,action)
            {
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }
            },
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
                algorithm:action.payload.algorithm
            }
        },
        algorithmFailed(state,action)
        {
            return{
                loading:false,
                error:action.payload
            }
        },


        useralgorithmsRequest(state,action)
        {
            return{
                loading:true
            }
        },
        useralgorithmsSuccess(state,action)
        {
            return {
                loading:false,
                Myposts:action.payload.SinglePosts
            }
        },
        useralgorithmsFailed(state,action)
        {
            return{
                loading:false,
                error:action.payload
            }
        },
    }
});

const {actions,reducer}=algorithmSlice;

export const {algorithmsSuccess,algorithmsFailed,algorithmsRequest,addAlgorithmFail,addAlgorithmRequest,addAlgorithmSuccess,algorithmFailed,algorithmRequest,algorithmSuccess,useralgorithmsFailed,useralgorithmsRequest,useralgorithmsSuccess}=actions
export default reducer;
