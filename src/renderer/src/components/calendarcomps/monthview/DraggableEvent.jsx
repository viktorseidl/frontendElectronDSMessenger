import { useDrag } from 'react-dnd'
import { useRoles } from '../../../styles/RoleContext'
import { util } from 'node-forge'

const DraggableEvent = ({ event, day }) => {
  const { hasPermission } = useRoles()
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: event,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <>
      {hasPermission('update:calendar') &&
      event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase() ? (
        <div
          ref={drag}
          className={`w-full py-[2px] px-2 bg-blue-300 dark:bg-blue-300 cursor-pointer text-black ring-1 dark:ring-gray-700  ring-gray-400  flex flex-row items-center text-xs justify-start rounded truncate ${isDragging ? 'opacity-50' : ''}`}
          title={'(' + event.realtimestart + ' - ' + event.realtimeend + ') | ' + event.titel}
        >
          {event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase()
            ? event.isprivate == false
              ? '📌'
              : '🔒'
            : '🌍'}{' '}
          ({event.realtimestart} - {event.realtimeend}) |
          <b className=" px-1  truncate">
            {' '}
            {event.titel} {event.betreff}
          </b>
        </div>
      ) : (
        <div
          className={`w-full py-[2px] px-2 bg-blue-300 dark:bg-blue-300 cursor-pointer text-black ring-1 dark:ring-gray-700  ring-gray-400  flex flex-row items-center text-xs justify-start rounded truncate `}
          title={'(' + event.realtimestart + ' - ' + event.realtimeend + ') | ' + event.titel}
        >
          {event.ersteller.toString().toUpperCase() == User.Name.toString().toUpperCase()
            ? event.isprivate == false
              ? '📌'
              : '🔒'
            : '🌍'}{' '}
          ({event.realtimestart} - {event.realtimeend}) |
          <b className=" px-1  truncate">
            {' '}
            {event.titel} {event.betreff}
          </b>
        </div>
      )}
    </>
  )
}

export default DraggableEvent
