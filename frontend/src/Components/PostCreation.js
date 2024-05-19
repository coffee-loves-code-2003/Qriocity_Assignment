import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { addnewAlgorithm } from '../actions/algorithmActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {toast,Bounce} from 'react-toastify'
function PostCreation() {
  
  const [coverpage,setCoverpage]=useState('/images/AlgorithmSimplfied.png');
  const {user}=useSelector(state=>state.authState);
  const{error,isAdded}=useSelector(state=>state.algorithmState);
  const [content, setContent] = useState('');
  const location = useLocation();
  const navigate=useNavigate();

  const { from } = location.state || { from: { pathname: '/' } };
  const [userData,setUserData]=useState({
    title:"",
    description:"",
    
    category:""
    
    
})
  const dispatch=useDispatch();
  const handleContentChange = (content) => {
    setContent(content);
  };
  
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ];  

  const modules = {
    toolbar: toolbarOptions
  };
  const submitPost=(e)=>
  {
    e.preventDefault();
    console.log(coverpage);
    console.log(userData.title);
    console.log(userData.description);
    console.log(content);
    console.log(userData.category);
    console.log(user._id);
    const algorithmDataJSON = new FormData()
    algorithmDataJSON.append('coverpage',coverpage)
    algorithmDataJSON.append('name',userData.title);
    algorithmDataJSON.append('descriptions',userData.description);
    algorithmDataJSON.append('Long_description',content);
    algorithmDataJSON.append('category',userData.category);
    algorithmDataJSON.append('author',user._id)
    dispatch(addnewAlgorithm(algorithmDataJSON));
    


  }
  useEffect(()=>
{
  if(error)
  {
    toast.error(error, {
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
              
                  return
  }
  if(isAdded)
  {

    toast.success("Post added Successfully", {
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
                   navigate(from);
 
                  return
  }
 


  
    
  
},[user,error,isAdded])
  const onChange=(e)=>{
    if(e.target.name==="coverpage")
  {
    const reader=new FileReader();
    reader.onload=()=>
    {
      if(reader.readyState===2)// reading state 2-> denotes it is readed
      {
        console.log(reader.result);
        setCoverpage(e.target.files[0])
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  
      setUserData({...userData, [e.target.name]:e.target.value})
  
    
  }
  
    
  
  return (
    <section className="bg-white container mt-10 py-10">
      <form onSubmit={submitPost}>
        
      <div className="bg-white container mt-10">
      <div className="mt-10">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-red">Choose Image for Cover page for the post</label>
        </div>

        
<div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">JPG or GIF</p>
        </div>
        <input id="dropzone-file"  name="coverpage" onChange={onChange}  type="file"  />
    </label>
</div> 

        <div className="mt-10">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-red">Title</label>
          <input type="text" id="title" name="title" value={userData.title} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Enter a title" />
        </div>
        <div className="mt-10">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-red">Short Description</label>
          <textarea id="description" name="description" value={userData.description} onChange={onChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Enter a Short Description"></textarea>
        </div>
        
        
        
        <ReactQuill modules={modules} theme="snow" className="mt-20" value={content} name="Long_description" onChange={handleContentChange} />
        <button class="bg-transparent hover:bg-blue-500 mt-10 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Submit
</button>
      </div>
      
      </form>
    </section>
  );
}

export default PostCreation;
