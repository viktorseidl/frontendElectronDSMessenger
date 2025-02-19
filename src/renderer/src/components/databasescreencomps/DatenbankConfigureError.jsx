import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { MdArrowForward, MdDone, MdDoneAll, MdOutlineErrorOutline } from 'react-icons/md'
import ErrorState from './ErrorState';

const DatenbankConfigureError = ({fehler,soll}) => {  
  const [four,setfour]=useState(false)
  useEffect(() => { 
    setTimeout(()=>{
        setfour(true)
    },4000)
  }, []);
  return (
    <div className='flex flex-col items-start justify-start border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
    <div className='w-full animate-pulse  flex flex-row items-center justify-center'>
        <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '}  />
        <a className='ml-6 text-sm'>Bitte warten ...<br/>...Datenbank wird konfiguriert</a>
    </div>
    <div className='w-full text-center mt-8'>
        Tabellen werden konfiguriert...
    </div>
    <div className='w-full flex flex-col items-center justify-start mt-8'> 
        {
            soll.map((item,index)=>(
                <ErrorState key={item+index+'sjsds'} element={item} istrue={(!fehler.includes(item))?true:false} />
            ))
        } 
        {
          four?
          <div className='w-full mt-8 flex flex-col items-center justify-center text-white dark:bg-pink-700 bg-red-700 rounded-sm py-2'>
           Einige Tabellen konnten nicht konfiguriert werden <MdOutlineErrorOutline className='text-4xl mt-4' />
          </div>:''
        }
    </div>
    </div>
  )
}

export default DatenbankConfigureError