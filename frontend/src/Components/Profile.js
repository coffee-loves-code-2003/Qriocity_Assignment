import React from 'react'
import { useSelector } from 'react-redux'
import logo from '../dist/images/login_logo.jpg'
import profileimg from '../default_avatar.jpg'
import {Link} from 'react-router-dom'
function Profile() {
    const{user}=useSelector(state=>state.authState)
  return (
    <div>

<div
    class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-32 overflow-hidden">
        <img  src={logo} alt='cover_image'/>
    </div>
    <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img class="object-cover object-center " src={user.avatar || profileimg} alt='profile_image'/>
    </div>
    <div class="text-center mt-2">
        <h2 class="font-semibold text-black">{user.name}</h2>
        <p class="text-gray-500">{user.role}</p>
        <p class="text-gray-500">{user.email}</p>
        <Link to="/editprofile" >
  <button className="bg-red-600 hover:bg-red-600 text-white font-bold mt-5 mb-10 py-2 px-4 rounded-full">
    Edit Profile
  </button>
</Link>
{/* <Link to="/editmyblog" >
  <button className="bg-blue-600 hover:bg-blue-600 text-white font-bold mt-5 mb-10 py-2 px-4 rounded-full">
    Edit Post
  </button>
</Link> */}
    </div>
</div>
    </div>
  )
}

export default Profile
