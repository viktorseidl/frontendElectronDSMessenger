import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/dashboardsidebar/Sidebar'
import { MdCalendarViewWeek, MdFilterList } from 'react-icons/md'
import CalendarMini from '../components/calendarcomps/CalenderMini'
import { useParams } from 'react-router-dom'
import TagesAnsicht from '../components/calendarcomps/weekview/TagesAnsicht'
import { util } from 'node-forge'
import { useRoles } from '../styles/RoleContext'
import { getGermanHolidays } from '../components/calendarcomps/weekview/functions/functionHandler'
import { useFetchAuthAll } from '../services/useFetchAll'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
const CalendarWeek = () => {
  const Wohnbereiche = JSON.parse(util.decode64(window.sessionStorage.getItem('userWohnbereiche')))
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const { jahr, monat, tag } = useParams()
  const [newEntryAlert, setNewEntryAlert] = useState(false)
  const layer = 'week'
  const [selectedbereich, setSelectedbereich] = useState('false')
  const [btnmy, setbtnmy] = useState(false)
  const [kategorien, setKategorien] = useState([])
  const [selectedKategorien, setSelectedKategorien] = useState([])
  const [fullEvents, setFullEvents] = useState([])
  const { hasPermission } = useRoles()

  const getWeekDays = () => {
    let b = new Date(`${jahr}-${monat > 9 ? monat : '0' + monat}-${tag > 9 ? tag : '0' + tag}`)
    const startOfCurrentWeek = startOfWeek(b, { weekStartsOn: 1 }) // Week starts on Monday
    const endOfCurrentWeek = endOfWeek(b, { weekStartsOn: 1 })
    let arr = eachDayOfInterval({
      start: startOfCurrentWeek,
      end: endOfCurrentWeek
    })

    let narr = []
    arr.forEach((element) => {
      const el = element.toLocaleDateString('de-DE')
      narr.push(
        (parseInt(el.split('.')[0]) > 9
          ? parseInt(el.split('.')[0])
          : '0' + parseInt(el.split('.')[0])) +
          '.' +
          (parseInt(el.split('.')[1]) > 9
            ? parseInt(el.split('.')[1])
            : '0' + parseInt(el.split('.')[1])) +
          '.' +
          el.split('.')[2]
      )
    })
    return narr
  }
  const getFeiertage = () => {
    let Feiertage = getGermanHolidays(jahr.toString())
    Feiertage = [...Feiertage].filter((e) => getWeekDays().includes(e.ddate))
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
      setKategorien(uniqueBezeichnungen) // Update state with unique categories
    } else {
      setSelectedKategorien([])
      setKategorien([])
    }
  }
  const filterMEvents = useMemo(() => {
    return fullEvents.filter((event) => {
      // Filter by isprivate state
      const privateMatches =
        btnmy == false
          ? event.isprivate == false || event.isprivate == true
          : event.isprivate === true
      // Filter by isprivate state
      const BereichMatches =
        selectedbereich != 'false' ? event.wohnbereich == selectedbereich : true
      let categoryMatches = true
      if (selectedKategorien.length > 0) {
        categoryMatches =
          selectedKategorien.length === 0 ||
          selectedKategorien.some((category) => {
            if (category.ID === 'serien') {
              return category.ID == event.kategorieid
            }
            if (category.ID === 'holidays') {
              return category.ID == event.kategorie // or event.kategorieid, depending on your structure
            }
            return category.ID == parseInt(event.kategorie)
          })
      }
      return categoryMatches && privateMatches && BereichMatches
    })
  }, [fullEvents, selectedKategorien, btnmy, selectedbereich])

  const getEventsDB = async () => {
    const dailyFeiertage = getFeiertage()
    const query = await useFetchAuthAll(
      'http://' +
        apache +
        '/electronbackend/index.php?path=getWeekEvents&a=' +
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
      setFullEvents([...dailyFeiertage, ...query])
    } else {
      setFullEvents([...dailyFeiertage])
    }
  }
  const CalendarMiniM = React.memo(({ date, layout }) => {
    return <CalendarMini date={date} layout={layout} />
  })
  const TagesAnsichtM = React.memo(({ date, layer, kategorien }) => {
    return (
      <TagesAnsicht
        date={date}
        layer={layer}
        newEntryAlertValue={newEntryAlert}
        newEntryAlertSetter={setNewEntryAlert}
        filteredevents={filterMEvents}
        updateFilteredEvents={getEventsDB}
        kategorien={kategorien}
        handleDrop={handleDrop}
      />
    )
  })

  const handleDrop = async (item, slot) => {
    console.log(item, slot)
    const newSlotDate = slot.split(' ')[0]
    const newSlotTime = slot.split(' ')[1]
    const newSlotStartDate =
      newSlotDate.split('-')[2].toString() +
      '.' +
      newSlotDate.split('-')[1] +
      '.' +
      newSlotDate.split('-')[0]
    const newStartHour =
      newSlotStartDate + ' ' + newSlotTime.split(':')[0] + ':' + item.realtimestart.split(':')[1]
    console.log(newStartHour)
    const query = await useFetchAuthAll(
      'http://' +
        apache +
        '/electronbackend/index.php?path=updateMoveDailyView&a=' +
        util.encode64(
          JSON.stringify({
            id: item.id,
            newstarthour: newStartHour,
            oldstart: item.realtimestartDate + ' ' + item.realtimestart,
            oldend: item.realtimeendDate + ' ' + item.realtimeend
          })
        ),
      'ssdsdsd',
      'PUT',
      null,
      null
    )
    if (query.length > 0 && query[0] == true) {
      getEventsDB()
    }
  }
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
                  <MdCalendarViewWeek className="inline mr-2" /> Wochenansicht
                </span>
              </div>

              {hasPermission('create:calendar') ? (
                <div className="w-full flex flex-col items-center justify-center p-4 mt-4">
                  <button
                    onClick={() => setNewEntryAlert(true)}
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
                  value={selectedbereich}
                  onChange={(e) => setSelectedbereich(e.target.value)}
                  className=" w-auto px-4 py-2  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none text-sm "
                >
                  <option value={false}>Alle Bereiche</option>
                  {Wohnbereiche.length > 0 &&
                    Wohnbereiche.map((item, index) => (
                      <option key={item + index} value={item.Station}>
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
                  {/**STANDARD KATEGORIE */}
                  <div
                    key={'holidayallkats'}
                    onClick={() =>
                      setSelectedKategorien(
                        (prev) =>
                          prev.some((sel) => sel.ID === 'holidays')
                            ? prev.filter((sel) => sel.ID !== 'holidays') // Remove item if it's already selected
                            : [
                                ...prev,
                                {
                                  ID: 'holidays',
                                  colorhex: '#FFFFFF',
                                  kategoriename: 'holidays'
                                }
                              ] // Add item if it's not selected
                      )
                    }
                    className="w-full grid grid-cols-10 items-center justify-items-start gap-x-2 "
                  >
                    <div className="w-full h-4 col-span-2 flex flex-col items-center justify-center text-sm">
                      <input
                        style={{
                          accentColor: '#00AAFF'
                        }}
                        checked={selectedKategorien.some((sel) => sel.ID === 'holidays')}
                        type="checkbox"
                        className={`w-4 h-4  `}
                      />
                    </div>
                    <div className="w-full   text-sm col-span-8 flex flex-col items-start justify-center">
                      <a className=" w-full truncate pr-4">Feiertage</a>
                    </div>
                  </div>
                  {/**STANDARD KATEGORIE */}
                  <div
                    key={'serienallkats'}
                    onClick={() =>
                      setSelectedKategorien(
                        (prev) =>
                          prev.some((sel) => sel.ID === 'serien')
                            ? prev.filter((sel) => sel.ID !== 'serien') // Remove item if it's already selected
                            : [
                                ...prev,
                                {
                                  ID: 'serien',
                                  colorhex: '#FFFFFF',
                                  kategoriename: 'holidays'
                                }
                              ] // Add item if it's not selected
                      )
                    }
                    className="w-full grid grid-cols-10 items-center justify-items-start gap-x-2 "
                  >
                    <div className="w-full h-4 col-span-2 flex flex-col items-center justify-center text-sm">
                      <input
                        style={{
                          accentColor: '#00AAFF'
                        }}
                        checked={selectedKategorien.some((sel) => sel.ID == 'serien')}
                        type="checkbox"
                        className={`w-4 h-4  `}
                      />
                    </div>
                    <div className="w-full   text-sm col-span-8 flex flex-col items-start justify-center">
                      <a className=" w-full truncate pr-4">Serientermine</a>
                    </div>
                  </div>
                  {/**DATABASE KATEGORIE */}
                  {kategorien.length > 0 &&
                    kategorien.map((item, index) => (
                      <div
                        key={item + index + 'allkats'}
                        onClick={() =>
                          setSelectedKategorien(
                            (prev) =>
                              prev.some((sel) => sel.ID === item.ID)
                                ? prev.filter((sel) => sel.ID !== item.ID) // Remove item if it's already selected
                                : [
                                    ...prev,
                                    {
                                      ID: item.ID,
                                      colorhex: item.colorhex,
                                      kategoriename: item.kategoriename.trim()
                                    }
                                  ] // Add item if it's not selected
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
                kategorien={kategorien}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CalendarWeek
