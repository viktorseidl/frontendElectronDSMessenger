import React, { useEffect, useState, useMemo } from 'react'
import Sidebar from '../components/dashboardsidebar/Sidebar'
import TagesAnsicht from '../components/calendarcomps/dayview/TagesAnsicht'
import { MdFilterList, MdViewDay } from 'react-icons/md'
import CalendarMini from '../components/calendarcomps/CalenderMini'
import { useParams } from 'react-router-dom'
import { util } from 'node-forge'
import {
  calculateTime,
  getGermanHolidays
} from '../components/calendarcomps/dayview/functions/functionHandler'
import { useFetchAuthAll } from '../services/useFetchAll'
import { useRoles } from '../styles/RoleContext'
const CalendarDay = () => {
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const { jahr, monat, tag } = useParams()
  const [dialogev, setdialogev] = useState(false)
  const layer = 'day'
  const [btnmy, setbtnmy] = useState(false)
  const [kategorien, setKategorien] = useState([])
  const [selectedKategorien, setSelectedKategorien] = useState([])
  const [fullEvents, setFullEvents] = useState([])
  const { hasPermission } = useRoles()

  const getFeiertage = () => {
    const parsedDate = new Date(
      `${jahr}-${monat > 9 ? monat : '0' + monat}-${tag > 9 ? tag : '0' + tag}T00:00:00`
    )
      .toISOString()
      .split('T')[0]
    // console.log(formatDateTimeAlarmToString(parsedDate).split(' ')[0])
    let Feiertage = getGermanHolidays(jahr.toString())
    Feiertage = [...Feiertage].filter((e) => e.datum == parsedDate)
    return Feiertage
  }
  const getKategorien = async () => {
    const query = await useFetchAuthAll(
      'http://' + apache + '/electronbackend/index.php?path=getKategorien',
      'ssdsdsd',
      'GET',
      null,
      null
    )

    if (query.length > 0) {
      let arr = query
      if (User.usertypeVP === 'P') {
        arr = arr.filter((item) => item.pdeleted === false) // Filter based on pdeleted
      } else {
        arr = arr.filter((item) => item.vdeleted === false) // Filter based on vdeleted
      }

      const uniqueBezeichnungen = arr.reduce((acc, item) => {
        if (!acc.some((existingItem) => existingItem.bezeichnung === item.bezeichnung)) {
          acc.push(item)
        }
        return acc
      }, [])

      // Update selectedKategorien based on user type
      /*if (User.usertypeVP === 'P') {
        setSelectedKategorien(arr.filter((item) => item.pstart === true))
      } else {
        setSelectedKategorien(arr.filter((item) => item.vstart === true))
      }*/

      setKategorien(uniqueBezeichnungen) // Update state with unique categories
    } else {
      setSelectedKategorien([])
      setKategorien([])
    }
  }
  const filterMEvents = useMemo(() => {
    if (selectedKategorien.length > 0) {
      return fullEvents.filter((event) => {
        if (event.kategorie === null) {
          return true
        }

        return selectedKategorien.some((category) => category.ID === event.kategorie)
      })
    } else {
      return fullEvents
    }
  }, [fullEvents, selectedKategorien])
  const getEventsDB = async () => {
    const dailyFeiertage = getFeiertage()
    console.log(dailyFeiertage)
    const query = await useFetchAuthAll(
      'http://' +
        apache +
        '/electronbackend/index.php?path=getDayEvents&a=' +
        util.encode64(
          User.Name +
            ':' +
            `${tag > 9 ? tag : '0' + tag}.${monat > 9 ? monat : '0' + monat}.${jahr}`
        ) +
        '&t=' +
        util.encode64(User.usertypeVP),
      'ssdsdsd',
      'GET',
      null,
      null
    )
    if (query.length > 0) {
      console.log([...dailyFeiertage, ...query])
      setFullEvents([...dailyFeiertage, ...query])
    } else {
      setFullEvents([...dailyFeiertage])
    }
  }
  const updateEventDuration = (id, newDuration) => {
    setFullEvents((prev) =>
      prev.map((ev) =>
        ev.id === id
          ? {
              ...ev,
              duration: newDuration,
              realtimestart: calculateTime(ev.time, newDuration).startTime,
              realtimeend: calculateTime(ev.time, newDuration).endTime
            }
          : ev
      )
    )
  }
  const addNewKalenderEntry = async (data) => {
    const query = await useFetchAuthAll(
      'http://' + apache + '/electronbackend/index.php?path=addNewEventKalendar&a=' + data,
      'ssdsdsd',
      'POST',
      null,
      null
    )
  }
  const CalendarMiniM = React.memo(({ date, layout }) => {
    return <CalendarMini date={date} layout={layout} />
  })
  const TagesAnsichtM = React.memo(
    ({ date, layer, dialogev, setdialogev, kategorien, setKalenderEntry }) => {
      return (
        <TagesAnsicht
          date={date}
          layer={layer}
          dialogev={dialogev}
          setdialogev={setdialogev}
          filteredevents={filterMEvents}
          updateFilteredEvents={getEventsDB}
          kategorien={kategorien}
          setKalenderEntry={setKalenderEntry}
        />
      )
    }
  )

  useEffect(() => {
    if (jahr && monat && tag) {
      getEventsDB()
      getKategorien()
    }
  }, [jahr, monat, tag])
  return (
    <div className="pt-8 px-1 w-screen dark:text-gray-200 text-gray-800 dark:bg-gray-950 bg-stone-100 flex flex-col items-start justify-start h-screen">
      <div className="w-full h-full relative flex flex-col items-start justify-start pl-14">
        <Sidebar />
        <div className="w-full h-full flex flex-col items-start justify-start animate-fadeInfast dark:bg-gray-950 bg-stone-100 overflow-hidden">
          <div className="w-full flex flex-row items-start justify-start h-full overflow-hidden">
            <div className="w-80 h-full flex flex-col items-start justify-start pt-4 overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 ">
              <div className="w-full flex flex-row items-center justify-center text-xl">
                <span className="w-full flex flex-row items-center justify-center">
                  <MdViewDay className="inline mr-2" /> Tagesansicht
                </span>
              </div>

              {hasPermission('create:calendar') ? (
                <div className="w-full flex flex-col items-center justify-center p-4 mt-4">
                  <button
                    onClick={() => setdialogev(true)}
                    title="Neuen Kalendereintrag"
                    className="px-4 py-3 w-5/6 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded-xl  dark:bg-transparent ring-1 ring-gray-700   outline-none"
                  >
                    + Eintrag
                  </button>
                </div>
              ) : (
                ''
              )}

              <CalendarMiniM
                date={
                  (tag > 9 ? tag : '0' + tag) + '.' + (monat > 9 ? monat : '0' + monat) + '.' + jahr
                }
                layout={layer}
              />
              <div className="w-full px-4 mt-6 flex flex-col items-start justify-start gap-y-6 ">
                <select
                  title="Nach Bereich filtern"
                  className=" w-auto px-4 py-2  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none text-sm "
                >
                  <option>Alle Bereiche</option>
                  {JSON.parse(util.decode64(window.sessionStorage.getItem('userWohnbereiche')))
                    .length > 0 &&
                    JSON.parse(
                      util.decode64(window.sessionStorage.getItem('userWohnbereiche'))
                    ).map((item, index) => (
                      <option key={item + index}>
                        {item.Station} {item.Hausname}
                      </option>
                    ))}
                </select>
                <div className="w-full flex flex-row items-center justify-start ">
                  <button
                    onClick={() => setbtnmy(false)}
                    title="Alle Termine anzeigen"
                    className={`w-full px-4 py-2 text-sm  ${btnmy != true ? ' dark:bg-yellow-300/20 bg-blue-400/30 ' : ' bg-[#edeae9] dark:bg-transparent '}  rounded-r-none dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded   ring-1 ring-gray-700   outline-none flex flex-col items-center justify-center`}
                  >
                    Alle
                  </button>
                  <button
                    onClick={() => setbtnmy(true)}
                    title="Nur private Termine anzeigen"
                    className={`w-full px-4 py-2 text-sm  ${btnmy != true ? '  dark:bg-transparent bg-[#edeae9] ' : ' bg-blue-400/30 dark:bg-yellow-300/20 '}  rounded-l-none dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded   ring-1 ring-gray-700   outline-none flex flex-col items-center justify-center`}
                  >
                    Private
                  </button>
                </div>
                <div className="w-full flex flex-row items-center justify-start pb-1 border-b border-gray-600">
                  <MdFilterList className="inline mr-2" />
                  Weitere Filter
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-y-2 dark:bg-gray-600/40 bg-stone-300/30 py-4 mb-6 ">
                  {kategorien.length > 0 &&
                    kategorien.map((item, index) => (
                      <div
                        key={item + index + 'allkats'}
                        onClick={() =>
                          setSelectedKategorien(
                            (prev) =>
                              prev.some((sel) => sel.ID === item.ID)
                                ? prev.filter((sel) => sel.ID !== item.ID) // Remove item if it's already selected
                                : [...prev, item] // Add item if it's not selected
                          )
                        }
                        className="w-full grid grid-cols-10 items-center justify-items-start gap-x-2 "
                      >
                        <div className="w-full h-4 col-span-2 flex flex-col items-center justify-center text-sm">
                          <input
                            style={{
                              accentColor: item.colorhex
                            }}
                            checked={selectedKategorien.some((sel) => sel.ID === item.ID)}
                            type="checkbox"
                            className={`w-4 h-4  `}
                          />
                        </div>
                        <div className="w-full   text-sm col-span-8 flex flex-col items-start justify-center">
                          <a className=" w-full truncate pr-4">{item.kategoriename}</a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <TagesAnsichtM
                date={
                  (tag > 9 ? tag : '0' + tag) + '.' + (monat > 9 ? monat : '0' + monat) + '.' + jahr
                }
                layer={layer}
                dialogev={dialogev}
                setdialogev={setdialogev}
                kategorien={kategorien}
                setKalenderEntry={addNewKalenderEntry}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CalendarDay
