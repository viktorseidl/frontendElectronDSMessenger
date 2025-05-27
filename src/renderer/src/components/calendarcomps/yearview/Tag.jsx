import React, { useEffect, useState } from 'react'
import { format, isSameDay } from 'date-fns'
import DailyListHeader from './DailyListHeader'
const Tag = ({ day, month, filteredevents, setLoading }) => {
  const isCurrentMonth = parseInt(month) == parseInt(format(day, 'MM'))
  const hasEvents = filteredevents.length > 0
  const isHoliday =
    filteredevents.filter((e) => (e.ddate != undefined ? format(day, 'dd.MM.Y') == e.ddate : ''))
      .length > 0
  const isToday = isSameDay(day, new Date())
  const [dailyInformation, setDailyInformation] = useState(null)
  const [showDailyInformation, setShowDailyInformation] = useState(false)
  const showDayList = (day) => {
    setDailyInformation({
      events: filteredevents,
      daystamp: day
    })
    setShowDailyInformation(true)
  }
  const closeDayList = () => {
    setDailyInformation(null)
    setShowDailyInformation(false)
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      setLoading()
    })
  }, [setLoading])
  return (
    <div className="w-full flex items-center justify-center">
      {!isCurrentMonth ? (
        <span
          className={`w-5/6  aspect-square cursor-pointer flex items-center justify-center  text-gray-600/60`}
        >
          {format(day, 'dd')}
        </span>
      ) : (
        <span
          onClick={() => showDayList(day)}
          className={`w-5/6  aspect-square cursor-pointer flex items-center justify-center  ${
            !isCurrentMonth
              ? ' text-gray-600/60'
              : isToday
                ? hasEvents
                  ? isHoliday
                    ? ' dark:text-white dark:bg-blue-600 bg-blue-200 text-black border-2 border-[#f5d902]/80 rounded-full '
                    : ' dark:text-white dark:bg-blue-500/50 bg-blue-400/30 text-black  border-2 dark:border-pink-600/60 border-orange-400/60  rounded-full '
                  : ' dark:text-white dark:bg-blue-800 bg-blue-200 text-black rounded-sm '
                : hasEvents
                  ? isHoliday
                    ? ' dark:text-white dark:bg-yellow-200/25 bg-yellow-200 text-black rounded-full '
                    : ' dark:text-white dark:bg-orange-600/30 bg-orange-500/30 text-black rounded-full '
                  : ' dark:text-white  text-black  '
          }`}
        >
          {format(day, 'dd')}
        </span>
      )}

      <DailyListHeader
        show={showDailyInformation}
        closer={closeDayList}
        information={dailyInformation}
      />
    </div>
  )
}

export default Tag
