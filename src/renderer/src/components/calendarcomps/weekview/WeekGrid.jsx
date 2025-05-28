import React, { useEffect, useState } from 'react'
import { format, isDate } from 'date-fns'
import DayColumn from './DayColumn'
import { MdPerson } from 'react-icons/md'
import { useTheme } from '../../../styles/ThemeContext'
import NewCalendarEntryDialog from '../NewCalendarEntryDialog'
import DailyListHeader from './DailyListHeader'
import { filterOnKategorieShortener } from './functions/functionHandler'
import dayjs from 'dayjs'
import { util } from 'node-forge'

const WeekGrid = ({
  handleDrop,
  date,
  newEntryAlertValue,
  newEntryAlertSetter,
  filteredevents,
  updateFilteredEvents,
  kategorien,
  deleteMyEvent,
  updateEventStandard,
  updateEventRRule,
  showDayList,
  closeDayList,
  dailyInformation,
  showDailyInformation
}) => {
  const { theme } = useTheme()
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const weekStart = date
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
  const closeNewEntryDialog = () => {
    newEntryAlertSetter(!newEntryAlertValue)
    updateFilteredEvents()
  }

  useEffect(() => {}, [date])
  return (
    <>
      <div
        onDoubleClick={() => newEntryAlertSetter(true)}
        className="w-full  border-none grid grid-cols-7 divide-x divide-gray-300 dark:divide-gray-700"
      >
        {/* Weekday Headers*/}
        {Array.from({ length: 7 }).map((_, index) => {
          const day = new Date(weekStart)
          day.setDate(weekStart.getDate() + index)
          return (
            <div
              key={index}
              onClick={() => showDayList(day)}
              style={{
                boxShadow:
                  ` ${
                    feiertage.filter((e) => format(day, 'dd.MM.Y') == e.ddate).length > 0
                      ? 'inset -0px -5px 0px #f5d902'
                      : ''
                  } ` +
                  ` ${
                    geburtstag.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    feiertage.filter((e) => format(day, 'dd.MM.Y') == e.ddate).length > 0
                      ? ', inset -0px -10px 0px #26b7f0'
                      : geburtstag.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0
                        ? ' inset 0px -5px 0px #26b7f0 '
                        : ''
                  } ` +
                  ` ${
                    bewohnerGeburtstag.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0
                      ? geburtstag.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                        feiertage.filter((e) => format(day, 'dd.MM.Y') == e.ddate).length > 0
                        ? ', inset -0px -15px 0px #faa161'
                        : geburtstag.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 ||
                            feiertage.filter((e) => format(day, 'dd.MM.Y') == e.ddate).length > 0
                          ? ', inset 0px -10px 0px #faa161'
                          : 'inset 0px -5px 0px #faa161'
                      : ''
                  } `
              }}
              className="w-full h-[50px] pl-2 text-sm py-2 border-y first:border-l cursor-pointer border-gray-300 dark:border-gray-700 bg-stone-200 dark:bg-transparent"
            >
              <b className="mr-2 text-[16px]">
                {day.toLocaleDateString('de-DE', { weekday: 'short' })}
              </b>
              {format(day, 'dd.MM.Y')}
            </div>
          )
        })}
        {/* ganztags events */}
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
              e.katBezeichnung === 'Katheterwechsel' ||
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
        ).length > 0 &&
          Array.from({ length: 7 }).map((_, index) => {
            const day = new Date(weekStart)
            day.setDate(weekStart.getDate() + index)

            return (
              <div
                key={index}
                className="w-full h-28 overflow-auto dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 text-sm border-y first:border-l  border-gray-300 dark:border-gray-700 "
              >
                <div className="w-full flex flex-col items-center justify-start py-1 px-1 text-xs gap-y-1">
                  {feiertage.filter((e) => format(day, 'dd.MM.Y') == e.ddate).length > 0 &&
                    feiertage
                      .filter((e) => format(day, 'dd.MM.Y') == e.ddate)
                      .map((item, index) => (
                        <div
                          title={'⭐ Feiertag: ' + item.titel}
                          key={'bnameTT' + item + index}
                          className="w-full bg-[#f5d902] border dark:border-gray-800 border-gray-400 text-black rounded "
                        >
                          <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  rounded">
                            ⭐{item.titel} {console.log(feiertage)}
                          </div>
                        </div>
                      ))}
                  {bewohnerGeburtstag.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    bewohnerGeburtstag
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                      .map((item, index) => (
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
                  {geburtstag.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    geburtstag
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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

                  {bewohnerGEZ.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    bewohnerGEZ
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                      .map((item, index) => (
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
                  {bewohnerGenehmigung.filter((e) => format(day, 'Y-MM-dd') == e.datum).length >
                    0 &&
                    bewohnerGenehmigung
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {pflegevisite.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    pflegevisite
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {ergebniserfassung.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    ergebniserfassung
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                      .map((item, index) => (
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
                  {evaluierungKontraktur.filter((e) => format(day, 'Y-MM-dd') == e.datum).length >
                    0 &&
                    evaluierungKontraktur
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {sicherheitstechnischeKontrolle.filter((e) => format(day, 'Y-MM-dd') == e.datum)
                    .length > 0 &&
                    sicherheitstechnischeKontrolle
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {dekubitusprophylaxemaßnahmen.filter((e) => format(day, 'Y-MM-dd') == e.datum)
                    .length > 0 &&
                    dekubitusprophylaxemaßnahmen
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {personalausweis.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    personalausweis
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {pflegewohngeld.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    pflegewohngeld
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {wundvermessung.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    wundvermessung
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {wundauswertung.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    wundauswertung
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {tabellenwohngeld.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    tabellenwohngeld
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {katheterwechsel.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    katheterwechsel
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {schwerbehindertausweis.filter((e) => format(day, 'Y-MM-dd') == e.datum).length >
                    0 &&
                    schwerbehindertausweis
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {evaluierung.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    evaluierung
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {evaluierungBetreuung.filter((e) => format(day, 'Y-MM-dd') == e.datum).length >
                    0 &&
                    evaluierungBetreuung
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {bradenskala.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    bradenskala
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {nortonskala.filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                    nortonskala
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum)
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
                  {rrule.filter((e) => format(day, 'Y-MM-dd') == e.datum && e.zeitraum).length >
                    0 &&
                    rrule
                      .filter((e) => format(day, 'Y-MM-dd') == e.datum && e.zeitraum === 1440)
                      .map((item, index) => (
                        <div
                          title={
                            (item.isprivate == false &&
                            item.ersteller.toString().toUpperCase() !=
                              User.Name.toString().toUpperCase()
                              ? '🔁🌍 - '
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
                              ? '🔁🌍 - '
                              : '🔁🔒 Privat - '}{' '}
                            {item.titel + (item.betreff ? item.betreff : 'keine Angabe')}
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            )
          })}

        {/* Grid Columns for Days */}
        <div className="relative col-span-7 grid grid-cols-7 divide-x divide-gray-300 dark:divide-gray-700 dark:bg-gray-950 bg-stone-100">
          {Array.from({ length: 7 }).map((_, dayIndex) => {
            const day = new Date(weekStart)
            day.setDate(weekStart.getDate() + dayIndex)
            day.setHours(12)

            return (
              <DayColumn
                key={dayIndex + 'Daykolm'}
                index={dayIndex}
                day={day}
                events={filteredevents.filter(
                  (a) =>
                    ((a.datum == day.toISOString().slice(0, 10) ||
                      (dayjs(a.realtimestartDate, 'DD.MM.YYYY').toDate().setHours(12) <= day &&
                        dayjs(a.realtimeendDate, 'DD.MM.YYYY').toDate().setHours(12) >= day)) &&
                      a.katBezeichnung == 'Termin') ||
                    (a.datum == day.toISOString().slice(0, 10) &&
                      a.katBezeichnung == 'rrule' &&
                      a.zeitraum != 1440)
                )}
                handleDrop={handleDrop}
                showDayList={showDayList}
              />
            )
          })}
        </div>
      </div>
      <NewCalendarEntryDialog
        show={newEntryAlertValue}
        close={closeNewEntryDialog}
        title={'Neuer Termin'}
        kategorien={kategorien}
      />
      <DailyListHeader
        show={showDailyInformation}
        closer={closeDayList}
        information={dailyInformation}
        updateEventStandard={updateEventStandard}
        updateEventRRule={updateEventRRule}
        deleteMyEvent={deleteMyEvent}
      />
    </>
  )
}

export default WeekGrid
