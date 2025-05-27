import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import DraggableEvent from './DraggableEvent'
import { addMinutesToTime } from '../functionHandler'
import { util } from 'node-forge'
const Timeslot = ({ day, hour, handleDrop, events, showDayList }) => {
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const myref = useRef(null)
  const ariaLabel =
    day.toLocaleString('sv-SE').replace(' ', 'T').split('T')[0] +
    ' ' +
    (hour > 9 ? hour : '0' + hour) +
    ':00'

  const [{ isOver }, drop] = useDrop({
    accept: 'EVENT',
    drop: (item, monitor) => {
      const aria = myref.current.getAttribute('aria-label') //Date and time formated to => 2025-05-24 16:00
      handleDrop(item, aria)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })
  const setRefs = (node) => {
    myref.current = node
    drop(node)
  }
  return (
    <div
      ref={setRefs}
      onClick={() => showDayList(day)}
      aria-label={ariaLabel}
      key={hour}
      className={` w-full h-[40px] pl-1 cursor-pointer pt-1 text-xs select-none dark:text-gray-600 text-gray-500/40 relative ${
        isOver ? 'dark:bg-gray-300/20 bg-blue-200' : ''
      }`}
    >
      {`${
        day.toLocaleDateString('de-DE', {
          weekday: 'short'
        }) +
        ' ' +
        (hour > 9 ? hour : '0' + hour)
      }:00`}{' '}
      {events.length > 0 ? (
        <div
          key={'conta'}
          className={`absolute inset left-0 top-0 w-full h-full text-xs flex flex-col items-start justify-start  px-1 gap-y-1 overflow-auto py-0.5 pb-2 dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200`}
        >
          <div className="w-full flex flex-col items-start justify-start gap-y-1">
            {events.filter((a) => a.katBezeichnung == 'rrule').length > 0
              ? events
                  .filter((a) => a.katBezeichnung == 'rrule' && a.zeitraum != 1440)
                  .map((item, index) => (
                    <div
                      title={
                        '(' +
                        item.realtimestart +
                        ' - ' +
                        addMinutesToTime(item.von.toString(), parseInt(item.zeitraum)) +
                        ') | ' +
                        item.titel +
                        ' - ' +
                        item.betreff
                      }
                      style={{ background: item.boxColor }}
                      key={'conta' + 'rrule' + item + index}
                      className="w-full py-[2px] px-2 select-none  cursor-pointer text-black ring-1 dark:ring-gray-700  ring-gray-400   flex flex-row items-center text-xs justify-start rounded truncate"
                    >
                      {item.isprivate == false &&
                      item.ersteller.toString().toUpperCase() != User.Name.toString().toUpperCase()
                        ? '🔁🌍 - '
                        : '🔁🔒 Privat - '}{' '}
                      ({item.realtimestart} -{' '}
                      {addMinutesToTime(item.von.toString(), parseInt(item.zeitraum))}) |
                      <b title={item.titel} className="px-1  truncate">
                        {' '}
                        {item.titel} {item.betreff}
                      </b>
                    </div>
                  ))
              : ''}
          </div>
          {events.filter((a) => a.katBezeichnung == 'Termin').length > 0 ? (
            <div className="w-full flex flex-col items-start justify-start gap-y-1">
              {events
                .filter((a) => a.katBezeichnung == 'Termin')
                .map((item, index) => (
                  <DraggableEvent
                    key={'draggableev' + item + index}
                    event={item}
                    showDayList={showDayList}
                    day={day}
                  />
                ))}
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Timeslot
