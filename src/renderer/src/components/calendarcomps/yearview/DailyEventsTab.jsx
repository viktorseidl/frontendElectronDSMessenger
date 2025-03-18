import React, { useState } from 'react'
import { useRoles } from '../../../styles/RoleContext'

const DailyEventsTab = ({
  daymonth,
  setDaytab,
  day,
  passData,
  isCurrentMonth,
  isToday,
  isCurrentYear,
  feiertagevents,
  dayevents,
  setTermin
}) => {
  const { hasPermission } = useRoles()
  return (
    <div
      className={` absolute dark:bg-gray-900 bg-white  shadow-lg dark:shadow-[rgba(0,148,250,0.2)] shadow-[rgba(0,0,0,0.1)] ring-1 dark:ring-gray-800 ring-gray-300 p-2  rounded w-60 ${daymonth == 1 || daymonth == 5 || daymonth == 9 || daymonth == 2 || daymonth == 6 || daymonth == 10 ? ' ml-64 mt-6 ' : ' mr-64 mt-6 '}  `}
    >
      <div className="w-full flex flex-col items-start justify-start gap-y-1">
        <div className="w-full flex flex-col items-center justify-center gap-y-2  relative border-b dark:border-gray-800 pb-3">
          <div
            onClick={() => setDaytab(null)}
            className="absolute inset top-1 right-2 text-[17px] cursor-pointer"
          >
            X
          </div>
          <span>
            {new Date(day.year(), daymonth - 1, day.date()).toLocaleDateString('de-DE', {
              weekday: 'short'
            })}
          </span>
          <span className="font-bold text-[18px]">{day.date()}</span>
        </div>
        {hasPermission('view:calendar') && hasPermission('create:calendar') ? (
          <div className="w-full  h-15px flex flex-row items-center justify-center px-2">
            <button
              onClick={() =>
                setTermin(
                  new Date(day.year(), daymonth - 1, day.date()).toLocaleDateString('de-DE', {
                    dateStyle: 'medium'
                  }),
                  null
                )
              }
              className="w-full ring-1 dark:ring-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-400 py-1 ring-blue-200 bg-blue-100/90 hover:bg-blue-50 hover:text-black text-gray-600 rounded"
            >
              + Eintrag
            </button>
          </div>
        ) : (
          ''
        )}
        <div className="w-full flex flex-col items-center justify-start gap-y-2 pb-3 pt-1 h-[170px] overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200">
          {isToday && isCurrentMonth && isCurrentYear ? (
            <div className="w-full  h-15px flex flex-row items-center justify-start relative">
              <div className="w-full dark:bg-blue-500 bg-blue-500 py-1 px-3 rounded-l-xl relative dark:text-white text-white  truncate">
                <a className=" w-full">Heute</a>
              </div>
            </div>
          ) : (
            ''
          )}
          {feiertagevents.length > 0 ? (
            <>
              {feiertagevents.map((item, index) => (
                <div
                  key={item + index}
                  className="w-full  h-15px flex flex-row items-center justify-start relative"
                >
                  <div
                    onClick={() => passData(item)}
                    className="w-full dark:bg-yellow-800 bg-yellow-200 py-1 px-3 rounded-l-xl relative dark:text-white text-black  truncate"
                  >
                    <a className=" w-full">{item.title}</a>
                  </div>
                </div>
              ))}
            </>
          ) : (
            ''
          )}
          {dayevents.length > 0 ? (
            <>
              {dayevents.map((item, index) => (
                <div
                  key={item + index}
                  onClick={() => passData(item)}
                  className="w-full h-15px flex flex-row items-center justify-start truncate"
                >
                  <span
                    style={{ background: `${item.hexcolor}` }}
                    className={`w-2 h-2 rounded-full`}
                  ></span>
                  <a className="pl-2 w-full dark:text-gray-200 text-gray-700 truncate">
                    {item.title}
                  </a>
                </div>
              ))}
            </>
          ) : (
            <a className="pl-2">Für diesen Tag sind keine Termine geplant.</a>
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyEventsTab
