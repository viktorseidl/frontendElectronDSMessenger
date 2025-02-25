import React,{useEffect, useRef, useState} from 'react' 
import { useTheme } from '../styles/ThemeContext' 
import Sidebar from '../components/dashboardsidebar/Sidebar'; 
import ShowMessageTab from '../components/ShowMessageTab';

const ShowMessage = () => {  
  useEffect(()=>{ 
  },[])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-stone-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar />
     <div className='w-full h-full flex flex-col items-start justify-start animate-fadeInfast'> 
     <ShowMessageTab /> 
    </div>  
    </div> 
    </div>
  )
} 
export default ShowMessage