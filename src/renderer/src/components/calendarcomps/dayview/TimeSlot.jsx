import React from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import Event from './Event'
const TimeSlot = ({
  time,
  events,
  onDrop,
  addEvent,
  updateEventDuration,
  deleteEvent,
  editEvent,
  showNoteIDS,
  ityp
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ityp,
    drop: (item) => onDrop(time, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })

  const slotEvents = events.filter((event) => event.time === time)
  return (
    <div
      ref={drop}
      className={`h-[40px] p-0 ${
        isOver ? 'dark:bg-gray-600/40 bg-blue-200' : 'dark:bg-gray-950 bg-stone-100'
      }`}
      onDoubleClick={(e) => addEvent(time, e)}
    >
      <div className="flex space-x-2 max-w-full overflow-hidden">
        {slotEvents.map((event) => (
          <Event
            key={event.id}
            event={event}
            updateEventDuration={updateEventDuration}
            deleteEvent={deleteEvent}
            editEvent={editEvent}
            showNoteIDS={showNoteIDS}
            ityp={ityp}
          />
        ))}
      </div>
    </div>
  )
}

export default TimeSlot
