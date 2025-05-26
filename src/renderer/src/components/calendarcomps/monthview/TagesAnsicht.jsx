import React, { useEffect, useRef, useState } from 'react'
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  formatGermanDateMonthView,
  getShiftedDateMonthView,
  getTodayDate
} from './functions/functionHandler'
import MonthGrid from './MonthGrid'
import Search from './Search'
import { util } from 'node-forge'
import UpdateEntryStandard from './UpdateEntryStandard'
import UpdateEntryRRuleSerie from './UpdateEntryRRuleSerie'
import DeleteAlertDialog from './DeleteAlertDialog'
import { useRoles } from '../../../styles/RoleContext'
import { useFetchAuthAll } from '../../../services/useFetchAll'
const TagesAnsicht = ({
  date,
  layer,
  filteredevents,
  kategorien,
  updateFilteredEvents,
  handleDrop
}) => {
  const { hasPermission } = useRoles()
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const { jahr, monat, tag } = useParams()
  const divRef = useRef(null)
  const viewRef = useRef(null)
  const navigate = useNavigate()
  const changeView = () => {
    const layer = viewRef.current.value
    navigate('/calendar/' + layer + '/' + jahr + '/' + monat + '/' + tag)
  }
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [deleteObject, setDeleteObject] = useState(null)
  /* UPDATE STATES */
  const [updateDialogStandard, setUpdateDialogStandard] = useState(false)
  const [updateDialogRRule, setUpdateDialogRRule] = useState(false)
  const [updateObject, setUpdateObject] = useState(null)
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

  useEffect(() => {}, [date])
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
              '/calendar/month/' +
              parseInt(getShiftedDateMonthView(true, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDateMonthView(true, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDateMonthView(true, date).split('.')[0])
            }
            className="w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-4 text-3xl"
          >
            <MdArrowLeft />
          </Link>
          <Link
            to={
              '/calendar/month/' +
              parseInt(getShiftedDateMonthView(false, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDateMonthView(false, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDateMonthView(false, date).split('.')[0])
            }
            className=" w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-1 text-3xl"
          >
            <MdArrowRight />
          </Link>
          <span className=" py-2 dark:text-gray-300 ml-2 text-lg">
            {formatGermanDateMonthView(date)}
          </span>
        </div>
        <div className="w-[60%] h-20 flex flex-col items-center justify-center ">
          <div className="w-full h-full  flex flex-row items-center justify-between gap-x-2">
            <Search
              filteredevents={filteredevents}
              deleteMyEvent={deleteMyEvent}
              updateEventStandard={updateMyEventStandard}
              updateEventRRule={updateMyEventRRule}
            />
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
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-[91.8%] shadow-inner dark:shadow-gray-200">
        <div className="w-full flex flex-col items-start justify-start h-full  overflow-hidden">
          <div className="w-full h-full dark:bg-gray-900 bg-blue-50 flex flex-row items-start justify-start ">
            <div className="w-full h-full dark:bg-gray-950 bg-stone-100 dark:text-gray-400 text-gray-900 border-t border-l dark:border-gray-700 border-gray-400">
              <MonthGrid
                handleDrop={handleDrop}
                date={date}
                filteredevents={filteredevents}
                updateFilteredEvents={updateFilteredEvents}
                kategorien={kategorien}
              />
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
    </div>
  )
}

export default TagesAnsicht
