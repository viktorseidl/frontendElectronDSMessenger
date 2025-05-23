import React, { useEffect, useState } from 'react'
import NewCalendarEntryDialog from './../NewCalendarEntryDialog'
import TimeSlot from './TimeSlot'
import { useRoles } from '../../../styles/RoleContext'
import { util } from 'node-forge'
import { useFetchAuthAll } from '../../../services/useFetchAll'
import DeleteAlertDialog from './DeleteAlertDialog'
import UpdateEntryStandard from './UpdateEntryStandard'
import UpdateEntryRRuleSerie from './UpdateEntryRRuleSerie'

const ItemType = 'EVENT'

const DayGrid = ({
  fullheight,
  date,
  newEntryAlertValue,
  newEntryAlertSetter,
  filteredevents,
  updateFilteredEvents,
  kategorien
}) => {
  /* GENERAL VARIABLES */
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const { hasPermission } = useRoles()
  const [events, setEvents] = useState([])
  /* DELETE STATES */
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [deleteObject, setDeleteObject] = useState(null)
  /* UPDATE STATES */
  const [updateDialogStandard, setUpdateDialogStandard] = useState(false)
  const [updateDialogRRule, setUpdateDialogRRule] = useState(false)
  const [updateObject, setUpdateObject] = useState(null)

  /** HANDLE UPDATE MOVE PRIVAT EVENTS BETWEEN TIMES (ONLY KALENDAR ENTRIES)
   * @function handleDrop Updates Times in Database
   */
  const handleDrop = async (timeSlot, item) => {
    const query = await useFetchAuthAll(
      'http://' +
        apache +
        '/electronbackend/index.php?path=updateMoveDailyView&a=' +
        util.encode64(
          JSON.stringify({
            id: item.id,
            newstarthour:
              item.realtimestartDate + ' ' + timeSlot + ':' + item.realtimestart.split(':')[1],
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
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === item.id
            ? {
                ...ev,
                time: timeSlot,
                realtimestart: query[1],
                realtimeend: query[2]
              }
            : ev
        )
      )
    }
  }

  /** HANDLE DELETING EVENTS
   * @function deleteMyEvent Open Dialog and set Delete Information
   * @function deleteMessageClose Close DIalog
   * @function deleteFunction execute Delete
   */
  const deleteMyEvent = async (id, type) => {
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

  /** HANDLE NEW EVENT ENTRY
   * @function newEntryEvent Open EntryForm
   * @function closeNewEntryDialog Close DIalog and Update
   */
  const newEntryEvent = (timeSlot, e) => {
    if (!hasPermission('create:calendar')) return
    if (e.target.getAttribute('aria-label') == 'isbuttondoubleclick') return
    if (e.target.classList.contains('resize-handle')) return
    newEntryAlertSetter(true)
  }
  const closeNewEntryDialog = () => {
    newEntryAlertSetter(!newEntryAlertValue)
    updateFilteredEvents()
  }
  useEffect(() => {
    setEvents(filteredevents)
  }, [date, filteredevents])

  return (
    <>
      <div className="grid grid-cols-1 divide-y dark:divide-gray-800 divide-gray-300">
        {[...Array(24)].map((_, index) => (
          <TimeSlot
            key={index}
            time={index}
            events={events}
            onDrop={handleDrop}
            addEvent={newEntryEvent}
            deleteEvent={deleteMyEvent}
            updateEventStandard={updateMyEventStandard}
            updateEventRRule={updateMyEventRRule}
            height={fullheight}
            ityp={ItemType}
          />
        ))}
      </div>
      <NewCalendarEntryDialog
        show={newEntryAlertValue}
        close={closeNewEntryDialog}
        title={'Neuer Termin'}
        kategorien={kategorien}
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
    </>
  )
}

export default DayGrid
