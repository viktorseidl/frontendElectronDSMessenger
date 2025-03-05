import React, { useEffect, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DialogEventDayEntry from '../../DialogEventDayEntry'
import dayjs from 'dayjs'
import {
  calculateTime,
  formatDateTimeAlarmToString,
  getGermanHolidays,
  getIntervalCount
} from './functions/functionHandler'
import TimeSlot from './TimeSlot'

const ItemType = 'EVENT'

const DayLayoutGrid = ({ fullheight, date, publicView }) => {
  const [dialogev, setdialogev] = useState(false)
  const [dialogtyp, setdialogtyp] = useState(null)
  const [dtobj, setdtobj] = useState(null)
  const [editobj, seteditobj] = useState(null)
  const [events, setEvents] = useState([
    {
      id: 1740388137775,
      time: 8,
      realtimestart: calculateTime(8, 9).startTime,
      duration: 9,
      realtimeend: calculateTime(8, 9).endTime,
      hexcolor: '#99ffFEFF',
      title: 'Geburtstag Annemarie Hürten',
      datum: date,
      isNoteAttached: null,
      isEditable: false,
      isAlarm: false,
      isAlarmStamp: null,
      eventTyp: 0,
      isPublic: 1
    },
    {
      id: 1740388167780,
      time: 1,
      realtimestart: calculateTime(1, 8).startTime,
      duration: 8,
      realtimeend: calculateTime(1, 8).endTime,
      hexcolor: '#c1cff7FF',
      title: 'Team-Meeting',
      datum: date,
      isNoteAttached: 'hallo wie geht es dir',
      isEditable: true,
      isAlarm: true,
      isAlarmStamp: '28.02.2025 13:25',
      eventTyp: 0,
      isPublic: 0
    }
  ])

  const handleDrop = (timeSlot, item) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === item.id
          ? {
              ...ev,
              time: timeSlot,
              realtimestart: calculateTime(timeSlot, ev.duration).startTime,
              realtimeend: calculateTime(timeSlot, ev.duration).endTime
            }
          : ev
      )
    )
  }
  const showNoteIDS = (id, lastheight, toogle) => {
    if (toogle == true && document.getElementById('shownote' + id).style.display != 'block') {
      document.getElementById(id).style.height = 'auto'
      document.getElementById(id).style.zIndex = 1000
      document.getElementById('shownote' + id).style.display = 'block'
    } else {
      document.getElementById(id).style.height = lastheight + 'px'
      document.getElementById(id).style.zIndex = 0
      document.getElementById('shownote' + id).style.display = 'none'
    }
  }
  const editEvent = (item) => {
    setdtobj(dayjs(date + ' ' + item.realtimestart, 'DD.MM:YYYY HH:mm').toDate())
    seteditobj(item)
    setdialogtyp(true)
    setdialogev(true)
  }
  const addEvent = (timeSlot, e) => {
    if (e.target.getAttribute('aria-label') == 'isbuttondoubleclick') return
    if (e.target.classList.contains('resize-handle')) return
    setdtobj(
      dayjs(
        date + ' ' + (timeSlot > 9 ? timeSlot : '0' + timeSlot) + ':00',
        'DD.MM:YYYY HH:mm'
      ).toDate()
    )
    setdialogtyp(null)
    setdialogev(true)
  }
  const addNote = (Arr) => {
    setdialogev(false) //Close Dialog
    const timeSlot = Arr[1].getHours()
    const duration = getIntervalCount(Arr[1], Arr[2])
    const isprivate = Arr[7] ? 1 : 0
    const startTag = Arr[1].getDate()
    const startMonat = Arr[1].getMonth() + 1
    const startJahr = Arr[1].getFullYear()
    const isNote = Arr[3] != null ? Arr[3] : null
    const isAlarm = Arr[5]
    const alarmStamp = isAlarm ? formatDateTimeAlarmToString(Arr[4]) : null
    //UPDATE DATABASE /////////////////////////////////////////////////////////////////////////////////////////////ON ENTRY

    if (
      parseInt(date.split('.')[1]) == startMonat &&
      parseInt(date.split('.')[0]) == startTag &&
      parseInt(date.split('.')[2]) == startJahr
    ) {
      const newObj = {
        id: Date.now(),
        realtimestart: calculateTime(timeSlot, duration).startTime,
        time: timeSlot,
        duration: duration,
        realtimeend: calculateTime(timeSlot, duration).endTime,
        hexcolor: Arr[6].toString(),
        title: Arr[0].toString(),
        datum:
          (startTag > 9 ? startTag : '0' + startTag) +
          '.' +
          (startMonat > 9 ? startMonat : '0' + startMonat) +
          '.' +
          startJahr,
        isNoteAttached: isNote,
        isEditable: true,
        isAlarm: isAlarm,
        isAlarmStamp: alarmStamp,
        eventTyp: 0,
        isPublic: isprivate
      }
      setEvents([...events, newObj])
    }
  }
  const saveChanges = (Arr) => {
    console.log(Arr)
    if (date == Arr.datum) {
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === Arr.id ? { ...event, ...Arr } : event))
      )
    } else {
      setEvents((prev) => prev.filter((ev) => ev.id !== Arr.id))
    }
    closeDialog()
  }

  const updateEventDuration = (id, newDuration) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id
          ? {
              ...ev,
              duration: newDuration,
              realtimestart: calculateTime(ev.time, newDuration).startTime,
              realtimeend: calculateTime(ev.time, newDuration).endTime
            }
          : ev
      )
    )
  }
  const deleteMyEvent = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id))
  }
  const closeDialog = () => {
    setdialogtyp(null)
    setdialogev(!dialogev)
  }
  const getFeiertage = () => {
    console.log(date)
    const [aday, amonth, ayear] =
      date != null
        ? date.split('.')
        : [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()]
    const parsedDate = new Date(`${ayear}-${amonth}-${aday}T00:00:00`).toISOString().split('T')[0]
    console.log(parsedDate)
    // console.log(formatDateTimeAlarmToString(parsedDate).split(' ')[0])
    let Feiertage = getGermanHolidays(date.split('.')[2])
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
  useEffect(() => {
    getFeiertage()
  }, [date])
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 divide-y dark:divide-gray-800 divide-gray-300">
        {[...Array(24)].map((_, index) => (
          <TimeSlot
            key={index}
            time={index}
            events={events}
            onDrop={handleDrop}
            addEvent={addEvent}
            updateEventDuration={updateEventDuration}
            deleteEvent={deleteMyEvent}
            editEvent={editEvent}
            showNoteIDS={showNoteIDS}
            height={fullheight}
            ityp={ItemType}
          />
        ))}
      </div>
      <DialogEventDayEntry
        show={dialogev}
        close={closeDialog}
        typed={dialogtyp}
        editobj={editobj}
        title={dialogtyp == null ? 'Neuer Termin' : 'Termin bearbeiten'}
        message={dtobj}
        callbackBtn2={dialogtyp == null ? addNote : saveChanges}
      />
    </DndProvider>
  )
}

export default DayLayoutGrid
