import React,{useEffect, useRef, useState} from 'react'
import Loader from '../components/Loader'
import { useTheme } from '../styles/ThemeContext'
import { light,dark } from '../styles/schema';
import { Link, useNavigate } from 'react-router-dom'
import { useFetchAuthAll } from '../services/useFetchAll'; 
import imgs from '../assets/Logo.png'  
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const LogScreen = () => {
  const [host, sethost] = useState('');
    const [err, seterr] = useState(true);
    const [logcookie, setlogcookie] = useState(false);
    const [showpass, setshowpass] = useState(false);
    const [user, setuser] = useState('');
    const [password, setpassword] = useState('');
    const [showloader, setshowloader] = useState(0);
  const {theme}=useTheme() 
  /**
   * SELECT TOP (1000) [ID]
      ,[Anwender]
      ,[Password]   md5
      ,[Berechtigung-ID]
      ,[Form]
      ,[Menu]
      ,[Berechtigt]
      ,[Mitarbeiter]
      ,[Vorlage]
      ,[Changed]
      ,[User]
      ,[gelöscht]
      ,[gelöschtDatum]
      ,[gelöschtUser]
      ,[Kennwort]
      ,[Administrator]
      ,[deaktiviert]
  FROM [Medicarehsw].[dbo].[BerechtigungAnwender]
   */
  const removeCookie = async () => { 
    const cookieName = 'dbConfig';
    window.localStorage.removeItem('dbConfig')
    /*try { 
      const result = await window.api.electronCookies.removeCookie(cookieName); 
      if (result) { 
        return true
      } else { 
        return false
      }
    } catch (error) {
        return false
    }*/
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
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-blue-100 flex flex-col items-start justify-start h-screen tabsgrounddark '}>  
    <div className='w-full h-full  flex flex-col items-center justify-center'>
    <div className='w-full flex flex-col items-center justify-center h-full '>
                <div className={' w-2/6 border  animate-slide-inleft dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-200 rounded pt-10 flex flex-col items-center justify-center  -mt-20'}>  
                <div className='w-full mb-6  text-3xl font-[arial] text-center' onClick={()=>removeCookie()} >Anmelde-Bereich</div>
                <div className='w-full flex flex-col items-center justify-center'>
                { 
                  err?
                  <div className=' w-5/6 mb-4 dark:bg-pink-600 bg-red-600/40 p-2 rounded dark:text-white text-black text-sm'>
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
                        value={host}
                        onChange={(e) => sethost(e.target.value)}
                        >
                          <option >Verwaltung</option>
                          <option >Pflege</option>
                        </select>
                    </label> 
                    <label className='w-full mt-4 flex flex-col items-center justify-start'> 
                        <input
                        type="text"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Benutzername"
                        maxLength={80}
                        value={user}
                        onChange={(e) => setuser(e.target.value)}
                        />
                    </label>
                    <label className='w-full mt-4 flex flex-col items-center justify-start relative'> 
                        <input
                        type={showpass?"text":"password"}
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Passwort"
                        maxLength={30}
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        />
                        {showpass?<FaRegEye onClick={()=>setshowpass(false)} className='absolute inset right-[12%] top-[1.2rem] text-gray-500 hover:text-gray-400 cursor-pointer' />:<FaRegEyeSlash  onClick={()=>setshowpass(true)} className='cursor-pointer absolute inset right-[12%] top-[1.2rem] text-gray-500 hover:text-gray-400' />}
                    </label>
                    <label className='w-5/6 mt-4 flex flex-col items-start justify-start '> 
                        <p className='w-full flex flex-row items-center justify-start'><a className='font-[arial] text-sm mr-2'>Angemeldet bleiben?</a>
                        <input
                        type="checkbox"
                        className=' w-4 aspect-square dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'
                        placeholder="Passwort"
                        maxLength={30}
                        checked={logcookie}
                        onChange={(e) => setlogcookie(!logcookie)}
                        /> 
                        </p>
                    </label>
                    <div className='w-5/6 flex mb-8 flex-row items-end justify-end'>
                    <Link to={'/dashboard'} className='py-2 px-4 text-sm dark:text-white text-black font-bold mt-14 rounded dark:bg-[#1f273f] bg-gray-300 dark:hover:bg-gray-700 hover:bg-gray-400/60 shadow-inner shadow-[rgba(255,255,255,0.1)] ring-1 dark:ring-gray-800 ring-gray-400'>Anmelden</Link>
                    </div>
                    </div> 
                </div>
      {/*<div className='animate-pulse  flex flex-row items-center justify-center border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
      <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '}  />
      <a className='ml-6 text-sm'>Bitte warten ...<br/>...Daten werden laden</a>
      </div>*/}
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