import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import pako from 'pako';
import { MdArrowBackIos, MdArrowForwardIos, MdAttachment, MdClose, MdFilePresent } from 'react-icons/md';

const FileCardGrid = ({ data }) => {
  // State to manage search term and selected filetype
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
    
  // Function to filter the data based on search term and selected filetype
  const filterData = () => {
    return data.filter(item => {
      const matchesSearchTerm = item.filename.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFileType = selectedFileType === 'all' || item.filetype === selectedFileType;
      return matchesSearchTerm && matchesFileType;
    });
  };

  // Pagination: Show 5 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    'image/gif', 
    'image/webp', 
    'application/pdf', 
    'text/plain', 
    'text/html', 
    'application/json', 
    'application/zip', 
    'audio/mpeg', 
    'video/mp4', 
    'application/msword', 
    'application/vnd.ms-powerpoint', 
    'application/vnd.ms-excel', 
    'text/csv', 
    'application/xml', 
    'application/octet-stream', 
    'application/x-7z-compressed'
    ];
    const decompressBase64Image = (base64Data,filetype) => {
        try {
            // Decode the base64 string into a byte array
            const gZipBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

            // Slice to remove gzip header (first 4 bytes)
            const compressedData = gZipBuffer.slice(4);

            // Decompress the data using pako
            const decompressedData = pako.inflate(compressedData);

            // Convert decompressed data to base64 for the img src
            return `data:`+filetype+`;base64,${btoa(String.fromCharCode(...decompressedData))}`;
        } catch (error) {
            console.error("Error decompressing image: ", error);
            return ''; // Return empty string if there's an error
        }
    };
    const returnSizing=(size)=>{
        if(size>999){
            return Number(size/1000).toFixed(2)+' Kb'
        }else if(size>999999){
            return Number(size/1000000).toFixed(2)+' Mb'
        }else if(size>999999999){
            return Number(size/1000000000).toFixed(2)+' Gb'
        }else{
            return Number(size).toFixed(2)+' Bytes'
        }
    }
  // Open image dialog
  const openImageDialog = (basefile, filetype) => {
    // Check if the filetype is PDF
    if (filetype === 'application/pdf') {
      // If it's a PDF, open it in a new browser tab
      const pdfData = decompressBase64Image(basefile,filetype); // Get the decompressed base64 string
      const pdfWindow = window.open();
      pdfWindow.document.write(`<iframe src="${pdfData}" width="100%" height="100%" frameborder="0"></iframe>`);
    } else if(filetype.split('/')[0] === 'image') {
      // If it's not a PDF, show the image in the dialog
      const decompImg = decompressBase64Image(basefile,filetype);
      setCurrentImage(decompImg);
      setIsDialogOpen(true);
    }else{

    }
  };

  // Close image dialog when clicked outside
  const closeDialog = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className=" flex-grow max-h-full overflow-auto flex flex-col items-start justify-start w-full py-4">

      {/* Search and Filter */}
      <div className="w-full h-auto mb-4 flex md:flex-row sm:flex-col flex-col justify-between items-center md:gap-y-0 sm:gap-y-3 gap-y-3 px-4 ">
        <label className='md:w-1/3 sm:w-full w-full flex flex-col items-center justify-center relative'>
        <a className='mb-2 text-sm w-full '>Suche in Dateinamen</a>
        <input
          type="text"
          placeholder="Suche in Dateinamen..."
          className=" w-full font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90   outline-none py-2 px-3 pl-14 text-sm ml-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className='absolute inset left-4 text-2xl top-[2.1rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
        <MdClose onClick={()=>setSearchTerm("")} className={'absolute cursor-pointer inset right-3 text-2xl top-[2.1rem] text-gray-500 hover:text-gray-400 '} style={{display:searchTerm.length>0?'block':'none'}} />
        </label>
        <label className='md:w-auto sm:w-full w-full flex flex-col items-center justify-center relative'>
        <select
          className="md:w-auto sm:w-full w-full font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90   outline-none py-2 px-3  text-sm"
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
            {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`w-8 flex flex-col items-center justify-center aspect-square  ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          >
            {index + 1}
          </button>
        ))}
            <div onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
            <MdArrowForwardIos />
            </div> 
        </div>  
      </div>

      {/* Card Grid */}
      <div className='w-full dark:bg-gray-900 bg-white h-full  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start ring-1 dark:ring-gray-800 shadow-inner shadow-[rgba(0,0,0,0.3)] ring-gray-300 p-4'>
      <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">

        
        {displayedData.map((item) => (
          <div key={item.anhangId+item.fileindex} className="dark:bg-gray-900 bg-gray-300/30 rounded-lg dark:shadow-blue-600/30 shadow-lg shadow-black/20 p-4 dark:ring-1 ring-1 dark:ring-gray-700 ring-gray-300">
            {/* Image, Placeholder, or 7z Icon */}
            {item.filetype.includes('image') ? (
              <div
                className="w-full h-40 cursor-pointer"
                onClick={() => openImageDialog(item.basefile,item.filetype)}
              >
                <img
                  src={decompressBase64Image(item.basefile)} 
                  alt={item.filename}
                  className="w-full h-full object-cover rounded-t-lg dark:bg-gray-800 bg-gray-300 flex flex-col items-center justify-center dark:text-gray-300 text-gray-500 "
                />
              </div>
            ) :  (
              <div onClick={() => openImageDialog(item.basefile,item.filetype)} className="w-full h-40 dark:bg-gray-800 bg-gray-300 flex items-center justify-center dark:text-gray-300 text-gray-500 text-2xl rounded-t-lg">
                <span><MdFilePresent className='text-7xl' /></span>
              </div>
            )}

            {/* File Info */}
          <div className="mt-4 text-center">
            <h3 className="font-semibold text-lg first-letter:uppercase truncate">{item.filename}</h3>
                <p className="text-sm text-gray-500 truncate"><a className='dark:text-orange-400/90 text-blue-700'>{returnSizing(item.filesizeuncomp)}</a></p>
                <p className="text-sm truncate"><a className=' dark:text-orange-400/90 text-blue-700 font-semibold uppercase'>{item.filetype.split('/')[1]}</a></p>
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
            {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`w-8 flex flex-col items-center justify-center aspect-square  ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          >
            {index + 1}
          </button>
        ))}
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