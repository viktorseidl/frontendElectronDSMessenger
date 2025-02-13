import React, { useState, useMemo } from "react"; 
import { MdArrowBackIos, MdArrowForwardIos, MdCancel, MdClose, MdDelete, MdMarkEmailRead, MdMarkEmailUnread, MdPerson } from "react-icons/md"; 
import RowMessage from "./RowMessage";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import { de } from 'date-fns/locale/de';
import { util } from "node-forge";
import { useFetchAuthAll } from "../services/useFetchAll";
import Dialog from "./Dialog";
import DecText from "../utils/DecText";
registerLocale('de', de)

const DataTableMailInbox = ({ Data, updater }) => {
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(DecText(localStorage.getItem('dbConfig'))).value)).localhost:''
  const [filters, setFilters] = useState({
    Betrefftxt: "",
    Sendername: "Alle Versender",
    dateFrom: "",
    dateTo: "",
  }); 
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [currentId, setCurrentId] = useState(null); 
  const [readtype, setReadtype] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [isDialogOpenMark, setIsDialogOpenMark] = useState(false); 
  const [isDialogOpenMarkID, setIsDialogOpenMarkID] = useState(false); 
  const [isDialogOpenId, setIsDialogOpenId] = useState(false); 
  const rowsPerPage = 12;
  
  // Compute unique reasons with counters
  const reasonCounters = useMemo(() => {
    const counts = { 'Alle Versender': Data.length };
    Data.forEach((item) => { 
      counts[item.Sendername] = (counts[item.Sendername] || 0) + 1;
    }); 
    return counts;
  }, [Data]);
   
   const handleSelect = (id) => {
    
    setSelectedTickets((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    ); 
  }; 
  const selectAll = () => {
    let narr=[];
    if(selectedTickets.length!=paginatedData.length){
      paginatedData.map((item)=>{
        narr.push(item.ID)
      })
    }
    setSelectedTickets(narr)
  };
  // Filtered data based on ticket number, date, and reason
  const filteredData = useMemo(() => {  
    if (Data.length === 0) {
      return []; // Return an empty array if there's no data
    }
    return Data.filter((item) => {
      // Filter by ticket number
      const ticketMatch =!filters.Betrefftxt || item.Betreff
        .toLowerCase()
        .includes(filters.Betrefftxt.toLowerCase());

      // Filter by reason
      const reasonMatch = filters.Sendername === "Alle Versender" || item.Sendername === filters.Sendername;
       
      // Filter by date range
      const createdDate = new Date(item.created * 1000); // Convert timestamp to Date
      const dateFromMatch =
        !filters.dateFrom || createdDate >= new Date(filters.dateFrom);
      const dateToMatch =
        !filters.dateTo || createdDate <= new Date(filters.dateTo);

      return ticketMatch && reasonMatch && dateFromMatch && dateToMatch;
    });
    //return Data
  }, [Data, filters]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const exdata=filteredData.slice(startIndex, startIndex + rowsPerPage); 
    return exdata
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Update filter
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };
   
  const DeleteList=async(e)=>{
    closeDialog(e) 
    if(selectedTickets.length>0){
        const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=DeleteMessageArr&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"DELETE", {arr:JSON.stringify(selectedTickets)}, null);
        if(query==true){
          setSelectedTickets([])
          updater()
        }
    }
  }
  const MarkReadList=async(e)=>{
    closeDialogMark(e) 
    if(selectedTickets.length>0){
        const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=MarkReadMessageArr&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP)+'&b=1','ssdsdsd',"PUT", {arr:JSON.stringify(selectedTickets)}, null);
        if(query==true){
          setSelectedTickets([]) 
          setReadtype('')
          updater()
        }
    }
  }
  const MarkUnreadList=async(e)=>{
    closeDialogMark(e) 
    if(selectedTickets.length>0){
        const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=MarkReadMessageArr&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP)+'&b=0','ssdsdsd',"PUT", {arr:JSON.stringify(selectedTickets)}, null);
        if(query==true){
          setSelectedTickets([]) 
          setReadtype('')
          updater()
        }
    }
  }
  const DeleteID=async(e)=>{
    closeDialogId(e) 
    if(currentId>0){
        const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=DeleteMessageOnID&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"DELETE", {mid:currentId}, null);
        if(query==true){
          setCurrentId(null)
          updater()
        }
    }
  }
  const MarkReadID=async(e)=>{
    closeDialogMarkID(e) 
    if(currentId>0){
        const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=MarkReadMessageOnID&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP)+'&b=1','ssdsdsd',"PUT", {mid:currentId}, null);
        if(query==true){
          setCurrentId(null)
          setReadtype('')
          updater()
        }
    }
  }
  const MarkUnReadID=async(e)=>{
    closeDialogMarkID(e) 
    if(currentId>0){
        const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=MarkReadMessageOnID&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP)+'&b=0','ssdsdsd',"PUT", {mid:currentId}, null);
        if(query==true){
          setCurrentId(null)
          setReadtype('')
          updater()
        }
    }
  }
  const openDialog = () => { 
      setIsDialogOpen(true); 
  };
  const openDialogMark = (e,b) => { 
      setIsDialogOpenMark(true); 
      setReadtype(b)
    };
    const openDialogMarkID = (id,b) => { 
      setCurrentId(id)
      setReadtype(b)
      setIsDialogOpenMarkID(true); 
  };
  const openDialogId = (id) => {  
      setCurrentId(id)
      setIsDialogOpenId(true); 
  };
 
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
  const closeDialogMarkID = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpenMarkID(false); 
    }
  };
  const closeDialogId = (e) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpenId(false); 
    }
  };
  return (
    <div className='w-full mt-2  flex-grow max-h-full overflow-auto flex flex-col items-start justify-start '> 
      {/* Filters */}
      <div className=' w-full h-20 flex flex-row items-center justify-end'>
          <div className='w-full px-4 '>
              <label className='  w-full flex flex-col items-center justify-center relative'> 
                  <input 
                  className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 dark:text-white placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 ring-1 dark:ring-gray-700 ring-gray-400/90   outline-none py-2 px-3 pl-14 text-sm'
                  placeholder="Suche in Betreff..."
                  value={filters.Betrefftxt}
                  onChange={(e) => handleFilterChange("Betrefftxt", e.target.value)}
                  />
                  <FaSearch className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
                  <MdClose onClick={()=>handleFilterChange("Betrefftxt", "")} className={'absolute cursor-pointer inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400'} style={{display:filters.Betrefftxt.length>0?'block':'none'}} />
              </label>
          </div>
          <div className='w-20 p-5 h-full flex flex-col items-center justify-center'>
              <div className='w-full aspect-square dark:bg-blue-200 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
              <MdPerson className='text-2xl' />
              </div>
          </div>
           </div>
      {/* Filters */}
      <div  className="w-full grid grid-cols-6 items-start justify-items-start gap-3 gap-x-4  text-sm px-4">
       
        <label className="w-full flex flex-col items-start justify-start">
          <a className="w-full mb-2">Versender</a>
        <select
          value={filters.Sendername}
          onChange={(e) => handleFilterChange("Sendername", e.target.value)}
          className="w-5/6  ml-2 dark:placeholder:text-blue-200/60 dark:text-white text-gray-800 placeholder:text-gray-500 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 outline-none ring-1 dark:ring-gray-700 ring-gray-200 rounded py-2 px-4 text-sm"
          >
          {Object.entries(reasonCounters).map(([Sendername, count]) => (
            <option key={Sendername} value={Sendername}>
              {Sendername} ({count})
            </option>
          ))}
        </select>
        </label>
        <label className="w-full flex  flex-col items-start justify-start">
        <a className="w-full mb-2">von</a>
        <DatePicker 
        placeholderText="TT.MM.YYYY"
        locale={'de'}
        closeOnScroll={true}
        dateFormat={'dd.MM.yyyy'}
        className=" w-5/6 ml-2 dark:placeholder:text-blue-200/60 dark:text-white text-gray-800 placeholder:text-gray-500 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 outline-none ring-1 dark:ring-gray-700 ring-gray-200 rounded py-2 px-4 text-sm"
        selected={filters.dateFrom} 
        onChange={(date) => handleFilterChange("dateFrom", date)} /> 
        </label>
        <label className="w-full flex  flex-col items-start justify-start">
        <a className="w-full mb-2">bis</a>
        <DatePicker 
        placeholderText="TT.MM.YYYY"
        locale={'de'}
        closeOnScroll={true}
        dateFormat={'dd.MM.yyyy'}
        className=" w-5/6 ml-2 dark:placeholder:text-blue-200/60 text-gray-800 dark:text-white  placeholder:text-gray-500 dark:bg-gray-900 bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/25 outline-none ring-1 dark:ring-gray-700 ring-gray-200 rounded py-2 px-4 text-sm"
        selected={filters.dateTo} 
        onChange={(date) => handleFilterChange("dateTo", date)} />
          </label> 
      </div> 
      <div className='p-2 w-full flex flex-row items-center justify-between '>
                  <div className='flex flex-row items-center justify-start ' >
                      <label className='flex flex-row items-center justify-start my-2'>
                      <input
                      type="checkbox" 
                      checked={selectedTickets.length===paginatedData.length}
                      onChange={() => selectAll()} 
                      className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
                      />
                      <a className='text-sm'>Alle auswählen</a>
                      </label>
                      {
                          selectedTickets.length>0 ? 
                          <button 
                            onClick={(e)=>openDialog(e)}
                            title="Auswahl Löschen"
                            className=' ml-10 w-auto px-4 py-1 dark:bg-red-800 dark:hover:bg-red-700 dark:text-gray-300 text-gray-700 bg-red-300 ring-1 dark:ring-gray-700/70 ring-red-400/70 hover:bg-red-200 shadow-xl text-sm rounded '
                          >
                            ({selectedTickets.length}) Löschen<MdDelete className="ml-2 inline" /> 
                          </button> : ""
                      }
                      {
                          selectedTickets.length>0 ? 
                          <button 
                            onClick={(e)=>openDialogMark(e,1)}
                            title="Auswahl als gelesen makieren"
                            className=' ml-4 w-auto px-4 py-1 dark:bg-violet-900 dark:hover:bg-violet-800 dark:text-gray-300 text-gray-700 bg-violet-300 ring-1 dark:ring-gray-700/70 ring-violet-400/70 hover:bg-violet-200 shadow-xl text-sm rounded '
                          >
                            ({selectedTickets.length}) Gelesen<MdMarkEmailRead className="ml-2 inline" /> 
                          </button> : ""
                      }
                      {
                          selectedTickets.length>0 ? 
                          <button 
                            onClick={(e)=>openDialogMark(e,0)}
                            title="Auswahl als ungelesen makieren"
                            className=' ml-4 w-auto px-4 py-1 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-gray-300 text-gray-700 bg-yellow-300 ring-1 dark:ring-gray-700/70 ring-yellow-400/70 hover:bg-yellow-200 shadow-xl text-sm rounded '
                          >
                            ({selectedTickets.length}) Ungelesen<MdMarkEmailUnread className="ml-2 inline" /> 
                          </button> : ""
                      }
                      {
                          selectedTickets.length>0 ? 
                          <button 
                            onClick={()=>setSelectedTickets([])}
                            title="Auswahl aufheben"
                            className=' ml-4 w-auto px-4 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 text-gray-700 bg-gray-300 ring-1 dark:ring-gray-700/70 ring-gray-400/70 hover:bg-gray-200 shadow-xl text-sm rounded '
                          >
                            Aufheben<MdCancel className="ml-2 inline" /> 
                          </button> : ""
                      }
                      </div>
                  <div className='flex flex-row items-center justify-end'>
                      <div onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1} className='w-6 aspect-square pl-2 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
                      <MdArrowBackIos />
                      </div> 
                      <span className='px-4 text-sm h-full flex flex-row items-center justify-center gap-x-2'><a>Seite</a> <b>{currentPage}</b> <a>von</a> <b>{totalPages}</b></span>
                      <div onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      } className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
                      <MdArrowForwardIos />
                      </div> 
                  </div>
              </div>

      {/* Table */}
      <div className='w-full dark:bg-gray-900 bg-white h-[77%]  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start divide-y dark:divide-gray-700 shadow-inner shadow-[rgba(0,0,0,0.3)] divide-gray-400'>  
          {paginatedData?.map((item,index) => (
           <RowMessage  key={item+index} item={item} erledigt={item.Erledigt} selected={selectedTickets} selhandler={handleSelect} deleter={openDialogId} markread={openDialogMarkID} /> 
          ))}
          {paginatedData.length === 0 && (
            <div className='w-full h-full'> 
            <div className=" w-full h-full  text-center  px-4  py-20 dark:text-white">
              Keine Nachrichten vorhanden 
            </div>
          </div> 
          )} 
      </div> 
      <div className='p-2 w-full flex flex-row items-center justify-between '>
        <div className='flex flex-row items-center justify-start' >
              <label className='flex flex-row items-center justify-start mt-2'>
              <input
              type="checkbox" 
              checked={selectedTickets.length===paginatedData.length}
              onChange={() => selectAll()} 
              className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
              />
              <a className='text-sm'>Alle auswählen</a>
              </label>
              </div>
          <div className='flex flex-row items-center justify-end'>
              <div  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}  className='w-6 aspect-square pl-2 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
              <MdArrowBackIos />
              </div> 
              <span className='px-4 text-sm h-full flex flex-row items-center justify-center gap-x-2'><a>Seite</a> <b>{currentPage}</b> <a>von</a> <b>{totalPages}</b></span>
              <div  onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      } className='w-6 aspect-square pl-1 py-1 cursor-pointer dark:hover:bg-gray-700 dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded ml-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-600 ring-gray-400'>
              <MdArrowForwardIos />
              </div> 
          </div>
      </div>
      <Dialog 
      show={isDialogOpen}
      close={closeDialog}
      title={'Information'}
      message={'Möchten Sie die Nachrichten wirklich löschen?'}
      cancelBtn={true}
      actionBtn1={true} 
      Btn1BgHover={' dark:bg-red-600 bg-red-500 dark:hover:bg-red-700 hover:bg-red-700 '} 
      callbackBtn1={DeleteList} 
      />
      <Dialog 
      show={isDialogOpenMark}
      close={closeDialogMark}
      title={'Information'}
      message={'Möchten Sie die Nachrichten wirklich als '+(readtype==1?'gelesen makieren?':'ungelesen makieren?')}
      cancelBtn={true}
      actionBtn1={false} 
      actionBtn2={true} 
      Btn2BgHover={' dark:bg-lime-600 bg-lime-600 dark:hover:bg-lime-700 hover:bg-lime-700 '} 
      callbackBtn2={readtype==1?MarkReadList:MarkUnreadList} 
      />
      <Dialog 
      show={isDialogOpenMarkID}
      close={closeDialogMarkID}
      title={'Information'}
      message={'Möchten Sie die Nachricht wirklich als '+(readtype==1?'gelesen makieren?':'ungelesen makieren?')}
      cancelBtn={true}
      actionBtn1={false} 
      actionBtn2={true} 
      Btn2BgHover={' dark:bg-lime-600 bg-lime-600 dark:hover:bg-lime-700 hover:bg-lime-700 '} 
      callbackBtn2={readtype==1?MarkReadID:MarkUnReadID} 
      />
      <Dialog 
      show={isDialogOpenId}
      close={closeDialogId}
      title={'Information'}
      message={'Möchten Sie die Nachricht wirklich löschen?'}
      cancelBtn={true}
      actionBtn1={true} 
      Btn1BgHover={' dark:bg-red-600 bg-red-500 dark:hover:bg-red-700 hover:bg-red-700 '} 
      callbackBtn1={DeleteID} 
      />
      
    </div>
  );
};



export default DataTableMailInbox;