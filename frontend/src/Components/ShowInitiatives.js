import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getsingleinitiative} from '../actions/initiativeActions'
function ShowInitiatives() {
    console.log("HELLO FROM ME");
    const dispatch=useDispatch();
    const {id}=useParams();
    const {SinglePosts}=useSelector(state=>state.singleinitiativeState);
    useEffect(()=>
  {
    dispatch(getsingleinitiative(id));
  },[dispatch,id])
  return (
    <div>
        <div className="container bg-white">
      {SinglePosts && 
      <div className='container' key={SinglePosts._id}>

      <p class="mb-3 text-xl text-black font-bold md:text-xl dark:text-black-400">{SinglePosts.name}</p>
      <p class="text-gray-500  dark:text-white-400">{SinglePosts.descriptions}</p>
      <div dangerouslySetInnerHTML={{__html:SinglePosts.Long_description}}></div>
      </div>}


    </div>
    </div>
  )
}

export default ShowInitiatives
