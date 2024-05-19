import { Bars3Icon,XMarkIcon } from '@heroicons/react/24/solid'
import { useState,Fragment } from 'react'
import logo_img from '../dist/images/logo_algo.svg'
import '../dist/css/header.module.css'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import profileimg from '../default_avatar.jpg'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { useLocation } from 'react-router-dom';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header()
{
  const navigate=useNavigate();
  const dispatch=useDispatch();
const logout_me=(e)=>
{
  e.preventDefault();
  dispatch(logout)
  navigate('/');
}
    const [show_nav,set_show_nav]=useState(false);
    const [show_nav_button,set_show_nav_button]=useState(true);
    const{loading,error,isAuthenticated,user}=useSelector(state => state.authState)
    console.log(isAuthenticated);
    return <header className="flex justify-between px-7 py-3 background_color_primary">
        
        <Link to="/"><img src={logo_img}/></Link>
        <nav className="hidden md:block">
        <ul className="flex text-white font-header">
        <li><a href="#" className="hover:text-red-400">
                    Home</a></li>
                <li><a href="#" className="hover:text-red-400">
                    About Us</a></li>


                    {isAuthenticated ?(<>
                    
                  <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white py-1 px-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <div class="flex -space-x-1 overflow-hidden">
                    <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={user.avatar??profileimg} alt=""/>
                  </div>          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">

          <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <Link to="/createpost">Write Post</Link>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <Link to="/myposts">My Posts</Link>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <Link to="/createinitiative">Create Events</Link>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <Link to="/myprofile">Account settings</Link>
                </a>
              )}
            </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
<Link onClick={logout_me}>Sign out</Link>                  </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
                    
                    
                  </>):
      (<><li><Link to="/login" className="hover:text-red-400">
      Login
    </Link>
                  
                  
                  </li>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full"><Link to="/register">Register</Link>
  
  </button>    </>)
}
                
                    
    </ul>
        </nav>
        {show_nav && !show_nav_button && <><nav className="block md:hidden ">
            <ul className="flex flex-col text-white mobile_responseive_navbar font-header">
            <li><a href="#" className="hover:text-red-400">
                    Home</a></li>
                    
                <li><a href="#" className="hover:text-red-400">
                    About</a></li>
                    {isAuthenticated ?(
                    
                    <li><Link to="/myprofile" className="hover:text-red-400">
                    My Profile
                  </Link></li>
                    
                    
                    ):
      (<><li><Link to="/login" className="hover:text-red-400">
      Login
    </Link>
                  
                  
                  </li>
              <li><Link to="/register" className="hover:text-red-400">
      Register
    </Link></li></>)
                    
}

            </ul>
        </nav>
        <button onClick={() =>{set_show_nav_button(!show_nav_button);
        set_show_nav(false)}}
            className='block md:hidden'>
                <XMarkIcon className='text-white h-5' />
            </button></>
        
}
{show_nav_button && 


        <button onClick={()=>{set_show_nav(!show_nav);
        set_show_nav_button(!show_nav_button)}}
        className='block md:hidden'>
        <Bars3Icon className='text-white h-5'/>
        </button>
}
</header>

}