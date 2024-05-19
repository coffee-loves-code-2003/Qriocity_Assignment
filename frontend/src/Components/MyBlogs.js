import {Fragment, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { getAlgorithm } from '../actions/algorithmActions';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import profileimg from '../default_avatar.jpg'
import { AnimatedOnScroll } from "react-animated-css-onscroll";
import { Link } from 'react-router-dom';
import coverpagedef from '../images/AlgorithmSimplfied.png'
import Loader from './Other_Styles/Loader'
function MyBlogs() {
  const {user}=useSelector(state=>state.userState);
  const dispatch=useDispatch();
  const {algorithm,loading}=useSelector(state=>state.algorithmState);
  useEffect(()=>
{
  dispatch(getAlgorithm(user._id));
},[dispatch,category])
  return (
    <div className="container">
      {loading?(<Loader/>):(
        <AnimatedOnScroll animationIn="bounceInLeft">

        {algorithm && algorithm.map(algo=>
        <div class="max-w-sm w-full lg:max-w-full lg:flex mt-10">
        <img
    class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
    src={algo.coverpage ||coverpagedef}
    title="Woman holding a mug"
  />
  
  
    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div class="mb-8">
        <p class="text-sm text-gray-600 flex items-center">
          {algo.category}       
        </p>
        <Link to={`/singlealgorithms/${algo._id}`}> <div class="text-gray-900 font-bold text-xl mb-2">{algo.name}</div></Link>
        <p class="text-gray-700 text-base">{algo.descriptions}</p>
      </div>
      <div class="flex items-center">
        <img class="w-10 h-10 rounded-full mr-4" src={profileimg} alt="Avatar of Jonathan Reinink"/>
        <div class="text-sm">
          <p class="text-gray-900 leading-none">{algo.author}</p>
          <p class="text-gray-600">Aug 18</p>
  
        </div>
      </div>
    </div>
  </div>
  )}
        
  
  
        </AnimatedOnScroll> 
      )}
            

    </div>
  )
}

export default MyBlogs
