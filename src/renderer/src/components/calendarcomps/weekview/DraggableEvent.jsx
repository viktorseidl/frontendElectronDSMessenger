import React from 'react'
import { useDrag } from 'react-dnd'
import { differenceInMinutes } from 'date-fns'

const DraggableEvent = ({ event, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'EVENT',
    item: {
      id: event.id,
      start: event.start,
      duration: differenceInMinutes(event.end, event.start)
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const startHour = event.start.getHours()
  const startMinutes = event.start.getMinutes()
  const duration = differenceInMinutes(event.end, event.start) / 60
  const isMultiDay = event.start.toDateString() !== event.end.toDateString()
  console.log(index)
  const stepper = index === 0 ? 0 : index * 20
  return (
    <div
      ref={drag}
      className={`absolute h-auto bg-blue-500 text-white py-1  px-2  w-full rounded-md text-xs cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      } ${index == 0 ? ' mt-[20px] ' : ' mt-[' + index * 20 + 'px]'}`}
      style={{
        top: `${startHour * 180 + (startMinutes / 60) * 180}px`,
        left: '0',
        marginTop: `${stepper}px`
      }}
    >
      {console.log(duration)}
      {event.title}
    </div>
  )
}

export default DraggableEvent
