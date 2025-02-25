import React,{useEffect, useState } from 'react'  
import Sidebar from '../components/dashboardsidebar/Sidebar';   
import TagesAnsicht from '../components/calendarcomps/dayview/TagesAnsicht';
import { MdArrowLeft, MdArrowRight, MdCalendarToday, MdFilter, MdFilter1, MdFilter3, MdFilterList, MdViewDay } from 'react-icons/md';
const Calendarwall = () => {   
  const [meetings, setMeetings] = useState([
    { id: 1, title: "Meeting 1", start: "00:00", end: "4:30" },
    { id: 2, title: "Meeting 2", start: "09:00", end: "10:30" },
    { id: 3, title: "Meeting 3", start: "13:15", end: "14:00" },
    { id: 4, title: "Meeting 4", start: "16:45", end: "17:30" }
  ]);
  return ( 
    <div className={'pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-stone-100 flex flex-col items-start justify-start h-screen  '}>  
    <div className='w-full h-full relative flex flex-col items-start justify-start pl-14'>
     <Sidebar />
     <div className='w-full h-full flex flex-col items-start justify-start animate-fadeInfast dark:bg-gray-950 bg-stone-100 overflow-hidden'> 
      <div className='w-full flex flex-row items-start justify-start'>
        <div className='w-80 h-full flex flex-col items-start justify-start pt-4'>
          <div className='w-full flex flex-row items-center justify-center text-xl'>
            <span className='w-full flex flex-row items-center justify-center'><MdViewDay className='inline mr-2' /> Tagesansicht</span>
          </div>
          <div className='w-full flex flex-col items-center justify-center p-4 mt-4'>
            <button title='Neuen Kalendereintrag' className='px-4 py-3 w-5/6 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded-xl  dark:bg-transparent ring-1 ring-gray-700   outline-none'>+ Eintrag</button>
          </div>
          <div className='w-full mt-2 flex flex-row items-center justify-between text-sm font-[arial] p-2  px-4'>
            <div className=' pl-2'><b>Februar 2025</b></div>
            <div>
              <button className=' p-1 outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-0 text-2xl'><MdArrowLeft /></button>
              <button className=' p-1 outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-0 text-2xl'><MdArrowRight /></button>
            </div>
          </div>
          <div className='w-full mt-2 grid grid-cols-7 items-start justify-items-start text-xs font-[arial] px-4 py-0'>
            <div className='w-full aspect-square flex flex-col items-center justify-center'><span className='w-full h-full rounded-full hover:bg-blue-400/20 flex flex-col items-center justify-center'>M</span></div>
            <div className='w-full aspect-square flex flex-col items-center justify-center'><span className='w-full h-full rounded-full hover:bg-blue-400/20 flex flex-col items-center justify-center'>D</span></div>
            <div className='w-full aspect-square flex flex-col items-center justify-center'><span className='w-full h-full rounded-full hover:bg-blue-400/20 flex flex-col items-center justify-center'>M</span></div>
            <div className='w-full aspect-square flex flex-col items-center justify-center'><span className='w-full h-full rounded-full hover:bg-blue-400/20 flex flex-col items-center justify-center'>D</span></div>
            <div className='w-full aspect-square flex flex-col items-center justify-center'><span className='w-full h-full rounded-full hover:bg-blue-400/20 flex flex-col items-center justify-center'>F</span></div>
            <div className='w-full aspect-square flex flex-col items-center justify-center'><span className='w-full h-full rounded-full hover:bg-blue-400/20 flex flex-col items-center justify-center'>S</span></div>
            <div className='w-full aspect-square flex flex-col items-center justify-center'><span className='w-full h-full rounded-full hover:bg-blue-400/20 flex flex-col items-center justify-center'>S</span></div>
          </div>
          <div className='w-full mt-0 grid grid-cols-7 items-start justify-items-start text-xs font-[arial] px-4 py-0'>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>27</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>28</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>29</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>30</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>31</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>1</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>2</span></div>
          </div>
          <div className='w-full mt-0 grid grid-cols-7 items-start justify-items-start text-xs font-[arial] px-4 py-0'>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>3</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>4</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>5</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>6</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>7</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>8</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>9</span></div>
          </div>
          <div className='w-full mt-0 grid grid-cols-7 items-start justify-items-start text-xs font-[arial] px-4 py-0'>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>10</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>11</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>12</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>13</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>14</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>15</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>16</span></div>
          </div>
          <div className='w-full mt-0 grid grid-cols-7 items-start justify-items-start text-xs font-[arial] px-4 py-0'>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>17</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>18</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>19</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>20</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>21</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>22</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>23</span></div>
          </div>
          <div className='w-full mt-0 grid grid-cols-7 items-start justify-items-start text-xs font-[arial] px-4 py-0'>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>24</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>25</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>26</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>27</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>28</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>1</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>2</span></div>
          </div>
          <div className='w-full mt-0 grid grid-cols-7 items-start justify-items-start text-xs font-[arial] px-4 py-0'>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>3</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>4</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>5</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>6</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>7</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>8</span></div>
            <div className='w-full flex flex-col items-center justify-center'><span className='w-5/6  rounded-full aspect-square hover:bg-blue-400/20 flex flex-col items-center justify-center'>9</span></div>
          </div>
          <div className='w-full px-4 mt-6 flex flex-col items-start justify-start gap-y-6 '>
            <select title='Nach Bereich filtern' className=' w-auto px-4 py-2  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none text-sm '>
                  <option>Alle Bereiche</option>
                  <option>Wohnbereich1</option>
                  <option>Wohnbereich2</option>
                  <option>Wohnbereich3</option>
                  <option>Wohnbereich4</option>
              </select>
            <div className='w-full flex flex-row items-center justify-start pb-1 border-b border-gray-600'><MdFilterList className='inline mr-2' />Weitere Filter</div>
            <div className='w-full flex flex-col items-start justify-start gap-y-2'>
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
      <TagesAnsicht  date="07.02.2025" /> 

        </div>
      </div>
    </div>  
    </div> 
    </div>
  )
} 
export default Calendarwall