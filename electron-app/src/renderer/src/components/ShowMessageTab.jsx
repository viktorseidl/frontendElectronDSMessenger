import React, { useRef, useState } from 'react';
import { FaSearch,FaHtml5, FaCss3Alt ,FaJs, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaFileCsv, FaImage, FaFileAudio, FaAudible } from 'react-icons/fa';
import pako from 'pako';
import { Md3Mp, MdArrowBackIos, MdArrowForwardIos, MdAttachFile, MdAttachment, MdBackspace, MdCamera, MdClose, MdDelete, MdFilePresent, MdGroups2, MdGroups3, MdMarkEmailRead, MdMoveToInbox, MdMovie, MdNote, MdPerson, MdPriorityHigh, MdReply, MdReplyAll, MdSend, MdTimer, MdVideoFile } from 'react-icons/md';
import { util } from 'node-forge'; 
import { Si7Zip, SiJpeg } from "react-icons/si";
import { BsFiletypeJson, BsFiletypeMp3, BsFiletypeMp4, BsFiletypePng, BsFiletypeXml,BsFiletypeTxt, BsFillSendFill } from "react-icons/bs";
import { IoImageSharp, IoVolumeHighOutline } from "react-icons/io5";
import { AiOutlineGif } from "react-icons/ai"; 
import { FaPerson } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dialog from './Dialog';
import { useFetchAuthAll } from '../services/useFetchAll';
const ShowMessageTab = () => {
  const locationData=useLocation(); 
  const navigate = useNavigate(); // For managing user back to source onClick={() => navigate(-1)}>Go Back
  const [addressant, setaddressant] = useState('');
  const [btyper, setbtyper] = useState('');
  const [betreff, setbetreff] = useState('');
  const [nachricht, setNachricht] = useState(locationData.state===null?'':locationData.state.Nachricht);  
  const [isDialogOpen, setIsDialogOpen] = useState(false);  
    const returnIconType=(it)=>{ 
      switch(it){
        case "image/jpeg":
          return <SiJpeg className='text-7xl' />
        case "image/png":
          return <BsFiletypePng className='text-7xl' />
          case "image/webp":
            return <IoImageSharp className='text-7xl' />
        case "image/gif":
          return <AiOutlineGif className='text-7xl' /> 
        case "text/plain":
          return <BsFiletypeTxt  className='text-7xl' /> 
        case "text/html":
          return <FaHtml5  className='text-7xl' /> 
        case "text/css": 
          return <FaCss3Alt  className='text-7xl' />
        case "application/javascript":
          return <FaJs  className='text-7xl'  />
        case "application/json":
          return <BsFiletypeJson  className='text-7xl' />
        case "application/xml":
          return <BsFiletypeXml  className='text-7xl' />
        case "application/pkcs10":
          return <MdFilePresent className='text-7xl' />
        case "application/pgp-signature":
          return <MdFilePresent className='text-7xl' />
        case "application/pics-rules":
          return <MdFilePresent className='text-7xl' />
        case "application/pkcs7-mime":
          return <MdFilePresent className='text-7xl' />
        case "audio/mpeg":
          return <BsFiletypeMp3 className='text-7xl' />
        case "video/mp4":
          return <BsFiletypeMp4 className='text-7xl' /> 
        case "application/zip":
          return <Si7Zip className='text-7xl' />
        case "application/pdf":
          return <FaFilePdf className='text-7xl' />
        case "application/msword":
          return <FaFileWord className='text-7xl' />
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          return <FaFileWord className='text-7xl' />
        case "application/vnd.ms-powerpoint":
          return <FaFilePowerpoint className='text-7xl' />
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          return <FaFilePowerpoint className='text-7xl' />
        case "application/vnd.ms-excel":
          return <FaFileExcel className='text-7xl' />
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return <FaFileExcel className='text-7xl' />
        case "text/csv":
          return <FaFileCsv className='text-7xl' />
        default:
          return <MdFilePresent className='text-7xl' />
      }
    } 
  const BackToInbox=async(e)=>{ 
        closeDialog(e)
        const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
        const query=await useFetchAuthAll("http://localhost/electronbackend/index.php?path=movetoInbox&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"PUT", {mid:locationData.state.ID}, null);
        if(query==true){
          navigate(-1)
        }          
  }
  const DeleteID=async(e)=>{ 
      closeDialog(e) 
      const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
      const query=await useFetchAuthAll("http://localhost/electronbackend/index.php?path=DeleteMessageOnID&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"DELETE", {mid:locationData.state.ID}, null);
      if(query==true){
        navigate(-1)
      } 
    }
  const  openDialog=(e,b)=>{
    setIsDialogOpen(true)
    setbtyper(b)
  }
  // Close image dialog when clicked outside
  const closeDialog = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
    }
  };  
  //USED TO PASS DATA BY ROUTER ON ANSWER MESSAGE FOR EXAMPLE
  if(locationData.state===null){
    navigate(-1)
  }
  return (
    <div className=" flex-grow max-h-full overflow-auto flex flex-col items-start justify-start w-full py-4">
<div className=' w-full h-auto flex flex-row items-center justify-end -mt-2 -mb-[2px]'> 
          <div className='w-full px-4 flex flex-col items-start justify-start gap-x-4'>
          <div className='  w-3/4 flex flex-row items-center justify-start gap-x-2 mb-2'>
          <button onClick={() => navigate(-1)} className='flex flex-row items-center justify-center ring-1 dark:ring-gray-800 ring-gray-800/20 px-2 py-0.5 rounded-sm dark:bg-slate-900 bg-gray-200 dark:text-blue-400 text-gray-600 shadow-inner dark:hover:bg-blue-500/30 hover:bg-black/10'><MdArrowBackIos className='mr-2' />Zurück</button>
          </div>
              <div className='  w-3/4 flex flex-row items-center justify-start gap-x-2 mb-2'> 
                  <div 
                  className=' w-auto font-[arial] dark:text-white text-black py-2 text-sm'
                  ><b>{locationData.state!=null&&Array.isArray(locationData.state.Sendername)===false?'Absender:':'Empfänger:'}</b></div>
                  <div 
                  className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-800 bg-white ring-1 dark:ring-gray-700 ring-gray-400/60   outline-none py-2 px-3 pl-4 text-sm'
                  ><b>{locationData.state===null?'':locationData.state.Sendername}</b></div>
              </div>  
          </div>
          <div className='w-20 p-5 h-full flex flex-col items-center justify-center'>
              <div className='w-full aspect-square dark:bg-blue-200 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
              <MdPerson className='text-2xl' />
              </div>
          </div>
           </div>
      {/* Search and Filter */}
      
      <div className="h-auto w-full mt-0 flex flex-row items-start justify-start mb-1.5">
      <div className='w-2/3 pl-4 '>
        <div className='w-full px-4 flex flex-row items-center justify-start gap-x-2'> 
            <div className='  w-full flex flex-row items-center justify-start gap-x-2'> 
                <div 
                className=' w-auto font-[arial] dark:text-white text-black py-2 text-sm'
                ><b>Betreff:</b></div>
                <div 
                className=' w-full font-[arial] ml-1  dark:text-white rounded text-gray-800 dark:bg-gray-800 bg-white ring-1 dark:ring-gray-700 ring-gray-400/60   outline-none py-2 px-3 text-sm'
                ><b>{locationData.state===null?'':locationData.state.Betreff}</b></div>
            </div> 
        </div>     
      </div> 
      <div className='h-full aspect-square cursor-pointer  dark:bg-red-800 bg-red-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded  flex flex-col items-center justify-center ring-1 dark:ring-red-700 ring-red-600'>
                      <MdPriorityHigh  title='Als wichtig makiert' className='inline text-xl' />
                      </div>
      </div>
      <div className="h-auto w-full mt-0 flex flex-row items-start justify-start mb-4">
      <div className='w-2/3 pl-5 '>
      <div className='w-full px-4 flex flex-row items-center justify-start gap-x-2'> 
            <div className='  w-full flex flex-row items-center justify-start gap-x-2'> 
                <div 
                className=' w-auto font-[arial] dark:text-white text-black py-2 text-sm'
                ><b>Datum:</b></div>
                <div 
                className=' w-auto font-[arial] ml-1  dark:text-white rounded text-gray-800 dark:bg-gray-800 bg-white ring-1 dark:ring-gray-700 ring-gray-400/60   outline-none py-2 px-3 text-sm'
                ><b>{locationData.state===null?'':(locationData.state.Datum.split(' ')[0].split('-')[2]+'.'+locationData.state.Datum.split(' ')[0].split('-')[1]+'.'+locationData.state.Datum.split(' ')[0].split('-')[0]+' '+locationData.state.Datum.split(' ')[1].split('.')[0])}</b></div>
            </div> 
        </div> 
      </div>  
      </div>
      <div className="h-auto hidden w-full mt-0 flex flex-row items-start justify-start  gap-x-2 mb-6">
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
        <div className='text-white mb-0 h-20 w-full overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-wrap items-center justify-start  gap-2 ring-1 dark:ring-gray-700/90 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 p-2 bg-white dark:bg-gray-800'>   
        
        <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
          <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
          <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
          <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
          <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>   
        <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
          <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
          <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
          <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
          <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>   
        <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
          <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
          <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
          <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
          <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>   
        <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
          <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
          <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
          <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
          <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>   
        <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
          <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
          <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
          <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
          <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>   
        <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
          <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
          <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
          <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
          <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>   
        <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
          <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
          <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
          <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
          <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>   
        <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
          <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
          <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
          <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
          <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>   
 
      </div>
      </div>
      </div>
      </div>
      

      {/* Card Grid */}
      <div className='w-full dark:bg-gray-900 bg-white h-full  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start ring-1 dark:ring-gray-800 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 '>
       <textarea disabled value={nachricht+"\n\nsjsdsdhs\n\njsdhsdjdhsjk\n\nsjsdsdhs\n\njsdhsdjdhsjk\n\nsjsdsdhs\n\njsdhsdjdhsjk\n\nsjsdsdhs\n\njsdhsdjdhsjk\n\nsjsdsdhs\n\njsdhsdjdhsjk\n\nsjsdsdhs\n\njsdhsdjdhsjk"} onChange={(e) => setNachricht(e.target.value)} className='w-full h-full p-4 outline-none bg-transparent resize-none text-xl overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200' placeholder='Schreiben Sie eine Nachricht...'> 
       </textarea>
      </div>

      {/* Pagination */}
      <div className="h-auto w-full mt-6 flex justify-center px-4">
         
      </div>

      {/* Image Modal Dialog */console.log(locationData.state)}
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
    </div>
  );
};

export default ShowMessageTab;