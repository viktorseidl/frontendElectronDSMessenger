import React, { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek
} from 'date-fns'
import dayjs from 'dayjs'
import DayContainer from './DayContainer'
import DailyListHeader from './DailyListHeader'
import DeleteAlertDialog from './DeleteAlertDialog'
import UpdateEntryStandard from './UpdateEntryStandard'
import UpdateEntryRRuleSerie from './UpdateEntryRRuleSerie'
import { useRoles } from '../../../styles/RoleContext'
import { useFetchAuthAll } from '../../../services/useFetchAll'
import { util } from 'node-forge'

const MonthGrid = ({ handleDrop, date, filteredevents, updateFilteredEvents, kategorien }) => {
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const { hasPermission } = useRoles()
  const startOfCurrentMonth = startOfMonth(dayjs(date, 'DD.MM.YYYY'))
  const endOfCurrentMonth = endOfMonth(dayjs(date, 'DD.MM.YYYY'))
  const firstDayOfWeek = startOfWeek(startOfCurrentMonth, { weekStartsOn: 1 })
  const lastDayOfWeek = endOfWeek(endOfCurrentMonth, { weekStartsOn: 1 })
  const monthDays = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek
  })
  const [dailyInformation, setDailyInformation] = useState(null)
  const [showDailyInformation, setShowDailyInformation] = useState(false)
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

  return (
    <div className="w-full h-full flex flex-col items-start justify-start ">
      <div className="w-full h-10">
        <div className="grid grid-cols-7  h-full w-full  dark:bg-gray-900 bg-white dark:text-white divide-x dark:divide-gray-600 divide-gray-400 ">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
            <div
              key={day}
              className={`flex flex-col items-center justify-center  w-full h-full font-bold ${day === 'Sa' || day === 'So' ? ' dark:bg-gray-700/80 bg-gray-400/50 ' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-grow h-[95%]">
        <div className="grid grid-cols-7 w-full h-full divide-x divide-y dark:divide-gray-600 divide-gray-400  ">
          {monthDays.map((day, index) => (
            <DayContainer
              filteredevents={filteredevents.filter(
                (a) =>
                  (a.ddate == undefined &&
                    a.katBezeichnung == 'Termin' &&
                    (a.datum.toString() === format(day, 'Y-MM-dd').toString() ||
                      (dayjs(a.realtimestartDate, 'DD.MM.YYYY').toDate() <= day &&
                        dayjs(a.realtimeendDate, 'DD.MM.YYYY').toDate() >= day))) ||
                  (a.katBezeichnung !== 'Termin' &&
                    a.datum.toString() === format(day, 'Y-MM-dd').toString() &&
                    a.ddate == undefined) ||
                  (a.ddate !== undefined && a.ddate.toString() == format(day, 'dd.MM.Y').toString())
              )}
              key={day + index}
              day={day}
              date={day}
              handleDrop={handleDrop}
              showDayList={showDayList}
            />
          ))}
        </div>
      </div>
      <DailyListHeader
        show={showDailyInformation}
        closer={closeDayList}
        information={dailyInformation}
        updateEventStandard={updateMyEventStandard}
        updateEventRRule={updateMyEventRRule}
        deleteMyEvent={deleteMyEvent}
      />
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
  )
}

export default MonthGrid
