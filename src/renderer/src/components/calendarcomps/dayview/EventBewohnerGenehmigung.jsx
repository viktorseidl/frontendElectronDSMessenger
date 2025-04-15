import React from 'react'
import { motion } from 'framer-motion'
import { adjustForMode, calculateHeight } from './functions/functionHandler'
import { useTheme } from '../../../styles/ThemeContext'
const EventBewohnerGenehmigung = ({ event }) => {
  const { theme } = useTheme()

  return (
    <motion.div
      // Ensures the event stays visible while dragging
      className={`p-1 text-black rounded dark:ring-1 ring-1 dark:ring-gray-700 ring-gray-400 relative calshadow `}
      id={event.id}
      style={{
        minHeight: '28px',
        height: `${calculateHeight(event.duration, 40)}px`,
        background: `${theme ? adjustForMode(event.ColorHex, 'light') : adjustForMode(event.ColorHex, 'dark')}`
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
                Genehmigungen Bewohner
              </span>
            </b>
            {event.titel.length > 0 &&
              event.titel.map((item, index) => (
                <div
                  title={item.titel}
                  key={'bname' + item + index}
                  className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                >
                  <a className="w-full truncate underline ">{item.titel}</a>
                  <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                  <a className="w-full truncate">Von: {item.realtimestartDate}</a>
                  <a className="w-full truncate">Bis: {item.realtimeendDate}</a>
                  {item.Bemerkung != null ? (
                    <a className="w-full underline truncate mt-1">Bemerkung:</a>
                  ) : (
                    ''
                  )}
                  {item.Bemerkung != null ? (
                    <span className="text-wrap ">{item.Bemerkung}</span>
                  ) : (
                    ''
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventBewohnerGenehmigung
