import React, { Fragment, useEffect, useRef, useState } from 'react'
import imgs from './../assets/Logo.png'
import { MdBackup, MdPerson, MdRestore, MdSettingsBackupRestore } from 'react-icons/md'
import { useFetchAuthAll } from '../services/useFetchAll'
import { util } from 'node-forge' 
const DialogLetedPosteds = ({show, close, title, message, cancelBtn=false, actionBtn1=false, actionBtn2=false, Btn2BgHover=null, Btn1BgHover=null, callbackBtn1=null, callbackBtn2=null,Btn2Txt=null,updater}) => {
    const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost:'localhost'
    const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))  
    const [fullList,setfullList]=useState([])  
    const handlerestore=async(id)=>{
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=updateNoteRestoreOnID&a="+util.encode64(User.Name),'ssdsdsd',"PUT", JSON.stringify({mid:id}), null);
        if(query){ 
            setfullList((prevNotes) => prevNotes.filter((note) => note.id !== id));
            updater()
        }
    } 
    const getLists=async()=>{  
        const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=getNotesAllInActive&a="+util.encode64(User.Name),'ssdsdsd',"GET", null, null);
        if(query.length>0){
            setfullList(query) 
        }
    } 
    useEffect(()=>{
        getLists()
    },[fullList.length,show])
  return (
    <Fragment>
        {show && (
                <div
                  className="fixed inset-0 z-[10] dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
                  onClick={(e)=>close(e)}
                >
                  <div className="min-w-[30%] max-w-[97%] flex flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm">
                  <div id="titlebar" className={'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'} > 
                        <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                          <img src={imgs} className='w-10 h-2  ' />{title}</span> 
                      </div>
                      <div className="w-full dark:bg-gray-900 bg-white px-6 py-8 dark:text-white text-black text-sm font-[Arial]">  
                            <div className='w-full min-h-[150px] max-h-[380px] overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 ring-1 flex flex-col items-start justify-start dark:ring-gray-400 ring-gray-500 divide-y dark:divide-gray-700 divide-gray-400'> 
                            {
                                fullList.length>0?
                                <>
                               { 
                                fullList.map((item,index)=>(
                                    <div key={item+index+'leute'} className='w-full grid grid-cols-10 items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'>
                                        <div className={`col-span-1 row-start-1 w-8 aspect-square row-span-2 mr-2 bg-[${ item.hexcolor}]`}></div> 
                                        <div className='w-full col-span-8 row-start-1 '> 
                                         <a>Gelöscht am: {item.datum}</a>
                                        </div>
                                        <div className='w-full row-start-2 col-span-8 flex flex-row items-start justify-start '>
                                        <a className='w-full truncate'>{item.prio==0?'':<span className=' mr-2 text-[12px] px-2 py-0.5 bg-red-600 rounded-sm text-white'>Wichtig</span>} {item.text.trim()==''?'Jetzt beschriften ...':item.text}</a>
                                        </div>
                                        <div onClick={()=>handlerestore(item.id)} className='w-full row-start-1 row-span-2 col-span-1 flex flex-col items-center justify-center'>
                                            <div title='Wiederherstellen' className='w-6 h-6 flex flex-col items-center justify-center text-white dark:bg-gray-700 bg-gray-800 rounded-sm dark:hover:bg-gray-900 hover:bg-gray-600'>
                                            <MdSettingsBackupRestore />
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }
                                </>
                                :
                                <div className='w-full py-20 flex flex-col items-center justify-center'> 
                                    Keine gelöschten Notizen vorhanden
                                </div>
                            }  
                            </div>  
                      </div>
                      <div className="w-full dark:bg-gray-900 bg-white px-6 py-4  dark:text-white text-white text-sm font-[Arial] flex flex-row items-end justify-end gap-x-4">
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
                            <button onClick={(e)=>close(e)} className="px-2 py-1 dark:bg-gray-600 bg-gray-500 rounded dark:hover:bg-gray-700 hover:bg-gray-700">Schliessen</button>
                            :''
                        }
                      </div>
                </div>
                </div>
              )}
    </Fragment>
  )
}

export default DialogLetedPosteds