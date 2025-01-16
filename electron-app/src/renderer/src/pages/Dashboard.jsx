import React,{useEffect, useRef, useState} from 'react'
import Loader from '../components/Loader'
import { useTheme } from '../styles/ThemeContext'
import { light,dark } from '../styles/schema';
import { useNavigate } from 'react-router-dom'
import { useFetchAuthAll } from '../services/useFetchAll'; 
import imgs from '../assets/Logo.png'  
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaSearch  } from "react-icons/fa";
import Sidebar from '../components/dashboardsidebar/Sidebar';
import { MdArrowBackIos, MdArrowForwardIos, MdCancel, MdClose, MdDeleteForever, MdPerson, MdPersonOutline, MdPersonPinCircle, MdPriorityHigh } from 'react-icons/md';
import RowMessage from '../components/RowMessage';

const Dashboard = () => {
  const [menubar, setmenubar] = useState(2); 
  const {theme}=useTheme() 
  const frameHandler=(num)=>{
    setmenubar(num)
  } 
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-blue-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar menubar={menubar} actionHandler={frameHandler} />
     <div className='w-full h-full flex flex-col items-start justify-start'>

     <div className=' w-full h-20 flex flex-row items-center justify-end'>
    <div className='w-full px-4 '>
        <label className='w-full flex flex-col items-center justify-center relative'> 
            <input 
            className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 text-gray-800 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded-2xl  outline-none py-2 px-3 pl-14 text-sm'
            placeholder="Suche ..."
            maxLength={30}
            value={''}
            onChange={'(e) => setpassword(e.target.value)'}
            />
            <FaSearch className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
            <MdClose className='absolute inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400 cursor-pointer' />
        </label>
    </div>
    <div className='w-20 p-5 h-full flex flex-col items-center justify-center'>
        <div className='w-full aspect-square dark:bg-blue-200 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
        <MdPerson className='text-2xl' />
        </div>
    </div>
     </div>
    <div className='w-full mt-2  flex-grow max-h-full overflow-auto flex flex-col items-start justify-start '>
        <div className='p-2 w-full flex flex-row items-center justify-between '>
            <div className='flex flex-row items-center justify-start' >
                <label className='flex flex-row items-center justify-start'>
                <input
                type="checkbox"
                className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'
                placeholder="Passwort"
                maxLength={30} 
                />
                <a className='text-sm'>Alle auswählen</a>
                </label>
                </div>
            <div className='flex flex-row items-center justify-end'>
                <div className='w-6 aspect-square pl-2 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
                <MdArrowBackIos />
                </div> 
                <span className='px-4 text-sm h-full flex flex-row items-center justify-center gap-x-2'><a>Seite</a> <b>x</b> <a>von</a> <b>x</b></span>
                <div className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
                <MdArrowForwardIos />
                </div> 
            </div>
        </div>
         <div className='w-full dark:bg-gray-900 bg-white min-h-[85%] h-auto overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start divide-y dark:divide-gray-700'>
            


            <RowMessage />
            <RowMessage />
            <RowMessage /> 
            <RowMessage />
            <RowMessage />
            <RowMessage />
            <RowMessage />


         </div>
         <div className='p-2 w-full flex flex-row items-center justify-between '>
         <div className='flex flex-row items-center justify-start' >
                <label className='flex flex-row items-center justify-start'>
                <input
                type="checkbox"
                className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'
                placeholder="Passwort"
                maxLength={30} 
                />
                <a className='text-sm'>Alle auswählen</a>
                </label>
                </div>
            <div className='flex flex-row items-center justify-end'>
                <div className='w-6 aspect-square pl-2 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
                <MdArrowBackIos />
                </div> 
                <span className='px-4 text-sm h-full flex flex-row items-center justify-center gap-x-2'><a>Seite</a> <b>x</b> <a>von</a> <b>x</b></span>
                <div className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
                <MdArrowForwardIos />
                </div> 
            </div>
        </div>
    </div>   
    </div>  
    </div>
    </div>
  )
}
/**
 * <div className='  h-full overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200'>
        sdsdsds<br/> 
        </div>
 */
export default Dashboard