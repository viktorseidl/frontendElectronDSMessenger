import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { format, getDay } from 'date-fns'
import dayjs from 'dayjs'
import {
  filterOnKategorieShortener,
  formatGermanDateMonthViewOnDay
} from './functions/functionHandler'
import { useNavigate, useParams } from 'react-router-dom'
import DraggableEvent from './DraggableEvent'
import { useTheme } from '../../../styles/ThemeContext'
import { util } from 'node-forge'
import { addMinutesToTime } from '../functionHandler'
const DayContainer = ({ filteredevents, day, handleDrop, showDayList }) => {
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const { theme } = useTheme()
  const navigate = useNavigate()
  const feiertage = filterOnKategorieShortener(filteredevents, 'Feiertag')
  const geburtstag = filterOnKategorieShortener(filteredevents, 'Geburtstag')
  const bewohnerGeburtstag = filterOnKategorieShortener(filteredevents, 'BewohnerGeburtstag')
  const bewohnerGEZ = filterOnKategorieShortener(filteredevents, 'BewohnerGEZ')
  const evaluierungKontraktur = filterOnKategorieShortener(filteredevents, 'Evaluierung Kontraktur')
  const bewohnerGenehmigung = filterOnKategorieShortener(filteredevents, 'BewohnerGenehmigung')
  const sicherheitstechnischeKontrolle = filterOnKategorieShortener(
    filteredevents,
    'Sicherheitstechnische Kontrolle'
  )
  const dekubitusprophylaxemaßnahmen = filterOnKategorieShortener(
    filteredevents,
    'Dekubitusprophylaxemaßnahmen'
  )
  const pflegevisite = filterOnKategorieShortener(filteredevents, 'Pflegevisite')
  const personalausweis = filterOnKategorieShortener(filteredevents, 'Personalausweis')
  const ergebniserfassung = filterOnKategorieShortener(filteredevents, 'Ergebniserfassung')
  const pflegewohngeld = filterOnKategorieShortener(filteredevents, 'Pflegewohngeld')
  const wundvermessung = filterOnKategorieShortener(filteredevents, 'Wundvermessung')
  const wundauswertung = filterOnKategorieShortener(filteredevents, 'Wundauswertung')
  const tabellenwohngeld = filterOnKategorieShortener(filteredevents, 'Tabellenwohngeld')
  const katheterwechsel = filterOnKategorieShortener(filteredevents, 'Katheterwechsel')
  const evaluierung = filterOnKategorieShortener(filteredevents, 'Evaluierung')
  const bradenskala = filterOnKategorieShortener(filteredevents, 'Bradenskala')
  const nortonskala = filterOnKategorieShortener(filteredevents, 'Nortonskala')
  const rrule = filterOnKategorieShortener(filteredevents, 'rrule')
  const evaluierungBetreuung = filterOnKategorieShortener(filteredevents, 'Evaluierung Betreuung')
  const schwerbehindertausweis = filterOnKategorieShortener(
    filteredevents,
    'Schwerbehindertausweis'
  )
  const today = new Date()
  const ariaLabel = format(day, 'Y-MM-dd')
  const myref = useRef(null)
  const { jahr, monat, tag } = useParams()
  const aktdate = new Date(jahr, monat - 1, tag)
  function getDateStatus(date, aktmonth) {
    // Normalize both dates to ignore time
    const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    if (inputDate.getTime() === normalizedToday.getTime()) {
      return 'today'
    }

    const isDifferentMonth =
      inputDate.getMonth() !== aktmonth.getMonth() ||
      inputDate.getFullYear() !== aktmonth.getFullYear()

    if (isDifferentMonth) {
      return 'next'
    }

    return true
  }
  const [{ isOver }, drop] = useDrop({
    accept: 'EVENT',
    drop: (item, monitor) => {
      const aria = myref.current.getAttribute('aria-label') //Date and time formated to => 2025-05-24 16:00
      //console.log(item, aria)
      handleDrop(item, aria)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })
  const setRefs = (node) => {
    myref.current = node
    drop(node)
  }
  const showDayView = (day) => {
    navigate(
      '/calendar/day/' +
        parseInt(format(day, 'Y')) +
        '/' +
        parseInt(format(day, 'MM')) +
        '/' +
        parseInt(format(day, 'dd'))
    )
  }
  return (
    <>
      <div
        className={`min-h-[100%] dark:bg-gray-900 bg-white flex flex-col items-start justify-start first:border-t first:border-l dark:border-gray-600 border-gray-400 `}
        onDoubleClick={() => showDayView(day)}
      >
        <div
          onClick={() => showDayList(day)}
          className={`w-full h-8 text-sm text-gray-400 py-1 px-1  text-center select-none border-b dark:border-gray-600  flex flex-row items-center justify-center border-gray-400 ${feiertage.filter((e) => format(day, 'dd.MM.Y') == e.ddate).length > 0 ? 'dark:bg-[#f5d90266] bg-[#f5d90288]' : getDateStatus(day, aktdate) == 'next' ? ' dark:bg-pink-600/20 bg-purple-400/20 ' : getDateStatus(day, aktdate) !== 'next' && (getDay(day) === 0 || getDay(day) === 6) ? ' dark:bg-gray-700/80 bg-gray-400/50 ' : day < dayjs(today).subtract(1, 'day').toDate() ? 'dark:bg-stone-800/90 bg-stone-300/50' : ''}`}
        >
          <a
            className={`cursor-pointer flex dark:text-white text-gray-600 flex-col items-center justify-center ${
              getDateStatus(day, aktdate) == 'today'
                ? ' bg-blue-600 text-white px-2 h-5  rounded-full '
                : '  '
            } `}
          >
            {format(day, 'd')}. {formatGermanDateMonthViewOnDay(format(day, 'd.M.Y'))}
          </a>
        </div>
        <div
          ref={setRefs}
          aria-label={ariaLabel}
          className={`  w-full h-40 overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200`}
        >
          <div
            className={`w-full  h-full   ${
              isOver
                ? ' dark:bg-gray-300/20 bg-blue-200 '
                : getDateStatus(day, aktdate) == 'next'
                  ? ' dark:bg-pink-600/10 bg-purple-400/10 '
                  : day < dayjs(today).subtract(1, 'day').toDate()
                    ? 'dark:bg-stone-800/80 bg-stone-300/40'
                    : '  dark:bg-gray-950 bg-white '
            }`}
          >
            <div className="w-full flex flex-col items-start justify-start gap-y-1 px-1 pt-0.5 pb-2">
              {filteredevents?.length > 0 ? (
                <>
                  {feiertage.length > 0 &&
                    feiertage.map((item, index) => (
                      <div
                        title={'⭐ Feiertag: ' + item.titel}
                        key={'bnameTT' + item + index}
                        className="w-full bg-[#f5d902] border dark:border-gray-800 border-gray-400 text-black rounded "
                      >
                        <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                          ⭐{item.titel}
                        </div>
                      </div>
                    ))}
                  {bewohnerGeburtstag.length > 0 &&
                    bewohnerGeburtstag.map((item, index) => (
                      <div
                        title={'🎂 Bewohner: ' + item.titel}
                        key={'BBnameTT' + item + index}
                        className="w-full bg-[#faa161] border dark:border-gray-800 border-gray-400 text-black rounded "
                      >
                        <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                          🎂 {item.titel}
                        </div>
                      </div>
                    ))}
                  {geburtstag.length > 0 &&
                    geburtstag
                      .reduce((acc, curr) => {
                        if (!acc.find((e) => e.titel === curr.titel)) {
                          acc.push(curr)
                        }
                        return acc
                      }, [])
                      .map((item, index) => (
                        <div
                          title={'🎂 Mitarbeiter: ' + item.titel}
                          key={'MnameTT' + item + index}
                          className="w-full bg-[#52ccfa] border dark:border-gray-800 border-gray-400 text-black rounded "
                        >
                          <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                            🎂 {item.titel}
                          </div>
                        </div>
                      ))}
                  {rrule.length > 0 &&
                    rrule
                      .filter((e) => e.zeitraum === 1440)
                      .map((item, index) => (
                        <div
                          title={
                            (item.isprivate == false &&
                            item.ersteller.toString().toUpperCase() !=
                              User.Name.toString().toUpperCase()
                              ? '🔁🌍 -'
                              : '🔁🔒 Privat - ') +
                            ' Serie: ' +
                            item.titel +
                            ' | Betreff: ' +
                            item.betreff +
                            ' | Zeitraum: ' +
                            (item.zeitraum == 1440 ? 'ganztags' : `${item.von} - ${item.bis}`)
                          }
                          key={'brrulesname' + item + index}
                          className="w-full border dark:border-gray-800 border-gray-400 cursor-pointer text-black rounded "
                          style={{
                            background: theme ? item.boxColor : item.boxColor
                          }}
                          onClick={() => showDayList(day)}
                        >
                          <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                            {item.isprivate == false &&
                            item.ersteller.toString().toUpperCase() !=
                              User.Name.toString().toUpperCase()
                              ? '🔁🌍 -'
                              : '🔁🔒 Privat - '}{' '}
                            {item.titel + (item.betreff ? ' ' + item.betreff : 'keine Angabe')}
                          </div>
                        </div>
                      ))}
                  {bewohnerGEZ.length > 0 &&
                    bewohnerGEZ.map((item, index) => (
                      <div
                        title={'📺 GEZ Befreiung: ' + item.Bewohner}
                        key={'GEZnameTT' + item + index}
                        className="w-full bg-[#7d9dd4] border dark:border-gray-800 border-gray-400 text-black rounded "
                      >
                        <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                          📺 {item.Bewohner}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                ''
              )}
              {bewohnerGenehmigung.length > 0 &&
                bewohnerGenehmigung
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'🗒️ Genehmigung: ' + item.Bewohner}
                      key={'GennameTT' + item + index}
                      className="w-full bg-[#AABBFF] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        🗒️ {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {pflegevisite.length > 0 &&
                pflegevisite
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'📅 ' + item.titel + ': ' + item.Bewohner}
                      key={'PflvisnameTT' + item + index}
                      className="w-full bg-[#58e3f5] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        📅 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {ergebniserfassung.length > 0 &&
                ergebniserfassung.map((item, index) => (
                  <div
                    title={'🏠  ' + item.titel}
                    key={'ergfagTT' + item + index}
                    className="w-full bg-[#8708c7] border dark:border-gray-800 border-gray-400 text-black rounded "
                  >
                    <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                      🏠 {item.Bewohner}
                    </div>
                  </div>
                ))}
              {evaluierungKontraktur.length > 0 &&
                evaluierungKontraktur
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'🩺 ' + item.titel + ': ' + item.Bewohner}
                      key={'valuierungKontraTT' + item + index}
                      className="w-full bg-[#9af5d1] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        🩺 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {sicherheitstechnischeKontrolle.length > 0 &&
                sicherheitstechnischeKontrolle
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'🛂 ' + item.titel + ': ' + item.Bewohner}
                      key={'sicherheitstechnischTT' + item + index}
                      className="w-full bg-[#fa1702] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/55 truncate  rounded">
                        🛂 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {dekubitusprophylaxemaßnahmen.length > 0 &&
                dekubitusprophylaxemaßnahmen
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'🩹 ' + item.titel + ': ' + item.Bewohner}
                      key={'dekubituspronamTTe' + item + index}
                      className="w-full bg-[#ddf542] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        <MdPerson className="inline" /> {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {personalausweis.length > 0 &&
                personalausweis
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'💳 Personalausweis: ' + item.Bewohner}
                      key={'personalausweisTT' + item + index}
                      className="w-full bg-[#6e7fc4] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        💳 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {pflegewohngeld.length > 0 &&
                pflegewohngeld
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'💶 ' + item.titel + ': ' + item.Bewohner}
                      key={'pflegewohngTT' + item + index}
                      className="w-full bg-[#3ea86e] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        💶 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {wundvermessung.length > 0 &&
                wundvermessung
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'🩹 ' + item.titel + ': ' + item.Bewohner}
                      key={'wundverTT' + item + index}
                      className="w-full bg-[#c4a643] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        🩹 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {wundauswertung.length > 0 &&
                wundauswertung
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'📈 ' + item.titel + ': ' + item.Bewohner}
                      key={'bnwuaswertTTame' + item + index}
                      className="w-full bg-[#a86f5b] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        📈 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {tabellenwohngeld.length > 0 &&
                tabellenwohngeld
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'📄 ' + item.titel + ': ' + item.Bewohner}
                      key={'tabwohngeldbTTname' + item + index}
                      className="w-full bg-[#a89e5b] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        📄 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {katheterwechsel.length > 0 &&
                katheterwechsel
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Betreff === curr.Betreff)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'🧼 ' + item.titel + ': ' + item.Betreff}
                      key={'tabwohngeldbTTname' + item + index}
                      className="w-full bg-[#c8f542] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        🧼 {item.Betreff}
                      </div>
                    </div>
                  ))}
              {schwerbehindertausweis.length > 0 &&
                schwerbehindertausweis
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'🦽 ' + item.titel + ': ' + item.Bewohner}
                      key={'schwertabTT' + item + index}
                      className="w-full bg-[#0ecf9f] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        🦽 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {evaluierung.length > 0 &&
                evaluierung
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'📊 ' + item.titel + ': ' + item.Bewohner}
                      key={'evaluierungTT' + item + index}
                      className="w-full bg-[#b598b0] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        📊 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {evaluierungBetreuung.length > 0 &&
                evaluierungBetreuung
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'📊 ' + item.titel + ': ' + item.Bewohner}
                      key={'evaluiergBetreuTT' + item + index}
                      className="w-full bg-[#afb394] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        📊 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {bradenskala.length > 0 &&
                bradenskala
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'📊 Braden-Skala: ' + item.Bewohner}
                      key={'bradenskalaTT' + item + index}
                      className="w-full bg-[#d1a56f] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        📊 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {nortonskala.length > 0 &&
                nortonskala
                  .reduce((acc, curr) => {
                    if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  .map((item, index) => (
                    <div
                      title={'📊 Braden-Skala: ' + item.Bewohner}
                      key={'nortonskalaTT' + item + index}
                      className="w-full bg-[#b08799] border dark:border-gray-800 border-gray-400 text-black rounded "
                    >
                      <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                        📊 {item.Bewohner}
                      </div>
                    </div>
                  ))}
              {filteredevents
                .filter(
                  (a) =>
                    (a.katBezeichnung == 'Termin' &&
                      (a.datum == format(day, 'Y-MM-dd') ||
                        (dayjs(a.realtimestartDate, 'DD.MM.YYYY').toDate().setHours(12) <= day &&
                          dayjs(a.realtimeendDate, 'DD.MM.YYYY').toDate().setHours(12) >= day))) ||
                    (a.datum == format(day, 'Y-MM-dd') &&
                      a.katBezeichnung == 'rrule' &&
                      a.zeitraum != 1440)
                )
                .map((item, index) =>
                  item.katBezeichnung == 'Termin' ? (
                    <DraggableEvent key={'draggableev' + item + index} event={item} day={day} />
                  ) : (
                    <div
                      title={
                        (item.isprivate == false &&
                        item.ersteller.toString().toUpperCase() !=
                          User.Name.toString().toUpperCase()
                          ? '🔁🌍 - '
                          : '🔁🔒 - ') +
                        ' Serie: ' +
                        item.titel +
                        ' | Betreff: ' +
                        item.betreff +
                        ' | Zeitraum: ' +
                        (item.zeitraum == 1440
                          ? 'ganztags'
                          : `${item.von} - ${addMinutesToTime(item.von.toString(), parseInt(item.zeitraum))}`)
                      }
                      style={{ background: item.boxColor }}
                      key={'conta' + 'rrule' + item + index}
                      className="w-full py-[2px] px-2  select-none  cursor-pointer text-black ring-1 dark:ring-gray-700  ring-gray-400   flex flex-row items-center text-xs justify-start rounded truncate"
                    >
                      {item.isprivate == false &&
                      item.ersteller.toString().toUpperCase() != User.Name.toString().toUpperCase()
                        ? '🔁🌍 -'
                        : '🔁🔒 Privat - '}{' '}
                      ({item.realtimestart} -{' '}
                      {addMinutesToTime(item.von.toString(), parseInt(item.zeitraum))}) |
                      <b title={item.titel} className="px-1  truncate">
                        {' '}
                        {item.titel + ' ' + item.betreff}
                      </b>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DayContainer
