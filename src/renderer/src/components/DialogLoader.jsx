import React, { Fragment, useEffect } from 'react'
import imgs from './../assets/Logo.png'
import Loader from './Loader'
const DialogLoader = ({show, close, title, message, cancelBtn=false, actionBtn1=false, actionBtn2=false, Btn2BgHover=null, Btn1BgHover=null, callbackBtn1=null, callbackBtn2=null,Btn2Txt=null}) => {
     
    useEffect(()=>{

    },[])
  return (
    <Fragment>
        {show && (
                <div
                  className="fixed inset-0 dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
                  onClick={(e)=>close(e)}
                >
                  <div className="min-w-auto max-w-[97%] flex flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm">
                  <div id="titlebar" className={'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'} > 
                        <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                          <img src={imgs} className='w-10 h-2  ' />{title}</span> 
                      </div>
                      <div className="w-full dark:bg-gray-900 bg-white px-6 py-4 -mb-6 dark:text-white text-black text-sm font-[Arial]">
                        <div className={'  flex flex-row items-center justify-center py-6 px-8 '+(message?'  ':' animate-pulse ')}>
                            
                            {message?<a className='p-4 text-sm dark:bg-lime-600 bg-lime-300 rounded'>Nachricht versendet</a>:<><Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '}  /><a className='ml-6 text-sm'>Bitte warten ...<br/>...Nachricht wird versendet</a></>}
                        </div>
                      </div>
                      <div className="w-full dark:bg-gray-900 bg-white px-6 py-4 dark:text-white text-white text-sm font-[Arial] flex flex-row items-end justify-end gap-x-4">
                        {
                            actionBtn2?
                            <button onClick={(e)=>callbackBtn2(e)} className={`px-2 py-1 rounded ${Btn2BgHover===null?'':Btn2BgHover}`}>{Btn2Txt===null?'Bestätigen':Btn2Txt}</button>
                            :''
                        }
                        {
                            actionBtn1?
                            <button onClick={(e)=>callbackBtn1(e)} className={`px-2 py-1 rounded ${Btn1BgHover===null?'':Btn1BgHover}`}>Löschen</button>
                            :''
                        }
                        {
                            cancelBtn?
                            <button onClick={(e)=>close(e)} className="px-2 py-1 dark:bg-gray-600 bg-gray-500 rounded dark:hover:bg-gray-700 hover:bg-gray-700">Abbrechen</button>
                            :''
                        }
                      </div>
                </div>
                </div>
              )}
    </Fragment>
  )
}

export default DialogLoader