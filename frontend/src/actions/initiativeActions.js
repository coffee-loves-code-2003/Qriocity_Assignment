import axios from 'axios';
import { initiativesFailed, initiativesRequest, initiativesSuccess,addinitiativeFail,addinitiativeRequest,addinitiativeSuccess, userinitiativesSuccess, userinitiativesRequest,userinitiativesFailed} from '../slices/initiativeSllice';
import {InitiativeSuccess,InitiativeFailed,InitiativeRequest} from '../slices/singleInitiativeSlice'
export const getinitiative=(category)=>async(dispatch)=>
{

    try
    {
        dispatch(initiativesRequest());
        console.log(category);
        const {data}=await axios.get(`/apicalls/qriocity/initiative_category/${category}`);
        dispatch(initiativesSuccess(data));
    }

    catch(error)
    {
        dispatch(initiativesFailed(error.response.data.message))
    }
}

export const getsingleinitiative=(id)=>async(dispatch)=>
    {
    
        try
        {
            dispatch(InitiativeRequest());
            const {data}=await axios.get(`/apicalls/qriocity/initiative/${id}`);
            dispatch(InitiativeSuccess(data));
        }
    
        catch(error)
        {
            dispatch(InitiativeFailed(error.response.data.message))
        }
    }
    export const addnewInitiative= ( algorithmData ) =>async(dispatch)=>
        {
            try
            {
                console.log("FROM "+algorithmData.get('author'));
                console.log("FROM "+algorithmData.get('coverpage'));
                console.log("FROM "+algorithmData.get('category'));
                console.log("FROM "+algorithmData.get('descriptions'));
                console.log("FROM "+algorithmData.get('Long_description'));
        
        
                dispatch(addinitiativeRequest())
                const config={
                    headers:{
                        'Content-type':'multipart/form-data'
                    }
                }
                const {data}=await axios.post(`/apicalls/qriocity/initiative/new`,algorithmData,config);
                console.log(data);
                dispatch(addinitiativeSuccess(data))
        
            }
            catch(error)
            {
                dispatch(addinitiativeFail(error.response.data.message))
            }
        }
