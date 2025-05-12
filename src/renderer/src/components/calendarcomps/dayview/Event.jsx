import React, { useState } from 'react'
import { IoMdMove } from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { adjustForMode, calculateHeight } from './functions/functionHandler'
import { useRoles } from '../../../styles/RoleContext'
import { util } from 'node-forge'
const Event = ({ event, updateEventStandard, deleteEvent, ityp }) => {
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const { hasPermission } = useRoles()
  const [isDraggingAllowed, setIsDraggingAllowed] = useState(false)
  let longPressTimer = null

  const [{ isDragging }, drag, preview] = useDrag({
    type: ityp,
    item: event,
    canDrag: () => isDraggingAllowed, // Only allow dragging if `isDraggingAllowed` is true
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const handleLongPressStart = () => {
    longPressTimer = setTimeout(() => {
      setIsDraggingAllowed(true)
    }, 100) // 500ms long press threshold
  }

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer)
    setTimeout(() => setIsDraggingAllowed(false), 200) // Prevent immediate re-dragging
  }

  return (
    <motion.div
      ref={preview} // Ensures the event stays visible while dragging
      className={`min-w-60 pb-1 text-black rounded-sm dark:ring-1 ring-1 dark:ring-gray-700 flex flex-col ring-gray-400 relative calshadow ${isDragging ? 'opacity-50' : ''}`}
      id={event.id}
      style={{
        minHeight: '28px',
        height: event.duration < 4 ? `${calculateHeight(4, 40)}px` : `${calculateHeight(4, 40)}px`,
        background: `${adjustForMode('#cfddfa', 'dark')}`
      }}
    >
      <div className="w-full text-xs bg-blue-300 px-1 pb-[2px] rounded-t-sm">
        <div className="w-full flex flex-row items-center justify-start  truncate">
          📌 ({event.realtimestart} - {event.realtimeend}) |
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
            className={`w-5 h-5 mr-1 relative group bg-lime-600 hover:bg-lime-500 text-white px-[2px] flex flex-col items-center justify-center rounded text-xs`}
          >
            📄
            <div
              title="Notiz"
              className={` -left-[8.3rem] -top-[1.19rem] hidden group-hover:block shadow-lg shadow-[rgba(0,0,0,0.3)] rounded absolute  bg-yellow-100 text-black`}
              style={{
                height: '38px ',
                width: '235px'
              }}
            >
              <div className="w-full h-full overflow-auto flex flex-col scrollbar-thin scrollbar-thumb-gray-500  scrollbar-track-gray-200 p-1 ">
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
          event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase()) ||
        (hasPermission('delete:calendar') && User.usertypeVP != 'P') ? (
          <button
            title="Eintrag löschen"
            ref={drag}
            className=" w-auto mr-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs"
            onClick={() => deleteEvent(event.id, 'standard')}
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
          event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase()) ||
        (hasPermission('delete:calendar') && User.usertypeVP != 'P') ? (
          <button
            ref={drag}
            title="Eintrag bearbeiten"
            className=" w-auto mr-1 bg-blue-600 hover:bg-blue-500 text-white p-1 rounded text-xs"
            onClick={() => updateEventStandard(event)}
            aria-label="isbuttondoubleclick"
          >
            <MdEdit aria-label="isbuttondoubleclick" />
          </button>
        ) : (
          ''
        )}
        {(hasPermission('update:calendar') &&
          event.duration != 24 * 4 &&
          event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase()) ||
        (hasPermission('update:calendar') &&
          event.duration != 24 * 4 &&
          event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase()) ||
        (hasPermission('update:calendar') && event.duration != 24 * 4 && User.usertypeVP != 'P') ? (
          <button
            ref={drag}
            title="Eintrag verschieben"
            className=" w-auto bg-gray-700 hover:bg-gray-600 text-white p-1 rounded text-xs"
            aria-label="isbuttondoubleclick"
            onMouseDown={handleLongPressStart} // Start long press detection
            onMouseUp={handleLongPressEnd} // Reset after release
            onMouseLeave={handleLongPressEnd} // Reset if moved away
          >
            <IoMdMove aria-label="isbuttondoubleclick" />
          </button>
        ) : (
          ''
        )}
      </div>
    </motion.div>
  )
}

export default Event
