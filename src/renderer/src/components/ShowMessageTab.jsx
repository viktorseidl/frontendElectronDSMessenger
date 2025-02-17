import React, { useEffect, useState } from 'react';
import { FaHtml5, FaCss3Alt ,FaJs, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaFileCsv, FaFileAudio } from 'react-icons/fa';
import pako from 'pako';
import { MdArrowBackIos, MdDelete, MdDownload, MdFilePresent, MdMarkEmailRead, MdMarkEmailUnread, MdMoveToInbox, MdMovie, MdPerson, MdPriorityHigh, MdReply } from 'react-icons/md';
import { util } from 'node-forge'; 
import { Si7Zip, SiJpeg } from "react-icons/si";
import { BsFiletypeJson, BsFiletypePng, BsFiletypeXml,BsFiletypeTxt } from "react-icons/bs";
import { IoImageSharp } from "react-icons/io5";
import { AiOutlineGif } from "react-icons/ai";  
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dialog from './Dialog';
import { useFetchAuthAll } from '../services/useFetchAll';
import DecText from '../utils/DecText';
const ShowMessageTab = () => {
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(DecText(localStorage.getItem('dbConfig'))).value)).localhost:''
  const locationData=useLocation(); 
  const navigate = useNavigate(); // For managing user back to source onClick={() => navigate(-1)}>Go Back 
  const [attaches, setattaches] = useState([]);
  const [btyperMark, setbtyperMark] = useState('');
  const [btyper, setbtyper] = useState(''); 
  const [nachricht, setNachricht] = useState(locationData.state===null?'':locationData.state.Nachricht);  
  const [isDialogOpen, setIsDialogOpen] = useState(false);  
  const [isDialogOpenMark, setIsDialogOpenMark] = useState(false);  
    const returnSizeValue=(size)=>{ 
      if(size>50000){
        return (Number(size/1000000).toFixed(2)+'Mb')
      }else if(size>900){
        return (Number(size/1000).toFixed(2)+'Kb')
      }else{
        return (Number(size).toFixed(0)+'byte')
      }
    }
    const returnIconType=(it)=>{ 
      switch(it){
        case "image/jpeg":
          return <SiJpeg />
        case "image/png":
          return <BsFiletypePng />
          case "image/webp":
            return <IoImageSharp />
        case "image/gif":
          return <AiOutlineGif /> 
        case "text/plain":
          return <BsFiletypeTxt  /> 
        case "text/html":
          return <FaHtml5  /> 
        case "text/css": 
          return <FaCss3Alt  />
        case "application/javascript":
          return <FaJs   />
        case "application/json":
          return <BsFiletypeJson  />
        case "application/xml":
          return <BsFiletypeXml  />
        case "application/pkcs10":
          return <MdFilePresent />
        case "application/pgp-signature":
          return <MdFilePresent />
        case "application/pics-rules":
          return <MdFilePresent />
        case "application/pkcs7-mime":
          return <MdFilePresent />
        case "audio/mpeg":
          return <FaFileAudio />
        case "video/mp4":
          return <MdMovie /> 
        case "application/zip":
          return <Si7Zip />
        case "application/pdf":
          return <FaFilePdf />
        case "application/msword":
          return <FaFileWord />
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          return <FaFileWord />
        case "application/vnd.ms-powerpoint":
          return <FaFilePowerpoint />
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          return <FaFilePowerpoint />
        case "application/vnd.ms-excel":
          return <FaFileExcel />
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return <FaFileExcel />
        case "text/csv":
          return <FaFileCsv />
        default:
          return <MdFilePresent />
      }
    } 
  const BackToInbox=async(e)=>{ 
        closeDialog(e)
        const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=movetoInbox&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"PUT", {mid:locationData.state.ID}, null);
        if(query==true){
          navigate(-1)
        }          
  }
  const messageMarker=async(e)=>{ 
        closeDialogMark(e) 
        if(btyperMark==1){ //Markread
              const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
              const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=MarkReadMessageArr&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP)+'&b=1','ssdsdsd',"PUT", {arr:JSON.stringify([locationData.state.ID])}, null);
              if(query==true){
                navigate(-1)
              }      
        }else{
            const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
            const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=MarkReadMessageArr&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP)+'&b=0','ssdsdsd',"PUT", {arr:JSON.stringify([locationData.state.ID])}, null);
            if(query==true){
              navigate(-1)
            }
        }
  }
  const DeleteID=async(e)=>{ 
      closeDialog(e) 
      const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
      const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=DeleteMessageOnID&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"DELETE", {mid:locationData.state.ID}, null);
      if(query==true){
        navigate(-1)
      } 
    }
  const  openDialog=(e,b)=>{
    setIsDialogOpen(true)
    setbtyper(b)
  }
  const  openDialogMark=(e,b)=>{
    setIsDialogOpenMark(true)
    setbtyperMark(b)
  }
  // Close image dialog when clicked outside
  const closeDialog = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
    }
  };  
  const closeDialogMark = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpenMark(false);
    }
  };  
  //USED TO PASS DATA BY ROUTER ON ANSWER MESSAGE FOR EXAMPLE
  if(locationData.state===null){
    navigate(-1)
  }
  const getAttachments = async(id)=>{ 
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=getAttachmentsOnAttachmentId&a="+util.encode64(id),'ssdsdsd',"GET", null, null);
        if(query.length>0){
          setattaches(query)
        }  
  } 
  const saveFileandOpen=async (id,idindex)=>{ 
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=getFileToSaveOnIdAndIndex&a="+util.encode64(id+'.'+idindex),'ssdsdsd',"GET", null, null);
        if(query.length>0){ 
          const a = await window.api.electronFiles.saveFile(query[0].Mail,query[0].Name)  
        }
  }
  useEffect(()=>{
    if(locationData.state&&locationData.state.Anhang!="0"){
      getAttachments(locationData.state.Anhang) 
    }
  },[])  
  return (
    <div className=" flex-grow max-h-full overflow-auto flex flex-col items-start justify-start w-full py-4">
<div className=' w-full h-auto flex flex-row items-center justify-end -mt-2 -mb-[2px]'>  
          <div className='w-full pl-4 flex flex-col items-start justify-start gap-x-4'>

          <div className='  w-3/4 flex flex-row items-center justify-start mb-2'>
          <button onClick={() => navigate(-1)} className='flex flex-row items-center justify-center ring-1 dark:ring-gray-800 ring-gray-800/20 px-2 py-0.5 rounded-sm dark:bg-slate-900 bg-gray-200 dark:text-blue-400 text-gray-600 shadow-inner dark:hover:bg-blue-500/30 hover:bg-black/10'><MdArrowBackIos className='mr-2' />Zurück</button>
          </div>
              <div className='  w-3/4 flex flex-row items-center justify-start gap-x-2 mb-2'> 
                  <div 
                  className=' w-28 font-[arial] dark:text-white text-black py-2 text-sm'
                  ><b>{locationData.state!=null&&Array.isArray(locationData.state.Sendername)===false?'Absender:':'Empfänger:'}</b></div>
                  <div 
                  className=' w-full ml-2 font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 font-normal text-gray-800 dark:bg-gray-800 bg-white ring-1 dark:ring-gray-700 ring-gray-400/60   outline-none py-2 px-3 text-sm'
                  ><a>{locationData.state===null?'':locationData.state.Sendername}</a></div>
              </div>  

          </div>
          <div className='w-20 p-5 h-full flex flex-col items-center justify-center'>
              <div className='w-full aspect-square dark:bg-blue-200 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
              <MdPerson className='text-2xl' />
              </div>
          </div>
           </div>
      {/* Search and Filter */}
      
      <div className="h-auto pl-4 w-full mt-0 flex flex-row items-start justify-start mb-1.5">
      <div className='w-2/3 mr-2'>
        <div className='w-full  flex flex-row items-center justify-start '> 
            <div className='  w-full flex flex-row items-center justify-start  '> 
                <div 
                className=' w-28 font-[arial] text-left dark:text-white text-black py-2 text-sm'
                ><b>Betreff:</b></div>
                <div 
                className=' w-full font-[arial] ml-4  dark:text-white font-normal text-gray-800 dark:bg-gray-800 bg-white ring-1 dark:ring-gray-700 ring-gray-400/60   outline-none py-2 pl-3 text-sm'
                ><a>{locationData.state===null?'':locationData.state.Betreff}</a></div>
            </div> 
        </div>     
      </div>
      {
        locationData.state===null?'':
        locationData.state.Wichtig==1?
            <div className='h-full aspect-square cursor-pointer  dark:bg-red-800 bg-red-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded  flex flex-col items-center justify-center ring-1 dark:ring-red-700 ring-red-600'>
              <MdPriorityHigh  title='Als wichtig makiert' className='inline text-xl' />
            </div>
            :''
      } 
      </div>
      <div className="h-auto pl-4 w-full mt-0 flex flex-row items-start justify-start mb-4">
      <div className='w-2/3  '>
      <div className='w-full  flex flex-row items-center justify-start gap-x-2'> 
            <div className='  w-full flex flex-row items-center justify-start '> 
                <div 
                className=' w-28 text-left font-[arial] dark:text-white text-black py-2 text-sm'
                ><b>Datum:</b></div>
                <div 
                className=' w-auto font-[arial] pl-3  dark:text-white  text-gray-800 dark:bg-gray-800 bg-white ring-1 dark:ring-gray-700 ring-gray-400/60   outline-none py-2 px-3 text-sm font-normal'  
                ><a>{locationData.state===null?'':(locationData.state.Datum.split(' ')[0].split('-')[2]+'.'+locationData.state.Datum.split(' ')[0].split('-')[1]+'.'+locationData.state.Datum.split(' ')[0].split('-')[0]+' '+locationData.state.Datum.split(' ')[1].split('.')[0])}</a></div>
            </div> 
        </div> 
      </div>  
      </div>
      {
        attaches.length>0?
          <div className="h-auto w-full mt-0 flex flex-row items-start justify-start  gap-x-2 mb-6">
          <div className='w-auto  '>
            <div className='w-full pl-4 flex flex-row items-center justify-start'> 
                <div className='  w-full flex flex-row items-center justify-start'> 
                    <div 
                    className=' w-auto font-[arial] dark:text-white text-black py-2 text-sm'
                    ><b>Anhänge:</b></div> 
                </div> 
            </div>     
          </div>  
          <div className='w-11/12  '>
            <div className='w-full px-1 flex flex-row items-center justify-start gap-x-2'>
            <div className='text-white mb-0 min-h-auto max-h-20 w-full overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-wrap items-center justify-start  gap-2 ring-1 dark:ring-gray-700/90 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 p-2 bg-white dark:bg-gray-800'>  
            {
              attaches.length>0&&attaches.map((item,index)=>(
                <div onClick={()=>saveFileandOpen(item.ID,item.Pos)} key={item.Name+item.Pos+item.ID} title={item.Name} className='w-60 cursor-pointer flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-800 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
                  <div className='w-auto select-none flex flex-col items-center justify-center'>{returnIconType(item.filetype)}</div>
                  <div className='w-20 max-w-14 select-none flex flex-row items-center justify-start text-[10px] truncate'>{returnSizeValue(item.filesizeuncomp)}</div>
                  <div className='w-full select-none text-sm truncate'>{item.Name}</div>
                  <div className='w-auto  flex flex-col items-center justify-center'><MdDownload className='cursor-pointer' /></div>
                </div>   
              ))
            }  
          </div>
          </div>
          </div>
          </div> 
          :''
      }
      

      {/* Card Grid */}
      <div className='w-full dark:bg-gray-900 bg-white h-full  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start ring-1 dark:ring-gray-800 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 '>
       <textarea disabled value={nachricht} onChange={(e) => setNachricht(e.target.value)} className='w-full h-full p-4 outline-none bg-transparent resize-none text-xl overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200' placeholder='Schreiben Sie eine Nachricht...'> 
       </textarea>
      </div>

      {/* Pagination */}
      <div className="h-auto w-full mt-6 flex justify-center px-4">
         
      </div>

      
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={'closeDialog'}
        >
          <div className="bg-white p-4 rounded-lg">
             
          </div>
        </div>
      )}
      {
        locationData.state!=null&&locationData.state.gelöscht===null&&Array.isArray(locationData.state.Sendername)===false&&locationData.state.Erledigt==1?
          <div className='fixed bottom-20 right-[11.4rem]'>
          <div onClick={(e)=>openDialogMark(e,0)} title='Ungelesen markieren' className='group cursor-pointer  dark:bg-yellow-500 dark:hover:bg-yellow-600 bg-yellow-500 hover:bg-yellow-600 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><MdMarkEmailUnread className='group-hover:size-[124%]' /></div>
        </div>:'' 
      }
      {
        locationData.state!=null&&locationData.state.gelöscht===null&&Array.isArray(locationData.state.Sendername)===false&&locationData.state.Erledigt==0?
          <div className='fixed bottom-20 right-[11.4rem]'>
          <div onClick={(e)=>openDialogMark(e,1)} title='Gelesen markieren' className='group cursor-pointer  dark:bg-violet-600 dark:hover:bg-violet-700 bg-violet-600 hover:bg-violet-700 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><MdMarkEmailRead className='group-hover:size-[124%]' /></div>
        </div>:'' 
      }
      {
        locationData.state!=null&&locationData.state.gelöscht==1?
          <div className='fixed bottom-20 right-[7.7rem]'>
          <div onClick={(e)=>openDialog(e,0)} title='Wiederherstellen' className='group cursor-pointer  dark:bg-gray-600 dark:hover:bg-gray-700 bg-gray-600 hover:bg-gray-700 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><MdMoveToInbox className='group-hover:size-[124%]' /></div>
        </div>:'' 
      }
       {
        locationData.state!=null&&locationData.state.gelöscht===null?
        <div className='fixed bottom-20 right-[7.7rem]'>
        <div onClick={(e)=>openDialog(e,1)} title='Löschen' className='group cursor-pointer  dark:bg-red-600 dark:hover:bg-red-700 bg-red-600 hover:bg-red-700 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><MdDelete className='group-hover:size-[124%]' /></div>
      </div> 
      :''
      }
      {
          locationData.state!=null&&Array.isArray(locationData.state.Sendername)===false?
          <div className='fixed bottom-20 right-16'>
          <Link title='Antworten' to={'/new-message'} state={locationData.state} className='group cursor-pointer  dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><MdReply className='group-hover:size-[124%]' /></Link>
        </div>:''
       }
       <Dialog 
      show={isDialogOpen}
      close={closeDialog}
      title={'Information'}
      message={btyper==1?'Möchten Sie die Nachricht wirklich löschen?':'Möchten Sie die Nachricht wirklich wiederherstellen?'}
      cancelBtn={true}
      actionBtn1={btyper==1?true:false} 
      actionBtn2={btyper==1?false:true} 
      Btn2BgHover={' dark:bg-lime-600 bg-lime-500 dark:hover:bg-lime-700 hover:bg-lime-700 '} 
      Btn1BgHover={' dark:bg-red-600 bg-red-500 dark:hover:bg-red-700 hover:bg-red-700 '} 
      callbackBtn2={BackToInbox} 
      callbackBtn1={DeleteID} 
      />
       <Dialog 
      show={isDialogOpenMark}
      close={closeDialogMark}
      title={'Information'}
      message={btyperMark==1?'Möchten Sie die Nachricht wirklich als gelesen markieren?':'Möchten Sie die Nachricht wirklich als ungelesen markieren?'}
      cancelBtn={true} 
      actionBtn2={btyperMark==1?true:true} 
      Btn2BgHover={' dark:bg-lime-600 bg-lime-500 dark:hover:bg-lime-700 hover:bg-lime-700 '}  
      callbackBtn2={messageMarker}  
      />
    </div>
  );
};

export default ShowMessageTab;