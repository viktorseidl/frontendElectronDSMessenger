import React from 'react'
import { useDrop } from 'react-dnd'
import DraggableEvent from './DraggableEvent'

const DayColumn = ({ day, events, moveEvent }) => {
  const [, drop] = useDrop({
    accept: 'EVENT',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      if (!delta) return

      const newStart = new Date(item.start)
      newStart.setDate(day.getDate()) // Move event to dropped day
      newStart.setHours(item.start.getHours() + Math.floor(delta.y / 50)) // Adjust time based on drag

      const newEnd = new Date(newStart)
      newEnd.setMinutes(newEnd.getMinutes() + item.duration)

      moveEvent(item.id, newStart, newEnd)
    }
  })

  return (
    <div
      ref={drop}
      className="relative w-full dark:bg-gray-950 bg-stone-100  divide-y divide-gray-300 dark:divide-gray-700 "
    >
      {/* Time slots */}
      {[...Array(24)].map((_, hour) => (
        <div
          onClick={() =>
            alert(
              day.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'long'
              }) +
                ' ' +
                (hour > 9 ? hour : '0' + hour) +
                ':00'
            )
          }
          key={hour}
          className=" w-full h-[180px] pl-1 pt-1 text-xs text-gray-500"
        >
          {`${
            day.toLocaleDateString('de-DE', {
              weekday: 'short'
            }) +
            ' ' +
            (hour > 9 ? hour : '0' + hour)
          }:00`}
        </div>
      ))}

      {/* Events */}
      {events
        .filter((event) => isEventInDay(event, day))
        .map((event, index) => (
          <DraggableEvent key={event.id} event={event} index={index} />
        ))}
    </div>
  )
}

const isEventInDay = (event, day) => {
  return event.start.toDateString() === day.toDateString() || event.end > day
}

export default DayColumn
