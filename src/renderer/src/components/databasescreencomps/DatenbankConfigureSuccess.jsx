import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { MdArrowForward, MdDone, MdDoneAll } from 'react-icons/md'

const DatenbankConfigureSuccess = () => {
  const [one, setone] = useState(false)
  const [two, settwo] = useState(false)
  const [three, setthree] = useState(false)
  const [four, setfour] = useState(false)
  const [five, setfive] = useState(false)
  const [six, setsix] = useState(false)
  const [seven, setseven] = useState(false)
  const returnInitial = (N) => {
    return (
      <>
        <div className="w-full flex flex-row items-center justify-start">
          <MdArrowForward className="inline mr-4" />
          <span className="mr-4">Tabelle "{N}" wird eingerichtet</span>{' '}
          <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '} Width={' w-4 '} />
        </div>
      </>
    )
  }
  const returnfinal = (N) => {
    return (
      <>
        <div className="w-full flex flex-row items-center justify-start">
          <MdArrowForward className="inline mr-4" />
          <span className="mr-4">Tabelle "{N}" wird eingerichtet</span>{' '}
          <MdDone className="inline" />
        </div>
      </>
    )
  }
  useEffect(() => {
    setTimeout(() => {
      setthree(true)
      setTimeout(() => {
        setone(true)
        setTimeout(() => {
          setfive(true)
          setTimeout(() => {
            settwo(true)
            setTimeout(() => {
              setsix(true)
              setTimeout(() => {
                setseven(true)
                setTimeout(() => {
                  setfour(true)
                }, 2000)
              }, 2000)
            }, 2000)
          }, 2000)
        }, 2000)
      }, 2000)
    }, 2000)
  }, [])
  return (
    <div className="flex flex-col items-start justify-start dark:text-white text-gray-800 border dark:border-gray-800 border-gray-400 shadow-lg dark:shadow-blue-900/80 shadow-gray-500/80 dark:bg-[#0a0e16] bg-gray-100 rounded-lg py-6 px-8">
      <div className="w-full animate-pulse  flex flex-row items-center justify-center">
        <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '} />
        <a className="ml-6 text-sm">
          Bitte warten ...
          <br />
          ...Datenbank wird konfiguriert
        </a>
      </div>
      <div className="w-full text-center mt-8">Tabellen werden konfiguriert...</div>
      <div className="w-full flex flex-col items-center justify-start mt-8">
        {three ? returnfinal('PinnwandTable') : returnInitial('PinnwandTable')}
        {one ? returnfinal('EMailTable') : returnInitial('EMailTable')}
        {five ? returnfinal('EMailColumn') : returnInitial('EMailColumn')}
        {two ? returnfinal('EMail_AnhangTable') : returnInitial('EMail_AnhangTable')}
        {six ? returnfinal('rreventsTable') : returnInitial('rreventsTable')}
        {seven ? returnfinal('rrevent_exceptionsTable') : returnInitial('rrevent_exceptionsTable')}
        {four ? (
          <div className="w-full mt-8 flex flex-col items-center dark:text-white text-black justify-center dark:bg-lime-700 bg-lime-600/40 rounded-sm py-2">
            Alle Tabellen wurden erfolgreich konfiguriert <MdDoneAll className="text-4xl mt-4" />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default DatenbankConfigureSuccess
