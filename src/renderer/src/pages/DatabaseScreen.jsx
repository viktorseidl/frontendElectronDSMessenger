import React,{useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetchAuthAll } from '../services/useFetchAll'; 
import Loader from '../components/Loader';
import { useTheme } from '../styles/ThemeContext';
import { light,dark } from '../styles/schema';
import { MdDone, MdErrorOutline } from 'react-icons/md';
import imgs from '../assets/Logo.png'  
 

import EncText from '../utils/EncText';
import { util } from 'node-forge';
const DatabaseScreen = () => { 
  //window.api.logToFrontend(JSON.stringify(store)) 
  const {theme}=useTheme()
  const colors=theme?light:dark 
    
  const navigate=useNavigate();
  
  const [host, sethost] = useState('');
  const [err, seterr] = useState(false);
  const [dbname, setdbname] = useState('');
  const [dbnamepflege, setdbnamepflege] = useState('');
  const [user, setuser] = useState('');
  const [password, setpassword] = useState('');
  const [showloader, setshowloader] = useState(0); 

  const handleCheckConnection = async () => { 
     seterr(false) 
     if(host.trim().toString().length>3&&(dbname.trim().toString().length>3)&&(user.trim().toString().length>=2)){
      setshowloader(1) 
      const check=await useFetchAuthAll("http://localhost/electronbackend/index.php?path=testDBConnection",'ssdsdsd',"POST", {
          host:host,
          dbname:dbname,
          dbnamepflege:dbnamepflege,
          user:user,
          pass:password
      },null);  
      
      if(check=='NO CONNECTION'){ 
            setshowloader(3) 
            setTimeout(()=>{
              setshowloader(0)
              seterr(true)
            },1000)
      }else if(check=='FILE CREATION FAILED'){
            setshowloader(3) 
            setTimeout(()=>{
              setshowloader(0)
              seterr(true)
            },1000)
      }else{ 
          setTimeout(()=>{
            setshowloader(2) 
            setTimeout(()=>{
              if(setCookie()){
                navigate('/overview')
              }else{
                setshowloader(0)
              }
            },1000)
          },1000)  
      }
    }else{
      seterr(true)
    } 
  };
  const checkCookie = async () => { 
    if(window.localStorage.getItem('dbConfig')){
      navigate('/overview');
    }else{
      return false;
    } 
  };  
  const removeCookie = async () => { 
    const cookieName = 'dbConfig';
    try { 
      const result = await window.api.electronCookies.removeCookie(cookieName); 
      if (result) { 
        return true
      } else { 
        return false
      }
    } catch (error) {
        return false
    }
  }; 
  const getCookie = async () => { 
    const cookieName = 'dbConfig';
    try { 
      const result = await window.api.electronCookies.getCookies(cookieName); 
      if (result) { 
        return true
      } else { 
        return false
      }
    } catch (error) {
        return false
    }
  }; 
  const setCookie = async () => { 
    const cookie = {
      url: '', // The URL for the cookie
      name: 'dbConfig',
      value: EncText(util.encode64(JSON.stringify({id:1,host:host,dbname:dbname,user:user,password:password}))), 
      expirationDate: Math.floor(Date.now() / 1000) + (3600*24*365), // Expires in 1 hour
    };
    window.localStorage.setItem('dbConfig',JSON.stringify(cookie))
    /*try { 
      const result = await window.api.electronCookies.setCookie(cookie); 
      if (result) { 
        return true 
      } else { 
        return false
      }
    } catch (error) {
        return false
    }*/
  }; 
  useEffect(()=>{  
    checkCookie()  
  },[theme])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-blue-100 tabsgrounddark flex flex-col items-start justify-start h-screen '}>  
        <div className='w-full h-full  flex flex-col items-center justify-center'> 
            {
                showloader==1?
                <div className='animate-pulse  flex flex-row items-center justify-center border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
                <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '}  />
                <a className='ml-6 text-sm'>Bitte warten ...<br/>...Daten werden geprüft</a>
                </div>
                :
                showloader==2? //success
                <div className=' flex flex-row items-center justify-center border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
                <div className='w-full bg-lime-600/40 p-4 flex flex-row items-center justify-center rounded'>
                <MdDone className='inline text-4xl' />
                <a className='ml-6 text-sm'>Verbindung wurde hergestellt ...<br />... das System wird initialisiert</a>
                </div>
                </div>
                :
                showloader==3? //error
                <div className=' flex flex-row items-center justify-center border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
                <div className='w-full bg-red-600/40 p-4 flex flex-row items-center justify-center rounded'>
                <MdErrorOutline className='inline text-4xl' />
                <a className='ml-6 text-sm'>ERROR - Es konnte keine...<br/> ... Verbindung hergestellt werden</a>
                </div>
                </div>
                :
                <div className='w-full flex flex-col items-center justify-center h-full '>
                <div className={' w-2/6 border animate-slide-inleft dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-200 rounded pt-10 flex flex-col items-center justify-center  -mt-20'}>  
                <div className='w-full mb-6  text-3xl font-[arial] text-center' >Datenbank einrichten</div>
                <div className='w-full flex flex-col items-center justify-center'>
                { 
                  err?
                  <div className=' w-5/6 mb-4 dark:bg-pink-600 bg-red-600 p-2 rounded dark:text-white text-white text-sm'>
                  ERROR - Bitte überprüfen Sie die Daten 
                  </div>
                  :
                  ''
                }
                </div>
                    <label className='w-full flex flex-col items-center justify-start'>  
                        <input
                        onKeyDown={(event)=>{event.key==='Enter'?handleCheckConnection():''}}
                        type="text"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Host oder IP-Adresse"
                        maxLength={250}
                        value={host}
                        onChange={(e) => sethost(e.target.value)}
                        />
                    </label>
                    <label className='w-full mt-4 flex flex-col items-center justify-start'> 
                        <input
                        onKeyDown={(event)=>{event.key==='Enter'?handleCheckConnection():''}}
                        type="text"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Datenbank-Name Verwaltung"
                        maxLength={50}
                        value={dbname}
                        onChange={(e) => setdbname(e.target.value)}
                        />
                    </label>
                    <label className='w-full mt-4 flex flex-col items-center justify-start'> 
                        <input
                        onKeyDown={(event)=>{event.key==='Enter'?handleCheckConnection():''}}
                        type="text"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Datenbank-Name Pflege (optional)"
                        maxLength={50}
                        value={dbnamepflege}
                        onChange={(e) => setdbnamepflege(e.target.value)}
                        />
                    </label>
                    <label className='w-full mt-4 flex flex-col items-center justify-start'> 
                        <input
                        onKeyDown={(event)=>{event.key==='Enter'?handleCheckConnection():''}}
                        type="text"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Benutzername"
                        maxLength={80}
                        value={user}
                        onChange={(e) => setuser(e.target.value)}
                        />
                    </label>
                    <label className='w-full mt-4 flex flex-col items-center justify-start'> 
                        <input
                        onKeyDown={(event)=>{event.key==='Enter'?handleCheckConnection():''}}
                        type="password"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Passwort"
                        maxLength={30}
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        />
                    </label>
                    <div className='w-5/6 flex mb-8 flex-row items-end justify-end'>
                    <button className='py-2 px-4 text-sm dark:text-white text-black font-bold mt-14 rounded dark:bg-[#1f273f] bg-gray-300 dark:hover:bg-gray-700 hover:bg-gray-400/60 shadow-inner shadow-[rgba(255,255,255,0.1)] ring-1 dark:ring-gray-800 ring-gray-400' onClick={handleCheckConnection}>Speichern</button>
                    </div>
                    </div> 
                </div> 
            }
    </div>
    <div className='w-full fixed bottom-[2%] left-0 flex flex-row items-center justify-center'>
      <div className='py-2 px-6 animate-slide-inright border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/30 shadow-gray-500/80 dark:bg-[#0a0e16]/80 bg-gray-100/80 rounded-lg  flex flex-row items-center justify-center'>
      <img src={imgs} className='w-10 h-2  mr-4 ' />
      <span className='text-sm dark:text-gray-400 text-gray-500'>Messenger Version 1.0.0</span>
      </div>
    </div>
    </div>
  )
}

export default DatabaseScreen