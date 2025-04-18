import React, { useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import Event from './Event'
import { useRoles } from '../../../styles/RoleContext'
import EventKategorien from './EventKategorien'
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
        {slotEvents.filter(
          (e) =>
            e.katBezeichnung !== null &&
            (e.katBezeichnung === 'Personalausweis' ||
              e.katBezeichnung === 'BewohnerGEZ' ||
              e.katBezeichnung === 'BewohnerGeburtstag' ||
              e.katBezeichnung === 'BewohnerGenehmigung' ||
              e.katBezeichnung === 'Pflegewohngeld' ||
              e.katBezeichnung === 'Tabellenwohngeld' ||
              e.katBezeichnung === 'Schwerbehindertausweis' ||
              e.katBezeichnung === 'Pflegevisite' ||
              e.katBezeichnung === 'Evaluierung' ||
              e.katBezeichnung === 'Wundauswertung' ||
              e.katBezeichnung === 'Wundvermessung' ||
              e.katBezeichnung === 'Evaluierung Betreuung' ||
              e.katBezeichnung === 'Bradenskala' ||
              e.katBezeichnung === 'Nortonskala' ||
              e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen' ||
              e.katBezeichnung === 'Sicherheitstechnische Kontrolle' ||
              e.katBezeichnung === 'Evaluierung Kontraktur' ||
              e.katBezeichnung === 'Geburtstag')
        ).length > 0 ? (
          <EventKategorien
            key={'BewohnerPersonalausweisAnsichtBewohner'}
            event={slotEvents.filter(
              (e) =>
                e.katBezeichnung !== null &&
                (e.katBezeichnung === 'Personalausweis' ||
                  e.katBezeichnung === 'BewohnerGEZ' ||
                  e.katBezeichnung === 'BewohnerGeburtstag' ||
                  e.katBezeichnung === 'BewohnerGenehmigung' ||
                  e.katBezeichnung === 'Pflegewohngeld' ||
                  e.katBezeichnung === 'Tabellenwohngeld' ||
                  e.katBezeichnung === 'Schwerbehindertausweis' ||
                  e.katBezeichnung === 'Pflegevisite' ||
                  e.katBezeichnung === 'Evaluierung' ||
                  e.katBezeichnung === 'Wundauswertung' ||
                  e.katBezeichnung === 'Wundvermessung' ||
                  e.katBezeichnung === 'Evaluierung Betreuung' ||
                  e.katBezeichnung === 'Bradenskala' ||
                  e.katBezeichnung === 'Nortonskala' ||
                  e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen' ||
                  e.katBezeichnung === 'Sicherheitstechnische Kontrolle' ||
                  e.katBezeichnung === 'Evaluierung Kontraktur' ||
                  e.katBezeichnung === 'Geburtstag')
            )}
          />
        ) : (
          ''
        )}
        {slotEvents
          .filter((e) => e.katBezeichnung == 'Termin')
          .map((event) => (
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
