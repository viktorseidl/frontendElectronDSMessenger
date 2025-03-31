import React, { useState } from 'react'
import { IoMdMove } from 'react-icons/io'
import { MdDelete, MdEdit, MdNotes } from 'react-icons/md'
import { motion } from 'framer-motion'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { adjustForMode, calculateHeight } from './functions/functionHandler'
import { useTheme } from '../../../styles/ThemeContext'
import { useRoles } from '../../../styles/RoleContext'
import { util } from 'node-forge'
const Event = ({ event, updateEventDuration, deleteEvent, showNoteIDS, editEvent, ityp }) => {
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const { hasPermission } = useRoles()
  const { theme } = useTheme()
  const [isResizing, setIsResizing] = useState(false)
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

  const handleResize = (e) => {
    if (!isResizing) return
    e.stopPropagation()
    updateEventDuration(event.id, event.duration + 1)
    setIsResizing(false)
  }

  return (
    <motion.div
      ref={preview} // Ensures the event stays visible while dragging
      className={`p-1 text-black rounded dark:ring-0 ring-1 ring-gray-400 relative calshadow ${isDragging ? 'opacity-50' : ''}`}
      id={event.id}
      style={{
        minHeight: '28px',
        height: `${calculateHeight(event.duration, 40)}px`,
        background: `${theme ? adjustForMode(event.ColorHex, 'light') : adjustForMode(event.ColorHex, 'dark')}`
      }}
    >
      <div className="w-full flex flex-row items-start justify-start">
        <div className={`${event.isEditable ? ' -mt-[5px]  ' : ' mt-0 '} text-xs`}>
          {event.isNoteAttached != null ? (
            <button
              onClick={() => showNoteIDS(event.id, calculateHeight(event.duration, 40), true)}
              className="inline w-5 mr-1 mt-1  group aspect-square text-center bg-yellow-100 hover:bg-yellow-200 ring-1 outline-none ring-gray-300 text-black p-1 rounded text-xs"
              aria-label="isbuttondoubleclick"
            >
              <MdNotes aria-label="isbuttondoubleclick" />
            </button>
          ) : (
            ''
          )}
        </div>
        <div className={` w-48 h-full max-w-52 flex flex-col text-xs   truncate`}>
          <div className="w-full flex flex-row items-center justify-start  truncate">
            ({event.realtimestart} - {event.realtimeend}) |
            <b title={event.title} className="px-1  truncate">
              {' '}
              {event.titel}
            </b>
          </div>
          <pre
            className="w-full text-wrap hidden mt-2 font-[arial]"
            onClick={() => showNoteIDS(event.id, calculateHeight(event.duration, 40), false)}
            id={'shownote' + event.id}
          >
            {event.isNoteAttached}
          </pre>
        </div>
        {hasPermission('delete:calendar') ||
        (event.isEditable == true &&
          event.isPublic == true &&
          event.ersteller == User.Name.toString().toUpperCase()) ? (
          <button
            ref={drag}
            className=" w-auto mr-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs"
            onClick={() => deleteEvent(event.id)}
            aria-label="isbuttondoubleclick"
          >
            <MdDelete aria-label="isbuttondoubleclick" />
          </button>
        ) : (
          ''
        )}
        {hasPermission('update:calendar') ||
        (event.isEditable == true &&
          event.isPublic == true &&
          event.ersteller == User.Name.toString().toUpperCase()) ? (
          <button
            ref={drag}
            className=" w-auto mr-1 bg-blue-600 hover:bg-blue-500 text-white p-1 rounded text-xs"
            onClick={() => editEvent(event)}
            aria-label="isbuttondoubleclick"
          >
            <MdEdit aria-label="isbuttondoubleclick" />
          </button>
        ) : (
          ''
        )}
        {hasPermission('update:calendar') ||
        (event.isEditable == true &&
          event.isPublic == true &&
          event.ersteller == User.Name.toString().toUpperCase()) ? (
          <button
            ref={drag}
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

      {/* Drag Handle Button */}

      {/* Resizing Handle */}
      {isResizing && (
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700 cursor-s-resize resize-handle"
          onMouseDown={handleResize}
        ></div>
      )}
    </motion.div>
  )
}

export default Event
