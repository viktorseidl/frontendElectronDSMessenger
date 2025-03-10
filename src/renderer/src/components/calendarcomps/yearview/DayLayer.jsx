import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'dayjs/locale/de' // German month names
import ArrowSvg from './ArrowSvg'
import DailyEventsTab from './DailyEventsTab'
const DayLayer = ({ day, date, daymonth, monatlicheFeiertage, monthevents }) => {
  console.log(monthevents)
  const today = dayjs()
  const [feiertagevents, setfeiertagevents] = useState([])
  const [dayevents, setdayevents] = useState([])
  const [daytab, setDaytab] = useState(null)
  const navigate = useNavigate()
  const isCurrentMonth = day.month() === dayjs(date, 'DD.MM.YYYY').locale('de').month()
  const isCurrentYear = day.year() === dayjs(date, 'DD.MM.YYYY').locale('de').year()
  const isToday = day.isSame(today, 'day')
  const isFeiertag =
    monatlicheFeiertage.filter(
      (i) => i.datum.split('-')[1] == daymonth && i.datum.split('-')[2] == day.date()
    ).length > 0
      ? true
      : false
  const hatEintraege =
    monthevents.filter(
      (i) => i.datum.split('-')[1] == daymonth && i.datum.split('-')[2] == day.date()
    ).length > 0
      ? true
      : false
  const handlerClick = (iscurrent) => {
    iscurrent ? setDaytab(true) : ''
  }
  const handlerClickDouble = (iscurrent) => {
    iscurrent ? navigate('/calendar/day/' + day.year() + '/' + daymonth + '/' + day.date()) : ''
  }
  //console.log(daymonth)
  useEffect(() => {
    setfeiertagevents(
      monatlicheFeiertage.filter(
        (i) => i.datum.split('-')[1] == daymonth && i.datum.split('-')[2] == day.date()
      )
    )
    setdayevents(
      monthevents.filter(
        (i) => i.datum.split('-')[1] == daymonth && i.datum.split('-')[2] == day.date()
      )
    )
  }, [])
  return (
    <div
      onMouseLeave={() =>
        setTimeout(() => {
          setDaytab(null)
        }, 800)
      }
      className="w-full flex items-center justify-center"
    >
      {daytab != null && daytab == true ? (
        <DailyEventsTab
          daymonth={daymonth}
          setDaytab={setDaytab}
          day={day}
          isCurrentMonth={isCurrentMonth}
          isToday={isToday}
          isCurrentYear={isCurrentYear}
          feiertagevents={feiertagevents}
          dayevents={dayevents}
        />
      ) : (
        ''
      )}
      <span
        onClick={() => handlerClick(isCurrentMonth ? true : false)}
        onDoubleClick={() => handlerClickDouble(isCurrentMonth ? true : false)}
        className={`w-5/6 rounded-full aspect-square flex items-center justify-center 
            ${isCurrentMonth ? 'hover:bg-blue-400/20  cursor-pointer ' : 'dark:text-gray-700 text-gray-400 '} 
            ${isFeiertag && isCurrentMonth ? 'dark:bg-yellow-900 dark:text-white bg-yellow-200 font-bold' : hatEintraege && isCurrentMonth ? 'dark:bg-none dark:text-white bg-none font-bold ring-1 dark:ring-orange-800 ring-orange-200 ' : isToday && isCurrentMonth && isCurrentYear ? 'bg-blue-500 text-white font-bold' : ''} 
            `}
      >
        {day.date()}
      </span>
    </div>
  )
}

export default DayLayer
