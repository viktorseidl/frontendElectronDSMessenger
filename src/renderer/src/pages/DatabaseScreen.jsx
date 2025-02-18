import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetchAuthAll } from '../services/useFetchAll'; 
import Loader from '../components/Loader';
import { useTheme } from '../styles/ThemeContext'; 
import { MdDone, MdErrorOutline } from 'react-icons/md';
import imgs from '../assets/Logo.png'   
import EncText from '../utils/EncText';
import bgimg from './../assets/wavy-lines.svg'
import { util } from 'node-forge';
import Bittewarten from '../components/databasescreencomps/Bittewarten';
import Apiverbindungok from '../components/databasescreencomps/Apiverbindungok';
import Datenbankok from '../components/databasescreencomps/Datenbankok';
import ErrorDatenbank from '../components/databasescreencomps/ErrorDatenbank';
import ErrorAPI from '../components/databasescreencomps/ErrorAPI';
import ErrorDatenbankKonfig from '../components/databasescreencomps/ErrorDatenbankKonfig';
const DatabaseScreen = () => {  
  const {theme}=useTheme()  
  const navigate=useNavigate(); 
  const [host, sethost] = useState('');
  const [localhost, setlocalhost] = useState('localhost');
  const [err, seterr] = useState(false);
  const [dbname, setdbname] = useState('');
  const [dbnamepflege, setdbnamepflege] = useState('');
  const [user, setuser] = useState('');
  const [password, setpassword] = useState('');
  const [showloader, setshowloader] = useState(0); 

  const handleCheckConnection = async () => { 
     seterr(false) 
     if(host.trim().toString().length>3&&(localhost.trim().toString().length>5)&&(dbname.trim().toString().length>3)&&(user.trim().toString().length>=2)){
      setshowloader(1)  
      try{
      const hostcheck=await useFetchAuthAll("http://"+localhost+"/electronbackend/index.php?path=testHostConnection",'ssdsdsd',"GET", null,null);  
      if(hostcheck=="OK"){
        checkDatabaseCredentials();
      }
    }catch(error){
      setTimeout(()=>{
      setshowloader(5) 
      setTimeout(()=>{
        setshowloader(0)
        seterr(true)
      },4000)
      },1000)
    } 
    
  }else{
    seterr(true)
  }
};

  const signal = new AbortController().abort()
  const checkDatabaseCredentials=async()=>{
    setTimeout(()=>{
      setshowloader(4) 
      signal
            setTimeout(()=>{
              setshowloader(0)
              seterr(true)
            },4000)
    },5000);  
    const check=await useFetchAuthAll("http://"+localhost+"/electronbackend/index.php?path=testDBConnection",'ssdsdsd',"POST", {
          host:host,
          dbname:dbname,
          dbnamepflege:dbnamepflege,
          user:user,
          pass:password
      },null);  
 
      if(check=='NO CONNECTION'){ 
            setshowloader(4) 
            setTimeout(()=>{
              setshowloader(0)
              seterr(true)
            },1000)
      }else if(check=='FILE CREATION FAILED'){
            setshowloader(6) 
            setTimeout(()=>{
              setshowloader(0)
              seterr(true)
            },1000)
      }else{ 
          setTimeout(()=>{
            setshowloader(2) 
            setTimeout(()=>{
              if(setCookie()){
                //navigate('/overview')
                CheckAndCreateTables()
              }else{
                setshowloader(0)
                seterr(true)
              }
            },1000)
          },1000)  
      } 
  }
  const CheckAndCreateTables = async ()=>{
    const check=await useFetchAuthAll("http://"+localhost+"/electronbackend/index.php?path=testDBTables",'ssdsdsd',"POST", {
      host:host,
      dbname:dbname,
      dbnamepflege:dbnamepflege,
      user:user,
      pass:password
    },null); 
  }
  const checkCookie = async () => { 
    if(window.localStorage.getItem('dbConfig')){
        const Configexists=await useFetchAuthAll("http://"+localhost+"/electronbackend/index.php?path=checkConfigFileConnector",'ssdsdsd',"GET", null,null); 
        if(Configexists==true){
        navigate('/overview');
        } 
    }else{ 
      return false;
    } 
  }; 
  const ErrorMessage=()=>{
    return(<div className=' w-5/6 mb-4 dark:bg-pink-600 bg-red-600 p-2 rounded dark:text-white text-white text-sm'>
      ERROR - Bitte überprüfen Sie die Daten 
      </div>)
  }
  const setCookie = async () => { 
    const cookie = {
      url: '',  
      name: 'dbConfig',
      value: EncText(util.encode64(JSON.stringify({id:1,host:host,dbname:dbname,dbnamepflege:dbnamepflege,user:user,password:password,localhost:localhost}))), 
      expirationDate: Math.floor(Date.now() / 1000) + (3600*24*365*2), // Expires in 1 year
    };
    
    return window.localStorage.setItem('dbConfig',JSON.stringify(cookie)) 
  }; 
  useEffect(()=>{   
    //alert(JSON.stringify(window.localStorage.getItem('dbConfig')).toString());
    if(window.localStorage.getItem('dbConfig')){
      navigate('/overview')
    }
    checkCookie()  
  },[theme])
  return (
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-blue-100 tabsgrounddark flex flex-col items-start justify-start h-screen '}>  
    <div className='fixed w-screen h-screen '>
          <img src={bgimg} className='w-full h-full object-cover' />
        </div>
        <div className='w-full h-full z-10  flex flex-col items-center justify-center'> 
            {
                showloader==1?
                <Bittewarten />
                :
                showloader==2? //successAPI
                <Apiverbindungok /> 
                :
                showloader==3? //successDatabase
                <Datenbankok /> 
                :
                showloader==4? //errorDatenbankDaten
                <ErrorDatenbank /> 
                :
                showloader==5? //errorAPI
                <ErrorAPI /> 
                :
                showloader==6? //errorAPI
                <ErrorDatenbankKonfig /> 
                :
                <div className='w-full flex flex-col items-center justify-center h-full '>
                <div className={' w-2/6 border animate-slide-inleft dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-200 rounded pt-10 flex flex-col items-center justify-center  -mt-20'}>  
                <div className='w-full mb-6  text-3xl font-[arial] text-center' >Datenbank einrichten</div>
                <div className='w-full flex flex-col items-center justify-center'>
                { 
                  err?
                  <ErrorMessage />
                  :
                  ''
                }
                </div>
                    <label className='w-full flex flex-col items-center justify-start'> 
                        <a className='w-5/6 text-sm'>Bei lokalen Netzwerken immer "localhost" verwenden</a> 
                        <input
                        onKeyDown={(event)=>{event.key==='Enter'?handleCheckConnection():''}}
                        type="text"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder='Xampp/Apache Adresse '
                        maxLength={250}
                        value={localhost}
                        onChange={(e) => setlocalhost(e.target.value)}
                        />
                    </label>
                    <label className='w-full mt-4 flex flex-col items-center justify-start'>  
                        <input
                        onKeyDown={(event)=>{event.key==='Enter'?handleCheckConnection():''}}
                        type="text"
                        className=' w-5/6  mt-2  dark:placeholder:text-blue-400 placeholder:text-gray-500 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 ring-1 dark:ring-gray-700 ring-gray-400/90 rounded  outline-none py-2 px-3 text-sm'
                        placeholder="Datenbank-Host"
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
                    <button  onClick={()=>handleCheckConnection()} className='py-1 px-4 text-sm dark:text-white text-black mt-14 rounded-sm dark:bg-[#1f273f] bg-gray-300 dark:hover:bg-gray-700 outline-none hover:bg-gray-400/60 shadow-inner dark:shadow-[rgba(0,0,0,0.1)] shadow-[rgba(255,255,255,0.1)] ring-1 dark:ring-gray-600 ring-gray-400'>Speichern</button>
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