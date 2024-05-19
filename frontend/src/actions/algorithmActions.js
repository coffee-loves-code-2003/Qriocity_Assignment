import axios from 'axios';
import { algorithmsFailed, algorithmsRequest, algorithmsSuccess,addAlgorithmFail,addAlgorithmRequest,addAlgorithmSuccess, useralgorithmsSuccess, useralgorithmsRequest,useralgorithmsFailed} from '../slices/algorithmSlice';
import {algorithmFailed,algorithmRequest,algorithmSuccess } from '../slices/singleAlgorithmSlice';
export const getAlgorithm=(category)=>async(dispatch)=>
{

    try
    {
        dispatch(algorithmsRequest());
        console.log(category);
        const {data}=await axios.get(`/apicalls/algosimplified/algorithms?category=${category}`);
        dispatch(algorithmsSuccess(data));
    }

    catch(error)
    {
        dispatch(algorithmsFailed(error.response.data.message))
    }
}
export const getSingleAlgorithm=(id)=>async(dispatch)=>
{

    try
    {
        dispatch(algorithmRequest());
        const {data}=await axios.get(`/apicalls/algosimplified/algorithms/${id}`);
        dispatch(algorithmSuccess(data));
    }

    catch(error)
    {
        dispatch(algorithmFailed(error.response.data.message))
    }
}
export const addnewAlgorithm= ( algorithmData ) =>async(dispatch)=>
{
    try
    {
        console.log("FROM "+algorithmData.get('author'));
        console.log("FROM "+algorithmData.get('coverpage'));
        console.log("FROM "+algorithmData.get('category'));
        console.log("FROM "+algorithmData.get('descriptions'));
        console.log("FROM "+algorithmData.get('Long_description'));


        dispatch(addAlgorithmRequest())
        const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        const {data}=await axios.post(`/apicalls/algosimplified/algorithms/new`,algorithmData,config);
        console.log(data);
        dispatch(addAlgorithmSuccess(data))

    }
    catch(error)
    {
        dispatch(addAlgorithmFail(error.response.data.message))
    }
}


export const getUserAlgorithm=()=>async(dispatch)=>
{

    try
    {
        dispatch(useralgorithmsRequest());
        const {data}=await axios.get(`/apicalls/algosimplified/algorithms_myposts`);
        dispatch(useralgorithmsSuccess(data));
    }

    catch(error)
    {
        dispatch(useralgorithmsFailed(error.response.data.message))
    }
}