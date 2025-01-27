import React,{useEffect, useRef, useState} from 'react'
import Loader from '../components/Loader'
import { useTheme } from '../styles/ThemeContext'
import { light,dark } from '../styles/schema';
import { Link, useNavigate } from 'react-router-dom'
import { useFetchAuthAll } from '../services/useFetchAll'; 
import imgs from '../assets/Logo.png'  
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaSearch  } from "react-icons/fa"; 
import Sidebar from '../components/dashboardsidebar/Sidebar';
import { MdArrowBackIos, MdArrowForwardIos, MdCancel, MdClose, MdDeleteForever, MdPerson, MdPersonOutline, MdPersonPinCircle, MdPriorityHigh, MdSend } from 'react-icons/md';
import RowMessage from '../components/RowMessage';
import { util } from 'node-forge';
import DataTableMailInbox from '../components/DataTableMailInbox';
import DataTableMailOutbox from '../components/DataTableMailOutbox';
import DataTableMailDeletedbox from '../components/DataTableMailDeletedbox';
import FileCardGrid from '../components/FileCardGrid';
import NewMessageTab from '../components/NewMessageTab';

const NewMessage = () => {
  
  const [data, setdata] = useState([]); 
   
  const {theme}=useTheme() 
  
  
  useEffect(()=>{ 
  },[])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-blue-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar />
     <div className='w-full h-full flex flex-col items-start justify-start animate-fadeInfast'>

     <NewMessageTab />
         
        
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
export default NewMessage