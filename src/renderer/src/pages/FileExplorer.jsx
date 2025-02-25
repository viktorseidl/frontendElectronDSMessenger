import React,{useEffect, useState} from 'react' 
import { useTheme } from '../styles/ThemeContext' 
import { useFetchAuthAll } from '../services/useFetchAll';  
import Sidebar from '../components/dashboardsidebar/Sidebar'; 
import { util } from 'node-forge'; 
import FileCardGrid from '../components/FileCardGrid'; 
import DecText from '../utils/DecText';

const FileExplorer = () => {
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(DecText(localStorage.getItem('dbConfig'))).value)).localhost:''
  const [data, setdata] = useState([]);   
  const getAllMessages=async()=>{
    const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=getAllFiles&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"GET", null, null); 
    if(query.length>0){
        setdata(query)
    } 
  }
  useEffect(()=>{
    getAllMessages()
  },[])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-stone-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar />
     <div className='w-full h-full flex flex-col items-start justify-start animate-fadeInfast'> 
     <FileCardGrid data={data} />  
    </div>  
    </div> 
    </div>
  )
} 
export default FileExplorer