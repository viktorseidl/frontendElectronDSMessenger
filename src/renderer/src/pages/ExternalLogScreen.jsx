import React,{useEffect, useRef, useState} from 'react'
import Loader from '../components/Loader'
import { useTheme } from '../styles/ThemeContext'
import { light,dark } from '../styles/schema';
import { Link, useNavigate,useSearchParams } from 'react-router-dom'
import { useFetchAuthAll } from '../services/useFetchAll'; 
import imgs from '../assets/Logo.png'  
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { md5, sha256, util } from 'node-forge';

const ExternalLogScreen = () => {
    const [searchParams] = useSearchParams(); 
    
    const [password, setpassword] = useState('');  
    const [user, setuser] = useState('');  
    const [err, seterr] = useState(false);  
    const [logloader, setlogloader] = useState(false);  
    const navigate = useNavigate()
  const {theme}=useTheme() 
  const loginUser=async()=>{
    const u = searchParams.getAll('user');
    const p = searchParams.getAll('token');
    //if(user.trim().length>0&&(password.trim().length>0)){
      /*seterr(false)  
      setlogloader(true)
      //preparedata 
      const userpass=md5.create().update(password.toString()).digest().toHex()
      const check=await useFetchAuthAll("http://localhost/electronbackend/index.php?path=checkCredentials",'ssdsdsd',"POST", { 
                user:user.toLowerCase().toString(),
                pass:userpass
            },null); 
      if(check.length>0){
        window.sessionStorage.setItem('user',util.encode64(JSON.stringify(check[0]))) 
        setlogloader(false)
        navigate('/dashboard')
      }else{ 
        setlogloader(false)
        seterr(true)
      } 
    }else{
      seterr(true) */
   // }
   alert('worked with Params : '+u+' ... '+p)
  } 
  
  useEffect(()=>{ 
    if(!localStorage.getItem('dbConfig')){
        navigate('/')
    } else{ 
        loginUser()
    }
  },[])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-blue-100 flex flex-col items-start justify-start h-screen tabsgrounddark '}>  
    <div className='w-full h-full  flex flex-col items-center justify-center'> 
     <div className='animate-pulse  flex flex-row items-center justify-center border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
      <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '}  />
      <a className='ml-6 text-sm'>Bitte warten ...<br/>...Daten werden laden</a>
      </div>
    </div>
    <div className='w-full fixed bottom-[2%] left-0 flex flex-row items-center justify-center'>
          <div className='py-2 px-6 border animate-slide-inright dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/30 shadow-gray-500/80 dark:bg-[#0a0e16]/80 bg-gray-100/80 rounded-lg  flex flex-row items-center justify-center'>
          <img src={imgs} className='w-10 h-2  mr-4 ' />
          <span className='text-sm dark:text-gray-400 text-gray-500'>Messenger Version 1.0.0</span>
          </div>
        </div>
    </div>
  )
}

export default ExternalLogScreen