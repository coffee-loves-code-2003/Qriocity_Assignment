import { createSlice } from "@reduxjs/toolkit";

const singleInitiativeSlice=createSlice({
    name:"singleInitiative",
    initialState:{
        loading:false
    },
    reducers:{
        
            InitiativeRequest(state,action)
        {
            return{
                loading:true
            }
        },
        InitiativeSuccess(state,action)
        {
            return {
                loading:false,
                SinglePosts:action.payload.SinglePosts
            }
        },
        InitiativeFailed(state,action)
        {
            return{
                loading:false,
                error:action.payload
            }
        },
    }
});

const {actions,reducer}=singleInitiativeSlice;

export const {InitiativeFailed,InitiativeRequest,InitiativeSuccess}=actions
export default reducer;
