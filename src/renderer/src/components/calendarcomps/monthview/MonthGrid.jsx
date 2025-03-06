import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWithinInterval,
  addDays,
  parseISO,
  startOfWeek,
  endOfWeek
} from 'date-fns'
import dayjs from 'dayjs'
import { getGermanHolidays } from './functions/functionHandler'
import DayCell from './DayCell'

const MonthGrid = ({ date }) => {
  const today = new Date()
  const startOfCurrentMonth = startOfMonth(dayjs(date, 'DD.MM.YYYY'))
  const endOfCurrentMonth = endOfMonth(dayjs(date, 'DD.MM.YYYY'))

  // Get the first day of the week that contains the first day of the current month
  const firstDayOfWeek = startOfWeek(startOfCurrentMonth, { weekStartsOn: 1 }) // Week starts on Monday
  // Get the last day of the week that contains the last day of the current month
  const lastDayOfWeek = endOfWeek(endOfCurrentMonth, { weekStartsOn: 1 })

  // Generate all the days between the start and end of the calendar view
  const monthDays = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek
  })
  console.log(monthDays)

  const [events, setEvents] = useState([
    { id: '1', title: 'Conference', start: '2025-03-05', end: '2025-03-07', color: 'bg-red-500' },
    {
      id: '2',
      title: 'Project Work',
      start: '2025-03-10',
      end: '2025-03-12',
      color: 'bg-blue-500'
    },
    {
      id: '5',
      title: 'Project Work',
      start: '2025-03-10',
      end: '2025-03-11',
      color: 'bg-blue-500'
    },
    { id: '3', title: 'Vacation', start: '2025-03-15', end: '2025-03-20', color: 'bg-green-500' }
  ])

  const moveEvent = (eventId, newDate) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              start: format(newDate, 'yyyy-MM-dd'),
              end: format(
                addDays(
                  newDate,
                  (parseISO(event.end) - parseISO(event.start)) / (1000 * 60 * 60 * 24)
                ),
                'yyyy-MM-dd'
              )
            }
          : event
      )
    )
  }
  const getFeiertage = () => {
    console.log(date)
    const [aday, amonth, ayear] =
      date != null
        ? date.split('.')
        : [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()]
    const parsedDate = new Date(`${ayear}-${amonth}-${aday}T00:00:00`).toISOString().split('T')[0]
    // console.log(formatDateTimeAlarmToString(parsedDate).split(' ')[0])
    let Feiertage = getGermanHolidays(date.split('.')[2])
    /**
     * {
  "id": 1740388137775,
  "time": 8,
  "realtimestart": "08:00",
  "duration": 9,
  "realtimeend": "10:15",
  "hexcolor": "#99ffFEFF",
  "title": "Geburtstag Annemarie Hürten",
  "datum": "2025-03-04",
  "isNoteAttached": null,
  "isEditable": false,
  "isAlarm": false,
  "isAlarmStamp": null,
  "eventTyp": 0,
  "isPublic": 1
}
     */
    Feiertage = [
      ...Feiertage,
      {
        id: 1740388137775,
        time: 8,
        realtimestart: calculateTime(8, 9).startTime,
        duration: 9,
        realtimeend: calculateTime(8, 9).endTime,
        hexcolor: '#99ffFEFF',
        title: 'Geburtstag Annemarie Hürten',
        datum: parsedDate,
        isNoteAttached: null,
        isEditable: false,
        isAlarm: false,
        isAlarmStamp: null,
        eventTyp: 0,
        isPublic: 1
      },
      {
        id: 1740388167780,
        time: 0,
        realtimestart: calculateTime(0, 3).startTime,
        duration: 3,
        realtimeend: calculateTime(0, 3).endTime,
        hexcolor: '#c1cff7FF',
        title: 'Team-Meeting',
        datum: parsedDate,
        isNoteAttached: 'hallo wie geht es dir',
        isEditable: true,
        isAlarm: true,
        isAlarmStamp: '28.02.2025 13:25',
        eventTyp: 0,
        isPublic: 0
      }
    ]
    setEvents(Feiertage.filter((e) => e.datum == parsedDate))
    console.log(
      date,
      Feiertage.filter((e) => e.datum == parsedDate)
    )
  }
  return (
    <DndProvider
      backend={HTML5Backend}
      className="w-full h-full flex flex-col items-start justify-start "
    >
      <div className="w-full h-10">
        <div className="grid grid-cols-7  h-full w-full  dark:bg-gray-800 bg-white divide-x dark:divide-gray-600 divide-gray-300">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
            <div
              key={day}
              className={`flex flex-col items-center justify-center w-full h-full font-bold ${day === 'Sa' || day === 'So' ? ' dark:bg-gray-700 bg-blue-100 ' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-grow h-[95%]">
        <div className="grid grid-cols-7 w-full h-full divide-x divide-y dark:divide-gray-600 divide-gray-300  ">
          {/* Render the days in the grid, including overflow days from previous and next month */}
          {monthDays.map((day) => (
            <DayCell
              key={day}
              date={day}
              events={events.filter((e) =>
                isWithinInterval(day, { start: parseISO(e.start), end: parseISO(e.end) })
              )}
              moveEvent={moveEvent}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}

export default MonthGrid
