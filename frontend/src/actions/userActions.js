import { loginFail, loginRequest, loginSuccess,clearError,registerFail,registerRequest,registerSuccess,loadUserFail,loadUserRequest,loadUserSuccess,logoutFail,logoutSuccess, UpdatePasswordRequest, UpdatePasswordSuccess, UpdatePasswordFail, forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail, resetPasswordRequest, resetPasswordSuccess, updateProfileRequest, updateProfileSuccess, updateProfileFail } from "../slices/authSlice"
import axios from 'axios'
export const login = (email,password)=>async(dispatch)=>
{
    try
    {
        dispatch(loginRequest())
        const {data}=await axios.post(`/apicalls/algosimplified/login`,{email,password});
        dispatch(loginSuccess(data))

    }
    catch(error)
    {
        dispatch(loginFail(error.response.data.message))
    }
}

export const clearAuthError =dispatch=>
{
    dispatch(clearError())
}

export const register = (userData)=>async(dispatch)=>
{
    try
    {
        dispatch(registerRequest())
        const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        const {data}=await axios.post(`/apicalls/algosimplified/register`,userData,config);
        dispatch(registerSuccess(data))

    }
    catch(error)
    {
        dispatch(registerFail(error.response.data.message))
    }
}


export const loadUser =async(dispatch)=>
{
    try
    {
        dispatch(loadUserRequest())
        const {data}=await axios.get(`/apicalls/algosimplified/userprofile`);

        dispatch(loadUserSuccess(data))


    }
    catch(error)
    {
        dispatch(loadUserFail(error.response.data.message))
    }
}

export const logout =async(dispatch)=>
{
    try
    {
        await axios.get(`/apicalls/algosimplified/logout`);
        dispatch(logoutSuccess())

    }
    catch(error)
    {
        dispatch(logoutFail(error.response.data.message))
    }
}
export const updatePassword = (formData)=>async(dispatch)=>
{
    try
    {
        dispatch(UpdatePasswordRequest())
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`/apicalls/algosimplified/password/change`,formData,config);
        dispatch(UpdatePasswordSuccess())
    }
    catch(error)
    {
        dispatch(UpdatePasswordFail(error.response.data.message))
    }
    
}
export const forgotPassword = (formData)=>async(dispatch)=>
{
    try
    {
        dispatch(forgotPasswordRequest())
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}=await axios.post(`/apicalls/algosimplified/password/forgot`,formData,config);
        dispatch(forgotPasswordSuccess(data))
    }
    catch(error)
    {
        dispatch(forgotPasswordFail(error.response.data.message))
    }
    
}
export const resetPassword = (formData,token)=>async(dispatch)=>
{
    try
    {
        dispatch(resetPasswordRequest())
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}=await axios.post(`/apicalls/algosimplified/pass/reset/${token}`,formData,config);
        dispatch(resetPasswordSuccess(data))
    }
    catch(error)
    {
        dispatch(resetPasswordSuccess(error.response.data.message))
    }
    
}

export const updateProfile = (userData)=>async(dispatch)=>
{
    try
    {
        dispatch(updateProfileRequest())
        const config={
            headers:{
                'Content-type':'mulitpart/form-data'
            }
        }
        const {data}=await axios.put(`/apicalls/algosimplified/updateprofile`,userData,config);
        dispatch(updateProfileSuccess(data))

    }
    catch(error)
    {
        dispatch(updateProfileFail(error.response.data.message))
    }
}