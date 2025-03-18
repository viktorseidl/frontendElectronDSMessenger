import React, { useEffect, useState } from 'react'
import CalendarMonth from './CalenderMonth'
import { useParams } from 'react-router-dom'
import Dialog from './Dialog'
import DialogEventDayEntry from './DialogEventDayEntry'
function isObject(value) {
  return value !== null && typeof value === 'object'
}
const YearlyCalendar = () => {
  const { jahr, monat, tag } = useParams()
  const [dialogev, setdialogev] = useState(false)
  const [editobj, seteditobj] = useState(null)
  const [dialogtyp, setdialogtyp] = useState(null)
  const [dtobj, setdtobj] = useState(null)
  const months = Array.from({ length: 12 }, (_, i) => i + 1) // [1, 2, ..., 12]
  const [dialogdata, setDialogdata] = useState(null)
  const [events, setEvents] = useState([
    {
      id: 1740388167799,
      time: 10,
      realtimestartDate: new Date('2025', 10, 1 + 1),
      realtimestart: '10:00',
      duration: 3,
      realtimeendDate: new Date('2025', 10, 1 + 1),
      realtimeend: '10:45',
      hexcolor: '#33FF03FF',
      title: 'Halloween',
      datum: '2025-10-31',
      isNoteAttached: 'hallo wie geht es dir',
      isEditable: false,
      isAlarm: false,
      isAlarmStamp: '28.02.2025 09:25',
      eventTyp: 0,
      isPublic: 0
    },
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
  const AllMonth = ({ mon, passData, setTermin }) => {
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
          passData={passData}
          setTermin={setTermin}
        />
      </div>
    )
  }
  const closeDialog = () => {
    setdialogtyp(null)
    setdialogev(!dialogev)
  }
  const setTermin = (date, item) => {
    setDialogdata(null)
    if (item == null) {
      createNewEntry(date)
    } else {
      updateEntry(item)
    }
    setdialogtyp(null)
    setdialogev(true)
  }
  const createNewEntry = async (date) => {
    const [tag, monat, jahr] = date.split('.')
    const DatumObj = new Date(jahr, monat - 1, tag, 0, 0)
    const DatumObjEnde = new Date(jahr, monat - 1, tag, 23, 59)
    console.log(DatumObj)
    setdtobj({
      id: DatumObj.getTime(),
      time: 0,
      realtimestartDate: DatumObj,
      realtimestart: '00:00',
      duration: 96,
      realtimeendDate: DatumObjEnde,
      realtimeend: '23:59',
      hexcolor: '#c1cff7FF',
      title: '',
      datum: `${jahr}-${monat > 9 ? monat : '0' + monat}-${tag > 9 ? tag : '0' + tag}`,
      isNoteAttached: null,
      isEditable: true,
      isAlarm: null,
      isAlarmStamp: DatumObj,
      eventTyp: 0,
      isPublic: 0
    })
    /*{
      "id": DatumObj.getTime(),
      "time": 0,
      "realtimestartDate": DatumObj,
      "realtimestart": "00:00",
      "duration": 96,
      "realtimeendDate": DatumObjEnde,
      "realtimeend": "23:59",
      "hexcolor": "#c1cff7FF",
      "title": "",
      "datum": `${jahr}-${monat>9?monat:'0'+monat}-${tag>9?tag:'0'+tag}`,
      "isNoteAttached": null,
      "isEditable": true,
      "isAlarm": null,
      "isAlarmStamp": new Date(),
      "eventTyp": 0,
      "isPublic": 0
    }*/
  }
  const updateEntry = async (item) => {
    console.log(item)
    setdtobj(item)
  }
  return (
    <div className="w-full relative dark:bg-gray-900 bg-white ">
      <div className="w-full z-10 grid relative grid-cols-4 gap-2 p-4 ">
        {months.map((mon, index) => (
          <AllMonth
            mon={mon}
            key={mon + index + 'monatTitle'}
            passData={setDialogdata}
            setTermin={setTermin}
          />
        ))}
      </div>
      <Dialog
        show={isObject(dialogdata) ? true : false}
        close={setDialogdata}
        title={isObject(dialogdata) ? dialogdata.title : ''}
        message={isObject(dialogdata) ? dialogdata : null}
        setTermin={setTermin}
      />
      <DialogEventDayEntry
        show={isObject(dtobj) && dtobj != null ? true : false}
        close={setdtobj}
        titel={isObject(dtobj) && dtobj.title != '' ? 'Termin bearbeiten' : 'Neuer Termin'}
        obj={isObject(dtobj) && dtobj != null ? dtobj : null}
      />
      <div className="absolute select-none z-0 inset left-0 top-0 w-full h-full flex flex-col items-center justify-center dark:text-[12rem] text-[12rem] overflow-hidden dark:opacity-15 opacity-10 exo font-bold">
        {jahr}
      </div>
    </div>
  )
}

export default YearlyCalendar
