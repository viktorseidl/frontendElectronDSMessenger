import React, { useEffect, useRef, useState } from 'react';
import { FaSearch,FaHtml5, FaCss3Alt ,FaJs, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaFileCsv, FaImage, FaFileAudio, FaAudible } from 'react-icons/fa';
import pako from 'pako';
import { Md3Mp, MdArrowBackIos, MdArrowForwardIos, MdAttachFile, MdAttachment, MdCamera, MdClose, MdFilePresent, MdGroups2, MdGroups3, MdMovie, MdNote, MdPerson, MdSend, MdTimer, MdVideoFile } from 'react-icons/md';
import { util } from 'node-forge'; 
import { Si7Zip, SiJpeg } from "react-icons/si";
import { BsFiletypeJson, BsFiletypeMp3, BsFiletypeMp4, BsFiletypePng, BsFiletypeXml,BsFiletypeTxt, BsFillSendFill } from "react-icons/bs";
import { IoImageSharp, IoVolumeHighOutline } from "react-icons/io5";
import { AiOutlineGif } from "react-icons/ai"; 
import { FaPerson } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const NewMessageTab = () => {
  const locationData=useLocation(); 
  const navigate = useNavigate(); // For managing user back to source onClick={() => navigate(-1)}>Go Back
  const [addressant, setaddressant] = useState('');
  const [betreff, setbetreff] = useState('');
  const [nachricht, setNachricht] = useState('');  
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    // Trigger a click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }; 
  const handleFileChange = (event) => {
    // Get the selected files
    const files = Array.from(event.target.files);
    console.log('Selected files:', files);
    files.forEach((file) => {
      console.log('File:', file.name);
    });
  }; 
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

  // Close image dialog when clicked outside
  const closeDialog = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
    }
  };  
  //USED TO PASS DATA BY ROUTER ON ANSWER MESSAGE FOR EXAMPLE
  useEffect(()=>{
    if(locationData.state===null){
      console.log(locationData.state)
      //setaddressant(locationData.state.Sendername)
    }else{    
      console.log(locationData.state)
      setaddressant(locationData.state.Sender)
      setbetreff("RE: "+locationData.state.Betreff)
      setNachricht("\n\n---------------------------------------------------------------------------------------------------------------------------\nDatum: "+(locationData.state.Datum.split(' ')[0].split('-')[2]+'.'+locationData.state.Datum.split(' ')[0].split('-')[1]+'.'+locationData.state.Datum.split(' ')[0].split('-')[0]+' '+locationData.state.Datum.split(' ')[1].split('.')[0])+"\nAbsender: "+locationData.state.Sender+"\nBetreff: "+locationData.state.Betreff+"\nNachricht: \n\n"+locationData.state.Nachricht)
    }
  },[]) 
  return (
    <div className=" flex-grow max-h-full overflow-auto flex flex-col items-start justify-start w-full py-4">
<div className=' w-full h-20 flex flex-row items-center justify-end -mt-2'>
          <form id='files' className='invisible' encType='multipart/formData'>
          <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the input
        onChange={handleFileChange} // Handle file selection
      />
          </form>
          <div className='w-full px-4 flex flex-row items-center justify-start gap-x-4'>
              
              <label className='  w-3/4 flex flex-col items-center justify-center relative'> 
                  <input 
                  className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90   outline-none py-2 px-3 pl-14 text-sm'
                  placeholder="Empfänger hinzufügen"
                  value={addressant}
                  onChange={(e) => setaddressant(e.target.value)}
                  />
                  <MdGroups2 className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
                  <MdClose onClick={()=>setaddressant("")} className={'absolute cursor-pointer inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400'} style={{display:addressant.length>0?'block':'none'}} />
              </label>
              <div className='w-auto h-full flex flex-row items-center justify-start '>
              <button title='Gruppe auswählen als Empfänger' className='py-2 rounded outline-none ring-1 dark:ring-gray-700 ring-gray-700/30 px-2 flex flex-col items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-white text-gray-800'><MdGroups3 className='inline' /></button>
              </div>
          </div>
          <div className='w-20 p-5 h-full flex flex-col items-center justify-center'>
              <div className='w-full aspect-square dark:bg-blue-200 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
              <MdPerson className='text-2xl' />
              </div>
          </div>
           </div>
      {/* Search and Filter */}
      
      <div className="h-auto w-full mt-0 flex flex-row items-start justify-start mb-6">
      <div className='w-2/3 px-4 '>
              <label className='  w-full flex flex-col items-center justify-center relative'> 
                  <input 
                  className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90   outline-none py-2 px-3 pl-14 text-sm'
                  placeholder="Betreff hinzufügen"
                  value={betreff}
                  onChange={(e) => setbetreff(e.target.value)}
                  />
                  <MdNote className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
                  <MdClose onClick={()=>setbetreff("")} className={'absolute cursor-pointer inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400'} style={{display:betreff.length>0?'block':'none'}} />
              </label>
          </div>
      <div className='w-auto px-4 flex flex-row items-start justify-start gap-x-4 '>
        <button onClick={handleButtonClick} title='Dateien hinzufügen' className='py-2 rounded outline-none ring-1 dark:ring-gray-700 ring-gray-700/30 px-2 flex flex-col items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-white text-gray-800'><MdAttachFile className='inline' /></button>
        <button title='Zustellung terminieren' className='py-2 rounded outline-none ring-1 dark:ring-gray-700 ring-gray-700/30 px-2 flex flex-col items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-white text-gray-800'><MdTimer className='inline' /></button>
      </div>
      </div>
      <div className='text-white mb-4 h-20 w-full overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-wrap items-center justify-start  gap-2 ring-1 dark:ring-gray-800 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 p-2'>   
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
                <div className='w-60 flex flex-row items-center justify-start gap-x-4 dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'>
                  <div className='w-auto select-none flex flex-col items-center justify-center'><FaFilePdf /></div>
                  <div className='w-auto max-w-14 select-none flex flex-row items-center justify-start text-xs truncate'>1410,5 kb</div>
                  <div className='w-full select-none text-sm truncate'>sjdhsjkhdjkshdjsdjhsjkdhsjkkjd</div>
                  <div className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
                </div>   
  
 
      </div>

      {/* Card Grid */}
      <div className='w-full dark:bg-gray-900 bg-white h-full  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start ring-1 dark:ring-gray-800 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 '>
       <textarea value={nachricht} onChange={(e) => setNachricht(e.target.value)} className='w-full h-full p-4 bg-transparent outline-none resize-none text-xl' placeholder='Schreiben Sie eine Nachricht...'>

       </textarea>
      </div>

      {/* Pagination */}
      <div className="h-auto w-full mt-6 flex justify-center px-4">
         
      </div>

      {/* Image Modal Dialog */}
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
        nachricht.trim().length>0?
      <div className='fixed bottom-20 right-16'>
      <Link to={'/new-message'} title='Nachricht senden' className='group cursor-pointer  dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><BsFillSendFill className='group-hover:size-[124%]' /></Link>
    </div>:''
      }
    </div>
  );
};

export default NewMessageTab;