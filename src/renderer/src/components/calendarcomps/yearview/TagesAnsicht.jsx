import React, { useEffect, useRef, useState } from 'react'
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { useRoles } from '../../../styles/RoleContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { filterOnMonthShortener, getTodayDate } from './functions/functionHandler'
import dayjs from 'dayjs'
import { util } from 'node-forge'
import MonatGrid from './MonatGrid'
import Search from './Search'

const TagesAnsicht = ({
  date,
  layer,
  newEntryAlertValue,
  newEntryAlertSetter,
  filteredevents,
  kategorien,
  updateFilteredEvents
}) => {
  const januar = filterOnMonthShortener(filteredevents, 1)
  const februar = filterOnMonthShortener(filteredevents, 2)
  const maerz = filterOnMonthShortener(filteredevents, 3)
  const april = filterOnMonthShortener(filteredevents, 4)
  const mai = filterOnMonthShortener(filteredevents, 5)
  const juni = filterOnMonthShortener(filteredevents, 6)
  const juli = filterOnMonthShortener(filteredevents, 7)
  const august = filterOnMonthShortener(filteredevents, 8)
  const september = filterOnMonthShortener(filteredevents, 9)
  const oktober = filterOnMonthShortener(filteredevents, 10)
  const november = filterOnMonthShortener(filteredevents, 11)
  const dezember = filterOnMonthShortener(filteredevents, 12)

  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const { jahr, monat, tag } = useParams()
  const viewRef = useRef(null)
  const navigate = useNavigate()

  const changeView = () => {
    const layer = viewRef.current.value
    navigate('/calendar/' + layer + '/' + jahr + '/' + monat + '/' + tag)
  }

  const getShiftedDateYear = (goBack, dateString) => {
    const parsedDate = dayjs(dateString, 'DD.MM.YYYY')

    if (!parsedDate.isValid()) {
      throw new Error('Invalid date format. Expected format: DD.MM.YYYY')
    }

    const newDate = goBack ? parsedDate.subtract(1, 'year') : parsedDate.add(1, 'year')

    return newDate.format('DD.MM.YYYY')
  }

  const handleLink = (bool, date) => {
    const b = getShiftedDateYear(bool, date)
    return (
      '/calendar/year/' +
      parseInt(b.split('.')[2]) +
      '/' +
      parseInt(b.split('.')[1]) +
      '/' +
      parseInt(b.split('.')[0])
    )
  }
  useEffect(() => {}, [filteredevents.length])
  return (
    <div className="w-full h-full  flex flex-col items-start justify-start">
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
            to={handleLink(true, date)}
            className="w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-4 text-3xl"
          >
            <MdArrowLeft />
          </Link>
          <Link
            to={handleLink(false, date)}
            className=" w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-1 text-3xl"
          >
            <MdArrowRight />
          </Link>
          <span className=" py-2 dark:text-gray-300 ml-2 text-lg">
            Jahr {parseInt(date.split('.')[2])}
          </span>
        </div>
        <div className="w-[60%] h-20 flex flex-col items-center justify-center ">
          <div className="w-full h-full  flex flex-row items-center justify-between gap-x-2">
            <Search filteredevents={filteredevents} />
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
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-[91.8%] shadow-inner dark:shadow-gray-200">
        <div className="w-full flex flex-col items-start justify-start max-h-full pb-0 overflow-y-scroll dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200">
          <div className="w-full relative  dark:bg-gray-900 bg-blue-50 flex flex-row items-start justify-start ">
            <div className="w-full h-full dark:bg-gray-950 bg-stone-100 dark:text-gray-400 text-gray-900 ">
              <div className="w-full relative dark:bg-gray-900 bg-white ">
                <div className="w-full z-10 grid relative grid-cols-4 gap-2 p-4 ">
                  <MonatGrid date={'01.01.' + jahr} monthnum={1} filteredevents={januar} />
                  <MonatGrid date={'01.02.' + jahr} monthnum={2} filteredevents={februar} />
                  <MonatGrid date={'01.03.' + jahr} monthnum={3} filteredevents={maerz} />
                  <MonatGrid date={'01.04.' + jahr} monthnum={4} filteredevents={april} />
                  <MonatGrid date={'01.05.' + jahr} monthnum={5} filteredevents={mai} />
                  <MonatGrid date={'01.06.' + jahr} monthnum={6} filteredevents={juni} />
                  <MonatGrid date={'01.07.' + jahr} monthnum={7} filteredevents={juli} />
                  <MonatGrid date={'01.08.' + jahr} monthnum={8} filteredevents={august} />
                  <MonatGrid date={'01.09.' + jahr} monthnum={9} filteredevents={september} />
                  <MonatGrid date={'01.10.' + jahr} monthnum={10} filteredevents={oktober} />
                  <MonatGrid date={'01.11.' + jahr} monthnum={11} filteredevents={november} />
                  <MonatGrid date={'01.12.' + jahr} monthnum={12} filteredevents={dezember} />
                </div>
                <div className="absolute select-none z-0 inset left-0 top-0 w-full h-full flex flex-col items-center justify-center dark:text-[12rem] text-[12rem] overflow-hidden dark:opacity-15 opacity-10 exo font-bold  ">
                  {jahr}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagesAnsicht
