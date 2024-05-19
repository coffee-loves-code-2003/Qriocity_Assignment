import React from 'react';
import profileimg from '../default_avatar.jpg';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { updateProfile } from '../actions/userActions';
import{toast,Bounce} from 'react-toastify'
import { useDispatch } from 'react-redux';
function EditProfile() {
    const { loading,error,user,isUpdated } = useSelector(state => state.authState);
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [avatar,setAvatar]=useState('');
    const [avatarPreview,setavatarPreview]=useState('/images/default_avatar.jpg')
    const dispatch=useDispatch();
    useEffect(() => {
        if (user) {
            setName(user.name);
            setRole(user.role);
            setavatarPreview(user.avatar)
        }
    }, [user]); 

   
    const onChangeAvatar=(e)=>
    {
        const reader=new FileReader();
    reader.onload=()=>
    {
      if(reader.readyState===2)// reading state 2-> denotes it is readed
      {
        console.log(reader.result);
        setavatarPreview(reader.result);
        setAvatar(e.target.files[0])
      }
    }
    reader.readAsDataURL(e.target.files[0]);
    }
    const submitHandler=(e)=>
    {
        e.preventDefault();
    const userDataJSON = new FormData()
    userDataJSON.append('name',name);
    
    userDataJSON.append('role',role);
    userDataJSON.append('avatar',avatar)
    dispatch(updateProfile(userDataJSON));
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setRole(user.role);
            if(user.avatar)
            {
                setavatarPreview(user.avatar);
            }
            setAvatar(user.avatar);
            setavatarPreview(user.avatar)
            if(isUpdated)
            {
                toast.success("Profile Updated Successfully", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition:Bounce,
                    });
            }
        }


    }, [user]); 
    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={submitHandler}>
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Edit Profile</h2>

                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                <img
                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src={avatarPreview  }
                                    alt="Bordered avatar"
                                />

                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <input type="file"
                                        
                                        onChange={onChangeAvatar} className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 " placeholder="Change Picture"/>
                                        
                                    
                                    {user && user.avatar ? (
                                        <button
                                            type="button"
                                            className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                            Delete picture
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                                            disabled>
                                            Delete picture
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div class="items-center mt-8 sm:mt-14 text-[#202142]">

<div
    class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
    <div class="w-full">
        <label for="first_name"
            class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
            first name</label>
        <input type="text" id="first_name"
            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
            placeholder="Your first name" value={name} onChange={e=>setName(e.target.value)} required/>
    </div>

    

</div>



<div class="mb-2 sm:mb-6">
    <label for="profession"
        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Role</label>
    <input type="text" id="profession"
        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
        placeholder={role} onChange={e=>setRole(e.target.value)} required/>
</div>



<div class="flex justify-end">
    <button type="submit"
        class="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
</div>

</div>                        </div>
                    </div>
                </div>
            </main>
            </form>
        </div>
    );
}

export default EditProfile;
