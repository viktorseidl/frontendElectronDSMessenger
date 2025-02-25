import React, { useEffect, useRef, useState } from 'react'
import ActionZeilen from './ActionZeilen';
import DayLayoutGrid from './DayLayoutGrid';
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getShiftedDate, getTodayDate } from './functions/functionHandler';

const TagesAnsicht = ({date}) => {
const [meetings, setMeetings] = useState([
{ id: 1, title: "Meeting 1", start: "00:00", end: "4:30" },
{ id: 2, title: "Meeting 2", start: "09:00", end: "10:30" },
{ id: 3, title: "Meeting 3", start: "13:15", end: "14:00" },
{ id: 4, title: "Meeting 4", start: "16:45", end: "17:30" }
]);
const divRef = useRef(null);
const [minHeight, setMinHeight] = useState(0);
function formatGermanDate(dateString) {
    // Split the input date string into day, month, and year
    const [day, month, year] = dateString.split('.');
  
    // Create a Date object (note: months are 0-indexed in JavaScript)
    const date = new Date(year, month - 1, day);
  
    // Define options for toLocaleDateString
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
  
    // Convert the date to the desired format using the German locale
    return date.toLocaleDateString('de-DE', options);
  }
const StartColumnIntervalRow=({T})=>{
        
    const start=T>9?T.toString():'0'+T.toString() 
    const end=parseInt(Number(T)+1)
    return(
        <div className='w-full h-[40px]  dark:hover:bg-[rgba(255,255,255,0.06)] flex flex-col items-center justify-start'  aria-label={'start_'+start+':00,ende_'+(end=='24'?'00':T)+':00'}>
        {start}:00
      </div> 
    )
} 
const CurrentTimeLine = ({pixel}) => {
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    const currentTimePixels = currentTime.getHours() * 60 + currentTime.getMinutes();
     console.log(24*40/1440)
    return (
      <div
        className="w-[88%] absolute inset left-32 right-0 h-[1px] bg-red-500 z-0"
        style={{ top: `${(parseInt(currentTimePixels)*(24*40/1440))}px` }}
      >
        <div className='w-full relative'>
            <div className='absolute left-0 -top-[3px] p-1 rounded-full bg-red-500'></div>
            <div className='absolute right-0 text-red-500 text-xs -top-[20px] p-1'>{currentTime.getHours()>9?currentTime.getHours():'0'+currentTime.getHours()}:{currentTime.getMinutes()>9?currentTime.getMinutes():'0'+currentTime.getMinutes()} Aktuelle Uhrzeit</div>
        </div>
      </div>
    );
  };
useEffect(()=>{
        if (divRef.current&&minHeight==0) { 
            setMinHeight(divRef.current.clientHeight);  
        } 
    },[])
  return (
    <div   ref={divRef} className='w-full h-full  flex flex-col items-start justify-start '>
        <div className='w-full h-20 py-4 px-4 flex flex-row items-center justify-start gap-x-2'>
        <div className='w-[40%] h-20 flex flex-row items-center justify-start '>
           <Link to={'/calendar/day/'+parseInt(getTodayDate().split('.')[2])+'/'+parseInt(getTodayDate().split('.')[1])+'/'+parseInt(getTodayDate().split('.')[0])} title='Heute anzeigen' className='px-4 py-2 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded-xl  dark:bg-transparent ring-1 ring-gray-700   outline-none flex flex-col items-center justify-center'>Heute</Link> 
           <Link to={'/calendar/day/'+parseInt(getShiftedDate(true,date).split('.')[2])+'/'+parseInt(getShiftedDate(true,date).split('.')[1])+'/'+parseInt(getShiftedDate(true,date).split('.')[0])} className=' p-2 outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-4 text-3xl'><MdArrowLeft /></Link>
           <Link to={'/calendar/day/'+parseInt(getShiftedDate(false,date).split('.')[2])+'/'+parseInt(getShiftedDate(false,date).split('.')[1])+'/'+parseInt(getShiftedDate(false,date).split('.')[0])} className=' p-2 outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-1 text-3xl'><MdArrowRight /></Link>
           <span className=' py-2 dark:text-gray-300 ml-4 text-lg'>{formatGermanDate(date)}</span>
        </div>
        <div className='w-[60%] h-20 flex flex-col items-center justify-center '>
          <div className='w-full h-full  flex flex-row items-center justify-between gap-x-2'>
            <label className='  w-[70%] flex flex-col items-center justify-center relative'> 
            <input 
            title='Suche nach Einträgen'
            className=' w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm'
            placeholder="Suche nach..."
            value={''}
            onChange={(e) => 'handleFilterChange("Betrefftxt", e.target.value)'}
            />
            <FaSearch className='absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 ' /> 
            <MdClose onClick={()=>'handleFilterChange("Betrefftxt", "")'} className={'absolute hidden cursor-pointer inset right-3 text-2xl top-[0.1rem] text-gray-500 hover:text-gray-400'}  />
        </label>
            <select title='Kalenderansicht ändern' className=' w-auto px-4 py-2 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none text-sm '>
                <option selected>Tag</option>
                <option>Woche</option>
                <option>Monat</option>
                <option>Jahr</option>
                <option>Terminübersicht</option>
            </select>
            </div>
        </div>
        </div>
        <div className='w-full h-full shadow-inner dark:shadow-gray-200'>
        <div  className='w-full max-h-full relative overflow-y-scroll dark:bg-gray-900 bg-blue-50 flex flex-row items-start justify-start dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200'>
        <div className='w-40 flex flex-col dark:bg-gray-800 bg-white items-start justify-evenly h-full dark:border-r border-r dark:border-gray-700 border-gray-300 divide-y dark:divide-gray-700 divide-gray-300'> 
        {
            [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((item,index)=>(
                <StartColumnIntervalRow key={index+item+'1stcolumn'} T={item}  />
            ))
        }
        </div>  
        <div className='w-full h-full bg-transparent'>
        <DayLayoutGrid fullheight={minHeight} /> 
        </div>
         <CurrentTimeLine pixel={(2.5)}/>
        </div>
        </div>
    </div>
  )
}

export default TagesAnsicht