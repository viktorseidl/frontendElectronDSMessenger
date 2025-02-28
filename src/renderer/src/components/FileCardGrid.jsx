import React, { useState } from 'react';
import { FaSearch,FaHtml5, FaCss3Alt ,FaJs, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaFileCsv } from 'react-icons/fa'; 
import { MdArrowBackIos, MdArrowForwardIos, MdClose, MdFilePresent, MdLogout, MdPerson } from 'react-icons/md';
import { util } from 'node-forge'; 
import { Si7Zip, SiJpeg } from "react-icons/si";
import { BsFiletypeJson, BsFiletypeMp3, BsFiletypeMp4, BsFiletypePng, BsFiletypeXml,BsFiletypeTxt } from "react-icons/bs";
import { IoImageSharp } from "react-icons/io5";
import { AiOutlineGif } from "react-icons/ai"; 
import { useFetchAuthAll } from '../services/useFetchAll'; 
import { useNavigate } from 'react-router-dom';
const FileCardGrid = ({ data }) => {
  const navigate=useNavigate()
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost:'localhost'
  // State to manage search term and selected filetype
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
    
  // Function to filter the data based on search term and selected filetype
  const filterData = () => {
    return data.filter(item => {
      const matchesSearchTerm = item.filename!=null&&item.filename.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFileType = (selectedFileType === 'all' || item.filetype === selectedFileType);
      return matchesSearchTerm && matchesFileType;
    });
  };

  // Pagination: Show 5 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 28;

  const handlePageChange = (page) => { 
    if((page==0) || (page>totalPages)){
        return false
    }
    setCurrentPage(page);
  };

  // Get the filtered data
  const filteredData = filterData();

  // Slice the data for the current page
  const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // File type options
  const fileTypes = [
    'all', 
    'image/png', 
    'image/jpeg',    
    'application/pdf', 
    'text/plain',    
    'audio/mpeg', 
    'video/mp4',  
    'text/csv',  
    ];
     
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
    const returnFiletype=(it)=>{ 
      switch(it){
        case "image/jpeg":
          return 'JPEG'
        case "image/png":
          return 'PNG'
        case "image/webp":
          return 'WEBP'
        case "image/gif":
          return 'GIF'
        case "text/plain":
          return 'TXT'
        case "text/html":
          return 'HTML'
        case "text/css":
          return 'CSS'
        case "application/javascript":
          return 'JS'
        case "application/json":
          return 'JSON'
        case "application/xml":
          return 'XML'
        case "application/pkcs10":
          return 'PKCS10'
        case "application/pgp-signature":
          return 'ASC'
        case "application/pics-rules":
          return 'PRF'
        case "application/pkcs7-mime":
          return 'p7c'
        case "audio/mpeg":
          return 'MP3'
        case "video/mp4":
          return 'MP4' 
        case "application/zip":
          return 'ZIP'
        case "application/pdf":
          return 'PDF'
        case "application/msword":
          return 'Word'
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          return 'Word'
        case "application/vnd.ms-powerpoint":
          return 'Powerpoint'
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          return 'Powerpoint'
        case "application/vnd.ms-excel":
          return 'Excel'
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return 'Excel'
        case "text/csv":
          return 'CSV'
        default:
          return 'Octet-Stream'
      }
    }
    const saveFileandOpen=async (id,idindex)=>{
      const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
          const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=getFileToSaveOnIdAndIndex&a="+util.encode64(id+'.'+idindex),'ssdsdsd',"GET", null, null);
          if(query.length>0){ 
            const a = await window.api.electronFiles.saveFile(query[0].Mail,query[0].Name)  
          }
    } 

  // Close image dialog when clicked outside
  const closeDialog = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
    }
  };  
  return (
    <div className=" flex-grow max-h-full overflow-auto flex flex-col items-start justify-start w-full py-4">
<div className=' w-full h-20 flex flex-row items-center justify-end -mt-2'>
          <div className='w-full px-4 '>
              <label className='  w-full flex flex-col items-center justify-center relative'> 
                  <input 
                  className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-3 pl-14 text-sm'
                  placeholder="Suche in Dateinamen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
                  <MdClose onClick={()=>setSearchTerm("")} className={'absolute cursor-pointer inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400'} style={{display:searchTerm.length>0?'block':'none'}} />
              </label>
          </div>
          <div className='w-20 relative group p-5 h-full flex flex-col items-center justify-center'>
            <div  style={{animation:'fadeIn 0.1s ease-in forwards'}} className='absolute w-40 inset right-3 group-hover:block dark:hover:bg-gray-800 hover:bg-gray-200 shadow-lg ring-1 dark:ring-gray-700 ring-gray-300 hidden text-2xl top-10 rounded dark:bg-gray-900 bg-white  '>
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
      <div className="w-full h-auto mb-4 flex md:flex-row sm:flex-col flex-col justify-between items-center md:gap-y-0 sm:gap-y-3 gap-y-3 px-4 ">
         
        <label className='md:w-auto sm:w-full w-full flex flex-col items-center justify-center relative'>
        <select
          className="md:w-auto sm:w-full w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-3  text-sm"
          value={selectedFileType}
          onChange={(e) => setSelectedFileType(e.target.value)}
        >
          {fileTypes.map((type) => (
            <option key={type} value={type}>
              {type === 'all' ? 'Alle Dateiformate' : type}
            </option>
          ))}
        </select>
        </label>
      </div>

      {/*Pagination*/}
      <div className="w-full mb-6 flex justify-center px-4 ">
        <div className='w-full flex flex-row items-center justify-between'>
            <div  onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}  className='w-6 aspect-square pl-2 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
            <MdArrowBackIos />
            </div> 
            <span className='w-auto flex flex-row gap-x-2'>
            {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`w-6 flex flex-col items-center justify-center aspect-square  ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          >
            {index + 1}
          </button>
        ))}
        </span>
            <div onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
            <MdArrowForwardIos />
            </div> 
        </div>  
      </div>

      {/* Card Grid */}
      <div className='w-full dark:bg-gray-900 bg-white h-full  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start ring-1 dark:ring-gray-800 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 p-4'>
      <div className="w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">

        
        {displayedData.map((item) => (
          <div key={item.anhangId+item.fileindex} className="dark:bg-gray-900 bg-gray-300/30 rounded-lg dark:shadow-blue-600/30 shadow-lg shadow-black/20 p-4 dark:ring-1 ring-1 dark:ring-gray-700 ring-gray-300"> 
             
              <div onClick={() => saveFileandOpen(item.anhangId,item.fileindex)} className="w-full aspect-square dark:bg-gray-800 bg-gray-300 flex items-center justify-center dark:text-gray-300 text-gray-500 text-2xl rounded-t-lg">
                <span>{returnIconType(item.filetype)}</span>
              </div> 

            {/* File Info */}
          <div className="mt-4 text-center">
            <h3 className="font-semibold text-lg first-letter:uppercase truncate">{item.filename}</h3> 
                <p className="text-sm truncate"><a className=' dark:text-orange-400/90 text-blue-700 font-semibold uppercase'>{returnFiletype(item.filetype)}</a></p>
            </div>
          </div>
        ))} 
      </div>
      </div>

      {/* Pagination */}
      <div className="h-auto w-full mt-6 flex justify-center px-4">
        <div className='w-full flex flex-row items-center justify-between'>
            <div  onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}  className='w-6 aspect-square pl-2 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
            <MdArrowBackIos />
            </div> 
            <span className='w-auto flex flex-row gap-x-2'>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-6 flex flex-col items-center justify-center aspect-square  ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
              >
                {index + 1}
              </button>
            ))}
            </span>
            <div onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
            <MdArrowForwardIos />
            </div> 
        </div>  
      </div>

      {/* Image Modal Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeDialog}
        >
          <div className="bg-white p-4 rounded-lg">
            <img
              src={currentImage} // Display the full-size image
              alt="Full-size view"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileCardGrid;