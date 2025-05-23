import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/de' // German month names
import { useParams } from 'react-router-dom'
import DayLayer from './DayLayer'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek
} from 'date-fns'
import Wochentag from './Wochentag'
import Tag from './Tag'
import Loader from '../../Loader'
const MonatGrid = ({ date, monthnum, filteredevents }) => {
  const { jahr, monat, tag } = useParams()
  const startOfCurrentMonth = startOfMonth(dayjs(date, 'DD.MM.YYYY'))
  const endOfCurrentMonth = endOfMonth(dayjs(date, 'DD.MM.YYYY'))
  const firstDayOfWeek = startOfWeek(startOfCurrentMonth, { weekStartsOn: 1 })
  const lastDayOfWeek = endOfWeek(endOfCurrentMonth, { weekStartsOn: 1 })
  const monthDays = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek
  })
  const [loading, setLoading] = useState(false)
  return (
    <div key={monthnum} className="p-2 relative dark:bg-black/40 bg-gray-400/10">
      {!loading ? (
        <div className="absolute inset left-0 top-0 bg-black/20 w-full h-full flex flex-col items-center justify-center">
          <Loader Fill={' fill-blue-600 '} Background={' text-blue-300 '} />
        </div>
      ) : (
        ''
      )}
      <h3 className="text-lg dark:text-gray-200 text-gray-600 font-bold text-center mb-2">
        {new Date(jahr, monthnum - 1).toLocaleDateString('de-DE', {
          month: 'long'
        })}
      </h3>
      <div className="w-full mt-2">
        {/* WOCHENTAGE AUSGABE */}
        <div className="grid grid-cols-7 text-xs font-[arial] px-4 py-0">
          {[
            'Mo.Montag',
            'Di.Dienstag',
            'Mi.Mittwoch',
            'Do.Donnerstag',
            'Fr.Freitag',
            'Sa.Samstag',
            'So.Sonntag'
          ].map((day) => (
            <Wochentag day={day} />
          ))}
        </div>

        {/* TAGESAUSGABE */}
        <div className="grid grid-cols-7 text-xs font-[arial] px-4 py-0">
          {monthDays.map((day, index) => (
            <>
              {parseInt(monthnum) == parseInt(format(day, 'MM')) ? (
                <Tag
                  key={day + index + 'hsah'}
                  day={day}
                  month={monthnum}
                  filteredevents={
                    filteredevents.filter(
                      (e) =>
                        (e.datum === format(day, 'Y-MM-dd') && e.ddate == undefined) ||
                        (e.ddate != undefined && e.ddate === format(day, 'dd.MM.Y'))
                    ).length > 0
                      ? filteredevents.filter(
                          (e) =>
                            (e.datum === format(day, 'Y-MM-dd') && e.ddate == undefined) ||
                            (e.ddate != undefined && e.ddate === format(day, 'dd.MM.Y'))
                        )
                      : []
                  }
                  setLoading={() => setLoading(true)}
                />
              ) : (
                <Tag
                  key={day + index + 'hsah'}
                  day={day}
                  month={monthnum}
                  filteredevents={[]}
                  setLoading={() => setLoading(true)}
                />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MonatGrid
