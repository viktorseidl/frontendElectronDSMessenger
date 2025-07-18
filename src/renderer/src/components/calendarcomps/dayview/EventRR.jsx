import React from 'react'
import { MdDelete, MdEdit, MdOpenInNew } from 'react-icons/md'
import { motion } from 'framer-motion'
import { calculateHeight } from './functions/functionHandler'
import { useRoles } from '../../../styles/RoleContext'
import { util } from 'node-forge'
import { useTheme } from '../../../styles/ThemeContext'
import { addMinutesToTime } from '../functionHandler'
const EventRR = ({ event, deleteEvent, updateEventRRule }) => {
  const { theme } = useTheme()
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const { hasPermission } = useRoles()
  const saveFileandOpen = async (item) => {
    const base64 = btoa(unescape(encodeURIComponent(item)))
    console.log(base64)
    const a = await window.api.electronFiles.saveIcs(base64, 'DS_Messenger.ics')
  }
  return (
    <motion.div
      className={`w-60  text-black rounded-sm dark:ring-1 ring-1 bg-white dark:ring-gray-700 flex flex-col ring-gray-400 relative calshadow `}
      id={event.id}
      style={{
        minHeight: '28px',
        height: event.duration < 4 ? `${calculateHeight(4, 40)}px` : `${calculateHeight(4, 40)}px`
      }}
    >
      <div
        style={{ background: theme ? `${event.boxColor + '55'}` : `${event.boxColor + '88'}` }}
        className={` w-full flex flex-col items-start justify-start h-full pb-1`}
      >
        <div className="w-full text-xs bg-gray-200 dark:bg-gray-200 px-1 pb-[2px] rounded-t-sm">
          <div className="w-full flex flex-row items-center justify-start  truncate">
            {event.isprivate == false &&
            event.ersteller.toString().toUpperCase() != User.Name.toString().toUpperCase()
              ? '🔁🌍 -'
              : '🔁🔒 Privat - '}{' '}
            ({event.realtimestart} -{' '}
            {addMinutesToTime(event.von.toString(), parseInt(event.zeitraum))}) |
            <b title={event.titel} className="px-1  truncate">
              {' '}
              {event.titel} {event.betreff}
            </b>
          </div>
        </div>
        <div className="w-full flex flex-row items-end justify-end px-1 pt-[1px]">
          <div className={` w-full h-full max-w-52 flex flex-col text-xs   truncate`}></div>
          {event.isNoteAttached != null ? (
            <div
              className={`w-5 h-5 relative group bg-lime-600 hover:bg-lime-500 text-white px-[2px] flex flex-col items-center justify-center rounded text-xs`}
            >
              📄
              <div
                title="Notiz"
                className={` -left-[8.3rem] -top-[1.19rem] hidden group-hover:block shadow-lg shadow-[rgba(0,0,0,0.3)] rounded absolute  bg-yellow-100 text-black`}
                style={{
                  height: '38px',
                  width: '235px'
                }}
              >
                <div className="w-full h-full overflow-auto flex flex-wrap scrollbar-thin scrollbar-thumb-gray-500  scrollbar-track-gray-200 p-1 ">
                  <div className="w-5/6 border-b border-gray-500">Notiz:</div>
                  <div className="w-full  mt-1">
                    <pre className=" text-wrap">{event.isNoteAttached}</pre>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {(hasPermission('delete:calendar') &&
            event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase()) ||
          (hasPermission('delete:calendar') &&
            event.ersteller.toString().toUpperCase() != User.Name.toString().toUpperCase()) ||
          (hasPermission('delete:calendar') && User.usertypeVP != 'P') ? (
            <button
              title="Eintrag löschen"
              className=" w-auto ml-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs"
              onClick={() => deleteEvent(event.id, 'rrule')}
              aria-label="isbuttondoubleclick"
            >
              <MdDelete aria-label="isbuttondoubleclick" />
            </button>
          ) : (
            ''
          )}
          {(hasPermission('update:calendar') &&
            event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase()) ||
          (hasPermission('update:calendar') &&
            event.ersteller.toString().toUpperCase() != User.Name.toString().toUpperCase()) ||
          (hasPermission('update:calendar') && User.usertypeVP != 'P') ? (
            <button
              title="Eintrag bearbeiten"
              className=" w-auto ml-1 bg-blue-600 hover:bg-blue-500 text-white p-1 rounded text-xs"
              onClick={() => updateEventRRule(event)}
              aria-label="isbuttondoubleclick"
            >
              <MdEdit aria-label="isbuttondoubleclick" />
            </button>
          ) : (
            ''
          )}
          <button
            title="Kalendereintrag exportieren"
            className=" w-auto ml-1 bg-white hover:bg-gray-200 text-black p-1 rounded text-xs"
            onClick={() => saveFileandOpen(event.icstxt)}
            aria-label="isbuttondoubleclick"
          >
            <MdOpenInNew aria-label="isbuttondoubleclick" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default EventRR
