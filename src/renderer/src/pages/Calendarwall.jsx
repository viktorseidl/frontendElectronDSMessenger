import React,{useEffect, useState } from 'react'  
import Sidebar from '../components/dashboardsidebar/Sidebar';  
import PinWall from '../components/PinWall';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import bgimg from './../assets/wavy-lines.svg'
import { util } from 'node-forge';
import DecText from '../utils/DecText';
import { useFetchAuthAll } from '../services/useFetchAll';
import { BiCalendar } from 'react-icons/bi';
const Calendarwall = () => {   
  
  return (

    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-blue-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar />
     <div className='w-full h-full flex flex-col items-start justify-start animate-fadeInfast dark:bg-gray-950 bg-blue-100 tabsgrounddark overflow-hidden'> 
     <div className='fixed w-screen h-screen z-0 flex flex-col items-center justify-center '>
        <span  className='relative w-full h-full flex flex-col items-center justify-center' ><a className=' flex flex-row items-center justify-center exo font-bold text-8xl opacity-15 -mt-14'><BiCalendar className='mr-4' /> Organizer</a>
        <img src={bgimg} className='absolute w-full h-full inset object-cover' />
        </span>
    </div>
     <DndProvider backend={HTML5Backend}>
     <PinWall  />
     </DndProvider>
    </div>  
    </div> 
    </div>
  )
} 
export default Calendarwall