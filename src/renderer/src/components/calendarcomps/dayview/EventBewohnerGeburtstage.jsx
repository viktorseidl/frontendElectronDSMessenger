import React from 'react'
import { motion } from 'framer-motion'
import { adjustForMode, calculateHeight } from './functions/functionHandler'
import { useTheme } from '../../../styles/ThemeContext'
const EventBewohnerGeburtstage = ({ event }) => {
  const { theme } = useTheme()

  return (
    <motion.div
      // Ensures the event stays visible while dragging
      className={`p-1 text-black rounded dark:ring-1 ring-1 dark:ring-gray-700 ring-gray-400 relative calshadow overflow-hidden `}
      id={event.id}
      style={{
        minHeight: '28px',
        height: `${calculateHeight(event.duration, 40)}px`,
        background: `${theme ? adjustForMode('event.ColorHex', 'light') : adjustForMode(event.ColorHex, 'dark')}`
      }}
    >
      <div className="w-full flex flex-row items-start justify-start">
        <div className={` w-48 h-full max-w-52 flex flex-col text-xs   truncate`}>
          <div className="w-full flex flex-col items-center justify-start  truncate gap-y-1">
            <b
              title={''}
              className="w-full  truncate mb-2 flex flex-col items-center justify-start"
            >
              <span className={`w-full dark:bg-white/20 bg-black/10  text-black rounded-t  p-1`}>
                Geburtstage Bewohner
              </span>
            </b>
            {event.titel.length > 0 &&
              event.titel.map((item, index) => (
                <div
                  title={item.titel}
                  key={'bname' + item + index}
                  className="w-full truncate p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-row items-center justify-start rounded "
                >
                  {item.titel}
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventBewohnerGeburtstage
