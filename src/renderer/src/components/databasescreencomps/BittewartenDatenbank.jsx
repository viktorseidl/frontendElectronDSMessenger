import React from 'react'
import Loader from '../Loader'

const BittewartenDatenbank = () => {
  return (
    <div className='animate-pulse  flex flex-row items-center justify-center border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
    <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '}  />
    <a className='ml-6 text-sm'>Bitte warten ...<br/>...Datenbank wird konfiguriert</a>
    </div>
  )
}

export default BittewartenDatenbank