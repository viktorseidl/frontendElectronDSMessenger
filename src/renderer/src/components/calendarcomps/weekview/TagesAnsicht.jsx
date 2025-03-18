import React, { useEffect, useRef, useState } from 'react'
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { formatGermanDate, getShiftedDateWeek, getTodayDate } from './functions/functionHandler'
import ColumnIntervalRow from './ColumnIntervalRow'
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  getWeek,
  format,
  addWeeks,
  subWeeks,
  isToday,
  parseISO,
  isDate
} from 'date-fns'
import dayjs from 'dayjs'
import WeekGrid from './WeekGrid'
import DndProviderWrapper from './DndProviderWrapper'

const TagesAnsicht = ({ date, publicView, layer }) => {
  const divRef = useRef(null)
  const viewRef = useRef(null)
  const navigate = useNavigate()
  const [minHeight, setMinHeight] = useState(0)
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Meeting',
      start: new Date('2025-03-17T09:00:00'),
      end: new Date('2025-03-17T10:00:00')
    },
    {
      id: '2',
      title: 'Krank',
      start: new Date('2025-03-19T11:00:00'),
      end: new Date('2025-03-19T12:00:00')
    },
    {
      id: '3',
      title: 'Telefon Meeting',
      start: new Date('2025-03-17T12:00:00'),
      end: new Date('2025-03-17T13:00:00')
    },
    {
      id: '4',
      title: 'Mitarbeiter Gespräch',
      start: new Date('2025-03-17T09:00:00'),
      end: new Date('2025-03-17T10:00:00')
    }
  ])
  const rows = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]
  const getWeekDays = (date) => {
    console.log(date)
    let b = date == null ? new Date() : dayjs(date, 'DD.MM:YYYY').toDate()
    const startOfCurrentWeek = startOfWeek(b, { weekStartsOn: 1 }) // Week starts on Monday
    const endOfCurrentWeek = endOfWeek(b, { weekStartsOn: 1 })
    return eachDayOfInterval({
      start: startOfCurrentWeek,
      end: endOfCurrentWeek
    })
  }
  const moveEvent = (eventId, newStart, newEnd) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
      )
    )
  }
  const CurrentTimeLine = ({ pixel }) => {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
      return () => clearInterval(interval)
    }, [publicView])

    const currentTimePixels = currentTime.getHours() * 60 + currentTime.getMinutes()
    return (
      <div
        className="w-[88%] absolute inset left-32 right-0 h-[1px] dark:bg-red-500 bg-gray-800 z-0"
        style={{ top: `${parseInt(currentTimePixels) * ((24 * 180) / 1440) + 40}px` }}
      >
        <div className="w-full relative">
          <div className="absolute left-0 -top-[4px] p-1 rounded-full dark:bg-red-500 bg-gray-800"></div>
          <div className="absolute right-0 dark:bg-red-700 bg-gray-800 h-5 text-white text-xs -top-[20px] pb-1 pt-[2px] px-2">
            {currentTime.getHours() > 9 ? currentTime.getHours() : '0' + currentTime.getHours()}:
            {currentTime.getMinutes() > 9
              ? currentTime.getMinutes()
              : '0' + currentTime.getMinutes()}{' '}
            Aktuelle Uhrzeit
          </div>
        </div>
      </div>
    )
  }
  const changeView = () => {
    const layer = viewRef.current.value
    navigate(
      '/calendar/' +
        layer +
        '/' +
        parseInt(getTodayDate().split('.')[2]) +
        '/' +
        parseInt(getTodayDate().split('.')[1]) +
        '/' +
        parseInt(getTodayDate().split('.')[0])
    )
  }
  useEffect(() => {
    if (divRef.current && minHeight == 0) {
      setMinHeight(divRef.current.clientHeight)
    }
  }, [])
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
              '/calendar/week/' +
              parseInt(getShiftedDateWeek(true, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDateWeek(true, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDateWeek(true, date).split('.')[0])
            }
            className="w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-4 text-3xl"
          >
            <MdArrowLeft />
          </Link>
          <Link
            to={
              '/calendar/week/' +
              parseInt(getShiftedDateWeek(false, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDateWeek(false, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDateWeek(false, date).split('.')[0])
            }
            className=" w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-1 text-3xl"
          >
            <MdArrowRight />
          </Link>
          <span className=" py-2 dark:text-gray-300 ml-2 text-lg">
            {getWeekDays(date)[0]?.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: 'short'
            })}
            {' - '}
            {getWeekDays(date)[getWeekDays(date).length - 1]?.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}{' '}
            <a className="text-sm">
              (Woche
              {' ' +
                getWeek(
                  dayjs(
                    getWeekDays(date)[0].toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }),
                    'DD.MM:YYYY'
                  )
                )}
              )
            </a>
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
        <div className="w-full flex flex-col items-start justify-start max-h-full overflow-y-scroll dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200">
          <div className="w-full relative  dark:bg-gray-900 bg-blue-50 flex flex-row items-start justify-start ">
            <div className="w-40 flex flex-col dark:bg-gray-800 bg-white items-start justify-evenly h-full  divide-y dark:divide-gray-700 divide-gray-300">
              <div className="w-full h-[40px] text-sm dark:bg-gray-950 bg-stone-100">&nbsp;</div>
              {rows.map((item, index) => (
                <ColumnIntervalRow key={index + item + '1stcolumn'} T={item} />
              ))}
            </div>
            <DndProviderWrapper>
              <WeekGrid events={events} moveEvent={moveEvent} date={getWeekDays(date)[0]} />
            </DndProviderWrapper>
            <CurrentTimeLine pixel={2.5} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagesAnsicht
