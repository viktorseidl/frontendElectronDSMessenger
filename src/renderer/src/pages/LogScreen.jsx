import React,{useEffect, useRef, useState} from 'react'
import Loader from '../components/Loader' 
import { useNavigate } from 'react-router-dom'
import { useFetchAuthAll } from '../services/useFetchAll'; 
import imgs from '../assets/Logo.png'  
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { md5, util } from 'node-forge';
import DecText from '../utils/DecText';
import bgimg from './../assets/wavy-lines.svg'
const LogScreen = () => {
  const [type, settype] = useState('verwaltung');
    const [err, seterr] = useState(false); 
    const _lockbtn = useRef(null);
    const [logloader, setlogloader] = useState(false); 
    const [showpass, setshowpass] = useState(false);
    const [user, setuser] = useState('');
    const [password, setpassword] = useState(''); 
    const navigate = useNavigate() 
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(DecText(localStorage.getItem('dbConfig'))).value)).localhost:'' 
  const loginUser=async()=>{
    if(type&&(user.trim().length>0)&&(password.trim().length>0)){
      seterr(false) 
      _lockbtn.current.disabled = true;
      setlogloader(true) 
      const userpass=md5.create().update(password.toString()).digest().toHex()
      const check=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=checkCredentials",'ssdsdsd',"POST", {
                dbtype:type,
                user:user.toLowerCase().toString(),
                pass:userpass
            },null); 
      if(check.length>0){
        window.sessionStorage.setItem('user',util.encode64(JSON.stringify(check[0])))
        _lockbtn.current.disabled = false;
        setlogloader(false)
        navigate('/dashboard')
      }else{
        _lockbtn.current.disabled = false;
        setlogloader(false)
        seterr(true)
      } 
      console.log(check) 
    }else{
      seterr(true)
      _lockbtn.current.disabled = false;
    }
  }  
  useEffect(()=>{
    if(!localStorage.getItem('dbConfig')){
      navigate('/')
    }  
  },[])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-stone-100 flex flex-col items-start justify-start h-screen tabsgrounddark '}>  
    <div className='fixed w-screen h-screen '>
      <img src={bgimg} className='w-full h-full object-cover' />
    </div>
    <div className='w-full h-full z-20 flex flex-col items-center justify-center'>
    <div className='w-full flex flex-col items-center justify-center h-full '>
                <div className={' w-2/6 border  animate-slide-inleft dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-200 rounded pt-10 flex flex-col items-center justify-center  -mt-20'}>  
                <div className='w-full mb-6  text-3xl font-[arial] text-center' >Anmelde-Bereich</div>
                <div className='w-full flex flex-col items-center justify-center'>
                { 
                  err?
                  <div className=' w-5/6 mb-4 dark:bg-pink-600 bg-red-600 p-2 rounded dark:text-white text-white text-sm'>
                  ERROR - Bitte überprüfen Sie die ihre Anmelde-Daten. 
                  </div>
                  :
                  ''
                }
                </div>
                    <label className='w-full flex flex-col items-center justify-start'>  
                        <select
                        type="text"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Host oder IP-Adresse"
                        maxLength={250}
                        value={type}
                        onChange={(e) => settype(e.target.value)}
                        >
                          <option value={'verwaltung'} >Verwaltung</option>
                          <option value={'pflege'}>Pflege</option>
                        </select>
                    </label> 
                    <label className='w-full mt-4 flex flex-col items-center justify-start'> 
                        <input
                        type="text" onKeyDown={(event)=>{event.key==='Enter'?loginUser():''}}
                        className=' w-5/6 mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Benutzername"
                        maxLength={80}
                        value={user}
                        onChange={(e) => setuser(e.target.value)}
                        />
                    </label>
                    <label className='w-full mt-4 flex flex-col items-center justify-start relative'> 
                        <input
                        type={showpass?"text":"password"} onKeyDown={(event)=>{event.key==='Enter'?loginUser():''}}
                        className=' w-5/6 mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Passwort"
                        maxLength={30}
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        />
                        {showpass?<FaRegEye onClick={()=>setshowpass(false)} className='absolute inset right-[12%] top-[1.2rem] text-gray-500 hover:text-gray-400 cursor-pointer' />:<FaRegEyeSlash  onClick={()=>setshowpass(true)} className='cursor-pointer absolute inset right-[12%] top-[1.2rem] text-gray-500 hover:text-gray-400' />}
                    </label> 
                    <div className='w-5/6 flex mb-8 flex-row items-end justify-end'>
                    <button ref={_lockbtn} onClick={()=>loginUser()} className='py-2 px-4 text-sm dark:text-white text-black font-bold mt-14 rounded dark:bg-[#1f273f] bg-gray-300 dark:hover:bg-gray-700 hover:bg-gray-400/60 shadow-inner shadow-[rgba(255,255,255,0.1)] ring-1 dark:ring-gray-800 ring-gray-400 flex flex-row items-center justify-center'>{logloader==false?'Anmelden':<><Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '}  Width={4}/> <a className='ml-2 font-normal'>...Daten werden geprüft</a></>}</button>
                    </div>
                    </div> 
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

export default LogScreen