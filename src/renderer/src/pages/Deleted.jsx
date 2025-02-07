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
import { MdArrowBackIos, MdArrowForwardIos, MdCancel, MdClose, MdDeleteForever, MdPerson, MdPersonOutline, MdPersonPinCircle, MdPriorityHigh } from 'react-icons/md';
import RowMessage from '../components/RowMessage';
import { util } from 'node-forge';
import DataTableMailInbox from '../components/DataTableMailInbox';
import DataTableMailOutbox from '../components/DataTableMailOutbox';
import DataTableMailDeletedbox from '../components/DataTableMailDeletedbox';
import { RiMailAddFill } from 'react-icons/ri';

const Deleted = () => {
  
  const [data, setdata] = useState([]); 
   
  const {theme}=useTheme() 
  
  const getAllMessages=async()=>{
    const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
    console.log(User)
    const query=await useFetchAuthAll("http://localhost/electronbackend/index.php?path=getMessagesAllTrash&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"GET", null, null);
    if(query.length>0){
setdata(query)
    } 
  }
  useEffect(()=>{
    getAllMessages()
  },[])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-blue-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar />
     <div className='w-full h-full flex flex-col items-start justify-start animate-fadeInfast'>

     
      <DataTableMailDeletedbox Data={data.length>0?data:[]} updater={getAllMessages} />
         
        
    </div>  
    </div>
    <div className='fixed bottom-20 right-16'>
      <Link to={'/new-message'} title='Neue Nachricht' className='group cursor-pointer  dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><RiMailAddFill className='group-hover:size-[124%]' /></Link>
    </div>
    </div>
  )
}
/**
 * <div className='  h-full overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200'>
        sdsdsds<br/> 
        </div>
 */
export default Deleted