import React, { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import Event from './Event'
import EventRR from './EventRR'
const TimeSlot = ({
  time,
  events,
  onDrop,
  addEvent,
  deleteEvent,
  updateEventStandard,
  updateEventRRule,
  ityp
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ityp,
    drop: (item) => onDrop(time, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })
  const slotEvents = events.length > 0 ? events.filter((event) => event.time === time) : []
  useEffect(() => {}, [events])

  return (
    <div
      ref={drop}
      className={`h-[40px] p-0 ${
        isOver ? 'dark:bg-gray-600/40 bg-blue-200' : 'dark:bg-gray-950 bg-stone-100'
      }`}
      onDoubleClick={(e) => addEvent(time, e)}
    >
      <div className="flex space-x-2 max-w-full overflow-hidden">
        {/*TODO Old Events bearbeiten */}
        {slotEvents
          .filter((e) => e.katBezeichnung == 'Termin')
          .map((event) => (
            <Event
              key={event.id}
              event={event}
              updateEventStandard={updateEventStandard}
              deleteEvent={deleteEvent}
              ityp={ityp}
            />
          ))}
        {/*TODO RRules Events bearbeiten */}
        {slotEvents
          .filter((e) => e.katBezeichnung == 'rrule' && e.zeitraum != 1440)
          .map((event, index) => (
            <EventRR
              key={event.id + index}
              event={event}
              deleteEvent={deleteEvent}
              updateEventRRule={updateEventRRule}
            />
          ))}
      </div>
    </div>
  )
}

export default TimeSlot
