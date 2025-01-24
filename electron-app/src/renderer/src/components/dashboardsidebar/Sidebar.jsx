import React, { Fragment, useEffect, useState } from 'react'
import { FaInbox } from 'react-icons/fa6';
import { HiChatBubbleLeftRight  } from 'react-icons/hi2';
import { MdFilePresent, MdLogout, MdOutbox, MdOutlineDeleteSweep } from 'react-icons/md';
import { BiMailSend  } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {  
    const [menubar, setmenubar] = useState(); 
    const navigate=useNavigate()
    const logout=()=>{
        window.sessionStorage.clear()
        navigate('/overview')
    }
    const frameHandler=(num)=>{
        if(num==1){
            navigate('/dashboard')
        }else if(num==2){
            navigate('/dashboardsend') 
        }else if(num==3){
            navigate('/dashboardtrash') 
        }else if(num==4){
            navigate('/file-explorer') 
            
        }

      }  
      useEffect(()=>{
        if(window.location.hash=='#/dashboard'){
            setmenubar(1)
        }else if(window.location.hash=='#/dashboardsend'){
            setmenubar(2)
        }else if(window.location.hash=='#/dashboardtrash'){
            setmenubar(3)
        }else if(window.location.hash=='#/file-explorer'){
            setmenubar(4)
        }
      },[])
  return (
    <div aria-label='sidebar'>
     
        <div className='absolute inset-0 -left-1 -top-[0.1rem] w-14 bg-gray-900/90 border-r border-gray-800 max-h-[100.04%] overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-center justify-start '>
        {
            menubar==1?
            <div onClick={()=>frameHandler(1)} className=' dark:bg-blue-600/60 bg-blue-600/60 text-gray-200  p-1 text-xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Posteingang' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer '>
                <FaInbox  />
                </div>
            </div>
            : 
            <div onClick={()=>frameHandler(1)} className='text-gray-500 p-1 text-xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Posteingang' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer '>
                <FaInbox  />
                </div>
            </div>
        }
        {
            menubar==2?
            <div onClick={()=>frameHandler(2)} className='dark:bg-blue-600/60 bg-blue-600/60 text-gray-200 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Postausgang' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer'>
                <BiMailSend  />
                </div>
            </div>
            :
            <div onClick={()=>frameHandler(2)} className='text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Postausgang' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer'>
                <BiMailSend  />
                </div>
            </div>

        }
        {
            menubar==3?
            <div onClick={()=>frameHandler(3)} className='dark:bg-blue-600/60 bg-blue-600/60 text-gray-200 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Papierkorb' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer'>
                <MdOutlineDeleteSweep   />
                </div>
            </div>
            :
            <div onClick={()=>frameHandler(3)} className='text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Papierkorb' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/50 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer'>
                <MdOutlineDeleteSweep   />
                </div>
            </div>
        }
        {
            menubar==4?
            <div onClick={()=>frameHandler(4)} className='dark:bg-blue-600/60 bg-blue-600/60 text-gray-200 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Anhänge' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer'>
                <MdFilePresent   />
                </div>
            </div>
            :
            <div onClick={()=>frameHandler(4)} className='text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Anhänge' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer'>
                <MdFilePresent   />
                </div>
            </div>
        }
            <div onClick={()=>logout()} className='text-gray-500 p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center  shadow-inner shadow-[rgba(255,255,255,0.1)]'>
                <div title='Abmelden' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-200 hover:bg-blue-500/30 rounded cursor-pointer'>
                <MdLogout   />
                </div>
            </div>
        
        <div className='text-gray-400 hidden p-1 text-2xl w-full aspect-square flex flex-col items-center justify-center'>
            <div title='Support' className='w-full h-full flex flex-col items-center justify-center dark:hover:bg-blue-500/30 dark:hover:text-gray-100 hover:text-gray-700 hover:bg-blue-500/30 rounded cursor-pointer'>
            <HiChatBubbleLeftRight  />
            </div>
        </div>

        </div>
    
    </div>
  )
}

export default Sidebar