import React, { Fragment, useEffect, useRef, useState } from 'react'
import imgs from './../assets/Logo.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import { de } from 'date-fns/locale/de'
import {
  formatDateTimeAlarmToString,
  convertToDateTimeObj,
  getIntervalCount,
  calculateTime
} from './calendarcomps/dayview/functions/functionHandler'
import {
  MdAddAlert,
  MdAlarm,
  MdCategory,
  MdClose,
  MdColorize,
  MdEvent,
  MdLogoDev,
  MdNote,
  MdNoteAdd,
  MdPattern,
  MdPerson,
  MdPinch,
  MdPublic,
  MdPublicOff,
  MdRepeat,
  MdTimelapse,
  MdTimer
} from 'react-icons/md'
import Switch from './Switch'
import { isDate } from 'date-fns'
import dayjs from 'dayjs'
import { IoIosCart, IoIosInformationCircleOutline } from 'react-icons/io'
import { util } from 'node-forge'
registerLocale('de-DE', de)
const DialogEventDayEntry = ({
  show,
  close,
  typed,
  title,
  message,
  editobj,
  callbackBtn2,
  kategorien,
  setKalenderEntry
}) => {
  console.log(setKalenderEntry)
  const [betreff, setbetreff] = useState('')
  const [start, setstart] = useState(null)
  const [end, setend] = useState(null)
  const [remindon, setremindon] = useState(false)
  const [remind, setremind] = useState(null)
  const [ispublic, setispublic] = useState(false)
  const [notice, setnotice] = useState(null)
  const [color, setcolor] = useState('#72c4ff')
  const _yearlybyweekref = useRef('')
  const _yearlybydayref = useRef('')
  const _monthbydayrefOrdinary = useRef('')
  const _monthbydayrefWeekday = useRef('')
  /**
   * RRSTATES
   */
  const [rrByMonthDay, setRrByMonthDay] = useState([]) // Example: ['MO', 'WE']
  const [rrByBYYEARWEEKNUMyearly, setRrByBYYEARWEEKNUMyearly] = useState([]) // Example: ['MO', 'WE']
  const [rrByBYYEARDAYyearly, setRrByBYYEARDAYyearly] = useState([]) // Example: ['MO', 'WE']
  const [rrByBYDAYMonth, setRrByBYDAYMonth] = useState([]) // Example: ['MO', 'WE']
  const [rrByDays, setRrByDays] = useState([]) // Example: ['MO', 'WE']
  const days = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO']
  const ordinals = [
    { label: 'erste', value: 1 },
    { label: 'zweite', value: 2 },
    { label: 'dritte', value: 3 },
    { label: 'vierte', value: 4 },
    { label: 'letzte', value: -1 },
    { label: 'vorletzte', value: -2 },
    { label: 'drittletzte', value: -3 }
  ]
  const [rrMonthTypeRule, setRrMonthTypeRule] = useState('DAY')
  const [rrFrequency, setRrFrequency] = useState('YEARLY')
  const [rrYEARLYTypMuster, setRrYEARLYTypMuster] = useState('DATUM')
  const [rrByHours, setRrByHours] = useState('00:00')
  const [rrByMONTHyear, setRrByMONTHyear] = useState([])
  const [rrStartDate, setRrStartDate] = useState(null)
  const [rrEndDate, setRrEndDate] = useState(null)
  const [rrEndRepeats, setRrEndRepeats] = useState(1)
  const [rrRepeats, setRrRepeats] = useState(1)
  const [rrEndeDauer, setRrEndeDauer] = useState(1440)
  const [rrEndeType, setRrEndeType] = useState('NODATE')
  const [isStandard, setIsStandard] = useState(true)
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const Bereiche = JSON.parse(util.decode64(window.sessionStorage.getItem('userWohnbereiche')))
  console.log(User.usertypeVP) //
  /**
   * NEW FUNCTIONS RRULE
   */

  const toggleMonthOnYearly = (month) => {
    setRrByMONTHyear(
      (prevDays) =>
        prevDays.includes(month)
          ? prevDays.filter((d) => d !== month) // remove it
          : [...prevDays, month] // add it
    )
  }
  const toggleMonthDayOnWeekdaySpecific = (day) => {
    setRrByBYDAYMonth(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const toggleYearWeekNum = (day) => {
    setRrByBYYEARWEEKNUMyearly(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const toggleYearDay = (day) => {
    setRrByBYYEARDAYyearly(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const toggleMonthDay = (day) => {
    setRrByMonthDay(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const toggleDay = (day) => {
    setRrByDays(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const JahresZahl = () => {
    let a = []
    for (let i = 1; i < 367; i++) {
      a.push(i)
    }
    return a
  }
  const closer = (e) => {
    if (!e.target.closest("[aria-label='Ditab']")) {
      setbetreff('')
      setispublic(false)
      setnotice(null)
      setcolor('#72c4ff')
      setremindon(false)
      close()
    }
  }
  const updater = () => {
    if (typed == null) {
      setbetreff('')
      setispublic(false)
      setnotice(null)
      setcolor('#72c4ff')
      setremindon(false)
      setstart(message)
      setend(message)
      setremind(message)
    } else {
      setbetreff(editobj?.titel)
      setispublic(editobj?.isPublic == 0 ? false : true)
      setnotice(editobj?.isNoteAttached)
      setcolor(editobj?.ColorHex.toString())
      setremindon(editobj?.isAlarm)
      setstart(convertToDateTimeObj(editobj.datum + ' ' + editobj.realtimestart))
      setend(convertToDateTimeObj(editobj.datum + ' ' + editobj.realtimeend))
      setremind(editobj.isAlarm ? convertToDateTimeObj(editobj.isAlarmStamp) : message)
    }
  }
  const callaction = () => {
    if (typed == null) {
      callbackBtn2([betreff, start, end, notice, remind, remindon, color, ispublic])
    } else {
      let ARR = editobj
      const timeSlot = start.getHours()
      const duration = getIntervalCount(start, end)
      const isprivate = ispublic ? 1 : 0
      const startTag = start.getDate()
      const startMonat = start.getMonth() + 1
      const startJahr = start.getFullYear()
      const isNote = notice != null ? notice : null
      const isAlarm = remindon
      const alarmStamp = isAlarm ? formatDateTimeAlarmToString(remind) : null
      ARR.time = timeSlot
      ARR.realtimestart = calculateTime(timeSlot, duration).startTime
      ARR.duration = duration
      ARR.realtimeend = calculateTime(timeSlot, duration).endTime
      ARR.hexcolor = color.toString()
      ARR.titel = betreff.toString()
      ARR.datum =
        (startTag > 9 ? startTag : '0' + startTag) +
        '.' +
        (startMonat > 9 ? startMonat : '0' + startMonat) +
        '.' +
        startJahr
      ARR.isNoteAttached = isNote
      ARR.isEditable = true
      ARR.isAlarm = isAlarm
      ARR.isAlarmStamp = alarmStamp
      ARR.isPublic = isprivate
      callbackBtn2(ARR)
    }
  }
  useEffect(() => {
    updater()
  }, [message, typed])
  return (
    <Fragment>
      {show && (
        <div
          className="fixed inset-0 z-10  dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
          onClick={closer}
        >
          <div
            aria-label="Ditab"
            className="min-w-[30%] max-w-[35%] max-h-[85%] overflow-auto flex z-40 flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm  scrollbar-thin scrollbar-thumb-gray-500  scrollbar-track-gray-200"
          >
            <div
              id="titlebar"
              className={
                'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'
              }
            >
              <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                <img src={imgs} className="w-10 h-2  " />
                {title}
              </span>
            </div>
            <div className="w-full grid grid-cols-10 items-start justify-items-start dark:bg-gray-950 bg-gray-200 border-b dark:border-gray-800 border-gray-300 px-6 py-1 dark:text-white text-black text-xs font-[Arial]">
              <div className="w-full col-span-1 h-full flex flex-row items-center justify-center">
                ℹ️
              </div>
              <div className="col-span-8 w-full">
                {(User.usertypeVP == 'P'
                  ? 'Benutzer: System - Pflege'
                  : 'Benutzer: System - Verwaltung') +
                  ' - ' +
                  (User.Gruppe != null ? User.Gruppe + ' - ' : '') +
                  User.Name +
                  ' - ' +
                  User.Mitarbeitername}
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2 pt-2 dark:text-white text-black text-sm font-[Arial]">
              <label className="  w-full flex flex-col items-center justify-center relative">
                <input
                  title="Betreff des Termins"
                  name="title"
                  className=" w-full font-[arial]  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                  placeholder="Betreff des Termins"
                  value={betreff}
                  onChange={(e) => setbetreff(e.target.value)}
                />
                <MdEvent className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                <MdClose
                  onClick={() => 'handleFilterChange("Betrefftxt", "")'}
                  className={
                    'absolute hidden cursor-pointer inset right-3 text-2xl top-[0.1rem] text-gray-500 hover:text-gray-400'
                  }
                />
              </label>
            </div>
            <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
              <div className="w-[30%] h-8 flex flex-row items-center justify-start">
                <a className="mr-2.5 text-sm">Kategorie</a>
              </div>
              <div className="w-[70%] h-8 flex flex-row items-center justify-start">
                <label className="  w-full flex flex-col items-center justify-center relative">
                  <select
                    title="Kategorie"
                    name="kategorie"
                    className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                    placeholder="Kategorie"
                    value={betreff}
                    onChange={(e) => setbetreff(e.target.value)}
                  >
                    <option className="w-full dark:bg-gray-900">Privater Eintrag</option>
                    {kategorien.length > 0 &&
                      kategorien.map((item) => (
                        <option className="w-full dark:bg-gray-900">{item.bezeichnung}</option>
                      ))}
                  </select>
                  <IoIosInformationCircleOutline className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                </label>
              </div>
            </div>
            <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
              <div className="w-[30%] h-8 flex flex-row items-center justify-start">
                <a className="mr-2.5 text-sm">Sichtbarkeit</a>
              </div>
              <div className="w-[70%] h-8 flex flex-row items-center justify-start">
                <label className=" w-full flex flex-col items-center justify-center relative">
                  <select
                    title="Sichtbarkeit"
                    name="title"
                    className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                    value={ispublic}
                    onChange={(e) => setispublic(e.target.value)}
                  >
                    <option value={'ME'}>Privat</option>
                    <option value={'PUB'}>Öffentlich (Pflege + Verwaltung)</option>
                    <option value={'P'}>Pflege</option>
                    <option value={'V'}>Verwaltung</option>
                  </select>
                  {ispublic != 'ME' ? (
                    <MdPublic className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                  ) : (
                    <MdPublicOff className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                  )}
                </label>
              </div>
            </div>
            {ispublic == 'P' ? (
              <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
                <div className="w-[30%] h-8 flex flex-row items-center justify-start">
                  <a className="mr-2.5 text-sm">Wohnbereich</a>
                </div>
                <div className="w-[70%] h-8 flex flex-row items-center justify-start">
                  <label className="w-full flex flex-col items-center justify-center relative">
                    <select
                      title="Sichtbarkeit"
                      name="title"
                      className=" w-full  h-8 font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                      value={ispublic}
                      onChange={(e) => setispublic(e.target.value)}
                    >
                      <option key={'BDaalle'} value={'null'}>
                        Alle Bereiche
                      </option>
                      {Bereiche.length > 0 &&
                        Bereiche.map((item, index) => (
                          <option key={'BDa' + item + index} value={item.Station}>
                            {item.Hausname} {item.Station}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="w-full flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2 pt-2 dark:text-white text-black text-sm font-[Arial]">
              <label className="  w-full flex flex-col items-center justify-center relative">
                <textarea
                  title="Notiz hinzufügen"
                  className="resize-none w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 h-16 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                  placeholder="Notiz hinzufügen ..."
                  value={notice}
                  onChange={(e) => setnotice(e.target.value)}
                />
                <MdNote className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                <MdClose
                  onClick={() => 'handleFilterChange("Betrefftxt", "")'}
                  className={
                    'absolute hidden cursor-pointer inset right-3 text-2xl top-[0.1rem] text-gray-500 hover:text-gray-400'
                  }
                />
              </label>
            </div>
            <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 pt-2 dark:text-white text-black text-sm font-[Arial]">
              <div className="w-[30%] h-8 flex flex-row items-center justify-start">
                <a className="mr-2.5 text-sm">Erinnerung</a>
                <Switch setter={setremindon} wert={remindon} />
              </div>
              <div className="w-[70%] h-8 flex flex-row items-center justify-start">
                {remindon == true ? (
                  <div className="w-full flex flex-row items-start justify-start ">
                    <DatePicker
                      placeholderText="TT.MM.YYYY"
                      locale={de}
                      timeIntervals={15}
                      timeFormat="HH:mm"
                      title="Terminierung"
                      timeCaption="Zeit"
                      closeOnScroll={true}
                      dateFormat={'Pp'}
                      showTimeSelect
                      className=" w-full ml-2 h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                      selected={remind}
                      onChange={(date) => setremind(date)}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
              <div className="w-full border dark:border-gray-700 border-gray-300 rounded grid grid-cols-2 items-center justify-items-center  divide-x dark:divide-gray-700 divide-gray-300">
                <div
                  onClick={() => setIsStandard(true)}
                  className={`w-full flex flex-col items-center justify-center cursor-pointer select-none py-1 ${isStandard ? ' bg-blue-400/30 ' : ''}`}
                >
                  Standard Eintrag
                </div>
                <div
                  onClick={() => setIsStandard(false)}
                  className={`w-full flex flex-col items-center justify-center cursor-pointer select-none py-1 ${!isStandard ? ' bg-blue-400/30 ' : ''}`}
                >
                  Serientermin
                </div>
              </div>
            </div>
            <div className="w-full dark:bg-gray-900 bg-white px-6  ">
              {isStandard ? (
                <>
                  <div className="w-full grid grid-cols-4 gap-x-6 items-start justify-items-start dark:bg-gray-900 bg-white px-0 py-2 dark:text-white text-black text-sm font-[Arial]">
                    <div className="w-full col-span-4 flex flex-row items-start justify-evenly">
                      <div className="h-8 flex flex-row items-center justify-start">
                        <a className="text-sm">
                          Beginn <MdTimelapse className="text-sm inline ml-1" />
                        </a>
                      </div>
                      <div className="w-36 h-8">
                        <DatePicker
                          placeholderText="TT.MM.YYYY"
                          locale={de}
                          timeIntervals={15}
                          timeFormat="HH:mm"
                          title="Terminierung"
                          timeCaption="Zeit"
                          closeOnScroll={true}
                          dateFormat={'Pp'}
                          showTimeSelect
                          className=" w-full  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                          selected={start}
                          onChange={(date) => setstart(date)}
                        />
                      </div>

                      <div className="h-8 flex flex-row items-center justify-start">
                        <a className="text-sm">
                          Endet am <MdTimelapse className="text-sm inline ml-1" />
                        </a>
                      </div>
                      <div className="w-36 h-8">
                        <DatePicker
                          placeholderText="TT.MM.YYYY"
                          locale={de}
                          timeIntervals={15}
                          timeFormat="HH:mm"
                          title="Terminierung"
                          timeCaption="Zeit"
                          closeOnScroll={true}
                          dateFormat={'Pp'}
                          showTimeSelect
                          className=" w-full  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                          selected={end}
                          onChange={(date) => setend(date)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center justify-end dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial]">
                    <button
                      onClick={(e) => callaction()}
                      className={`px-4 py-2 mb-2 rounded-sm dark:bg-gray-800 bg-gray-300/60 dark:hover:bg-gray-700 hover:bg-gray-100 outline-none ring-1 dark:ring-gray-700 ring-gray-400/80 dark:text-gray-300 text-gray-800`}
                    >
                      Bestätigen
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full grid grid-cols-4 gap-x-6 items-start justify-items-start dark:bg-gray-900 bg-white px-0  dark:text-white text-black text-sm font-[Arial]">
                  <div className="w-full col-span-4 flex flex-row items-start justify-start dark:bg-blue-900/40 bg-blue-700/10 pl-2 py-0.5 border-b dark:border-gray-700 border-gray-400 mb-2 mt-2">
                    Terminierung
                  </div>
                  <div className="w-full col-span-4 flex flex-row items-start justify-evenly">
                    <div className="h-8 flex flex-row items-center justify-start">
                      <a className="text-sm">
                        Beginn <MdTimelapse className="text-sm inline ml-1" />
                      </a>
                    </div>
                    <div className="w-36 h-8">
                      <DatePicker
                        placeholderText="TT.MM.YYYY"
                        locale={de}
                        timeIntervals={15}
                        timeFormat="HH:mm"
                        title="Terminierung"
                        timeCaption="Zeit"
                        closeOnScroll={true}
                        dateFormat={'Pp'}
                        showTimeSelect
                        className=" w-full  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                        selected={rrStartDate}
                        onChange={(date) => setRrStartDate(date)}
                      />
                    </div>

                    <div className="w-56 h-8">
                      <label className="  w-full flex flex-col items-center justify-center relative">
                        <select
                          title="Kategorie"
                          name="kategorie"
                          className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
                          placeholder="Kategorie"
                          value={rrEndeType}
                          onChange={(e) => setRrEndeType(e.target.value)}
                        >
                          <option value={'NODATE'} className="w-full dark:bg-gray-900">
                            Kein Enddatum...
                          </option>
                          <option value={'DATE'} className="w-full dark:bg-gray-900">
                            Endet am: (Datum)
                          </option>
                          <option value={'REPEAT'} className="w-full dark:bg-gray-900">
                            Endet nach: (Anzahl-Wiederholungen)
                          </option>
                        </select>
                      </label>
                    </div>
                  </div>
                  {rrEndeType == 'NODATE' ? (
                    ''
                  ) : rrEndeType == 'DATE' ? (
                    <div className="w-full col-span-4 flex flex-row items-start justify-start mt-2 pl-6">
                      <div className=" h-8 flex flex-row items-center justify-start">
                        <a className="mr-6 text-sm">Endet am:</a>
                      </div>
                      <div className="w-36 h-8">
                        <DatePicker
                          placeholderText="TT.MM.YYYY"
                          locale={de}
                          title="Terminierung"
                          closeOnScroll={true}
                          dateFormat={'P'}
                          className=" w-full  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                          selected={rrEndDate}
                          onChange={(date) => setRrEndDate(date)}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-full col-span-4 flex flex-row items-start justify-start mt-2 pl-6">
                        <div className=" h-8 flex flex-row items-center justify-start">
                          <a className="mr-3 text-sm">Endet nach:</a>
                        </div>
                        <div className="w-56 h-8 mr-2">
                          <label className="  w-full flex flex-col items-center justify-center relative">
                            <input
                              title="Anzahl Wiederholungen (z.B.: 2)"
                              name="Anzahl"
                              type="number"
                              className=" w-full font-[arial]  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                              placeholder="Anzahl"
                              value={rrEndRepeats}
                              onChange={(e) => setRrEndRepeats(e.target.value)}
                            />
                            <MdRepeat className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                          </label>
                        </div>
                        <div className=" h-8 flex flex-row items-center justify-start">
                          <a className="mr-3 text-sm">
                            {rrEndRepeats > 1 ? 'Wiederholungen' : 'Wiederholung'}
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
                    <div className=" h-8 flex flex-row items-center justify-start mr-8">
                      <a className="mr-3 text-sm">Dauer:</a>
                    </div>
                    <div className="w-[60%] h-8">
                      <label className="  w-full flex flex-col items-center justify-center relative">
                        <select
                          title="Kategorie"
                          name="kategorie"
                          className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
                          placeholder="Kategorie"
                          value={rrEndeDauer}
                          onChange={(e) => setRrEndeDauer(e.target.value)}
                        >
                          <option value={1440} className="w-full dark:bg-gray-900">
                            ganztägig
                          </option>
                          <option value={15} className="w-full dark:bg-gray-900">
                            15 Minuten
                          </option>
                          <option value={30} className="w-full dark:bg-gray-900">
                            30 Minuten
                          </option>
                          <option value={45} className="w-full dark:bg-gray-900">
                            45 Minuten
                          </option>
                          <option value={60} className="w-full dark:bg-gray-900">
                            1 Stunden
                          </option>
                          <option value={120} className="w-full dark:bg-gray-900">
                            2 Stunden
                          </option>
                          <option value={180} className="w-full dark:bg-gray-900">
                            3 Stunden
                          </option>
                          <option value={240} className="w-full dark:bg-gray-900">
                            4 Stunden
                          </option>
                          <option value={300} className="w-full dark:bg-gray-900">
                            5 Stunden
                          </option>
                          <option value={360} className="w-full dark:bg-gray-900">
                            6 Stunden
                          </option>
                          <option value={420} className="w-full dark:bg-gray-900">
                            7 Stunden
                          </option>
                          <option value={480} className="w-full dark:bg-gray-900">
                            8 Stunden
                          </option>
                          <option value={540} className="w-full dark:bg-gray-900">
                            9 Stunden
                          </option>
                          <option value={600} className="w-full dark:bg-gray-900">
                            10 Stunden
                          </option>
                          <option value={660} className="w-full dark:bg-gray-900">
                            11 Stunden
                          </option>
                          <option value={720} className="w-full dark:bg-gray-900">
                            12 Stunden
                          </option>
                          <option value={780} className="w-full dark:bg-gray-900">
                            13 Stunden
                          </option>
                          <option value={840} className="w-full dark:bg-gray-900">
                            14 Stunden
                          </option>
                          <option value={900} className="w-full dark:bg-gray-900">
                            15 Stunden
                          </option>
                          <option value={960} className="w-full dark:bg-gray-900">
                            16 Stunden
                          </option>
                          <option value={1020} className="w-full dark:bg-gray-900">
                            17 Stunden
                          </option>
                          <option value={1080} className="w-full dark:bg-gray-900">
                            18 Stunden
                          </option>
                          <option value={1140} className="w-full dark:bg-gray-900">
                            19 Stunden
                          </option>
                          <option value={1200} className="w-full dark:bg-gray-900">
                            20 Stunden
                          </option>
                          <option value={1260} className="w-full dark:bg-gray-900">
                            21 Stunden
                          </option>
                          <option value={1320} className="w-full dark:bg-gray-900">
                            22 Stunden
                          </option>
                          <option value={1380} className="w-full dark:bg-gray-900">
                            23 Stunden
                          </option>
                        </select>
                        <MdTimer className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                      </label>
                    </div>
                  </div>
                  <div className="w-full col-span-4 flex flex-row items-start justify-start dark:bg-blue-900/40 bg-blue-700/10 pl-2 py-0.5  border-b dark:border-gray-700 border-gray-400 mt-6 mb-2">
                    Serienmuster
                  </div>
                  <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6">
                    <div className=" h-8 flex flex-row items-center justify-start mr-8">
                      <a className="mr-3 text-sm">Muster:</a>
                    </div>
                    <div className="w-[60%] h-8">
                      <label className="  w-full flex flex-col items-center justify-center relative">
                        <select
                          title="Muster"
                          name="Muster"
                          className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
                          placeholder="Muster"
                          value={rrFrequency}
                          onChange={(e) => setRrFrequency(e.target.value)}
                        >
                          <option value={'YEARLY'} className="w-full dark:bg-gray-900">
                            jährlich
                          </option>
                          <option value={'MONTHLY'} className="w-full dark:bg-gray-900">
                            monatlich
                          </option>
                          <option value={'WEEKLY'} className="w-full dark:bg-gray-900">
                            wöchentlich
                          </option>
                          <option value={'DAILY'} className="w-full dark:bg-gray-900">
                            täglich
                          </option>
                        </select>
                        <MdTimer className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                      </label>
                    </div>
                  </div>
                  <div className="w-full col-span-4 flex flex-row items-start justify-start mt-2 pl-6">
                    <div className=" h-8 flex flex-row items-center justify-start">
                      <a className="mr-3 text-sm">Wiederholungsmuster :</a>
                    </div>
                    <div className=" h-8 flex flex-row items-center justify-start">
                      <a className="mr-3 text-sm">
                        {rrFrequency == 'YEARLY'
                          ? rrRepeats > 1
                            ? 'Alle'
                            : 'Jedes'
                          : rrFrequency == 'MONTHLY'
                            ? rrRepeats > 1
                              ? 'Alle'
                              : 'Jeden'
                            : rrFrequency == 'WEEKLY'
                              ? rrRepeats > 1
                                ? 'Alle'
                                : 'Jede'
                              : rrRepeats > 1
                                ? 'Alle'
                                : 'Jeden'}
                      </a>
                    </div>
                    <div className="w-32 h-8 mr-2">
                      <label className="  w-full flex flex-col items-center justify-center relative">
                        <input
                          title="Anzahl Wiederholungen (1 = Alle)"
                          name="Anzahl"
                          type="number"
                          className=" w-full font-[arial]  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                          placeholder="Anzahl"
                          value={rrRepeats}
                          onChange={(e) => setRrRepeats(e.target.value)}
                        />
                        <MdRepeat className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                      </label>
                    </div>
                    <div className=" h-8 flex flex-row items-center justify-start">
                      <a className="mr-3 text-sm">
                        {rrFrequency == 'YEARLY'
                          ? rrRepeats > 1
                            ? 'Jahre'
                            : 'Jahr'
                          : rrFrequency == 'MONTHLY'
                            ? rrRepeats > 1
                              ? 'Monate'
                              : 'Monat'
                            : rrFrequency == 'WEEKLY'
                              ? rrRepeats > 1
                                ? 'Wochen'
                                : 'Woche'
                              : rrRepeats > 1
                                ? 'Tage'
                                : 'Tag'}
                      </a>
                    </div>
                  </div>
                  {/*rrFrequency == 'YEARLY'
                    ? '-BYMONTH- January,June,... TO Select -BYMONTHDAY- 1., 25. TO SELECT OR -BYDAY + BYMONTH- 1. MO in June To select  -BYYEARDAY-  100., 200., to select , -BYWEEKNO- 20th week TO SELECT '
                    : rrFrequency == 'MONTHLY'
                      ? '-BYMONTHDAY- 1., 15., 31 TO SELECT  -BYDAY- 1st Monday or last Friday TO SELECT '
                      : rrFrequency == 'WEEKLY'
                        ? '-WKST- = MO, SU TO SELECT  -BYDAY- MO,WE,FR TO SELECT '
                        : '-BY DAY-'*/}
                  {rrFrequency == 'YEARLY' ? (
                    <>
                      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
                        <div className=" h-8 flex flex-row items-center justify-start mr-8">
                          <a className="mr-3 text-sm">Muster des Termin:</a>
                        </div>
                        <div className="w-[70%] h-8">
                          <label className="  w-full flex flex-col items-center justify-center relative">
                            <select
                              title="Muster"
                              name="Muster"
                              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
                              placeholder="Muster"
                              value={rrYEARLYTypMuster}
                              onChange={(e) => setRrYEARLYTypMuster(e.target.value)}
                            >
                              <option value={'DATUM'} className="w-full dark:bg-gray-900">
                                Datum: [Monat][Tag]
                              </option>
                              <option value={'WOCHENTAGMONAT'} className="w-full dark:bg-gray-900">
                                Spezifischer Wochentag: [erste][Wochentag] im [Monat]
                              </option>
                              <option value={'YEARDAY'} className="w-full dark:bg-gray-900">
                                Spezifischer Kalendertag: [Zahl des Kalendertages]
                              </option>
                              <option value={'WEEKNUMBER'} className="w-full dark:bg-gray-900">
                                Spezifische Kalenderwoche: [Kalenderwoche]
                              </option>
                            </select>
                            <MdTimer className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                          </label>
                        </div>
                      </div>
                      {rrYEARLYTypMuster == 'DATUM' ? (
                        <>
                          <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
                            <div className=" h-8 flex flex-row items-center justify-start mr-8">
                              <a className="mr-0 text-sm">Monate wählen:</a>
                            </div>
                            <div className="w-[70%] grid grid-cols-3 items-start justify-items-start gap-1">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                                <div
                                  onClick={() => toggleMonthOnYearly(item)}
                                  className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rrByMONTHyear.includes(item) ? ' bg-blue-400/30 ' : ''}`}
                                >
                                  {item == 1
                                    ? 'Januar'
                                    : item == 2
                                      ? 'Februar'
                                      : item == 3
                                        ? 'März'
                                        : item == 4
                                          ? 'April'
                                          : item == 5
                                            ? 'Mai'
                                            : item == 6
                                              ? 'Juni'
                                              : item == 7
                                                ? 'Juli'
                                                : item == 8
                                                  ? 'August'
                                                  : item == 9
                                                    ? 'September'
                                                    : item == 10
                                                      ? 'Oktober'
                                                      : item == 11
                                                        ? 'November'
                                                        : 'Dezember'}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="w-full col-span-4  flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2   dark:text-white text-black text-sm font-[Arial]">
                            <a className="mr-6 h-8">Tage wählen:</a>
                            <div className="w-[80%]  grid grid-cols-7 items-start justify-items-start gap-1">
                              {[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                                20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
                              ].map((item, index) => (
                                <div
                                  onClick={() => toggleMonthDay(item)}
                                  className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rrByMonthDay.includes(item) ? ' bg-blue-400/30 ' : ''}`}
                                >
                                  {item}.
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : rrYEARLYTypMuster == 'WOCHENTAGMONAT' ? (
                        <>
                          <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
                            <div className=" h-8 flex flex-row items-center justify-start mr-8">
                              <a className="mr-0 text-sm">Monate wählen:</a>
                            </div>
                            <div className="w-[70%] grid grid-cols-3 items-start justify-items-start gap-1">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                                <div
                                  onClick={() => toggleMonthOnYearly(item)}
                                  className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rrByMONTHyear.includes(item) ? ' bg-blue-400/30 ' : ''}`}
                                >
                                  {item == 1
                                    ? 'Januar'
                                    : item == 2
                                      ? 'Februar'
                                      : item == 3
                                        ? 'März'
                                        : item == 4
                                          ? 'April'
                                          : item == 5
                                            ? 'Mai'
                                            : item == 6
                                              ? 'Juni'
                                              : item == 7
                                                ? 'Juli'
                                                : item == 8
                                                  ? 'August'
                                                  : item == 9
                                                    ? 'September'
                                                    : item == 10
                                                      ? 'Oktober'
                                                      : item == 11
                                                        ? 'November'
                                                        : 'Dezember'}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-3">
                            <div className=" h-8 flex flex-row items-center justify-start mr-8">
                              <a className="mr-3 text-sm">Jeder:</a>
                            </div>
                            <div className="w-[28%] h-8 mr-2">
                              <label className="  w-full flex flex-col items-center justify-center relative">
                                <select
                                  ref={_monthbydayrefOrdinary}
                                  title="Nach spezifischen Wochentag"
                                  name="Wochentag"
                                  className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
                                  placeholder="Nach spezifischen Wochentag"
                                >
                                  {ordinals.map((item, index) => (
                                    <option value={item.value} className="w-full dark:bg-gray-900">
                                      {item.label}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                            <div className="w-[28%] h-8">
                              <label className="  w-full flex flex-col items-center justify-center relative">
                                <select
                                  ref={_monthbydayrefWeekday}
                                  title="Nach spezifischen Wochentag"
                                  name="Wochentag"
                                  className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
                                  placeholder="Nach spezifischen Wochentag"
                                >
                                  {days.map((item, index) => (
                                    <option value={item} className="w-full dark:bg-gray-900">
                                      {item == 'MO'
                                        ? 'Montag'
                                        : item == 'DI'
                                          ? 'Dienstag'
                                          : item == 'MI'
                                            ? 'Mittwoch'
                                            : item == 'DO'
                                              ? 'Donnerstag'
                                              : item == 'FR'
                                                ? 'Freitag'
                                                : item == 'SA'
                                                  ? 'Samstag'
                                                  : 'Sonntag'}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                            <div className="w-32 text-xs flex flex-col items-center justify-center h-8">
                              <button
                                onClick={() =>
                                  toggleMonthDayOnWeekdaySpecific(
                                    _monthbydayrefOrdinary.current.value +
                                      ':' +
                                      _monthbydayrefWeekday.current.value
                                  )
                                }
                                className=" h-8 flex flex-row items-center px-2 justify-center dark:bg-blue-600 rounded-sm"
                              >
                                + Hinzufügen
                              </button>
                            </div>
                          </div>
                          <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2  dark:text-white text-black text-xs font-[Arial]">
                            Spezifische Wochentage im Monat ({rrByBYDAYMonth.length})
                          </div>
                          <div className="w-full col-span-4 flex flex-col items-start justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial] ">
                            {rrByBYDAYMonth.length > 0 ? (
                              <div className="w-full flex flex-col items-center justify-center text-xs divide-y dark:divide-gray-700 ring-1 ring-gray-700">
                                {console.log(rrByBYDAYMonth)}
                                {rrByBYDAYMonth.map((item, index) => (
                                  <div className="w-full text-left  py-1">
                                    <a className="mx-6">{index + 1}.</a>
                                    jeder{' '}
                                    {
                                      ordinals.find((o) => o.value == item.split(':')[0])?.label
                                    }{' '}
                                    {item.split(':')[1] == 'MO'
                                      ? 'Montag'
                                      : item.split(':')[1] == 'DI'
                                        ? 'Dienstag'
                                        : item.split(':')[1] == 'MI'
                                          ? 'Mittwoch'
                                          : item.split(':')[1] == 'DO'
                                            ? 'Donnerstag'
                                            : item.split(':')[1] == 'FR'
                                              ? 'Freitag'
                                              : item.split(':')[1] == 'SA'
                                                ? 'Samstag'
                                                : 'Sonntag'}
                                    <MdClose
                                      onClick={() => toggleMonthDayOnWeekdaySpecific(item)}
                                      className="mx-6 float-right mt-0.5 cursor-pointer"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="w-full flex flex-col items-center justify-center py-1 text-xs ring-1 ring-gray-700">
                                Keine Tage vorhanden
                              </div>
                            )}
                          </div>
                        </>
                      ) : rrYEARLYTypMuster == 'YEARDAY' ? (
                        <>
                          <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-3">
                            <div className=" h-8 flex flex-row items-center justify-start mr-8">
                              <a className="mr-3 text-sm">Kalendertag:</a>
                            </div>
                            <div className="w-[28%] h-8">
                              <label className="  w-full flex flex-col items-center justify-center relative">
                                <select
                                  ref={_yearlybydayref}
                                  title="Nach spezifischen Wochentag"
                                  name="Wochentag"
                                  className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
                                  placeholder="Nach spezifischen Wochentag"
                                >
                                  {Array.from({ length: 366 }, (_, i) => i + 1).map(
                                    (item, index) => (
                                      <option value={item} className="w-full dark:bg-gray-900">
                                        {item == 366
                                          ? 'letzte Tag im Jahr (nur an Schaltjahre)'
                                          : item == 365
                                            ? 'letzte Tag im Jahr (nicht an Schaltjahre)'
                                            : item == 1
                                              ? 'erste Tag im Jahr'
                                              : item + ' Tag im Jahr'}
                                      </option>
                                    )
                                  )}
                                </select>
                              </label>
                            </div>
                            <div className="w-32 text-xs flex flex-col items-center justify-center h-8">
                              <button
                                onClick={() => toggleYearDay(_yearlybydayref.current.value)}
                                className=" h-8 flex flex-row items-center px-2 justify-center dark:bg-blue-600 rounded-sm"
                              >
                                + Hinzufügen
                              </button>
                            </div>
                          </div>
                          <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2  dark:text-white text-black text-xs font-[Arial]">
                            Spezifische Kalendertage im Jahr ({rrByBYYEARDAYyearly.length})
                          </div>
                          <div className="w-full col-span-4 flex flex-col items-start justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial] ">
                            {rrByBYYEARDAYyearly.length > 0 ? (
                              <div className="w-full flex flex-col items-center justify-center text-xs divide-y dark:divide-gray-700 ring-1 ring-gray-700">
                                {console.log(rrByBYYEARDAYyearly)}
                                {rrByBYYEARDAYyearly.map((item, index) => (
                                  <div className="w-full text-left  py-1">
                                    <a className="mx-6">{index + 1}.</a>
                                    jeder{' '}
                                    {item == 366
                                      ? 'letzte Tag im Jahr (nur an Schaltjahre)'
                                      : item == 365
                                        ? 'letzte Tag im Jahr (nicht an Schaltjahre)'
                                        : item == 1
                                          ? 'erste Tag im Jahr'
                                          : item + '. Tag im Jahr'}
                                    <MdClose
                                      onClick={() => toggleYearDay(item)}
                                      className="mx-6 float-right mt-0.5 cursor-pointer"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="w-full flex flex-col items-center justify-center py-1 text-xs ring-1 ring-gray-700">
                                Keine Tage vorhanden
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-3">
                            <div className=" h-8 flex flex-row items-center justify-start mr-8">
                              <a className="mr-3 text-sm">Kalenderwoche:</a>
                            </div>
                            <div className="w-[28%] h-8">
                              <label className="  w-full flex flex-col items-center justify-center relative">
                                <select
                                  ref={_yearlybyweekref}
                                  title="Nach spezifischen Kalenderwochen"
                                  name="Kalenderwochen"
                                  className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
                                  placeholder="Nach spezifischen Kalenderwochen"
                                >
                                  {Array.from({ length: 53 }, (_, i) => i + 1).map(
                                    (item, index) => (
                                      <option value={item} className="w-full dark:bg-gray-900">
                                        {item == 53
                                          ? 'letzte Woche im Jahr (nur Jahre mit 53 Wochen)'
                                          : item == 52
                                            ? 'letzte Woche im Jahr (nur Jahre mit 52 Wochen)'
                                            : item == 1
                                              ? 'erste Woche im Jahr'
                                              : item + '. Woche im Jahr'}
                                      </option>
                                    )
                                  )}
                                </select>
                              </label>
                            </div>
                            <div className="w-32 text-xs flex flex-col items-center justify-center h-8">
                              <button
                                onClick={() => toggleYearWeekNum(_yearlybyweekref.current.value)}
                                className=" h-8 flex flex-row items-center px-2 justify-center dark:bg-blue-600 rounded-sm"
                              >
                                + Hinzufügen
                              </button>
                            </div>
                          </div>
                          <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2  dark:text-white text-black text-xs font-[Arial]">
                            Spezifische Kalendertage im Jahr ({rrByBYYEARWEEKNUMyearly.length})
                          </div>
                          <div className="w-full col-span-4 flex flex-col items-start justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial] ">
                            {rrByBYYEARWEEKNUMyearly.length > 0 ? (
                              <div className="w-full flex flex-col items-center justify-center text-xs divide-y dark:divide-gray-700 ring-1 ring-gray-700">
                                {console.log(rrByBYYEARWEEKNUMyearly)}
                                {rrByBYYEARWEEKNUMyearly.map((item, index) => (
                                  <div className="w-full text-left  py-1">
                                    <a className="mx-6">{index + 1}.</a>
                                    jede{' '}
                                    {item == 53
                                      ? 'letzte Woche im Jahr (nur Jahre mit 53 Wochen)'
                                      : item == 52
                                        ? 'letzte Woche im Jahr (nur Jahre mit 52 Wochen)'
                                        : item == 1
                                          ? 'erste Woche im Jahr'
                                          : item + '. Woche im Jahr'}
                                    <MdClose
                                      onClick={() => toggleYearWeekNum(item)}
                                      className="mx-6 float-right mt-0.5 cursor-pointer"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="w-full flex flex-col items-center justify-center py-1 text-xs ring-1 ring-gray-700">
                                Keine Tage vorhanden
                              </div>
                            )}
                          </div>
                          <div className="w-full col-span-4 h-8 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2   dark:text-white text-black text-sm font-[Arial]">
                            <a className="mr-3 h-8">Wochentage:</a>
                            <div className="w-[80%] h-8 grid grid-cols-7 items-start justify-items-start gap-1">
                              {days.map((item, index) => (
                                <div
                                  onClick={() => toggleDay(item)}
                                  className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rrByDays.includes(item) ? ' bg-blue-400/30 ' : ''}`}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : rrFrequency == 'MONTHLY' ? (
                    <>
                      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
                        <div className=" h-8 flex flex-row items-center justify-start mr-8">
                          <a className="mr-3 text-sm">Muster des Termin:</a>
                        </div>
                        <div className="w-[60%] h-8">
                          <label className="  w-full flex flex-col items-center justify-center relative">
                            <select
                              title="Muster"
                              name="Muster"
                              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
                              placeholder="Muster"
                              value={rrMonthTypeRule}
                              onChange={(e) => setRrMonthTypeRule(e.target.value)}
                            >
                              <option value={'DAY'} className="w-full dark:bg-gray-900">
                                spezifische Tage im Monat
                              </option>
                              <option value={'WEEKDAY'} className="w-full dark:bg-gray-900">
                                Wochentag spezifisch im Monat
                              </option>
                            </select>
                            <MdPattern className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                          </label>
                        </div>
                      </div>
                      {rrMonthTypeRule == 'DAY' ? (
                        <div className="w-full col-span-4  flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2   dark:text-white text-black text-sm font-[Arial]">
                          <a className="mr-3 h-8">Jeder:</a>
                          <div className="w-[86%]  grid grid-cols-7 items-start justify-items-start gap-1">
                            {[
                              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                              21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
                            ].map((item, index) => (
                              <div
                                onClick={() => toggleMonthDay(item)}
                                className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rrByMonthDay.includes(item) ? ' bg-blue-400/30 ' : ''}`}
                              >
                                {item}.
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
                            <div className=" h-8 flex flex-row items-center justify-start mr-8">
                              <a className="mr-3 text-sm">Jeder:</a>
                            </div>
                            <div className="w-[28%] h-8 mr-2">
                              <label className="  w-full flex flex-col items-center justify-center relative">
                                <select
                                  ref={_monthbydayrefOrdinary}
                                  title="Nach spezifischen Wochentag"
                                  name="Wochentag"
                                  className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
                                  placeholder="Nach spezifischen Wochentag"
                                >
                                  {ordinals.map((item, index) => (
                                    <option value={item.value} className="w-full dark:bg-gray-900">
                                      {item.label}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                            <div className="w-[28%] h-8">
                              <label className="  w-full flex flex-col items-center justify-center relative">
                                <select
                                  ref={_monthbydayrefWeekday}
                                  title="Nach spezifischen Wochentag"
                                  name="Wochentag"
                                  className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
                                  placeholder="Nach spezifischen Wochentag"
                                >
                                  {days.map((item, index) => (
                                    <option value={item} className="w-full dark:bg-gray-900">
                                      {item == 'MO'
                                        ? 'Montag'
                                        : item == 'DI'
                                          ? 'Dienstag'
                                          : item == 'MI'
                                            ? 'Mittwoch'
                                            : item == 'DO'
                                              ? 'Donnerstag'
                                              : item == 'FR'
                                                ? 'Freitag'
                                                : item == 'SA'
                                                  ? 'Samstag'
                                                  : 'Sonntag'}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                            <div className="w-32 text-xs flex flex-col items-center justify-center h-8">
                              <button
                                onClick={() =>
                                  toggleMonthDayOnWeekdaySpecific(
                                    _monthbydayrefOrdinary.current.value +
                                      ':' +
                                      _monthbydayrefWeekday.current.value
                                  )
                                }
                                className=" h-8 flex flex-row items-center px-2 justify-center dark:bg-blue-600 rounded-sm"
                              >
                                + Hinzufügen
                              </button>
                            </div>
                          </div>
                          <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-xs font-[Arial]">
                            Spezifische Wochentage im Monat ({rrByBYDAYMonth.length})
                          </div>
                          <div className="w-full col-span-4 flex flex-col items-start justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial] ">
                            {rrByBYDAYMonth.length > 0 ? (
                              <div className="w-full flex flex-col items-center justify-center text-xs divide-y dark:divide-gray-700 ring-1 ring-gray-700">
                                {console.log(rrByBYDAYMonth)}
                                {rrByBYDAYMonth.map((item, index) => (
                                  <div className="w-full text-left  py-1">
                                    <a className="mx-6">{index + 1}.</a>
                                    jeder{' '}
                                    {
                                      ordinals.find((o) => o.value == item.split(':')[0])?.label
                                    }{' '}
                                    {item.split(':')[1] == 'MO'
                                      ? 'Montag'
                                      : item.split(':')[1] == 'DI'
                                        ? 'Dienstag'
                                        : item.split(':')[1] == 'MI'
                                          ? 'Mittwoch'
                                          : item.split(':')[1] == 'DO'
                                            ? 'Donnerstag'
                                            : item.split(':')[1] == 'FR'
                                              ? 'Freitag'
                                              : item.split(':')[1] == 'SA'
                                                ? 'Samstag'
                                                : 'Sonntag'}
                                    <MdClose
                                      onClick={() => toggleMonthDayOnWeekdaySpecific(item)}
                                      className="mx-6 float-right mt-0.5 cursor-pointer"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="w-full flex flex-col items-center justify-center py-1 text-xs ring-1 ring-gray-700">
                                Keine Tage vorhanden
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  ) : rrFrequency == 'WEEKLY' ? (
                    <>
                      <div className="w-full col-span-4 h-8 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2 -mb-1   dark:text-white text-black text-sm font-[Arial]">
                        <a className="mr-3 h-8">Wochentage:</a>
                        <div className="w-[80%] h-8 grid grid-cols-7 items-start justify-items-start gap-1">
                          {days.map((item, index) => (
                            <div
                              onClick={() => toggleDay(item)}
                              className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rrByDays.includes(item) ? ' bg-blue-400/30 ' : ''}`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                  <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2  dark:text-white text-black text-sm font-[Arial]">
                    <label className="  w-full flex flex-col items-center justify-center relative">
                      <input
                        title="Farbe"
                        name="hexcolor"
                        className=" w-full h-8 font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
                        type="color"
                        placeholder="Betreff"
                        value={color}
                        onChange={(e) => setcolor(e.target.value)}
                      />
                      <MdColorize className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                      <MdClose
                        onClick={() => 'handleFilterChange("Betrefftxt", "")'}
                        className={
                          'absolute hidden cursor-pointer inset right-3 text-2xl top-[0.1rem] text-gray-500 hover:text-gray-400'
                        }
                      />
                    </label>
                  </div>
                  <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-blue-900/40 bg-blue-700/10 pl-2 py-0.5  dark:bg-gray-900 bg-white border-b dark:border-gray-700 border-gray-400 mt-6 mb-2 dark:text-white text-black font-[Arial]">
                    Zusammenfassung
                  </div>
                  <div className="w-full col-span-4 flex flex-col items-center justify-end dark:bg-gray-900 bg-white px-6 mt-0  dark:text-white text-black text-sm font-[Arial]">
                    <div className="w-full flex flex-col items-start justify-start ring-1 dark:ring-gray-700 ring-gray-400 p-2 text-xs">
                      <div className="w-full grid grid-cols-2 items-start justify-items-start ">
                        <div className="w-full">
                          Startet am:{' '}
                          {rrStartDate != null
                            ? formatDateTimeAlarmToString(rrStartDate).split(' ')[0]
                            : 'Kein Startdatum vorhanden'}
                        </div>
                        <div className="w-full">
                          Endet:{' '}
                          {rrEndeType == 'NODATE'
                            ? 'Kein Enddatum'
                            : rrEndeType == 'DATE'
                              ? rrEndDate != null
                                ? formatDateTimeAlarmToString(rrEndDate).split(' ')[0]
                                : 'Kein Enddatum vorhanden'
                              : ''}{' '}
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-2 items-start justify-items-start ">
                        <div className="w-full">
                          Uhrzeit:{' '}
                          {rrStartDate != null
                            ? formatDateTimeAlarmToString(rrStartDate).split(' ')[1]
                            : 'HH:MM'}
                        </div>
                        <div className="w-full">
                          Dauer:{' '}
                          {rrEndeDauer == 1440
                            ? 'ganztägig'
                            : rrEndeDauer / 60 < 1
                              ? `${rrEndeDauer} Minuten`
                              : `${rrEndeDauer / 60} Stunden`}
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 ">
                        <div className="w-full ">Serienmuster:</div>
                      </div>
                      <div className="w-full grid grid-cols-2 items-start justify-items-start ">
                        <div className="w-full">
                          Muster:{' '}
                          {rrFrequency == 'YEARLY'
                            ? 'jährlich'
                            : rrFrequency == 'MONTHLY'
                              ? 'monatlich'
                              : rrFrequency == 'WEEKLY'
                                ? 'wöchentlich'
                                : 'täglich'}
                        </div>
                        <div className="w-full">
                          Wiederholungsmuster:{' '}
                          {rrFrequency == 'YEARLY'
                            ? rrRepeats > 1
                              ? `Alle ${rrRepeats} Jahre`
                              : `jedes Jahr`
                            : rrFrequency == 'MONTHLY'
                              ? rrRepeats > 1
                                ? `Alle ${rrRepeats} Monate`
                                : `jeden Monat`
                              : rrFrequency == 'WEEKLY'
                                ? rrRepeats > 1
                                  ? `Alle ${rrRepeats} Wochen`
                                  : `jede Woche`
                                : rrRepeats > 1
                                  ? `Alle ${rrRepeats} Tage`
                                  : `jeden Tag`}
                        </div>
                      </div>
                      {rrFrequency == 'YEARLY' ? (
                        <>
                          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 ">
                            <div className="w-full ">
                              Terminmuster:{' '}
                              {rrYEARLYTypMuster == 'DATUM'
                                ? 'nach Datum'
                                : rrYEARLYTypMuster == 'WOCHENTAGMONAT'
                                  ? 'nach spezifischen Wochentagen'
                                  : rrYEARLYTypMuster == 'YEARDAY'
                                    ? 'nach spezifischen Kalendertagen'
                                    : 'nach spezifische Kalenderwochen'}
                            </div>
                          </div>
                          {rrYEARLYTypMuster == 'DATUM' ? (
                            <>
                              <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 mb-1 ">
                                <div className="w-full ">Datum:</div>
                              </div>
                              <div className="w-[100%] grid grid-cols-3 items-start justify-items-start ">
                                <div className="w-full">
                                  {rrByMonthDay.length > 1 ? 'An den Tagen' : 'Am Tag'}:
                                </div>
                                <div className="w-full col-span-2">
                                  {rrByMONTHyear.length > 1 ? 'in den Monaten' : 'im Monat'}:
                                </div>
                                <div className="w-full flex flex-col items-start justify-start pl-4">
                                  <div className="w-full grid grid-cols-2">
                                    {rrByMonthDay.length > 0 ? (
                                      rrByMonthDay.map((item, index) => <a>- {item}.</a>)
                                    ) : (
                                      <a>Kein Datum vorhanden</a>
                                    )}
                                  </div>
                                </div>
                                <div className="w-full flex flex-col items-start justify-start  col-span-2 pl-4">
                                  <div className="w-full grid grid-cols-3">
                                    {rrByMONTHyear.length > 0 ? (
                                      rrByMONTHyear.map((item, index) => (
                                        <a>
                                          -{' '}
                                          {item == 1
                                            ? 'Januar'
                                            : item == 2
                                              ? 'Februar'
                                              : item == 3
                                                ? 'März'
                                                : item == 4
                                                  ? 'April'
                                                  : item == 5
                                                    ? 'Mai'
                                                    : item == 6
                                                      ? 'Juni'
                                                      : item == 7
                                                        ? 'Juli'
                                                        : item == 8
                                                          ? 'August'
                                                          : item == 9
                                                            ? 'September'
                                                            : item == 10
                                                              ? 'Oktober'
                                                              : item == 11
                                                                ? 'November'
                                                                : 'Dezember'}
                                        </a>
                                      ))
                                    ) : (
                                      <a>Kein Datum vorhanden</a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : rrYEARLYTypMuster == 'WOCHENTAGMONAT' ? (
                            <>
                              <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 mb-1 ">
                                <div className="w-full ">Nach spezifischen Wochentagen:</div>
                              </div>
                              <div className="w-[100%] grid grid-cols-3 items-start justify-items-start ">
                                <div className="w-full">
                                  {rrByBYDAYMonth.length > 1
                                    ? 'An den Wochentagen'
                                    : 'An dem Wochentag'}
                                  :
                                </div>
                                <div className="w-full col-span-2">
                                  {rrByMONTHyear.length > 1 ? 'in den Monaten' : 'im Monat'}:
                                </div>
                                <div className="w-full flex flex-col items-start justify-start pl-4">
                                  {rrByBYDAYMonth.length > 0 ? (
                                    rrByBYDAYMonth.map((item, index) => (
                                      <a>
                                        - jeder{' '}
                                        {ordinals.find((o) => o.value == item.split(':')[0])?.label}{' '}
                                        {item.split(':')[1] == 'MO'
                                          ? 'Montag'
                                          : item.split(':')[1] == 'DI'
                                            ? 'Dienstag'
                                            : item.split(':')[1] == 'MI'
                                              ? 'Mittwoch'
                                              : item.split(':')[1] == 'DO'
                                                ? 'Donnerstag'
                                                : item.split(':')[1] == 'FR'
                                                  ? 'Freitag'
                                                  : item.split(':')[1] == 'SA'
                                                    ? 'Samstag'
                                                    : 'Sonntag'}
                                      </a>
                                    ))
                                  ) : (
                                    <a>Kein Datum vorhanden</a>
                                  )}
                                </div>
                                <div className="w-full flex flex-col items-start justify-start pl-4 col-span-2">
                                  <div className="w-full grid grid-cols-3">
                                    {rrByMONTHyear.length > 0 ? (
                                      rrByMONTHyear.map((item, index) => (
                                        <a>
                                          -{' '}
                                          {item == 1
                                            ? 'Januar'
                                            : item == 2
                                              ? 'Februar'
                                              : item == 3
                                                ? 'März'
                                                : item == 4
                                                  ? 'April'
                                                  : item == 5
                                                    ? 'Mai'
                                                    : item == 6
                                                      ? 'Juni'
                                                      : item == 7
                                                        ? 'Juli'
                                                        : item == 8
                                                          ? 'August'
                                                          : item == 9
                                                            ? 'September'
                                                            : item == 10
                                                              ? 'Oktober'
                                                              : item == 11
                                                                ? 'November'
                                                                : 'Dezember'}
                                        </a>
                                      ))
                                    ) : (
                                      <a>Kein Datum vorhanden</a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : rrYEARLYTypMuster == 'YEARDAY' ? (
                            <>
                              <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2  mb-1">
                                <div className="w-full ">Nach spezifischen Kalendertagen:</div>
                              </div>
                              <div className="w-[100%] grid grid-cols-1 items-start justify-items-start ">
                                <div className="w-full">
                                  {rrByBYYEARDAYyearly.length > 1
                                    ? 'An den Kalendertagen'
                                    : 'An den Kalendertagen'}
                                  :
                                </div>
                                <div className="w-full flex flex-col items-start justify-start px-4">
                                  <div className="w-full grid grid-cols-2">
                                    {rrByBYYEARDAYyearly.length > 0 ? (
                                      rrByBYYEARDAYyearly.map((item, index) => (
                                        <a>
                                          - jeder{' '}
                                          {item == 366
                                            ? 'letzte Tag im Jahr (nur an Schaltjahre)'
                                            : item == 365
                                              ? 'letzte Tag im Jahr (nicht an Schaltjahre)'
                                              : item == 1
                                                ? 'erste Tag im Jahr'
                                                : item + '. Tag im Jahr'}
                                        </a>
                                      ))
                                    ) : (
                                      <a>Kein Datum vorhanden</a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2  mb-1">
                                <div className="w-full ">Nach spezifischen Kalenderwochen:</div>
                              </div>
                              <div className="w-full grid grid-cols-2 items-start justify-items-start ">
                                <div className="w-full">
                                  {rrByBYYEARWEEKNUMyearly.length > 1
                                    ? 'An den Kalenderwochen'
                                    : 'An den Kalenderwochen'}
                                  :
                                </div>
                                <div className="w-full">
                                  {rrByBYYEARWEEKNUMyearly.length > 1
                                    ? 'an den Wochentagen'
                                    : 'an den Wochentagen'}
                                  :
                                </div>
                                <div className="w-full flex flex-col items-start justify-start px-4">
                                  {rrByBYYEARWEEKNUMyearly.length > 0 ? (
                                    rrByBYYEARWEEKNUMyearly.map((item, index) => (
                                      <a>
                                        - jede{' '}
                                        {item == 53
                                          ? 'letzte Woche im Jahr (nur Jahre mit 53 Wochen)'
                                          : item == 52
                                            ? 'letzte Woche im Jahr (nur Jahre mit 52 Wochen)'
                                            : item == 1
                                              ? 'erste Woche im Jahr'
                                              : item + '. Woche im Jahr'}
                                      </a>
                                    ))
                                  ) : (
                                    <a>Kein Datum vorhanden</a>
                                  )}
                                </div>
                                <div className="w-full flex flex-col items-start justify-start pl-4">
                                  <div className="w-full grid grid-cols-2">
                                    {rrByDays.length > 0 ? (
                                      rrByDays.map((item, index) => (
                                        <a>
                                          -{' '}
                                          {item == 'MO'
                                            ? 'Montag'
                                            : item == 'DI'
                                              ? 'Dienstag'
                                              : item == 'MI'
                                                ? 'Mittwoch'
                                                : item == 'DO'
                                                  ? 'Donnerstag'
                                                  : item == 'FR'
                                                    ? 'Freitag'
                                                    : item == 'SA'
                                                      ? 'Samstag'
                                                      : 'Sonntag'}
                                        </a>
                                      ))
                                    ) : (
                                      <a>Kein Datum vorhanden</a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : rrFrequency == 'WEEKLY' ? (
                        <>
                          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2  mb-1 ">
                            <div className="w-full ">Wochentage:</div>
                          </div>
                          <div className="w-full flex flex-col items-start justify-start pl-4">
                            <div className="w-full grid grid-cols-2">
                              {rrByDays.length > 0 ? (
                                rrByDays.map((item, index) => (
                                  <div className="w-full">
                                    -{' '}
                                    {item == 'MO'
                                      ? 'Montag'
                                      : item == 'DI'
                                        ? 'Dienstag'
                                        : item == 'MI'
                                          ? 'Mittwoch'
                                          : item == 'DO'
                                            ? 'Donnerstag'
                                            : item == 'FR'
                                              ? 'Freitag'
                                              : item == 'SA'
                                                ? 'Samstag'
                                                : 'Sonntag'}
                                  </div>
                                ))
                              ) : (
                                <div className="w-full">Keine Daten vorhanden</div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : rrFrequency == 'MONTHLY' ? (
                        <>
                          {rrMonthTypeRule == 'DAY' ? (
                            <>
                              <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2   mb-1">
                                <div className="w-full ">Spezifische Tage im Monat:</div>
                              </div>
                              <div className="w-full flex flex-col items-start justify-start pl-4">
                                <div className="w-full grid grid-cols-2">
                                  {rrByMonthDay.length > 0 ? (
                                    rrByMonthDay.map((item, index) => (
                                      <div className="w-full">- jeden {item}. im Monat</div>
                                    ))
                                  ) : (
                                    <div className="w-full">Keine vorhanden</div>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2  mb-1">
                                <div className="w-full ">Spezifische Wochentage im Monat:</div>
                              </div>
                              <div className="w-full flex flex-col items-start justify-start pl-4">
                                <div className="w-full grid grid-cols-2">
                                  {rrByBYDAYMonth.length > 0 ? (
                                    rrByBYDAYMonth.map((item, index) => (
                                      <div className="w-full">
                                        - jeder{' '}
                                        {ordinals.find((o) => o.value == item.split(':')[0])?.label}{' '}
                                        {item.split(':')[1] == 'MO'
                                          ? 'Montag'
                                          : item.split(':')[1] == 'DI'
                                            ? 'Dienstag'
                                            : item.split(':')[1] == 'MI'
                                              ? 'Mittwoch'
                                              : item.split(':')[1] == 'DO'
                                                ? 'Donnerstag'
                                                : item.split(':')[1] == 'FR'
                                                  ? 'Freitag'
                                                  : item.split(':')[1] == 'SA'
                                                    ? 'Samstag'
                                                    : 'Sonntag'}{' '}
                                        im Monat
                                      </div>
                                    ))
                                  ) : (
                                    <div className="w-full">Keine vorhanden</div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        ''
                      )}
                      <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 ">
                        <div className="w-full ">Farbe:</div>
                      </div>
                      <div className="w-full grid grid-cols-1 items-start justify-items-start mt-1 pl-4 ">
                        <div style={{ background: color }} className="w-20 p-1 py-2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full col-span-4 flex flex-row items-center justify-end dark:bg-gray-900 bg-white px-6 my-6  dark:text-white text-black text-sm font-[Arial]">
                    <button
                      onClick={(e) => callaction()}
                      className={`px-4 py-2 mb-2 rounded-sm dark:bg-gray-800 bg-gray-300/60 dark:hover:bg-gray-700 hover:bg-gray-100 outline-none ring-1 dark:ring-gray-700 ring-gray-400/80 dark:text-gray-300 text-gray-800`}
                    >
                      Eintrag speichern
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default DialogEventDayEntry
