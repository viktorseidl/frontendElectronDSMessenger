import React, { useEffect } from 'react'
import { format } from 'date-fns'
import DayColumn from './DayColumn'

const WeekGrid = ({ events, moveEvent, date }) => {
  const weekStart = date // Assume the current week start
  useEffect(() => {}, [date])
  return (
    <div className="w-full  border-none grid grid-cols-7 divide-x divide-gray-300 dark:divide-gray-700">
      {/* Weekday Headers */}
      {Array.from({ length: 7 }).map((_, index) => {
        const day = new Date(weekStart)
        day.setDate(weekStart.getDate() + index)

        return (
          <div
            key={index}
            className="w-full h-[40px] pl-2 text-sm py-2 border-y first:border-l  border-gray-300 dark:border-gray-700"
          >
            <b className="mr-2 text-[16px]">
              {day.toLocaleDateString('de-DE', { weekday: 'short' })}
            </b>
            {format(day, 'dd.MM.yyyy')}
          </div>
        )
      })}

      {/* Grid Columns for Days */}
      <div className="relative col-span-7 grid grid-cols-7 divide-x divide-gray-300 dark:divide-gray-700">
        {Array.from({ length: 7 }).map((_, dayIndex) => {
          const day = new Date(weekStart)
          day.setDate(weekStart.getDate() + dayIndex)

          return <DayColumn key={dayIndex} day={day} events={events} moveEvent={moveEvent} />
        })}
      </div>
    </div>
  )
}

export default WeekGrid
