import React, { useEffect, useRef, useState } from 'react'
import DayGrid from './DayGrid'
import { MdArrowLeft, MdArrowRight, MdClose, MdPerson } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {
  adjustForMode,
  formatGermanDate,
  getShiftedDate,
  getTodayDate
} from './functions/functionHandler'
import ColumnIntervalRow from './ColumnIntervalRow'
import { useTheme } from '../../../styles/ThemeContext'

const TagesAnsicht = ({
  date,
  layer,
  newEntryAlertValue,
  newEntryAlertSetter,
  filteredevents,
  kategorien,
  updateFilteredEvents
}) => {
  const { theme } = useTheme()
  const divRef = useRef(null)
  const viewRef = useRef(null)
  const navigate = useNavigate()
  const [minHeight, setMinHeight] = useState(0)
  const rows = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]

  const CurrentTimeLine = () => {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
      return () => clearInterval(interval)
    }, [])

    const currentTimePixels = currentTime.getHours() * 60 + currentTime.getMinutes()
    return (
      <div
        className="w-[88%] absolute inset left-32 right-0 h-[1px] dark:bg-red-500 bg-gray-800 z-0"
        style={{ top: `${parseInt(currentTimePixels) * ((24 * 40) / 1440)}px` }}
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
    navigate(
      '/calendar/' +
        layer +
        '/' +
        parseInt(getTodayDate().split('.')[2]) +
        '/' +
        parseInt(getTodayDate().split('.')[1]) +
        '/' +
        parseInt(getTodayDate().split('.')[0])
    )
  }

  useEffect(() => {
    if (divRef.current && minHeight == 0) {
      setMinHeight(divRef.current.clientHeight)
    }
  }, [date])
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
              '/calendar/day/' +
              parseInt(getShiftedDate(true, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDate(true, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDate(true, date).split('.')[0])
            }
            className="w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-4 text-3xl"
          >
            <MdArrowLeft />
          </Link>
          <Link
            to={
              '/calendar/day/' +
              parseInt(getShiftedDate(false, date).split('.')[2]) +
              '/' +
              parseInt(getShiftedDate(false, date).split('.')[1]) +
              '/' +
              parseInt(getShiftedDate(false, date).split('.')[0])
            }
            className=" w-8 h-8  flex flex-col items-center justify-center outline-none bg-transparent dark:hover:bg-gray-800 hover:bg-blue-300/40 rounded-full ml-1 text-3xl"
          >
            <MdArrowRight />
          </Link>
          <span className=" py-2 dark:text-gray-300 ml-2 text-lg">{formatGermanDate(date)}</span>
        </div>
        <div className="w-[60%] h-20 flex flex-col items-center justify-center ">
          <div className="w-full h-full  flex flex-row items-center justify-between gap-x-2">
            <label className="  w-[70%] flex flex-col items-center justify-center relative">
              <input
                title="Suche nach Einträgen"
                className=" w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 ring-gray-700   outline-none py-2 px-3 pl-14 text-sm"
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
              className="block  w-auto px-4 py-2 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/30 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 ring-gray-700   outline-none text-sm "
            >
              <option value={'day'}>Tag</option>
              <option value={'week'}>Woche</option>
              <option value={'month'}>Monat</option>
              <option value={'year'}>Jahr</option>
              <option value={'agenda'}>Terminübersicht</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-[91.8%] shadow-inner dark:shadow-gray-200">
        <div className="w-full flex flex-col items-start justify-start max-h-full pb-4 overflow-y-scroll dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200">
          {console.log(filteredevents)}
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
                e.katBezeichnung === 'rrule')
          ).length > 0 ? (
            <div className="flex flex-col items-start justify-start w-full dark:bg-gray-900 bg-stone-200  ">
              <div className="text-xs pl-4 py-1 w-full border-y border-gray-300 dark:border-gray-600">
                🗓️ Ereignisse
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                {filteredevents.filter((e) => e.katBezeichnung === 'Feiertag').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Feiertag')[0].ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Feiertag')[0].ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Feiertag" className="w-full text-xs truncate px-2">
                        Feiertag
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Feiertag')
                        .map((item, index) => (
                          <div
                            title={'⭐ Feiertag: ' + item.titel}
                            key={'bname' + item + index}
                            className="w-auto  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-row items-center justify-start rounded "
                          >
                            ⭐ {item.titel}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Geburtstag').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Geburtstag')[0].ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Geburtstag')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a
                        title="Geburstage der Mitarbeiter"
                        className="w-full text-xs truncate px-2"
                      >
                        Geburstage der Mitarbeiter
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Geburtstag')
                        .map((item, index) => (
                          <div
                            title={'🎂 Mitarbeiter: ' + item.titel}
                            key={'bname' + item + index}
                            className="w-auto  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-row items-center justify-start rounded "
                          >
                            🎂 {item.titel}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'BewohnerGeburtstag').length >
                0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'BewohnerGeburtstag')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'BewohnerGeburtstag')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Geburstage der Bewohner" className="w-full truncate px-2">
                        Geburstage der Bewohner
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'BewohnerGeburtstag')
                        .map((item, index) => (
                          <div
                            title={'🎂 Bewohner: ' + item.titel}
                            key={'bname' + item + index}
                            className="w-auto  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-row items-center justify-start rounded "
                          >
                            🎂 {item.titel}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'BewohnerGEZ').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'BewohnerGEZ')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'BewohnerGEZ')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="GEZ Befreiung" className="w-full truncate px-2">
                        GEZ Befreiung
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'BewohnerGEZ')
                        .map((item, index) => (
                          <div
                            title={'📺 GEZ Befreiung: ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate">📺 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟: {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'BewohnerGenehmigung').length >
                0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'BewohnerGenehmigung')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter(
                            (e) => e.katBezeichnung === 'BewohnerGenehmigung'
                          )[0].ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Bewohner Genehmigungen" className="w-full truncate px-2">
                        Bewohner Genehmigungen
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'BewohnerGenehmigung')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'🗒️ Genehmigung: ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate">
                              {' '}
                              <MdPerson className="inline" /> {item.Bewohner}
                            </a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                            <a className="w-full truncate ">
                              🗒️ {item.titel === ' ' ? 'keine Angaben' : item.titel}
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Pflegevisite').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Pflegevisite')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Pflegevisite')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Bewohner Pflegevisite" className="w-full truncate px-2">
                        Bewohner Pflegevisite
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Pflegevisite')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'📅 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate">📅 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Ergebniserfassung').length >
                0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Ergebniserfassung')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Ergebniserfassung')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Ergebniserfassung" className="w-full truncate px-2">
                        Ergebniserfassung
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Ergebniserfassung')
                        .map((item, index) => (
                          <div
                            title={'🏠 ' + item.titel}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate">🏠 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Evaluierung Kontraktur')
                  .length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter(
                          (e) => e.katBezeichnung === 'Evaluierung Kontraktur'
                        )[0].ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter(
                            (e) => e.katBezeichnung === 'Evaluierung Kontraktur'
                          )[0].ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Evaluierung Kontraktur" className="w-full truncate px-2">
                        Evaluierung Kontraktur
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Evaluierung Kontraktur')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'🩺 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate">🩺 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter(
                  (e) => e.katBezeichnung === 'Sicherheitstechnische Kontrolle'
                ).length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter(
                          (e) => e.katBezeichnung === 'Sicherheitstechnische Kontrolle'
                        )[0].ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter(
                            (e) => e.katBezeichnung === 'Sicherheitstechnische Kontrolle'
                          )[0].ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Sicherheitstechnische Kontrolle" className="w-full truncate px-2">
                        Sicherheitstechnische Kontrolle
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Sicherheitstechnische Kontrolle')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'🛂 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 🛂 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen')
                  .length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter(
                          (e) => e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen'
                        )[0].ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter(
                            (e) => e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen'
                          )[0].ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a
                        title="Bewohner Dekubitusprophylaxemaßnahmen"
                        className="w-full truncate px-2"
                      >
                        Dekubitusprophylaxemaßnahmen
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'🩹 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate">
                              {' '}
                              <MdPerson className="inline" /> {item.Bewohner}
                            </a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Personalausweis').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Personalausweis')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Personalausweis')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Bewohner Personalausweis" className="w-full truncate px-2">
                        Personalausweis
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Personalausweis')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'💳 Personalausweis: ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 💳 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Pflegewohngeld').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Pflegewohngeld')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Pflegewohngeld')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Pflegewohngeld" className="w-full truncate px-2">
                        Pflegewohngeld
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Pflegewohngeld')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'💶 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 💶 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Wundvermessung').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Wundvermessung')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Wundvermessung')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Wundvermessung Bewohner" className="w-full truncate px-2">
                        Wundvermessung
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Wundvermessung')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'🩹 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 🩹 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Wundauswertung').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Wundauswertung')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Wundauswertung')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Wundauswertung der Bewohner" className="w-full truncate px-2">
                        Wundauswertung
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Wundauswertung')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'📈 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 📈 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Tabellenwohngeld').length >
                0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Tabellenwohngeld')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Tabellenwohngeld')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Tabellenwohngeld der Bewohner" className="w-full truncate px-2">
                        Tabellenwohngeld
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Tabellenwohngeld')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'📄 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 📄 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Schwerbehindertausweis')
                  .length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter(
                          (e) => e.katBezeichnung === 'Schwerbehindertausweis'
                        )[0].ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter(
                            (e) => e.katBezeichnung === 'Schwerbehindertausweis'
                          )[0].ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a
                        title="Schwerbehindertausweis der Bewohner"
                        className="w-full truncate px-2"
                      >
                        Schwerbehindertausweis
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Schwerbehindertausweis')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'🦽 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 🦽 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Evaluierung').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Evaluierung')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Evaluierung')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Evaluierung der Bewohner" className="w-full truncate px-2">
                        Evaluierung
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Evaluierung')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'📊 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 📊 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Evaluierung Betreuung').length >
                0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter(
                          (e) => e.katBezeichnung === 'Evaluierung Betreuung'
                        )[0].ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter(
                            (e) => e.katBezeichnung === 'Evaluierung Betreuung'
                          )[0].ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Evaluierung der Betreuung" className="w-full truncate px-2">
                        Evaluierung der Betreuung
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Evaluierung Betreuung')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'📊 ' + item.titel + ': ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 📊 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Bradenskala').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Bradenskala')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Bradenskala')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Braden-Skala" className="w-full truncate px-2">
                        Braden-Skala
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Bradenskala')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'📊 Braden-Skala: ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 📊 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {filteredevents.filter((e) => e.katBezeichnung === 'Nortonskala').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'Nortonskala')[0]
                          .ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode(
                          filteredevents.filter((e) => e.katBezeichnung === 'Nortonskala')[0]
                            .ColorHex,
                          'light'
                        )}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Norton-Skala" className="w-full truncate px-2">
                        Norton-Skala
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'Nortonskala')
                        .reduce((acc, curr) => {
                          if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                            acc.push(curr)
                          }
                          return acc
                        }, [])
                        .map((item, index) => (
                          <div
                            title={'📊 Norton-Skala: ' + item.Bewohner}
                            key={'bname' + item + index}
                            className="w-auto max-w-40  p-2 py-1 dark:bg-white/85 bg-white/85 flex flex-col items-center justify-start rounded-sm "
                          >
                            <a className="w-full truncate"> 📊 {item.Bewohner}</a>
                            <a className="w-full truncate">🕟 {item.realtimeendDate}</a>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {/*TODO Einbinden des Interface für bearbeitung */}
                {filteredevents.filter((e) => e.katBezeichnung === 'rrule').length > 0 ? (
                  <div
                    style={{
                      background: `${adjustForMode(
                        filteredevents.filter((e) => e.katBezeichnung === 'rrule')[0].ColorHex,
                        'dark'
                      )}`
                    }}
                    className="w-full p-[2px] text-black text-xs grid grid-cols-10 items-start justify-items-start rounded-sm gap-1 "
                  >
                    <div
                      style={{
                        background: `${adjustForMode('#999999', 'light')}`
                      }}
                      className="text-xs col-span-1 w-full h-full flex flex-row items-start justify-start pt-1"
                    >
                      <a title="Serien-Termine" className="w-full truncate px-2">
                        {filteredevents.filter((e) => e.katBezeichnung === 'rrule').length > 1
                          ? 'Serien-Termine'
                          : 'Serien-Termin'}
                      </a>
                    </div>
                    <div className="w-full  col-span-9 flex-wrap flex flex-row items-center justify-start  gap-1 ">
                      {filteredevents
                        .filter((e) => e.katBezeichnung === 'rrule')
                        .map((item, index) => (
                          <div className="dark:bg-white bg-white w-40 rounded-sm cursor-pointer">
                            <div
                              title={
                                '🔁 Serie: ' +
                                item.titel +
                                ' | Betreff: ' +
                                item.betreff +
                                ' | Zeitraum: ' +
                                (item.zeitraum == 1440 ? 'ganztags' : `${item.von} - ${item.bis}`)
                              }
                              key={'bname' + item + index}
                              className=" p-2 py-1 flex flex-col items-center justify-start rounded-sm "
                              style={{
                                background: theme ? item.boxColor + '55' : item.boxColor + '88'
                              }}
                            >
                              <a className="w-full truncate"> 🔁 {item.titel}</a>
                              <a className="w-full truncate">🗒️ {item.betreff}</a>
                              {item.zeitraum == 1440 ? (
                                <a className="w-full truncate">🔵 ganztags</a>
                              ) : (
                                <a className="w-full truncate">
                                  🕟 {item.von} - {item.bis}
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="w-full relative  dark:bg-gray-900 bg-blue-50 flex flex-row items-start justify-start ">
            <div className="w-40 flex flex-col dark:bg-gray-800 bg-white items-start justify-evenly h-full dark:border-r border-r dark:border-gray-700 border-gray-300 divide-y dark:divide-gray-700 divide-gray-300">
              {rows.map((item, index) => (
                <ColumnIntervalRow key={index + item + '1stcolumn'} T={item} />
              ))}
            </div>
            <div className="w-full h-full bg-transparent">
              <DayGrid
                fullheight={minHeight}
                date={date}
                newEntryAlertValue={newEntryAlertValue}
                newEntryAlertSetter={newEntryAlertSetter}
                filteredevents={filteredevents}
                updateFilteredEvents={updateFilteredEvents}
                kategorien={kategorien}
              />
            </div>
            <CurrentTimeLine pixel={2.5} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagesAnsicht
