import React, { Fragment, useEffect, useState } from 'react'
import imgs from './../../../assets/Logo.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import { de } from 'date-fns/locale/de'
import {
  MdAddAlert,
  MdAlarm,
  MdClose,
  MdColorize,
  MdEvent,
  MdNote,
  MdNoteAdd,
  MdPublic,
  MdPublicOff,
  MdTimelapse,
  MdTimer
} from 'react-icons/md'
import Switch from './../../Switch'
import { isDate } from 'date-fns'
import dayjs from 'dayjs'
import { useRoles } from '../../../styles/RoleContext'
registerLocale('de-DE', de)
const DialogEventDayEntry = ({ show, close, titel, obj }) => {
  const { hasPermission } = useRoles()
  console.log(obj)
  const [color, setColor] = useState('')
  const [changePublic, setChangePublic] = useState(false)
  const [showAlarm, setShowAlarm] = useState(false)
  const [eventData, setEventData] = useState(null)
  const closer = (e) => {
    if (!e.target.closest("[aria-label='Ditab']")) {
      close(null)
      setShowAlarm(false)
      setEventData(null)
    }
  }
  const handleChange = (key, value) => {
    setEventData((prevState) => {
      if (!prevState) {
        return { [key]: value } // Initialize if state is null
      }
      return { ...prevState, [key]: value }
    })
  }
  const handleSwitch = (t) => {
    setShowAlarm(t)
    handleChange('isAlarm', t)
  }
  const handleSelecter = (t) => {
    setChangePublic(t > 0 ? true : false)
    handleChange('isPublic', t)
  }
  const handleColor = (t) => {
    setColor(t)
    handleChange('hexcolor', t)
  }
  useEffect(() => {
    setEventData(obj)
    setShowAlarm(obj?.isAlarm || false)
    setChangePublic(obj?.isPublic > 0 ? true : false)
    setColor(obj?.hexcolor.slice(0, 7) || false)
  }, [obj])
  return (
    <Fragment>
      {show && (
        <div
          className="fixed inset-0 z-10  dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
          onClick={closer}
        >
          <div
            aria-label="Ditab"
            className="min-w-[30%] max-w-[32%] flex z-40 flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm"
          >
            <div
              id="titlebar"
              className={
                'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'
              }
            >
              <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                <img src={imgs} className="w-10 h-2  " />
                {titel}
              </span>
            </div>
            <div className="w-full flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2 pt-4 dark:text-white text-black text-sm font-[Arial]">
              <label className="  w-full flex flex-col items-center justify-center relative">
                <input
                  title="Betreff"
                  name="title"
                  className=" w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm"
                  placeholder="Betreff"
                  value={eventData?.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
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
            <div className="w-full grid grid-cols-4 items-start justify-items-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
              <div className="w-full col-span-1 h-full flex flex-row items-center justify-start">
                <a className="mr-2 text-sm">START</a> <MdTimelapse className="text-xl mr-2" />
              </div>
              <div className="col-span-3 w-full">
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
                  className=" w-full ml-2 col-span-3 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                  selected={eventData?.realtimestartDate || new Date()}
                  onChange={(date) => handleChange('realtimestartDate', date)}
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-4 items-start justify-items-start dark:bg-gray-900 bg-white px-6 py-4 dark:text-white text-black text-sm font-[Arial]">
              <div className="w-full col-span-1 h-full flex flex-row items-center justify-start">
                <a className="mr-2.5 text-sm">ENDE</a> <MdTimelapse className="text-xl mr-2" />
              </div>
              <div className="col-span-3 w-full">
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
                  className=" w-full ml-2  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                  selected={eventData?.realtimeendDate || new Date()}
                  onChange={(date) => handleChange('realtimeendDate', date)}
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2 pt-4 dark:text-white text-black text-sm font-[Arial]">
              <label className="  w-full flex flex-col items-center justify-center relative">
                <textarea
                  title="Notiz"
                  className="resize-none w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 h-32 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm"
                  placeholder="Notiz hinzufügen"
                  value={eventData?.isNoteAttached || ''}
                  onChange={(e) => handleChange('isNoteAttached', e.target.value)}
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
            <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
              <div className="w-[30%] h-10 flex flex-row items-center justify-start">
                <a className="mr-2.5 text-sm">Erinnerung</a>
                <Switch setter={handleSwitch} wert={showAlarm} />
              </div>
              <div className="w-[70%] h-10 flex flex-row items-center justify-start">
                {showAlarm == true ? (
                  <div className="w-full grid grid-cols-6 items-start justify-items-start ">
                    <div className="w-full col-span-1 h-full flex flex-row items-center justify-center">
                      {' '}
                      <MdAlarm className="text-xl mr-2" />
                    </div>
                    <div className="col-span-5 w-full">
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
                        className=" w-full ml-2  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                        selected={
                          eventData?.isAlarm
                            ? Object.prototype.toString.call(eventData?.isAlarmStamp) ===
                              '[object Date]'
                              ? eventData?.isAlarmStamp
                              : new Date(
                                  eventData?.isAlarmStamp.split(' ')[0].split('.')[2],
                                  eventData?.isAlarmStamp.split(' ')[0].split('.')[1] - 1,
                                  eventData?.isAlarmStamp.split(' ')[0].split('.')[0],
                                  eventData?.isAlarmStamp.split(' ')[1].split(':')[0],
                                  eventData?.isAlarmStamp.split(' ')[1].split(':')[1]
                                )
                            : new Date()
                        }
                        onChange={(date) => handleChange('isAlarmStamp', date)}
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
              <div className="w-[30%] h-10 flex flex-row items-center justify-start">
                <a className="mr-2.5 text-sm">Sichtbarkeit</a>
              </div>
              <div className="w-[70%] h-10 flex flex-row items-center justify-start">
                <label className="  w-5/6 flex flex-col items-center justify-center relative">
                  <select
                    title="Sichtbarkeit"
                    name="title"
                    className=" w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm"
                    value={eventData?.isPublic || false}
                    onChange={(e) => handleSelecter(e.target.value)}
                  >
                    <option value={0}>Privat</option>
                    {hasPermission('create:calendar') ? <option value={1}>Öffentlich</option> : ''}
                  </select>
                  {changePublic ? (
                    <MdPublic className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                  ) : (
                    <MdPublicOff className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                  )}
                </label>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial]">
              <label className="  w-full flex flex-col items-center justify-center relative">
                <input
                  name="color"
                  className=" w-full h-10 font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm"
                  type="color"
                  value={color}
                  onChange={(e) => handleColor(e.target.value)}
                />
                <MdColorize className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
              </label>
            </div>
            <div className="w-full flex flex-row items-center justify-end dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial]">
              {eventData?.title.trim().length > 1 &&
              hasPermission('create:calendar') &&
              isDate(eventData?.realtimestartDate) &&
              isDate(eventData?.realtimeendDate) ? (
                <button
                  onClick={(e) => 'callaction()'}
                  className={`px-4 py-2 mb-2 rounded-sm dark:bg-gray-800 bg-gray-300/60 dark:hover:bg-gray-700 hover:bg-gray-100 outline-none ring-1 dark:ring-gray-700 ring-gray-400/80 dark:text-gray-300 text-gray-800`}
                >
                  Bestätigen
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default DialogEventDayEntry
