import { useDrag } from 'react-dnd'

const DraggableEvent = ({ event, day }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: event,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div
      ref={drag}
      className={`w-full py-[2px] px-2 bg-blue-300 dark:bg-blue-300 cursor-pointer text-black ring-1 dark:ring-gray-700  ring-gray-400  flex flex-row items-center text-xs justify-start rounded truncate ${isDragging ? 'opacity-50' : ''}`}
      title={'(' + event.realtimestart + ' - ' + event.realtimeend + ') | ' + event.titel}
    >
      📌 ({event.realtimestart} - {event.realtimeend}) |
      <b className=" px-1  truncate">
        {' '}
        {event.titel} {event.betreff}
      </b>
    </div>
  )
}

export default DraggableEvent
