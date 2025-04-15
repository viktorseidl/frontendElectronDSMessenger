import React from 'react'
import { motion } from 'framer-motion'
import { adjustForMode, calculateHeight } from './functions/functionHandler'
import { useTheme } from '../../../styles/ThemeContext'
import { useParams } from 'react-router-dom'
const EventBewohnerGEZ = ({ event }) => {
  const { jahr, monat, tag } = useParams()
  const { theme } = useTheme()
  const dateString = `${jahr}-${monat}-${tag}`
  const isTimestamp = new Date(dateString).getTime()
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
                Bew. GEZ
              </span>
            </b>
            {event.titel.length > 0 &&
              event.titel.map((item, index) =>
                new Date(
                  item.realtimeendDate.split('.')[2] +
                    '-' +
                    item.realtimeendDate.split('.')[1] +
                    '-' +
                    item.realtimeendDate.split('.')[0]
                ).getTime() -
                  3600 * 3 * 24 * 1000 <=
                isTimestamp ? (
                  <div
                    title={item.titel}
                    key={'bname' + item + index}
                    className="w-full  p-2 py-1 border-2 dark:border-red-600 border-red-600 dark:bg-red-500 dark:text-black bg-red-300 flex flex-col items-start justify-center rounded "
                  >
                    <a className="w-full truncate underline ">{item.titel}</a>
                    <a className="w-full truncate">Bewohner: {item.Bewohner}</a>
                    <a className="w-full truncate">Endet: {item.realtimeendDate}</a>
                  </div>
                ) : new Date(
                    item.realtimeendDate.split('.')[2] +
                      '-' +
                      item.realtimeendDate.split('.')[1] +
                      '-' +
                      item.realtimeendDate.split('.')[0]
                  ).getTime() -
                    3600 * 14 * 24 * 1000 <=
                  isTimestamp ? (
                  <div
                    title={item.titel}
                    key={'bname' + item + index}
                    className="w-full  p-2 py-1 border-2 dark:border-yellow-400 border-yellow-500 dark:bg-yellow-300 bg-yellow-300 flex flex-col items-start justify-center rounded "
                  >
                    <a className="w-full truncate underline ">{item.titel}</a>
                    <a className="w-full truncate">Bewohner: {item.Bewohner}</a>
                    <a className="w-full truncate">Endet: {item.realtimeendDate}</a>
                  </div>
                ) : (
                  <div
                    title={item.titel}
                    key={'bname' + item + index}
                    className="w-full  p-2 py-1 dark:bg-white/80 bg-white/80 flex flex-col items-start justify-center rounded "
                  >
                    <a className="w-full truncate underline ">{item.titel}</a>
                    <a className="w-full truncate">Bewohner: {item.Bewohner}</a>
                    <a className="w-full truncate">Endet: {item.realtimeendDate}</a>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventBewohnerGEZ
