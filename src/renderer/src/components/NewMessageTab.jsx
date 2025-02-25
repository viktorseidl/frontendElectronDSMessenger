import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaHtml5, FaCss3Alt ,FaJs, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaFileCsv } from 'react-icons/fa'; 
import { MdAttachFile, MdClose, MdFilePresent, MdGroups2, MdGroups3, MdLogout, MdNote, MdPerson, MdPriorityHigh } from 'react-icons/md';
import { util } from 'node-forge'; 
import { Si7Zip, SiJpeg } from "react-icons/si";
import { BsFiletypeJson, BsFiletypeMp3, BsFiletypeMp4, BsFiletypePng, BsFiletypeXml,BsFiletypeTxt, BsFillSendFill } from "react-icons/bs";
import { IoImageSharp  } from "react-icons/io5";
import { AiOutlineGif } from "react-icons/ai";  
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import { de } from 'date-fns/locale/de';
import DialogGroupUserSelect from './DialogGroupUserSelect';
import Dialog from './Dialog';
import DialogLoader from './DialogLoader';
import DecText from '../utils/DecText';
registerLocale('de-DE', de) 
const NewMessageTab = () => { 
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(DecText(localStorage.getItem('dbConfig'))).value)).localhost:''
  const Usender=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const locationData=useLocation(); 
  const [files, setFiles] = useState([]);
  const navigate = useNavigate(); // For managing user back to source onClick={() => navigate(-1)}>Go Back
  const [versandterminierung, setversandterminierung] = useState(new Date());
  const [priority, setpriority] = useState(0);
  const [addressant, setaddressant] = useState([]);
  const [betreff, setbetreff] = useState('');
  const [nachricht, setNachricht] = useState('');    
  const [sendstatus, setsendstatus] = useState(null); 
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [isDialogOpenToBigFiles, setIsDialogOpenToBigFiles] = useState(false);  
  const [isDialogOpenSending, setIsDialogOpenSending] = useState(false);  
  const fileInputRef = useRef(null);

const handleButtonClick = () => {
  // Trigger a click event on the hidden file input
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
}; 
const formattedAddresses = useMemo(() => {
  return addressant.map(addr => addr); // Example transformation
}, [addressant]);
const getTotalFileSize = (files) => {
return files.reduce((total, file) => total + file.size, 0);
};
const handleFileChange = (event) => { 
  let uploadedCount = 0;
  const fils = Array.from(event.target.files); 
    let filescount=getTotalFileSize(files)
    console.log(filescount)
    fils.forEach((file) => { 
    if(!files.some(item=>item.name===file.name)){ 
      filescount=filescount+file.size
      if(filescount>10000000){
        setIsDialogOpenToBigFiles(true)
      }else{
        setFiles((previousItem)=>previousItem.some(item=>item.name===file.name)?previousItem:[...previousItem,file])
      }
    }      
  });    
}; 
const handleSend = async ()=>{
  const Users=addressant.length>0?addressant:null;
  const Betreffs=betreff.trim().length>1?betreff.trim():null;
  const Prio=priority
  const Datum=Math.floor(versandterminierung.getTime() / 1000)+3600;
  const Dateien=files
  const Message=nachricht
  console.log('workssending')
  if(Users&&(Betreffs)&&(Message)){
    setIsDialogOpenSending(true)
    const formData = new FormData();
    if(Dateien.length>0){
      Dateien.forEach((d) => {
        formData.append("file[]", d);
      });
    } 
    Users.forEach((u) => {
      formData.append("empfanger[]", u); 
    });
    formData.append("sender", Usender.Name); 
    formData.append("prio", Prio); 
    formData.append("date", Datum);
    formData.append("betr", Betreffs);
    formData.append("mess", Message);
    const data=await fetch("http://"+apache+"/electronbackend/UploadSender.php", {
      method: "POST",
      body: formData,
    });
    const d=await data.json() 
    if(d==true){
      //show success
      setsendstatus(true)
      setTimeout(()=>{
        setIsDialogOpenSending(false)
        navigate(-1)
      },2000)
    }else{
      //show error
    }
  } 
}
const removeFile = (itemToRemove) => {
  setFiles((prevItems) => prevItems.filter(item => item.name !== itemToRemove));
}; 

const removeItem = (itemToRemove) => {
  setaddressant((prevItems) => prevItems.filter(item => item !== itemToRemove));
};

const addItem = (newItem) => { 
  setaddressant((prevItems) => 
    prevItems.some(item => item === newItem) ? prevItems : [...prevItems, newItem]
);
};
   
const returnSizeValue=(size)=>{ 
  if(size>50000){
    return (Number(size/1000000).toFixed(2)+'MB')
  }else if(size>900){
    return (Number(size/1000).toFixed(2)+'KB')
  }else{
    return (Number(size).toFixed(0)+'Byte')
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
      return <BsFiletypeMp3 />
    case "video/mp4":
      return <BsFiletypeMp4 /> 
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
// Close image dialog when clicked outside
const closeDialogSending = (e) => {
  if (e.target === e.currentTarget) {
    setIsDialogOpenSending(false);
  }
};  
const closeDialogToBigFiles = (e) => {
  if (e.target === e.currentTarget) {
    setIsDialogOpenToBigFiles(false);
  }
};  
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
      console.log('isstate')
      setaddressant([locationData.state.Sender.trim().toString()])
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
                  <div 
                  className=' w-full font-[arial] max-h-16 overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200  dark:text-gray-400/80 text-gray-500  bg-[#edeae9]  dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded dark:bg-transparent ring-1 dark:ring-gray-700 ring-gray-400  flex-wrap  flex flex-row items-start justify-start outline-none gap-1 py-2 pr-8 pl-14 text-sm' 
                  >{formattedAddresses.length>0?
                    formattedAddresses.map((item,index)=>(
                    <div key={item+index+'addresser'} className='dark:bg-lime-700 dark:hover:bg-lime-600 ring-1 dark:ring-gray-800 ring-gray-400 bg-blue-200 rounded px-2 py-1 w-auto dark:text-white text-black shadow-lg shadow-[rgba(0,0,0,0.12)] flex flex-row items-center justify-start '><a>{item}</a><MdClose onClick={()=>removeItem(item)} className='ml-2 cursor-pointer' /></div>
                  ))
                  :
                  'Empfänger hinzufügen'}  
                  </div>
                  <MdGroups2 className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
                  <MdClose onClick={()=>setaddressant([])} className={'absolute cursor-pointer inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400'} style={{display:formattedAddresses.length>0?'block':'none'}} />
              </label>
              <div className='w-auto h-full flex flex-row items-center justify-start '>
              <button onClick={()=>setIsDialogOpen(true)} title='Empfänger auswählen' className='py-2 rounded outline-none ring-1 dark:ring-gray-700 ring-gray-700/30 px-2 flex flex-col items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-white text-gray-800'><MdGroups3 className='inline' /></button>
              </div>
          </div>
          <div className='w-20 relative group p-5 h-full flex flex-col items-center justify-center'>
            <div  style={{animation:'fadeIn 0.1s ease-in forwards',}} className='absolute w-40 inset right-3 group-hover:block dark:hover:bg-gray-800 hover:bg-gray-200 shadow-lg ring-1 dark:ring-gray-700 ring-gray-300 hidden text-2xl top-10 rounded dark:bg-gray-900 bg-white  '>
              <div onClick={()=>{window.sessionStorage.clear();navigate('/overview')}} className="w-full cursor-pointer px-2 flex flex-row items-center justify-center text-sm dark:text-gray-200 text-gray-800 py-2">
                Abmelden <MdLogout className="inline ml-4"   />
              </div>
              </div>
              <style>
                {`
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                    }
                    to {
                      opacity: 1;
                    }
                  }
                  .fade-in-animation {
                    animation: fadeIn 1s ease-in-out;
                  }
                `}
              </style>
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
                  className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400    py-2 px-3 pl-14 text-sm'
                  placeholder="Betreff hinzufügen"
                  value={betreff}
                  onChange={(e) => setbetreff(e.target.value)}
                  />
                  <MdNote className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
                  <MdClose onClick={()=>setbetreff("")} className={'absolute cursor-pointer inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400'} style={{display:betreff.length>0?'block':'none'}} />
              </label>
          </div>
      <div className='w-auto px-4 flex flex-row items-start justify-start gap-x-4 '>
        {
          priority==0?
          <button onClick={()=>setpriority(1)} title='Als wichtig kennzeichnen' className='py-2 rounded outline-none ring-1 dark:ring-gray-700 ring-gray-700/30 px-2 flex flex-col items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-white text-gray-800'><MdPriorityHigh className='inline' /></button>
          :
          <button onClick={()=>setpriority(0)} title='Kennzeichnung aufheben' className='py-2 rounded outline-none ring-1 dark:ring-red-700 ring-red-700 px-2 flex flex-col items-center justify-center dark:bg-red-800 dark:hover:bg-red-700 bg-red-700 hover:bg-red-600 dark:text-white text-white'><MdPriorityHigh className='inline' /></button>
        }
        <button onClick={handleButtonClick} title='Dateien hinzufügen' className='py-2 rounded outline-none ring-1 dark:ring-gray-700 ring-gray-700/30 px-2 flex flex-col items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-white text-gray-800'><MdAttachFile className='inline' /></button>
        <DatePicker 
                placeholderText="TT.MM.YYYY"
                locale={de}
                timeIntervals={10}
                timeFormat='HH:mm'
                title='Terminierung'
                timeCaption="Zeit"
                closeOnScroll={true}
                dateFormat={'Pp'}
                showTimeSelect
                className=" w-5/6 ml-2 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                selected={versandterminierung} 
                onChange={(date) => setversandterminierung(date)} /> 
      </div>
      </div> 
      {
        files.length>0?
      <div className='text-white mb-4 min-h-14 max-h-32 w-full overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-wrap items-center justify-start  gap-2 ring-1 dark:ring-gray-800 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 p-2'>  
      {
        files.map((item,index)=>(
        <div key={item.name+index} className='w-60 flex flex-col items-start justify-start dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 ring-1 dark:ring-blue-800 ring-gray-500/40 rounded p-2 dark:text-white text-black'> 
        <div className='w-full flex flex-row items-center justify-start gap-x-4 '>
          <div className='w-auto select-none flex flex-col items-center justify-center'>{returnIconType(item.type)}</div>
          <div className='w-24 select-none flex flex-row items-center justify-start text-xs truncate  text-[10px]'>{returnSizeValue(item.size)}</div>
          <div className='w-full select-none text-sm truncate'>{item.name}</div>
          <div onClick={()=>removeFile(item.name)} className='w-auto  flex flex-col items-center justify-center'><MdClose className='cursor-pointer' /></div>
        </div>  
        </div>
        ))
      }
      </div>
      :
      ''
      }

      {/* Card Grid */}
      <div className='w-full dark:bg-gray-900 bg-white h-full  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start ring-1 dark:ring-gray-700 ring-gray-400 shadow-inner shadow-[rgba(0,0,0,0.3)]  '>
       <textarea value={nachricht} onChange={(e) => setNachricht(e.target.value)} className='w-full h-full p-4 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white  placeholder:text-gray-500  text-gray-800 dark:bg-transparent outline-none shadow-gray-700/25    resize-none text-xl overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200' placeholder='Schreiben Sie eine Nachricht...'>

       </textarea>
      </div>
 
      <DialogLoader 
      show={isDialogOpenSending}
      close={closeDialogSending}
      title={'Information'}
      message={sendstatus}
      cancelBtn={false}    
      />
      <Dialog 
      show={isDialogOpenToBigFiles}
      close={closeDialogToBigFiles}
      title={'Information'}
      message={'Jede Nachricht kann nur Anhänge mit einer maximalen Größe von 10 MB versendet werden. Daher werden nur die ausgewählten Dateien berücksichtigt.'}
      cancelBtn={true}    
      />
      <DialogGroupUserSelect 
      show={isDialogOpen}
      close={closeDialog}
      title={'Empfänger'}
      message={null}
      cancelBtn={true}   
      SelectedUsers={addressant} 
      addUser={addItem} 
      deleteUser={removeItem}
      />
      {
        betreff.trim().length>0&&nachricht.trim().length>0&&addressant.length>0?
      <div className='fixed bottom-20 right-16'>
      <div onClick={()=>handleSend()} title='Nachricht senden' className='group cursor-pointer  dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 hoverbtnsendbtn p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-3xl'><BsFillSendFill className='group-hover:size-[124%]' /></div>
    </div>:''
      }
    </div>
  );
};

export default NewMessageTab;