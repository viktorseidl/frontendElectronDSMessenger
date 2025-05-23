import React,{useEffect, useState} from 'react' 
import { RiMailAddFill } from "react-icons/ri"; 
import { Link } from 'react-router-dom'
import { useFetchAuthAll } from '../services/useFetchAll';  
import Sidebar from '../components/dashboardsidebar/Sidebar'; 
import { util } from 'node-forge';
import DataTableMailInbox from '../components/DataTableMailInbox'; 

const Dashboard = () => { 
  const [data, setdata] = useState([]); 
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost:'localhost' 
 
  const getAllMessages=async()=>{
    const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user'))) 
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=getMessagesAllReceived&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"GET", null, null);
    Array.isArray(query)?setdata(query):''
  }
  
  useEffect(()=>{
    getAllMessages()
  },[])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-stone-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar />
     <div className='w-full h-full flex flex-col items-start justify-start animate-fadeInfast'> 
      <DataTableMailInbox Data={data.length>0?data:[]} updater={getAllMessages} /> 
    </div>  
    </div>
    <div className='fixed bottom-20 right-16'>
      <Link to={'/new-message'} title='Neue Nachricht' className='group cursor-pointer  dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><RiMailAddFill className='group-hover:size-[124%]' /></Link>
    </div>
    </div>
  )
} 
export default Dashboard