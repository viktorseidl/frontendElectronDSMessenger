import React, { useEffect, useState } from 'react'
import CalendarMonth from './CalenderMonth'
import { useParams } from 'react-router-dom'

const YearlyCalendar = () => {
  const { jahr, monat, tag } = useParams()
  const months = Array.from({ length: 12 }, (_, i) => i + 1) // [1, 2, ..., 12]
  const [events, setEvents] = useState([
    {
      id: 1740388167780,
      time: 10,
      realtimestartDate: new Date('2025', 2, 1 + 1),
      realtimestart: '10:00',
      duration: 3,
      realtimeendDate: new Date('2025', 2, 1 + 1),
      realtimeend: '10:45',
      hexcolor: '#c1cff7FF',
      title: 'Team-Meeting',
      datum: '2025-02-28',
      isNoteAttached: 'hallo wie geht es dir',
      isEditable: true,
      isAlarm: true,
      isAlarmStamp: '28.02.2025 09:25',
      eventTyp: 0,
      isPublic: 0
    },
    {
      id: 1740388167780,
      time: 13,
      realtimestartDate: new Date('2025', 3, 5 + 1),
      realtimestart: '13:00',
      duration: 3,
      realtimeendDate: new Date('2025', 3, 5 + 1),
      realtimeend: '13:45',
      hexcolor: '#c1cff7FF',
      title: 'Team-Meeting',
      datum: '2025-03-04',
      isNoteAttached: 'hallo wie geht es dir',
      isEditable: true,
      isAlarm: true,
      isAlarmStamp: '04.03.2025 09:25',
      eventTyp: 0,
      isPublic: 0
    }
  ])
  const AllMonth = ({ mon }) => {
    return (
      <div key={mon} className="p-2">
        <h3 className="text-lg font-bold text-center mb-2">
          {new Date(jahr, mon - 1).toLocaleDateString('de-DE', {
            month: 'long'
          })}
        </h3>
        <CalendarMonth
          date={`${tag > 9 ? tag : '0' + tag}.${mon.toString().padStart(2, '0')}.${jahr}`}
          calmonth={mon}
          feiertagemonth={new Date(jahr, mon - 1).getMonth()}
          monthevents={events}
        />
      </div>
    )
  }

  useEffect(() => {}, [])
  return (
    <div className="w-full relative ">
      <div className="w-full z-10 grid relative grid-cols-4 gap-2 p-4 ">
        {months.map((mon, index) => (
          <AllMonth mon={mon} key={mon + index + 'monatTitle'} />
        ))}
      </div>
      <div className="absolute select-none z-0 inset left-0 top-0 w-full h-full flex flex-col items-center justify-center dark:text-[12rem] text-[12rem] overflow-hidden dark:opacity-15 opacity-10 exo font-bold">
        {jahr}
      </div>
    </div>
  )
}

export default YearlyCalendar
