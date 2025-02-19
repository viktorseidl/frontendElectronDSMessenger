import React, { useState, useEffect } from "react";
import { MdArrowForward, MdDone, MdDoneAll, MdError } from 'react-icons/md'
import Loader from "../Loader";
const ErrorState = ({ element, istrue }) => {
  const [isInitial, setIsInitial] = useState(true);
  const [reanimate, setreanimate] = useState(null);
  useEffect(() => {
    // Change color after 2 seconds
    const timer = setTimeout(() => {
      setIsInitial(false); // Switch from initial state
      setTimeout(()=>{
        setreanimate(istrue)
      },2000)
    }, 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='w-full'>
    {
      isInitial&&reanimate==null?
      <div className='w-full flex flex-row items-center justify-start'><MdArrowForward className='inline mr-4' /><span className='mr-4'>Tabelle "{element}" wird eingerichtet</span> <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '} Width={' w-4 '}  /></div>
      :
      isInitial==false&&reanimate==true?
      <div className='w-full flex flex-row items-center justify-start'><MdArrowForward className='inline mr-4' /><span className='mr-4'>Tabelle "{element}" wird eingerichtet</span> <MdDone className='inline' /></div>
      :
      isInitial==false&&reanimate==false?
      <div className='w-full flex flex-row items-center justify-start'><MdArrowForward className='inline mr-4' /><span className='mr-4'>Tabelle "{element}" wird eingerichtet</span> <MdError className='inline' /></div>
      :
      <div className='w-full flex flex-row items-center justify-start'><MdArrowForward className='inline mr-4' /><span className='mr-4'>Tabelle "{element}" wird eingerichtet</span> <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '} Width={' w-4 '}  /></div>
    }
    </div>
  )
}

export default ErrorState