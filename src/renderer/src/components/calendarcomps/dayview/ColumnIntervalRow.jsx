import React from 'react'

const ColumnIntervalRow = ({T}) => {
    const start=T>9?T.toString():'0'+T.toString() 
    const end=parseInt(Number(T)+1)
    return(
        <div className='w-full h-[40px]  dark:hover:bg-[rgba(255,255,255,0.06)] flex flex-col items-center justify-start'  aria-label={'start_'+start+':00,ende_'+(end=='24'?'00':T)+':00'}>
        {start}:00
      </div> 
    )
}

export default ColumnIntervalRow