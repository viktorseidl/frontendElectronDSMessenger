import React, { Fragment, useEffect, useRef, useState } from 'react'
import imgs from './../../../assets/Logo.png'
import { MdClose } from 'react-icons/md'

const DeleteAlertDialog = ({ show, cancel, deletefunc, deleteObj }) => {
  const closer = (e) => {
    if (!e.target.closest("[aria-label='Ditab']")) {
      cancel()
    }
  }

  useEffect(() => {}, [])
  return (
    <Fragment>
      {show && (
        <div
          className="fixed inset-0 z-10  dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
          onClick={(e) => closer(e)}
        >
          <div
            aria-label="Ditab"
            className="min-w-[30%] max-w-[35%] max-h-[85%] flex z-40 flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm"
          >
            <div
              id="titlebar"
              className={
                'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'
              }
            >
              <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                <img src={imgs} className="w-10 h-2  " />
              </span>
              <MdClose onClick={() => cancel()} className="inline cursor-pointer" />
            </div>

            <div className="w-full h-[85%] overflow-auto flex flex-col scrollbar-thin scrollbar-thumb-gray-500  scrollbar-track-gray-200">
              <div className="w-full dark:bg-gray-900 bg-white px-6  pt-4">
                {deleteObj.type == 'rrule'
                  ? 'Möchten Sie diese gesamte Serie wirklich löschen?'
                  : 'Möchten Sie den Eintrag wirklich löschen?'}
              </div>
              <div className="w-full flex flex-row items-center gap-x-2 justify-end dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial]">
                <button
                  onClick={() => deletefunc(deleteObj)}
                  className={`px-4 py-2 mb-2 rounded-sm dark:bg-red-800 bg-red-300/60 dark:hover:bg-red-700 hover:bg-red-100 outline-none ring-1 dark:ring-red-700 ring-red-400/80 dark:text-gray-300 text-gray-800`}
                >
                  Löschen
                </button>
                <button
                  onClick={() => cancel()}
                  className={`px-4 py-2 mb-2 rounded-sm dark:bg-gray-800 bg-gray-300/60 dark:hover:bg-gray-700 hover:bg-gray-100 outline-none ring-1 dark:ring-gray-700 ring-gray-400/80 dark:text-gray-300 text-gray-800`}
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default DeleteAlertDialog
