import React, { useEffect } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../styles/ThemeContext' 
const TabBar = ({handleMaximize,handleClose,handleMinimize,imgs}) => {
    const {theme,toggleTheme}=useTheme(); 
    useEffect(()=>{ 
    },[theme])
  return (
    <div id="titlebar" className={'fixed top-0 left-0 w-full dark:bg-[#1b243b] bg-[#0c101b]'} > 
      <span className=" w-[80%] draged font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-start gap-x-2"><img src={imgs} className='w-10 h-2  ' />Messenger</span>
      <div className="flex flex-row items-center justify-center gap-x-4 pr-1"> 
        <button onClick={toggleTheme}>{theme===true||theme==="true"?<MdDarkMode className='inline' />:<MdLightMode className='inline' />}</button>
        <button onClick={handleMaximize}>🗖</button>
        <button className='px-1' onClick={handleMinimize}>-</button>
        <button className='px-1' onClick={handleClose}>x</button>
      </div>
    </div>
  )
}

export default TabBar