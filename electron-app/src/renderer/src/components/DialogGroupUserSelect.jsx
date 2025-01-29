import React, { Fragment, useEffect, useState } from 'react'
import imgs from './../assets/Logo.png'
import { MdOutlineGroupAdd, MdPerson } from 'react-icons/md'
const DialogGroupUserSelect = ({show, close, title, message, cancelBtn=false, actionBtn1=false, actionBtn2=false, Btn2BgHover=null, Btn1BgHover=null, callbackBtn1=null, callbackBtn2=null,Btn2Txt=null}) => {
    const [isUserOrGroup,setIsUserOrGroup]=useState(false)
     
    useEffect(()=>{

    },[])
  return (
    <Fragment>
        {show && (
                <div
                  className="fixed inset-0 dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
                  onClick={(e)=>close(e)}
                >
                  <div className="min-w-[30%] max-w-[97%] flex flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm">
                  <div id="titlebar" className={'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'} > 
                        <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                          <img src={imgs} className='w-10 h-2  ' />{title}</span> 
                      </div>
                      <div className="w-full dark:bg-gray-900 bg-white px-6 py-4 dark:text-white text-black text-sm font-[Arial]">
                        <div className='w-full grid grid-cols-2 items-center justify-items-center gap-x-2'>
                            <div onClick={()=>setIsUserOrGroup(false)} className={'w-full ring-1 cursor-pointer rounded-sm p-2 dark:text-white text-black'+(isUserOrGroup==false?' dark:bg-blue-950/90 bg-gray-400 dark:hover:bg-blue-900 hover:bg-gray-400/70 dark:ring-blue-900 ring-gray-500/40  ':' dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 dark:ring-blue-800 ring-gray-500/40  ')}>Benutzer auswählen</div>
                            <div onClick={()=>setIsUserOrGroup(true)} className={'w-full ring-1 cursor-pointer rounded-sm p-2 dark:text-white text-black'+(isUserOrGroup==true?' dark:bg-blue-950/90 bg-gray-400 dark:hover:bg-blue-900 hover:bg-gray-400/70 dark:ring-blue-900 ring-gray-500/40  ':' dark:bg-blue-900/90 bg-gray-200 dark:hover:bg-blue-900 hover:bg-gray-300 dark:ring-blue-800 ring-gray-500/40  ')}>Gruppe auswählen</div>
                        </div>

                        {
                            isUserOrGroup?
                            <div className='w-full min-h-[150px] max-h-[380px] ring-1 flex flex-col items-start justify-start dark:ring-gray-400 ring-gray-500 mt-10 divide-y dark:divide-gray-700 divide-gray-400'>


                                <div className='w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'> 
                                <div className='w-14 mx-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800'>
                                <MdOutlineGroupAdd />
                                </div> 
                                <div className='w-full ml-2'>
                                    Gruppenname
                                </div>
                                <div className='w-32 '>
                                    Benutzerzahl
                                </div>
                            </div>

                                <div className='w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'> 
                                <div className='w-14 mx-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800'>
                                <MdOutlineGroupAdd />
                                </div> 
                                <div className='w-full ml-2'>
                                    Gruppenname
                                </div>
                                <div className='w-32 '>
                                    Benutzerzahl
                                </div>
                            </div>

                                <div className='w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'> 
                                <div className='w-14 mx-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800'>
                                <MdOutlineGroupAdd />
                                </div> 
                                <div className='w-full ml-2'>
                                    Gruppenname
                                </div>
                                <div className='w-32 '>
                                    Benutzerzahl
                                </div>
                            </div>


                                <div className='hidden w-full py-16 flex flex-col items-center justify-center'>
                                    Keine Gruppen vorhanden
                                </div>
                            </div>
                            :
                            <Fragment>
                            <div className='flex flex-row items-center justify-start mt-4' >
                                <label className='flex flex-row items-center justify-start mb-2'>
                                <input
                                type="checkbox" 
                                checked={['1'].length===[].length}
                                onChange={() => 'selectAll()'} 
                                className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
                                />
                                <a className='text-sm'>Alle auswählen</a>
                                </label>
                            </div>
                            <div className='w-full min-h-[150px] max-h-[380px] ring-1 flex flex-col items-start justify-start dark:ring-gray-400 ring-gray-500 divide-y dark:divide-gray-700 divide-gray-400'>



                            <div className='w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'>
                                <input
                                type="checkbox" 
                                checked={['1'].length===[].length} 
                                className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
                                />
                                <div className='w-8 ml-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800'>
                                <MdPerson />
                                </div>
                                <div className='w-16 ml-3'>SC</div>
                                <div className='w-full '>
                                    Username, Username
                                </div>
                                <div className='w-64 '>
                                    Grupkeit
                                </div>
                            </div>


                            <div className='w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'>
                                <input
                                type="checkbox" 
                                checked={['1'].length===[].length} 
                                className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
                                />
                                <div className='w-8 ml-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800'>
                                <MdPerson />
                                </div>
                                <div className='w-16 ml-3'>SC</div>
                                <div className='w-full '>
                                    Username, Username
                                </div>
                                <div className='w-64 '>
                                    Grupkeit
                                </div>
                            </div>


                            <div className='w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'>
                                <input
                                type="checkbox" 
                                checked={['1'].length===[].length} 
                                className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
                                />
                                <div className='w-8 ml-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800'>
                                <MdPerson />
                                </div>
                                <div className='w-16 ml-3'>SC</div>
                                <div className='w-full '>
                                    Username, Username
                                </div>
                                <div className='w-64 '>
                                    Grupkeit
                                </div>
                            </div>


                            <div className='w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'>
                                <input
                                type="checkbox" 
                                checked={['1'].length===[].length} 
                                className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
                                />
                                <div className='w-8 ml-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800'>
                                <MdPerson />
                                </div>
                                <div className='w-16 ml-3'>SC</div>
                                <div className='w-full '>
                                    Username, Username
                                </div>
                                <div className='w-64 '>
                                    Grupkeit
                                </div>
                            </div>


                            <div className='w-full flex flex-row items-center justify-start py-2 dark:hover:bg-white/10 bg-black/10 cursor-pointer px-2'>
                                <input
                                type="checkbox" 
                                checked={['1'].length===[].length} 
                                className=' w-4 aspect-square mr-2 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
                                />
                                <div className='w-8 ml-2 aspect-square rounded-full flex flex-col items-center justify-center dark:bg-blue-900/60 bg-gray-900/20 dark:text-gray-300 text-gray-800'>
                                <MdPerson />
                                </div>
                                <div className='w-16 ml-3'>SC</div>
                                <div className='w-full '>
                                    Username, Username
                                </div>
                                <div className='w-64 '>
                                    Grupkeit
                                </div>
                            </div>



                                <div className='hidden w-full py-16 flex flex-col items-center justify-center'>
                                    Keine Benutzer vorhanden
                                </div>
                            </div>
                            </Fragment>
                        }


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

export default DialogGroupUserSelect