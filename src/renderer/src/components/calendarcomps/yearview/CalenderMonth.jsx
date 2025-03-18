import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/de' // German month names
import { Link, useNavigate } from 'react-router-dom'
import DayLayer from './DayLayer'
import { getGermanHolidays } from './functions/functionHandler'

const CalendarMonth = ({ date, calmonth, feiertagemonth, monthevents, passData, setTermin }) => {
  const firstDayOfMonth = dayjs(date, 'DD.MM.YYYY').locale('de').startOf('month')
  const startDay = firstDayOfMonth.day()
  const startOffset = (startDay + 6) % 7
  const prevMonthDays = firstDayOfMonth.subtract(startOffset, 'day')
  const totalCells = 7 * 6
  const feiertage = getGermanHolidays(date.split('.')[2])
  const daysArray = Array.from({ length: totalCells }, (_, i) => prevMonthDays.add(i, 'day'))
  return (
    <div className="w-full mt-2">
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 text-xs font-[arial] px-4 py-0">
        {[
          'M.Montag',
          'D.Dienstag',
          'M.Mittwoch',
          'D.Donnerstag',
          'F.Freitag',
          'S.Samstag',
          'S.Sonntag'
        ].map((day) => (
          <div
            title={day.split('.')[1]}
            key={day}
            className="w-full aspect-square flex dark:text-yellow-700 items-center justify-center font-bold"
          >
            {day.split('.')[0]}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-xs font-[arial] px-4 py-0">
        {daysArray.map((day, index) => (
          <DayLayer
            day={day}
            date={date}
            daymonth={calmonth}
            passData={passData}
            key={day + index + 'hsah'}
            monatlicheFeiertage={feiertage.filter((i) => parseInt(i.datum.split('-')[1]))}
            monthevents={monthevents}
            setTermin={setTermin}
          />
        ))}
      </div>
    </div>
  )
}

export default CalendarMonth
