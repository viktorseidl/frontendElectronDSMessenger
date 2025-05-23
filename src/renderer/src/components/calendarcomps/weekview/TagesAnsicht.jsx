import React, { useEffect, useRef, useState } from 'react'
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getShiftedDateWeek, getTodayDate } from './functions/functionHandler'
import ColumnIntervalRow from './ColumnIntervalRow'
import { startOfWeek, endOfWeek, eachDayOfInterval, getWeek } from 'date-fns'
import dayjs from 'dayjs'
import WeekGrid from './WeekGrid'
import DeleteAlertDialog from './DeleteAlertDialog'
import { useRoles } from '../../../styles/RoleContext'
import { util } from 'node-forge'
import { useFetchAuthAll } from '../../../services/useFetchAll'
import UpdateEntryStandard from './UpdateEntryStandard'
import UpdateEntryRRuleSerie from './UpdateEntryRRuleSerie'

const TagesAnsicht = ({
  date,
  layer,
  newEntryAlertValue,
  newEntryAlertSetter,
  filteredevents,
  kategorien,
  updateFilteredEvents,
  handleDrop
}) => {
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const { hasPermission } = useRoles()
  const { jahr, monat, tag } = useParams()
  const divRef = useRef(null)
  const viewRef = useRef(null)
  const navigate = useNavigate()
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [deleteObject, setDeleteObject] = useState(null)
  /* UPDATE STATES */
  const [updateDialogStandard, setUpdateDialogStandard] = useState(false)
  const [updateDialogRRule, setUpdateDialogRRule] = useState(false)
  const [updateObject, setUpdateObject] = useState(null)

  const rows = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]
  const CurrentTimeLine = () => {
    const [currentTime, setCurrentTime] = useState(new Date())

    const verify =
      filteredevents.filter(
        (e) =>
          e.katBezeichnung !== null &&
          (e.katBezeichnung === 'Feiertag' ||
            e.katBezeichnung === 'Personalausweis' ||
            e.katBezeichnung === 'BewohnerGEZ' ||
            e.katBezeichnung === 'BewohnerGeburtstag' ||
            e.katBezeichnung === 'BewohnerGenehmigung' ||
            e.katBezeichnung === 'Pflegewohngeld' ||
            e.katBezeichnung === 'Tabellenwohngeld' ||
            e.katBezeichnung === 'Schwerbehindertausweis' ||
            e.katBezeichnung === 'Pflegevisite' ||
            e.katBezeichnung === 'Evaluierung' ||
            e.katBezeichnung === 'Wundauswertung' ||
            e.katBezeichnung === 'Wundvermessung' ||
            e.katBezeichnung === 'Evaluierung Betreuung' ||
            e.katBezeichnung === 'Bradenskala' ||
            e.katBezeichnung === 'Nortonskala' ||
            e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen' ||
            e.katBezeichnung === 'Sicherheitstechnische Kontrolle' ||
            e.katBezeichnung === 'Evaluierung Kontraktur' ||
            e.katBezeichnung === 'Ergebniserfassung' ||
            e.katBezeichnung === 'Geburtstag' ||
            (e.katBezeichnung === 'rrule' && e.zeitraum == 1440))
      ).length > 0
        ? true
        : false
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
      return () => clearInterval(interval)
    }, [])
    const currentTimePixels =
      currentTime.getHours() * 60 + currentTime.getMinutes() + parseInt(verify ? 183 : 16) //183 on week grid because of ereignisse
    return (
      <div
        className="w-[88%] absolute inset left-32 right-0 h-[1px] dark:bg-red-500 bg-gray-800 z-0"
        style={{ top: `${parseInt(currentTimePixels) * ((24 * 40) / 1440) + 40}px` }}
      >
        <div className="w-full relative">
          <div className="absolute left-0 -top-[4px] p-1 rounded-full dark:bg-red-500 bg-gray-800"></div>
          <div className="absolute right-0 dark:bg-red-700 bg-gray-800 h-5 text-white text-xs -top-[20px] pb-1 pt-[2px] px-2">
            {currentTime.getHours() > 9 ? currentTime.getHours() : '0' + currentTime.getHours()}:
            {currentTime.getMinutes() > 9
              ? currentTime.getMinutes()
              : '0' + currentTime.getMinutes()}{' '}
            Aktuelle Uhrzeit
          </div>
        </div>
      </div>
    )
  }
  const changeView = () => {
    const layer = viewRef.current.value
    navigate('/calendar/' + layer + '/' + jahr + '/' + monat + '/' + tag)
  }
  const getWeekDays = (date) => {
    let b = date == null ? new Date() : dayjs(date, 'DD.MM:YYYY').toDate()
    const startOfCurrentWeek = startOfWeek(b, { weekStartsOn: 1 }) // Week starts on Monday
    const endOfCurrentWeek = endOfWeek(b, { weekStartsOn: 1 })
    return eachDayOfInterval({
      start: startOfCurrentWeek,
      end: endOfCurrentWeek
    })
  }

  /** HANDLE DELETING EVENTS
   * @function deleteMyEvent Open Dialog and set Delete Information
   * @function deleteMessageClose Close DIalog
   * @function deleteFunction execute Delete
   */
  const deleteMyEvent = async (id, type) => {
    console.log(id, type)
    if (!hasPermission('delete:calendar')) return
    setDeleteObject({ id: id, type: type })
    setDeleteMessage(true)
  }
  const deleteMessageClose = () => {
    setDeleteMessage(null)
    setDeleteObject(null)
  }
  const deleteFunction = async (obj) => {
    if (!hasPermission('delete:calendar')) return
    if (deleteObject == null) return
    const query = await useFetchAuthAll(
      'http://' +
        apache +
        '/electronbackend/index.php?path=deleteEventOnDailyView&a=' +
        util.encode64(
          JSON.stringify({
            id: obj.id,
            typed: obj.type
          })
        ),
      'ssdsdsd',
      'DELETE',
      null,
      null
    )
    updateFilteredEvents()
    setEvents((prev) => prev.filter((ev) => ev.id !== obj.id))
  }
  /**HANDLE UPDATE STANDARD EVENT
   * @function updateMyEventStandard Open Dialog and set Update Information
   * @function updateStandardClose Close DIalog and reset Update Information
   */
  const updateMyEventStandard = (item) => {
    if (!hasPermission('update:calendar')) return
    setUpdateObject(item)
    setUpdateDialogStandard(true)
  }
  const updateStandardClose = () => {
    setUpdateDialogStandard(false)
    setUpdateObject(null)
    updateFilteredEvents()
  }

  /** HANDLE UPDATE RRULE EVENT
   * @function updateMyEventRRule Open Dialog and set Update Information
   * @function updateRRuleClose Close DIalog and reset Update Information
   */
  const updateMyEventRRule = (item) => {
    //if (!hasPermission('update:calendar')) return
    setUpdateObject(item)
    setUpdateDialogRRule(true)
  }
  const updateRRuleClose = () => {
    setUpdateDialogRRule(false)
    setUpdateObject(null)
    updateFilteredEvents()
  }

  return (
    <div ref={divRef} className="w-full h-full  flex flex-col items-start justify-start ">
      <div className="w-full h-20 py-4 px-4 flex flex-row items-center justify-start gap-x-2">
        <div className="w-[40%] h-20 flex flex-row items-center justify-start ">
          <Link
            to={
              '/calendar/day/' +
              parseInt(getTodayDate().split('.')[2]) +
              '/' +
              parseInt(getTodayDate().split('.')[1]) +
              '/' +
              parseInt(getTodayDate().split('.')[0])
            }
            title="Heute anzeigen"
            className="px-4 py-2 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 text-gray-700 rounded-xl  dark:bg-transparent ring-1 ring-gray-700   outline-none flex flex-col items-center justify-center"
          >
            Heute
          </Link>
          <Link
            to={
              '/calendar/week/' +
              parseInt(getShiftedDateWeek(true, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDateWeek(true, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDateWeek(true, date).split('.')[0])
            }
            className="w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-4 text-3xl"
          >
            <MdArrowLeft />
          </Link>
          <Link
            to={
              '/calendar/week/' +
              parseInt(getShiftedDateWeek(false, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDateWeek(false, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDateWeek(false, date).split('.')[0])
            }
            className=" w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-1 text-3xl"
          >
            <MdArrowRight />
          </Link>
          <span className=" py-2 dark:text-gray-300 ml-2 text-lg">
            {getWeekDays(date)[0]?.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: 'short'
            })}
            {' - '}
            {getWeekDays(date)[getWeekDays(date).length - 1]?.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}{' '}
            <a className="text-sm">
              (Woche
              {' ' +
                getWeek(
                  dayjs(
                    getWeekDays(date)[0].toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }),
                    'DD.MM:YYYY'
                  )
                )}
              )
            </a>
          </span>
        </div>
        <div className="w-[60%] h-20 flex flex-col items-center justify-center ">
          <div className="w-full h-full  flex flex-row items-center justify-between gap-x-2">
            <label className="  w-[70%] flex flex-col items-center justify-center relative">
              <input
                title="Suche nach Einträgen"
                className=" w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm"
                placeholder="Suche nach..."
                value={''}
                onChange={(e) => 'handleFilterChange("Betrefftxt", e.target.value)'}
              />
              <FaSearch className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
              <MdClose
                onClick={() => 'handleFilterChange("Betrefftxt", "")'}
                className={
                  'absolute hidden cursor-pointer inset right-3 text-2xl top-[0.1rem] text-gray-500 hover:text-gray-400'
                }
              />
            </label>
            <select
              title="Kalenderansicht ändern"
              ref={viewRef}
              onChange={() => changeView()}
              defaultValue={layer}
              className=" w-auto px-4 py-2 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none text-sm "
            >
              <option value={'day'} selected>
                Tag
              </option>
              <option value={'week'}>Woche</option>
              <option value={'month'}>Monat</option>
              <option value={'year'}>Jahr</option>
              <option value={'agenda'}>Terminübersicht</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-[91.8%] shadow-inner dark:shadow-gray-200">
        <div className="w-full flex flex-col items-start justify-start max-h-full pb-10 overflow-y-scroll dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200">
          <div className="w-full relative  dark:bg-gray-900 bg-blue-50 flex flex-row items-start justify-start ">
            <div className="w-40 flex flex-col dark:bg-gray-800 bg-white items-start justify-evenly h-full  divide-y dark:divide-gray-700 divide-gray-300">
              <div className="w-full h-[50px] text-sm dark:bg-gray-950 bg-stone-100">&nbsp;</div>
              {filteredevents.filter(
                (e) =>
                  e.katBezeichnung !== null &&
                  (e.katBezeichnung === 'Feiertag' ||
                    e.katBezeichnung === 'Personalausweis' ||
                    e.katBezeichnung === 'BewohnerGEZ' ||
                    e.katBezeichnung === 'BewohnerGeburtstag' ||
                    e.katBezeichnung === 'BewohnerGenehmigung' ||
                    e.katBezeichnung === 'Pflegewohngeld' ||
                    e.katBezeichnung === 'Tabellenwohngeld' ||
                    e.katBezeichnung === 'Schwerbehindertausweis' ||
                    e.katBezeichnung === 'Pflegevisite' ||
                    e.katBezeichnung === 'Evaluierung' ||
                    e.katBezeichnung === 'Wundauswertung' ||
                    e.katBezeichnung === 'Wundvermessung' ||
                    e.katBezeichnung === 'Evaluierung Betreuung' ||
                    e.katBezeichnung === 'Bradenskala' ||
                    e.katBezeichnung === 'Nortonskala' ||
                    e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen' ||
                    e.katBezeichnung === 'Sicherheitstechnische Kontrolle' ||
                    e.katBezeichnung === 'Evaluierung Kontraktur' ||
                    e.katBezeichnung === 'Ergebniserfassung' ||
                    e.katBezeichnung === 'Geburtstag' ||
                    (e.katBezeichnung === 'rrule' && e.zeitraum == 1440))
              ).length > 0 ? (
                <div className="w-full h-28 text-sm dark:bg-gray-950 bg-stone-100">
                  🗓️ Ereignisse
                </div>
              ) : (
                ''
              )}
              {rows.map((item, index) => (
                <ColumnIntervalRow key={index + item + '1stcolumn'} T={item} />
              ))}
            </div>
            <div className="w-full h-full bg-transparent">
              <WeekGrid
                handleDrop={handleDrop}
                date={getWeekDays(date)[0]}
                newEntryAlertValue={newEntryAlertValue}
                newEntryAlertSetter={newEntryAlertSetter}
                filteredevents={filteredevents}
                updateFilteredEvents={updateFilteredEvents}
                kategorien={kategorien}
                deleteMyEvent={deleteMyEvent}
                updateEventStandard={updateMyEventStandard}
                updateEventRRule={updateMyEventRRule}
              />
            </div>
            <CurrentTimeLine pixel={2.5} />
          </div>
          <DeleteAlertDialog
            show={deleteMessage}
            cancel={deleteMessageClose}
            deleteObj={deleteObject}
            deletefunc={deleteFunction}
          />
          {updateDialogStandard ? (
            <UpdateEntryStandard
              show={updateDialogStandard}
              close={updateStandardClose}
              title={'Termin bearbeiten'}
              updateObject={updateObject}
              kategorien={kategorien}
            />
          ) : (
            ''
          )}
          {updateDialogRRule ? (
            <UpdateEntryRRuleSerie
              show={updateDialogRRule}
              close={updateRRuleClose}
              title={'Serien-Termin bearbeiten'}
              updateObject={updateObject}
              kategorien={kategorien}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default TagesAnsicht
