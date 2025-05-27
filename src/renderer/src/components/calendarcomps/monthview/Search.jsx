import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import DailyListHeader from './DailyListHeader'
import dayjs from 'dayjs'
import { util } from 'node-forge'

const Search = ({ filteredevents, deleteMyEvent, updateEventStandard, updateEventRRule }) => {
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const [searchtxt, setSearchtxt] = useState('')
  const _scrollDiv = useRef(null)
  const [hoverSelection, setHoverSelection] = useState(0)
  const handleFilterChange = (e) => {
    setSearchtxt(e.trim().length > 0 ? e.toString().toLowerCase() : '')
  }
  const filterMEvents = useMemo(() => {
    return filteredevents.filter((event) => {
      // Filter by isprivate state
      if (searchtxt == '') return []
      const titelMatches =
        (event.titel != null || event.titel != undefined
          ? event.titel.toLowerCase().includes(searchtxt)
          : '') ||
        (event.betreff != null || event.betreff != undefined
          ? event.betreff.toLowerCase().includes(searchtxt)
          : '') ||
        (event.Bewohner != null || event.Bewohner != undefined
          ? event.Bewohner.toLowerCase().includes(searchtxt)
          : '')

      return titelMatches
    })
  }, [searchtxt])
  const handleKeys = (e) => {
    if (e.key === 'ArrowDown') {
      console.log('Arrow Down key pressed')
      if (parseInt(hoverSelection + 1) >= filterMEvents.length) {
        setHoverSelection(filterMEvents.length)
      } else if (parseInt(hoverSelection + 1) <= filterMEvents.length) {
        setHoverSelection(parseInt(hoverSelection + 1))
        _scrollDiv.current.scrollTop += 28
      }
    }
    if (e.key === 'ArrowUp') {
      if (parseInt(hoverSelection - 1) <= 0) {
        setHoverSelection(0)
      } else if (parseInt(hoverSelection - 1) >= 1) {
        setHoverSelection(parseInt(hoverSelection - 1))
        _scrollDiv.current.scrollTop -= 28
      }
    } else if (e.key === 'Enter') {
      console.log('Enter key pressed')
      showDayList()
    }
  }
  const [dailyInformation, setDailyInformation] = useState(null)
  const [showDailyInformation, setShowDailyInformation] = useState(false)
  const showDayList = (day) => {
    setSearchtxt('')
    setDailyInformation({
      events: filteredevents,
      daystamp:
        filterMEvents[hoverSelection].kategorie == 'holidays'
          ? dayjs(filterMEvents[hoverSelection].ddate, 'DD.MM.YYYY').toDate()
          : dayjs(filterMEvents[hoverSelection].datum, 'YYYY-MM-DD').toDate()
    })
    setShowDailyInformation(true)
    setHoverSelection(0)
  }
  const closeDayList = () => {
    setDailyInformation(null)
    setShowDailyInformation(false)
  }
  document.addEventListener('click', function (event) {
    const searchBox = document.getElementById('searchboxhover')
    if (searchBox && !searchBox.contains(event.target)) {
      setSearchtxt('')
      setHoverSelection(0)
    }
  })
  return (
    <label
      id="searchboxhover"
      className="  w-[70%] flex flex-col items-center justify-center relative overflow-visible"
    >
      <input
        title="Suche nach Einträgen"
        onKeyDown={(e) => handleKeys(e)}
        className=" w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-300/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-transparent ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm"
        placeholder="Suche innerhalb dieses Monats nach ..."
        value={searchtxt}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
      <FaSearch className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
      <MdClose
        onClick={() => {
          setSearchtxt('')
          setHoverSelection(0)
        }}
        className={`absolute  cursor-pointer inset right-3 text-xl top-[0.3rem] text-gray-500 hover:text-gray-400 ${searchtxt.trim().length > 0 ? ' block ' : 'hidden'}`}
      />
      {searchtxt.trim().length > 0 ? (
        <div
          ref={_scrollDiv}
          className="dark:bg-gray-800 bg-[#edeae9] rounded-b border-x border-b dark:border-gray-950 border-gray-500 shadow-lg shadow-[rgba(0,0,0,0.3)] absolute z-20 inset top-[32px] left-0 min-h-auto max-h-40 w-full p-2 pt-0 overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200"
        >
          <div className="w-full h-full flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-600 text-sm">
            <>
              {filterMEvents.length > 0 ? (
                <>
                  {filterMEvents.length > 0 &&
                    filterMEvents.map((item, index) => (
                      <div
                        key={'searview' + item + index}
                        onMouseOver={() => setHoverSelection(index)}
                        onClick={() => showDayList()}
                        className={`${hoverSelection == index ? 'dark:bg-blue-500/20 bg-blue-300/40 ' : ''} w-full flex flex-row items-start justify-start dark:hover:bg-blue-500/20 hover:bg-blue-300/40 py-1 cursor-pointer`}
                      >
                        <div className="w-40 text-right mr-6">
                          <span className="float-left">🗓️</span>{' '}
                          {item.kategorie == 'holidays'
                            ? item.ddate
                            : item.realtimestartDate === item.realtimeendDate
                              ? item.realtimestartDate
                              : item.katBezeichnung != 'rrule'
                                ? item.realtimestartDate.split('.')[0] +
                                  '.' +
                                  item.realtimestartDate.split('.')[1] +
                                  ' - ' +
                                  item.realtimeendDate
                                : item.realtimestartDate}
                        </div>
                        <div className="w-[78%] text-left truncate ">
                          {item.kategorie == 'holidays'
                            ? '⭐ Feiertag - '
                            : item.katBezeichnung == 'BewohnerGeburtstag'
                              ? '🎂 Geburtstag - '
                              : item.katBezeichnung == 'Geburtstag'
                                ? '🎂 Geburtstag - '
                                : item.katBezeichnung == 'BewohnerGEZ'
                                  ? '📺 GEZ - '
                                  : item.katBezeichnung == 'BewohnerGenehmigung'
                                    ? '🗒️ Genehmigung - '
                                    : item.katBezeichnung == 'Pflegevisite'
                                      ? '📅 Pflegevisite - '
                                      : item.katBezeichnung == 'Ergebniserfassung'
                                        ? '🏠 Ergebniserfassung - '
                                        : item.katBezeichnung == 'Evaluierung Kontraktur'
                                          ? '🩺 Eval. Kontraktur - '
                                          : item.katBezeichnung == 'Sicherheitstechnische Kontrolle'
                                            ? '🛂 STK - '
                                            : item.katBezeichnung == 'Dekubitusprophylaxemaßnahmen'
                                              ? '🩹 Dekubitusprophylaxe - '
                                              : item.katBezeichnung == 'Personalausweis'
                                                ? '💳 Personalausweis - '
                                                : item.katBezeichnung == 'Pflegewohngeld'
                                                  ? '💶 Pflegewohngeld - '
                                                  : item.katBezeichnung == 'Wundvermessung'
                                                    ? '🩹 Wundvermessung - '
                                                    : item.katBezeichnung == 'Wundauswertung'
                                                      ? '📈 Wundauswertung - '
                                                      : item.katBezeichnung == 'Tabellenwohngeld'
                                                        ? '📄 Tabellenwohngeld - '
                                                        : item.katBezeichnung ==
                                                            'Schwerbehindertausweis'
                                                          ? '🦽 Schwerbehindertausweis - '
                                                          : item.katBezeichnung == 'Evaluierung'
                                                            ? '📊 Evaluierung - '
                                                            : item.katBezeichnung ==
                                                                'Evaluierung Betreuung'
                                                              ? '📊 Eval. Betreuung - '
                                                              : item.katBezeichnung == 'Bradenskala'
                                                                ? '📊 Braden-Skala - '
                                                                : item.katBezeichnung ==
                                                                    'Nortonskala'
                                                                  ? '📊 Braden-Skala - '
                                                                  : item.katBezeichnung == 'rrule'
                                                                    ? (item.isprivate == false &&
                                                                      item.ersteller
                                                                        .toString()
                                                                        .toUpperCase() !=
                                                                        User.Name.toString().toUpperCase()
                                                                        ? '🔁🌍 - '
                                                                        : '🔁🔒 Privat - ') +
                                                                      ' Serie - '
                                                                    : item.katBezeichnung ==
                                                                          'Termin' &&
                                                                        item.ersteller
                                                                          .toString()
                                                                          .toUpperCase() ==
                                                                          User.Name.toString().toUpperCase() &&
                                                                        item.isprivate == false
                                                                      ? '📌  '
                                                                      : item.katBezeichnung ==
                                                                            'Termin' &&
                                                                          item.ersteller
                                                                            .toString()
                                                                            .toUpperCase() ==
                                                                            User.Name.toString().toUpperCase() &&
                                                                          item.isprivate !== false
                                                                        ? '🔒 Privat - '
                                                                        : item.katBezeichnung ==
                                                                              'Termin' &&
                                                                            item.ersteller
                                                                              .toString()
                                                                              .toUpperCase() !==
                                                                              User.Name.toString().toUpperCase()
                                                                          ? '🌍 '
                                                                          : ''}
                          {item.katBezeichnung == 'BewohnerGEZ' ||
                          item.katBezeichnung == 'BewohnerGenehmigung' ||
                          item.katBezeichnung == 'Pflegevisite' ||
                          item.katBezeichnung == 'Ergebniserfassung' ||
                          item.katBezeichnung == 'Evaluierung Kontraktur' ||
                          item.katBezeichnung == 'Sicherheitstechnische Kontrolle' ||
                          item.katBezeichnung == 'Dekubitusprophylaxemaßnahmen' ||
                          item.katBezeichnung == 'Personalausweis' ||
                          item.katBezeichnung == 'Pflegewohngeld' ||
                          item.katBezeichnung == 'Wundvermessung' ||
                          item.katBezeichnung == 'Wundauswertung' ||
                          item.katBezeichnung == 'Schwerbehindertausweis' ||
                          item.katBezeichnung == 'Tabellenwohngeld' ||
                          item.katBezeichnung == 'Evaluierung Betreuung' ||
                          item.katBezeichnung == 'Evaluierung' ||
                          item.katBezeichnung == 'Bradenskala' ||
                          item.katBezeichnung == 'Nortonskala'
                            ? item.Bewohner
                            : item.katBezeichnung == 'rrule'
                              ? item.titel + ' | ' + item.betreff
                              : item.titel}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                'Keine Einträge gefunden'
              )}
            </>
          </div>
        </div>
      ) : (
        ''
      )}
      <DailyListHeader
        show={showDailyInformation}
        closer={closeDayList}
        deleteMyEvent={deleteMyEvent}
        updateEventStandard={updateEventStandard}
        updateEventRRule={updateEventRRule}
        information={dailyInformation}
      />
    </label>
  )
}

export default Search
