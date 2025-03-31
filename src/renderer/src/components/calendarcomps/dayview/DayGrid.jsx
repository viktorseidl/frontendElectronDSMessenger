import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DialogEventDayEntry from '../../DialogEventDayEntry'
import dayjs from 'dayjs'
import {
  calculateTime,
  convertToDateTimeObj,
  formatDateTimeAlarmToString,
  getIntervalCount
} from './functions/functionHandler'
import TimeSlot from './TimeSlot'
import { useRoles } from '../../../styles/RoleContext'
import { util } from 'node-forge'
import { useFetchAuthAll } from '../../../services/useFetchAll'

const ItemType = 'EVENT'
/**
 * EVENT OBJ PRIVATE SHOULD LOOK LIKE:
{
  "id": 1742897368187, --------
  "realtimestartDate": "25.03.2025",  --------
  "realtimestart": "03:00", ---------
  "time": 3, ---------
  "duration": 4, ----------
  "realtimeendDate": "25.03.2025", ----------
  "realtimeend": "04:00", ---------
  "hexcolor": "#72c4ff",   ---------
  "title": "fgfgfg",  ---------
  "datum": "25.03.2025",  ---------
  "isNoteAttached": null, ------
  "isEditable": true, --------
  "isAlarm": false,  --------
  "isAlarmStamp": null,   "26.03.2025 10:30"
  "eventTyp": 0,  --------
  "isPublic": 0 ---------
  } 
  * EVENT OBJ PUBLIC SHOULD LOOK LIKE:
{
  "id": 1740388137775,
  "realtimestartDate": "25.03.2025",
  "realtimestart": "08:00",
  "time": 8,
  "duration": 9,
  "realtimeendDate": "25.03.2025",
  "realtimeend": "10:15",
  "hexcolor": "#99ffFEFF",
  "title": "Geburtstag Annemarie Hürten",
  "datum": "25.03.2025",
  "isNoteAttached": null,
  "isEditable": false,   <----on public
  "isAlarm": false,
  "isAlarmStamp": null,
  "eventTyp": 0,
  "isPublic": 1     <----on public
}
 */
const DayGrid = ({
  fullheight,
  date,
  dialogev,
  setdialogev,
  filteredevents,
  updateFilteredEvents,
  kategorien
}) => {
  console.log(filteredevents)
  const { hasPermission } = useRoles()
  const [dialogtyp, setdialogtyp] = useState(null)
  const [dtobj, setdtobj] = useState(null)
  const [editobj, seteditobj] = useState(null)
  const [events, setEvents] = useState([])
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const handleDrop = (timeSlot, item) => {
    console.log(timeSlot)
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
    setdtobj(dayjs(item.realtimestartDate + ' ' + item.realtimestart, 'DD.MM:YYYY HH:mm').toDate())
    seteditobj(item)
    setdialogtyp(true)
    setdialogev(true)
  }
  const addEvent = (timeSlot, e) => {
    if (!hasPermission('create:calendar')) return
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
    const duration = getIntervalCount(Arr[1], Arr[2], timeSlot)
    const isprivate = Arr[7] ? 1 : 0
    const startTag = Arr[1].getDate()
    const endeTag = Arr[2].getDate()
    const startMonat = Arr[1].getMonth() + 1
    const endeMonat = Arr[2].getMonth() + 1
    const startJahr = Arr[1].getFullYear()
    const endeJahr = Arr[2].getFullYear()
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
        realtimestartDate:
          (startTag > 9 ? startTag : '0' + startTag) +
          '.' +
          (startMonat > 9 ? startMonat : '0' + startMonat) +
          '.' +
          startJahr,
        realtimestart: calculateTime(timeSlot, duration).startTime,
        time: timeSlot,
        duration: duration,
        realtimeendDate:
          (endeTag > 9 ? endeTag : '0' + endeTag) +
          '.' +
          (endeMonat > 9 ? endeMonat : '0' + endeMonat) +
          '.' +
          endeJahr,
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
  const updateEventDuration = async (id, newDuration) => {
    //Update in database then in state
    const query = await useFetchAuthAll(
      'http://' +
        apache +
        '/electronbackend/index.php?path=updateMoveDailyView&a=' +
        util.encode64(
          JSON.stringify({
            uname: User.Name,
            id: id,
            starthour: newDuration,
            starttime: calculateTime(ev.time, newDuration).startTime,
            endtime: calculateTime(ev.time, newDuration).endTime
          })
        ) +
        '&t=' +
        util.encode64(User.usertypeVP),
      'ssdsdsd',
      'PUT',
      null,
      null
    )
    console.log(query)
    /*setEvents((prev) =>
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
    )*/
  }
  const deleteMyEvent = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id))
  }
  const closeDialog = () => {
    setdialogtyp(null)
    setdialogev(!dialogev)
  }

  useEffect(() => {
    setEvents(filteredevents)
  }, [date, filteredevents])
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
        kategorien={kategorien}
        callbackBtn2={dialogtyp == null ? addNote : saveChanges}
      />
    </DndProvider>
  )
}

export default DayGrid
