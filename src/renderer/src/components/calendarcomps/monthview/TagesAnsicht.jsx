import React, { useEffect, useRef, useState } from 'react'
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  formatGermanDateMonthView,
  getShiftedDateMonthView,
  getTodayDate
} from './functions/functionHandler'
import MonthGrid from './MonthGrid'
const TagesAnsicht = ({
  date,
  layer,
  filteredevents,
  kategorien,
  updateFilteredEvents,
  handleDrop
}) => {
  const { jahr, monat, tag } = useParams()
  const divRef = useRef(null)
  const viewRef = useRef(null)
  const navigate = useNavigate()
  const changeView = () => {
    const layer = viewRef.current.value
    navigate('/calendar/' + layer + '/' + jahr + '/' + monat + '/' + tag)
  }
  useEffect(() => {}, [date])
  return (
    <div ref={divRef} className="w-full h-full  flex flex-col items-start justify-start ">
      <div className="w-full h-20 py-4 px-4 flex flex-row items-center justify-start gap-x-2">
        <div className="w-[40%] h-20 flex flex-row items-center justify-start ">
          <Link
            to={
              '/calendar/day/' +
              parseInt(getTodayDate().split('.')[2]) +
              '/' +
              parseInt(getTodayDate().split('.')[1]) +
              '/' +
              parseInt(getTodayDate().split('.')[0])
            }
            title="Heute anzeigen"
            className="px-4 py-2 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded-xl  dark:bg-transparent ring-1 ring-gray-700   outline-none flex flex-col items-center justify-center"
          >
            Heute
          </Link>
          <Link
            to={
              '/calendar/month/' +
              parseInt(getShiftedDateMonthView(true, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDateMonthView(true, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDateMonthView(true, date).split('.')[0])
            }
            className="w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-4 text-3xl"
          >
            <MdArrowLeft />
          </Link>
          <Link
            to={
              '/calendar/month/' +
              parseInt(getShiftedDateMonthView(false, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDateMonthView(false, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDateMonthView(false, date).split('.')[0])
            }
            className=" w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-1 text-3xl"
          >
            <MdArrowRight />
          </Link>
          <span className=" py-2 dark:text-gray-300 ml-2 text-lg">
            {formatGermanDateMonthView(date)}
          </span>
        </div>
        <div className="w-[60%] h-20 flex flex-col items-center justify-center ">
          <div className="w-full h-full  flex flex-row items-center justify-between gap-x-2">
            <label className="  w-[70%] flex flex-col items-center justify-center relative">
              <input
                title="Suche nach Einträgen"
                className=" w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm"
                placeholder="Suche nach..."
                value={''}
                onChange={(e) => 'handleFilterChange("Betrefftxt", e.target.value)'}
              />
              <FaSearch className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
              <MdClose
                onClick={() => 'handleFilterChange("Betrefftxt", "")'}
                className={
                  'absolute hidden cursor-pointer inset right-3 text-2xl top-[0.1rem] text-gray-500 hover:text-gray-400'
                }
              />
            </label>
            <select
              title="Kalenderansicht ändern"
              ref={viewRef}
              onChange={() => changeView()}
              defaultValue={layer}
              className=" w-auto px-4 py-2 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none text-sm "
            >
              <option value={'day'} selected>
                Tag
              </option>
              <option value={'week'}>Woche</option>
              <option value={'month'}>Monat</option>
              <option value={'year'}>Jahr</option>
              <option value={'agenda'}>Terminübersicht</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-[91.8%] shadow-inner dark:shadow-gray-200">
        <div className="w-full flex flex-col items-start justify-start h-full  overflow-hidden">
          <div className="w-full h-full dark:bg-gray-900 bg-blue-50 flex flex-row items-start justify-start ">
            <div className="w-full h-full dark:bg-gray-950 bg-stone-100 dark:text-gray-400 text-gray-900 border-t border-l dark:border-gray-700 border-gray-400">
              <MonthGrid
                handleDrop={handleDrop}
                date={date}
                filteredevents={filteredevents}
                updateFilteredEvents={updateFilteredEvents}
                kategorien={kategorien}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagesAnsicht
