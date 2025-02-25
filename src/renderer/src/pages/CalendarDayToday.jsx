import React,{useEffect, useState } from 'react'  
import Sidebar from '../components/dashboardsidebar/Sidebar';   
import TagesAnsicht from '../components/calendarcomps/dayview/TagesAnsicht';
import { MdArrowLeft, MdArrowRight, MdCalendarToday, MdFilter, MdFilter1, MdFilter3, MdFilterList, MdViewDay } from 'react-icons/md';
import CalendarMini from '../components/calendarcomps/CalenderMini'; 
import { getTodayDate } from '../components/calendarcomps/dayview/functions/functionHandler';
const CalendarDayToday = () => {  
    const today=getTodayDate() 
    const layer='day';
  const [meetings, setMeetings] = useState([
    { id: 1, title: "Meeting 1", start: "00:00", end: "4:30" },
    { id: 2, title: "Meeting 2", start: "09:00", end: "10:30" },
    { id: 3, title: "Meeting 3", start: "13:15", end: "14:00" },
    { id: 4, title: "Meeting 4", start: "16:45", end: "17:30" }
  ]);
  const [btnmy, setbtnmy] = useState(false)
  return ( 
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-stone-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar />
     <div className='w-full h-full flex flex-col items-start justify-start animate-fadeInfast dark:bg-gray-950 bg-stone-100 overflow-hidden'> 
      <div className='w-full flex flex-row items-start justify-start h-full'>
        <div className='w-80 h-full flex flex-col items-start justify-start pt-4 overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 '>
          <div className='w-full flex flex-row items-center justify-center text-xl'>
            <span className='w-full flex flex-row items-center justify-center'><MdViewDay className='inline mr-2' /> Tagesansicht</span>
          </div>
          <div className='w-full flex flex-col items-center justify-center p-4 mt-4'>
            <button title='Neuen Kalendereintrag' className='px-4 py-3 w-5/6 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded-xl  dark:bg-transparent ring-1 ring-gray-700   outline-none'>+ Eintrag</button>
          </div>
          <CalendarMini date={today} layout={layer}  /> 
          <div className='w-full px-4 mt-6 flex flex-col items-start justify-start gap-y-6 '>
            <select title='Nach Bereich filtern' className=' w-auto px-4 py-2  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none text-sm '>
                  <option>Alle Bereiche</option>
                  <option>Wohnbereich1</option>
                  <option>Wohnbereich2</option>
                  <option>Wohnbereich3</option>
                  <option>Wohnbereich4</option>
              </select>
              {
                btnmy?
                <button onClick={()=>setbtnmy(!btnmy)} title='Alle Termine inklusive privater Termine anzeigen' className='px-4 py-2 text-sm bg-yellow-300/30 dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded  dark:bg-yellow-300/20 ring-1 ring-gray-700   outline-none flex flex-col items-center justify-center'>alle Termine zeigen</button>
                :
                <button onClick={()=>setbtnmy(!btnmy)} title='Nur private Termine Anzeigen' className='px-4 py-2 text-sm bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded  dark:bg-transparent ring-1 ring-gray-700   outline-none flex flex-col items-center justify-center'>private Termine zeigen</button>
              }
            <div className='w-full flex flex-row items-center justify-start pb-1 border-b border-gray-600'><MdFilterList className='inline mr-2' />Weitere Filter</div>
            <div className='w-full flex flex-col items-start justify-start gap-y-2 dark:bg-gray-600/40 bg-stone-300/30 py-4 mb-6 '>
            <div className='w-full grid grid-cols-10 items-start justify-items-start gap-x-2'>
              <div className='w-full h-4 col-span-2 flex flex-col items-center justify-center text-sm'>
                <input type='checkbox' className='w-4 h-4 accent-yellow-400 ' />
              </div>
              <div className='w-full  h-4  text-sm col-span-8 flex flex-col items-start justify-center'>
                Feiertage
              </div>
            </div> 
            <div className='w-full grid grid-cols-10 items-start justify-items-start gap-x-2'>
              <div className='w-full h-4 col-span-2 flex flex-col items-center justify-center text-sm'>
                <input type='checkbox' className='w-4 h-4 accent-pink-400 ' />
              </div>
              <div className='w-full  h-4  text-sm col-span-8 flex flex-col items-start justify-center'>
              Geburtstage der Bewohner
              </div>
            </div>
            <div className='w-full grid grid-cols-10 items-start justify-items-start gap-x-2'>
              <div className='w-full h-4 col-span-2 flex flex-col items-center justify-center text-sm'>
                <input type='checkbox' className='w-4 h-4 accent-lime-400 ' />
              </div>
              <div className='w-full  h-4  text-sm col-span-8 flex flex-col items-start justify-center'>
              Geburtstage der Mitarbeiter
              </div>
            </div>
            <div className='w-full grid grid-cols-10 items-start justify-items-start gap-x-2'>
              <div className='w-full h-4 col-span-2 flex flex-col items-center justify-center text-sm'>
                <input type='checkbox' className='w-4 h-4 accent-violet-400 ' />
              </div>
              <div className='w-full  h-4  text-sm col-span-8 flex flex-col items-start justify-center'>
                Pflegevisite
              </div>
            </div> 


            </div>
             

          </div>
        </div>
        <div className='w-full h-full'>
      <TagesAnsicht  date={today} /> 

        </div>
      </div>
    </div>  
    </div> 
    </div>
  )
} 
export default CalendarDayToday