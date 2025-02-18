import React from 'react' 
import { MdDone } from 'react-icons/md'

const Apiverbindungok = () => {
  return (
    <div className=' flex flex-row items-center justify-center border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8'>
    <div className='w-full bg-lime-600/40 p-4 flex flex-row items-center justify-center rounded'>
    <MdDone className='inline text-4xl' />
    <a className='ml-6 text-sm'>API-Verbindung erfolgreich ...<br />... die Datenbank wird vorbereitet</a>
    </div>
    </div>
  )
}

export default Apiverbindungok