import React from 'react'
import Timeslot from './Timeslot'
import dayjs from 'dayjs'

const DayColumn = ({ day, index, events, handleDrop, showDayList }) => {
  return (
    <div
      className={`relative w-full  divide-y divide-gray-300 dark:divide-gray-700 ${day > dayjs(new Date()).subtract(1, 'day').toDate() ? ' dark:bg-gray-950 bg-stone-100  ' : ' dark:bg-stone-800/60 bg-stone-300/20  '}`}
    >
      {/* Time slots for each day */}
      {[...Array(24)].map((_, hour) => (
        <Timeslot
          key={day + index + hour + 'timesloter'}
          day={day}
          hour={hour}
          handleDrop={handleDrop}
          events={events.filter((ev) => ev.time == hour)}
          showDayList={showDayList}
        />
      ))}
    </div>
  )
}

export default DayColumn
