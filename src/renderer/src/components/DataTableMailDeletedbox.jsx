import React, { useState, useMemo  } from "react"; 
import { MdArrowBackIos, MdArrowForwardIos, MdClose, MdLogout, MdPerson } from "react-icons/md"; 
import { FaSearch } from "react-icons/fa";
import RowMessageDeleted from "./RowMessageDeleted";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import { de } from 'date-fns/locale/de';
import Dialog from "./Dialog";
import { util } from "node-forge";
import { useFetchAuthAll } from "../services/useFetchAll"; 
import { RiMailAddFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
registerLocale('de', de)
const DataTableMailDeletedbox = ({ Data, updater }) => {
  const navigate=useNavigate()
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost:'localhost'
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [filters, setFilters] = useState({
    Betrefftxt: "",
    Sendername: "Alle Versender",
    dateFrom: "",
    dateTo: "",
  }); 
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const rowsPerPage = 12;
   
  const reasonCounters = useMemo(() => {
    const counts = { 'Alle Versender': Data.length };
    Data.forEach((item) => { 
      counts[item.Sendername] = (counts[item.Sendername] || 0) + 1;
    }); 
    return counts;
  }, [Data]);
     
   
  const filteredData = useMemo(() => {  
    if (Data.length === 0) {
      return [];  
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
 
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const exdata=filteredData.slice(startIndex, startIndex + rowsPerPage); 
    return exdata
  }, [filteredData, currentPage, Data]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Update filter
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  }; 
   const BackToInbox=async(e)=>{
       closeDialog(e) 
       if(currentId>0){
           const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
           const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=movetoInbox&a="+util.encode64(User.Name)+"&t="+util.encode64(User.usertypeVP),'ssdsdsd',"PUT", {mid:currentId}, null);
           if(query==true){
             updater()
             setCurrentId(null) 
           }
       }
  } 
  const openDialog = (id) => {  
         setCurrentId(id)
         setIsDialogOpen(true); 
  }; 
  const closeDialog = (e) => {
       if (e.target === e.currentTarget) {
         setIsDialogOpen(false); 
       }
  };
  return (
    <div className='w-full mt-2  flex-grow max-h-full overflow-auto flex flex-col items-start justify-start  '> 
      {/* Filters */}
      <div className=' w-full h-20 flex flex-row items-center justify-end'>
          <div className='w-full px-4 '>
              <label className='  w-full flex flex-col items-center justify-center relative'> 
                  <input 
                  className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-3 pl-14 text-sm'
                  placeholder="Suche in Betreff..."
                  value={filters.Betrefftxt}
                  onChange={(e) => handleFilterChange("Betrefftxt", e.target.value)}
                  />
                  <FaSearch className='absolute inset left-4 text-2xl top-[0.4rem] dark:text-blue-200/60 text-gray-500/20 ' /> 
                  <MdClose onClick={()=>handleFilterChange("Betrefftxt", "")} className={'absolute inset right-3 text-2xl top-[0.4rem] text-gray-500 hover:text-gray-400 cursor-pointer '} style={{display:filters.Betrefftxt.length>0?'block':'none'}} />
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
      {/* Filters */}
      <div  className="w-full grid grid-cols-6 items-start justify-items-start gap-3 gap-x-4  text-sm px-4">
       
        <label className="w-full flex flex-col items-start justify-start">
          <a className="w-full mb-2">Versender</a>
        <select
          value={filters.Sendername}
          onChange={(e) => handleFilterChange("Sendername", e.target.value)}
          className="w-5/6  ml-2 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
          >
          {Object.entries(reasonCounters).map(([Sendername, count]) => (
            <option key={Sendername} value={Sendername}>
              {Sendername} ({count}) {console.log(Sendername)}
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
        className=" w-5/6 ml-2 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
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
        className=" w-5/6 ml-2 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
        selected={filters.dateTo} 
        onChange={(date) => handleFilterChange("dateTo", date)} />
          </label> 
          <div className="w-full h-full flex flex-col items-end justify-end col-start-6">
          <Link to={'/new-message'} title="Neue Nachricht verfassen" className="cursor-pointer  dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 py-1 px-4 rounded shadow-sm flex flex-row items-center justify-center dark:shadow-[rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] text-white text-sm"><RiMailAddFill className="inline mr-2 text-xl" /> Mail </Link>
          </div>
      </div>
 
      <div className='p-2 w-full flex flex-row items-center justify-between '>
                  <div className='flex flex-row items-center justify-start' >
                       
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
      <div className='w-full dark:bg-gray-900 bg-white h-[77%]  overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 flex flex-col items-start justify-start divide-y dark:divide-gray-700 shadow-inner shadow-[rgba(0,0,0,0.3)] divide-gray-400 '>  
          {Data.length>0&&paginatedData?.map((item,index) => (
           <RowMessageDeleted  key={item.ID} item={item} erledigt={item.Erledigt} selected={selectedTickets} selhandler={openDialog} />
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
      title={'Wiederherstellung'}
      message={'Möchten Sie die Nachrichten zurück in den Posteingang verschieben?'}
      cancelBtn={true}
      actionBtn1={false} 
      actionBtn2={true} 
      Btn2BgHover={' dark:bg-lime-600 bg-lime-600 dark:hover:bg-lime-700 hover:bg-lime-700 '} 
      callbackBtn2={BackToInbox} 
      />
    </div>
  );
};



export default DataTableMailDeletedbox;