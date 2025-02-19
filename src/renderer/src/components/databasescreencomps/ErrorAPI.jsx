import React from 'react' 
import { MdErrorOutline } from 'react-icons/md'

const ErrorAPI = () => {
  return (
    <div className=' flex flex-row items-center justify-center border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
    <div className='w-full dark:bg-pink-600 bg-red-600  dark:text-white text-white p-4 flex flex-row items-center justify-center rounded'>
    <MdErrorOutline className='inline text-4xl animate-bounce' />
    <a className='ml-6 text-sm'>ERROR - Eine Verbindung zum Backend ...<br/> ... konnte nicht aufgebaut werden ... <br/> ... überprüfen Sie die Erreichbarkeit ... <br/> ... von "localhost"</a>
    </div>
    </div>
  )
}

export default ErrorAPI