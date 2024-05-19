import { createSlice } from "@reduxjs/toolkit";

const initiativeSlice=createSlice({
    name:"initiative",
    initialState:{
        loading:false
    },
    reducers:{
        initiativesRequest(state,action)
        {
            return{
                loading:true
            }
        },
        initiativesSuccess(state,action)
        {
            return {
                loading:false,
                initiative:action.payload.SinglePosts
            }
        },
        initiativesFailed(state,action)
        {
            return{
                loading:false,
                error:action.payload
            }
        },
        addinitiativeRequest(state,action)
            {
                return{
                    ...state,
                    loading:true,
                    isAdded:false
                }
            },
            addinitiativeSuccess(state,action)
            {
                return{
                    loading:false,
                    initiative: action.payload.post,
                    isAdded:true
                }
            },
            addinitiativeFail(state,action)
            {
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }
            },
            initiativeRequest(state,action)
        {
            return{
                loading:true
            }
        },
        initiativeSuccess(state,action)
        {
            return {
                loading:false,
                initiative:action.payload.initiative
            }
        },
        initiativeFailed(state,action)
        {
            return{
                loading:false,
                error:action.payload
            }
        },


        userinitiativesRequest(state,action)
        {
            return{
                loading:true
            }
        },
        userinitiativesSuccess(state,action)
        {
            return {
                loading:false,
                Myposts:action.payload.SinglePosts
            }
        },
        userinitiativesFailed(state,action)
        {
            return{
                loading:false,
                error:action.payload
            }
        },
    }
});

const {actions,reducer}=initiativeSlice;

export const {initiativesSuccess,initiativesFailed,initiativesRequest,addinitiativeFail,addinitiativeRequest,addinitiativeSuccess,initiativeFailed,initiativeRequest,initiativeSuccess,userinitiativesFailed,userinitiativesRequest,userinitiativesSuccess}=actions
export default reducer;
