import React from 'react'
import { useDrop } from 'react-dnd'
import { format, getDay, parseISO } from 'date-fns'
import EventItem from './EventItem'
const DayCell = ({ date, events, moveEvent }) => {
  const [, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item) => moveEvent(item.id, date)
  }))
  const sortedEvents = [...events].sort((a, b) => parseISO(a.start) - parseISO(b.start))
  return (
    <div
      className={`min-h-[100%] ${getDay(date) === 0 || getDay(date) === 6 ? ' dark:bg-gray-700 bg-blue-100 ' : ''} flex flex-col items-start justify-start first:border-t first:border-l dark:border-gray-600 border-gray-300 `}
    >
      <div className="w-full text-sm text-gray-400 py-1  flex flex-col items-center justify-center select-none">
        <a
          className={` ${
            format(date, 'd').toString() +
              format(date, 'M').toString() +
              format(date, 'Y').toString() ===
            format(new Date(), 'd').toString() +
              format(new Date(), 'M').toString() +
              format(new Date(), 'Y').toString()
              ? ' bg-blue-600 text-white px-2 rounded-full '
              : '  '
          } `}
        >
          {format(date, 'd')}
        </a>
      </div>

      <div ref={drop} className=" w-full  flex-grow dark:bg-gray-900 bg-white  relative">
        <div className="w-full relative">
          {sortedEvents.map((event, index) => (
            <EventItem key={event.id} event={event} moveEvent={moveEvent} zIndex={index + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DayCell
