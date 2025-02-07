import { util } from 'node-forge'
import React, { useEffect }  from 'react'
import { FaShareFromSquare } from 'react-icons/fa6'
import { MdAttachment, MdDeleteForever, MdPriorityHigh, MdShare } from 'react-icons/md'
import { Link } from 'react-router-dom'

const RowMessageOut = ({item}) => {
    const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
    console.log(item.Sendername)
    useEffect(()=>{

    },[])
  return ( 
   <Link to={'/message/'+item.ID} state={item} className='w-full dark:bg-gray-900 bg-white dark:hover:bg-orange-300/20 hover:bg-blue-500/10 cursor-pointer grid grid-cols-12 items-start justify-items-start'>
    <div className='w-full flex flex-row items-center justify-center py-2'>
    
    <div className='w-12 aspect-square dark:bg-blue-100 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
                        <b className='text-sm uppercase'>{User.Name.includes('+') ? User.Name.replace(/\+/g, '') : User.Name}</b>
    </div>
    </div>
    <div className='w-full col-span-11 px-8  py-2 pl-0 flex flex-col items-start justify-start '>
        <div className='w-full flex flex-row items-start justify-between'>
        
            <b className='flex flex-row truncate'>
            <span className='dark:text-gray-400 font-normal text-sm mr-1'>Gesendet an:</span><span className='w-6 aspect-square dark:text-gray-400 text-black/70 mr-4 flex flex-col items-center justify-center '>
                <FaShareFromSquare   className='inline' />
            </span> 
            {
                item.Sendername.map((it,index)=>(
                    <div key={it+index} title={'Gesendet an '+it} className='min-w-16 max-w-20  text-xs dark:bg-blue-100 bg-gray-100 text-gray-800 rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-700 ring-gray-300'>
                        <b className='text-xs'>{it}</b> 
                    </div>
                ))
            } </b>
            <div className='text-sm dark:text-white text-black font-sans font-semibold'>{item.FormattedDate}</div>
        </div>
        <div className='w-full flex flex-row items-start justify-between'>
            <div className='text-[13px] dark:text-gray-300 text-gray-600 font-[arial] w-[90%] flex flex-row items-center justify-start'>
            {
                item.Anhang>0?
                <div className='w-6 aspect-square dark:text-gray-400 cursor-pointer dark:bg-gray-900 bg-gray-100 shadow-inner  shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-700 ring-gray-300'>
                    <MdAttachment  title='Nachricht beinhaltet Anhänge' className='inline' />
                </div>
                :''
            }
            {
                item.Wichtig==0?
                <div className='w-4 aspect-square cursor-pointer  dark:bg-red-800 bg-red-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-red-700 ring-red-600'>
                <MdPriorityHigh  title='Als wichtig makiert' className='inline' />
                </div>
                :''
            }
            <p className='pl-4 truncate'><b className='dark:text-white text-gray-700 text-[16px] mr-4'> {item.Betreff}</b>{item.Nachricht}</p>
            </div>
            <div className='text-sm flex flex-row items-start justify-start'>

            
            

            </div>
        </div>
    </div>
</Link>           
  )
}

export default RowMessageOut