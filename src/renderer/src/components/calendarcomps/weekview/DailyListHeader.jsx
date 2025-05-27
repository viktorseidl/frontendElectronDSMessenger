import React from 'react'
import { MdClose, MdDelete, MdEdit, MdList } from 'react-icons/md'
import imgs from './../../../assets/Logo.png'
import { format } from 'date-fns'
import { checkSeason, filterOnKategorieShortener } from './functions/functionHandler'
import { useTheme } from '../../../styles/ThemeContext'
import { useRoles } from '../../../styles/RoleContext'
import { util } from 'node-forge'
import Winter from './../../../assets/winter.png'
import Spring from './../../../assets/spring.png'
import Summer from './../../../assets/summer.png'
import Autmn from './../../../assets/autmn.png'
import Newyear from './../../../assets/newyear.png'
import ThreeSaints from './../../../assets/threesaints.png'
import Eastern from './../../../assets/eastern.png'
import Halloween from './../../../assets/halloween.png'
import Christihimmel from './../../../assets/christihimmel.png'
import Christmas from './../../../assets/christmas.png'
import Pfingsten from './../../../assets/pfingsten.png'
import TagEinheit from './../../../assets/tagdereinheit.png'
import TagArbeit from './../../../assets/tagarbeit.png'
import dayjs from 'dayjs'
import { addMinutesToTime } from '../functionHandler'
const DailyListHeader = ({
  information,
  show,
  closer,
  deleteMyEvent,
  updateEventStandard,
  updateEventRRule
}) => {
  const { theme } = useTheme()
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const { hasPermission } = useRoles()
  const events = information !== null ? information.events : null
  const day = information !== null ? information.daystamp : null
  const myevents =
    information !== null
      ? information.events.filter(
          (a) =>
            ((a.datum == format(day, 'Y-MM-dd') ||
              (dayjs(a.realtimestartDate, 'DD.MM.YYYY').toDate() <= day &&
                dayjs(a.realtimeendDate, 'DD.MM.YYYY').toDate() >= day)) &&
              a.katBezeichnung == 'Termin') ||
            (a.datum == format(day, 'Y-MM-dd') && a.katBezeichnung == 'rrule' && a.zeitraum != 1440)
        )
      : []
  const closertab = (e) => {
    if (!e.target.closest("[aria-label='Ditabis']")) {
      closer()
    }
  }
  const updateshow = (id, type) => {
    if (type == 'standard') {
      updateEventStandard(id)
    } else {
      updateEventRRule(id)
    }
  }
  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-10  dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
          onClick={(e) => closertab(e)}
        >
          <div
            aria-label="Ditabis"
            className="min-w-[30%] max-w-[35%] max-h-[85%] flex z-40 flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm"
          >
            <div
              id="titlebar"
              className={
                'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'
              }
            >
              <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                <img src={imgs} className="w-10 h-2  " />
                <MdList className="inline text-lg" />
                <b className="ml-2 ">{day.toLocaleDateString('de-DE', { weekday: 'short' })}</b>
                {format(day, 'dd.MM.Y')}
              </span>
              <MdClose onClick={closer} className="inline cursor-pointer" />
            </div>
            <div className="w-full flex flex-col dark:bg-gray-900 bg-white pb-4 ">
              <div className="w-full h-[40rem]   flex flex-col items-center justify-start px-4 py-4 overflow-auto  dark:scrollbar-thumb-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600 scrollbar-track-gray-200 ">
                <div className="w-full h-full mb-6  flex flex-col items-center justify-start ">
                  <div className="w-full mb-6 mt-2">
                    <img
                      src={
                        checkSeason(format(day, 'Y-MM-dd')) == 'newyear'
                          ? Newyear
                          : checkSeason(format(day, 'Y-MM-dd')) == 'threesaints'
                            ? ThreeSaints
                            : checkSeason(format(day, 'Y-MM-dd')) == 'eastern'
                              ? Eastern
                              : checkSeason(format(day, 'Y-MM-dd')) == 'christihimmel'
                                ? Christihimmel
                                : checkSeason(format(day, 'Y-MM-dd')) == 'tagarbeit'
                                  ? TagArbeit
                                  : checkSeason(format(day, 'Y-MM-dd')) == 'tageinheit'
                                    ? TagEinheit
                                    : checkSeason(format(day, 'Y-MM-dd')) == 'pfingsten'
                                      ? Pfingsten
                                      : checkSeason(format(day, 'Y-MM-dd')) == 'halloween'
                                        ? Halloween
                                        : checkSeason(format(day, 'Y-MM-dd')) == 'christmas'
                                          ? Christmas
                                          : checkSeason(format(day, 'Y-MM-dd')) == 'winter'
                                            ? Winter
                                            : checkSeason(format(day, 'Y-MM-dd')) == 'spring'
                                              ? Spring
                                              : checkSeason(format(day, 'Y-MM-dd')) == 'summer'
                                                ? Summer
                                                : Autmn
                      }
                      className="obeject-cover w-full h-40 rounded "
                    />
                  </div>
                  <div className="w-full font-[Arial] uppercase  dark:text-gray-300 text-gray-700 dark:bg-blue-900/40 bg-blue-700/10 border dark:border-gray-700 border-gray-400 pl-4 py-2 mb-4 text-xs ">
                    🔵 Ganztags-Termine:
                  </div>
                  <div className="w-full flex flex-col items-start justify-start gap-y-1">
                    {events.filter(
                      (e) =>
                        (format(day, 'dd.MM.Y') == e.ddate && e.katBezeichnung === 'Feiertag') ||
                        (e.katBezeichnung === 'Personalausweis' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'BewohnerGEZ' && format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'BewohnerGeburtstag' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'BewohnerGenehmigung' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Pflegewohngeld' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Tabellenwohngeld' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Schwerbehindertausweis' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Pflegevisite' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Evaluierung' && format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Wundauswertung' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Wundvermessung' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Evaluierung Betreuung' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Bradenskala' && format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Nortonskala' && format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Sicherheitstechnische Kontrolle' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Evaluierung Kontraktur' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Ergebniserfassung' &&
                          format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'Geburtstag' && format(day, 'Y-MM-dd') == e.datum) ||
                        (e.katBezeichnung === 'rrule' &&
                          e.zeitraum == 1440 &&
                          format(day, 'Y-MM-dd') == e.datum)
                    ).length > 0 ? (
                      <>
                        {filterOnKategorieShortener(events, 'Feiertag').filter(
                          (e) => format(day, 'dd.MM.Y') == e.ddate
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Feiertag')
                            .filter((e) => format(day, 'dd.MM.Y') == e.ddate)
                            .map((item, index) => (
                              <div
                                title={'⭐ Feiertag: ' + item.titel}
                                key={'bnameLLTT' + item + index}
                                className="w-full bg-[#f5d902] border dark:border-gray-800 border-gray-400 rounded  font-[Arial] dark:text-gray-800 text-gray-700"
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  ⭐{item.titel}
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>gesetzlicher bundesweiter Feiertag</span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'BewohnerGeburtstag').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'BewohnerGeburtstag')
                            .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                            .map((item, index) => (
                              <div
                                title={'🎂 Bewohner: ' + item.titel}
                                key={'BBnameTT' + item + index}
                                className="w-full bg-[#faa161] border dark:border-gray-800 border-gray-400 font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  🎂 Geburtstag eines Bewohner
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.titel}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Geburtstag').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Geburtstag')
                            .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                            .map((item, index) => (
                              <div
                                title={'🎂 Mitarbeiter: ' + item.titel}
                                key={'MnameTT' + item + index}
                                className="w-full bg-[#52ccfa] border dark:border-gray-800 border-gray-400 rounded  font-[Arial] dark:text-gray-800 text-gray-700"
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  🎂 Geburtstag eines Mitarbeiter
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Mitarbeiter: </b>
                                    {item.titel}
                                  </span>
                                </div>
                              </div>
                            ))}

                        {filterOnKategorieShortener(events, 'BewohnerGEZ').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'BewohnerGEZ')
                            .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                            .map((item, index) => (
                              <div
                                title={'📺 GEZ Befreiung: ' + item.Bewohner}
                                key={'GEZnamLeTT' + item + index}
                                className="w-full bg-[#7d9dd4] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  📺 GEZ Bewohner
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'BewohnerGenehmigung').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'BewohnerGenehmigung')
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
                                className="w-full bg-[#AABBFF] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  🗒️ Genehmigung
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Pflegevisite').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Pflegevisite')
                            .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                            .reduce((acc, curr) => {
                              if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                                acc.push(curr)
                              }
                              return acc
                            }, [])
                            .map((item, index) => (
                              <div
                                title={'📅 Pflegevisite ' + item.titel + ': ' + item.Bewohner}
                                key={'PflvisnaLmeTT' + item + index}
                                className="w-full bg-[#58e3f5] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  📅 Pflegevisite
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Ergebniserfassung').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Ergebniserfassung')
                            .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                            .map((item, index) => (
                              <div
                                title={'🏠  ' + item.titel}
                                key={'ergfagTT' + item + index}
                                className="w-full bg-[#8708c7] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  🏠 Ergebniserfassung
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Haus: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Evaluierung Kontraktur').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Evaluierung Kontraktur')
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
                                key={'valuierungKoLntraTT' + item + index}
                                className="w-full bg-[#9af5d1] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  🩺 Evaluierung Kontraktur
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(
                          events,
                          'Sicherheitstechnische Kontrolle'
                        ).filter((e) => format(day, 'Y-MM-dd') == e.datum).length > 0 &&
                          filterOnKategorieShortener(events, 'Sicherheitstechnische Kontrolle')
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
                                className="w-full bg-[#fa1702] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  🛂 Sicherheitstechnische Kontrolle
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Dekubitusprophylaxemaßnahmen').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Dekubitusprophylaxemaßnahmen')
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
                                key={'dekubituspronamLTTe' + item + index}
                                className="w-full bg-[#ddf542] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  <MdPerson className="inline" /> Dekubitusprophylaxemaßnahmen
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Personalausweis').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Personalausweis')
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
                                key={'personalauLsweisTT' + item + index}
                                className="w-full bg-[#6e7fc4] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  💳 Personalausweis
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Pflegewohngeld').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Pflegewohngeld')
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
                                key={'pflegewohngLTT' + item + index}
                                className="w-full bg-[#3ea86e] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  💶 Pflegewohngeld
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Wundvermessung').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Wundvermessung')
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
                                key={'wundverTLT' + item + index}
                                className="w-full bg-[#c4a643] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  🩹 Wundvermessung
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Wundauswertung').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Wundauswertung')
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
                                key={'bnwuaswLertTTame' + item + index}
                                className="w-full bg-[#a86f5b] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  📈 Wundauswertung
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Tabellenwohngeld').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Tabellenwohngeld')
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
                                className="w-full bg-[#a89e5b] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  📄 Tabellenwohngeld
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Schwerbehindertausweis').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Schwerbehindertausweis')
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
                                key={'schwertabTTL' + item + index}
                                className="w-full bg-[#0ecf9f] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  🦽 Schwerbehindertausweis
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Evaluierung').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Evaluierung')
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
                                className="w-full bg-[#b598b0] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  📊 Evaluierung
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Evaluierung Betreuung').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Evaluierung Betreuung')
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
                                key={'evaluiergBetreuTTL' + item + index}
                                className="w-full bg-[#afb394] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  📊 Evaluierung Betreuung
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Bradenskala').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Bradenskala')
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
                                key={'bradnskalaLTT' + item + index}
                                className="w-full bg-[#d1a56f] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  📊 Braden-Skala
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'Nortonskala').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'Nortonskala')
                            .filter((e) => format(day, 'Y-MM-dd') == e.datum)
                            .reduce((acc, curr) => {
                              if (!acc.find((e) => e.Bewohner === curr.Bewohner)) {
                                acc.push(curr)
                              }
                              return acc
                            }, [])
                            .map((item, index) => (
                              <div
                                title={'📊 Norton-Skala: ' + item.Bewohner}
                                key={'nortsskalaLTT' + item + index}
                                className="w-full bg-[#b08799] border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded "
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-start bg-white/65 truncate  rounded-t">
                                  📊 Norton-Skala
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Bewohner: </b>
                                    {item.Bewohner}
                                  </span>
                                </div>
                              </div>
                            ))}
                        {filterOnKategorieShortener(events, 'rrule').filter(
                          (e) => format(day, 'Y-MM-dd') == e.datum && e.zeitraum
                        ).length > 0 &&
                          filterOnKategorieShortener(events, 'rrule')
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
                                key={'brrulesnameL' + item + index}
                                className="w-full border dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded flex flex-col items-start justify-start "
                                style={{
                                  background: theme ? item.boxColor : item.boxColor
                                }}
                              >
                                <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-between bg-white/65 truncate  rounded-t">
                                  <span>
                                    {item.isprivate == false &&
                                    item.ersteller.toString().toUpperCase() !=
                                      User.Name.toString().toUpperCase()
                                      ? '🔁🌍 - '
                                      : '🔁🔒 Privat - '}{' '}
                                    Serien-Termin | {item.titel}
                                  </span>
                                  <span>
                                    {(hasPermission('delete:calendar') &&
                                      item.ersteller.toString().toUpperCase() ==
                                        User.Name.toString().toUpperCase()) ||
                                    (hasPermission('delete:calendar') &&
                                      item.ersteller.toString().toUpperCase() !=
                                        User.Name.toString().toUpperCase()) ||
                                    (hasPermission('delete:calendar') && User.usertypeVP != 'P') ? (
                                      <button
                                        title="Eintrag löschen"
                                        className=" w-auto mr-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs"
                                        onClick={() => deleteMyEvent(item.id, 'rrule')}
                                        aria-label="isbuttondoubleclick"
                                      >
                                        <MdDelete aria-label="isbuttondoubleclick" />
                                      </button>
                                    ) : (
                                      ''
                                    )}
                                    {(hasPermission('update:calendar') &&
                                      item.ersteller.toString().toUpperCase() ==
                                        User.Name.toString().toUpperCase()) ||
                                    (hasPermission('update:calendar') &&
                                      item.ersteller.toString().toUpperCase() !=
                                        User.Name.toString().toUpperCase()) ||
                                    (hasPermission('update:calendar') && User.usertypeVP != 'P') ? (
                                      <button
                                        title="Eintrag bearbeiten"
                                        className=" w-auto mr-1 bg-blue-600 hover:bg-blue-500 text-white p-1 rounded text-xs"
                                        onClick={() => updateshow(item, 'rrule')}
                                        aria-label="isbuttondoubleclick"
                                      >
                                        <MdEdit aria-label="isbuttondoubleclick" />
                                      </button>
                                    ) : (
                                      ''
                                    )}
                                  </span>
                                </div>
                                <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                  <span>
                                    <b>Betreff: </b>
                                    {item.betreff ? item.betreff : 'keine Angabe'}
                                  </span>
                                </div>
                                <div className="w-full pb-1 px-2 flex flex-row items-center text-xs text-wrap justify-start bg-white/65 truncate  rounded-b">
                                  <span>
                                    <b>Bemerkung: </b>
                                    {item.isNoteAttached != null
                                      ? item.isNoteAttached
                                      : 'keine Angabe'}
                                  </span>
                                </div>
                              </div>
                            ))}
                      </>
                    ) : (
                      <div className="w-full flex flex-col text-sm items-center justify-center py-6 dark:text-gray-400 text-gray-500">
                        Keine Ganztags-Termine vorhanden
                      </div>
                    )}
                  </div>

                  <div className="w-full font-[Arial] uppercase   dark:text-gray-300 text-gray-700 dark:bg-blue-900/40 bg-blue-700/10 border dark:border-gray-700 border-gray-400 pl-4 py-2 mb-4 text-xs mt-6 ">
                    🕟 Zeitliche-Termine:
                  </div>
                  {[...Array(24)].map((_, hour) => (
                    <>
                      {myevents.length > 0 &&
                      myevents.filter((ev) => parseInt(ev.time) == hour).length > 0 ? (
                        <>
                          <div className="w-full uppercase text-sm pl-2 py-2 pb-1 my-2  font-[Arial] dark:text-gray-400 text-gray-700 border-b dark:border-gray-600 border-gray-300">
                            {hour > 9 ? hour.toString() : '0' + hour.toString()}:00 Uhr
                          </div>
                          <div className="w-full flex flex-col items-start justify-start gap-y-1">
                            {myevents
                              .filter((ev) => parseInt(ev.time) == hour)
                              .map((item, index) =>
                                item.katBezeichnung == 'Termin' ? (
                                  <div
                                    title={
                                      (item.katBezeichnung == 'Termin' &&
                                      item.ersteller.toString().toUpperCase() ==
                                        User.Name.toString().toUpperCase() &&
                                      item.isprivate == false
                                        ? '📌  '
                                        : item.katBezeichnung == 'Termin' &&
                                            item.ersteller.toString().toUpperCase() ==
                                              User.Name.toString().toUpperCase() &&
                                            item.isprivate !== false
                                          ? '🔒 Privat - '
                                          : item.katBezeichnung == 'Termin' &&
                                              item.ersteller.toString().toUpperCase() !==
                                                User.Name.toString().toUpperCase()
                                            ? '🌍 '
                                            : '') +
                                      item.titel +
                                      ' | Betreff: ' +
                                      (item.betreff == '' || item.betreff == null
                                        ? 'Keine Angabe'
                                        : item.betreff) +
                                      ' | Zeitraum: ' +
                                      (item.realtimestart + ' - ' + item.realtimeend)
                                    }
                                    key={'brrulesname' + item + index}
                                    className={`w-full border  bg-blue-300  dark:border-gray-800 border-gray-400  font-[Arial] dark:text-gray-800 text-gray-700 rounded flex flex-col items-start justify-start `}
                                  >
                                    <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center  font-[Arial] dark:text-gray-800 text-gray-700 text-xs justify-between bg-white/65 truncate  rounded-t">
                                      <span>
                                        {item.katBezeichnung == 'Termin' &&
                                        item.ersteller.toString().toUpperCase() ==
                                          User.Name.toString().toUpperCase() &&
                                        item.isprivate == false
                                          ? '📌  '
                                          : item.katBezeichnung == 'Termin' &&
                                              item.ersteller.toString().toUpperCase() ==
                                                User.Name.toString().toUpperCase() &&
                                              item.isprivate !== false
                                            ? '🔒 Privat - '
                                            : item.katBezeichnung == 'Termin' &&
                                                item.ersteller.toString().toUpperCase() !==
                                                  User.Name.toString().toUpperCase()
                                              ? '🌍 '
                                              : ''}{' '}
                                        ({item.realtimestart} - {item.realtimeend}) Termin |{' '}
                                        {item.titel}
                                      </span>
                                      <span>
                                        {(hasPermission('delete:calendar') &&
                                          item.ersteller.toString().toUpperCase() ==
                                            User.Name.toString().toUpperCase()) ||
                                        (hasPermission('delete:calendar') &&
                                          item.ersteller.toString().toUpperCase() !=
                                            User.Name.toString().toUpperCase()) ||
                                        (hasPermission('delete:calendar') &&
                                          User.usertypeVP != 'P') ? (
                                          <button
                                            title="Eintrag löschen"
                                            className=" w-auto mr-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs"
                                            onClick={() => deleteMyEvent(item.id, 'standard')}
                                            aria-label="isbuttondoubleclick"
                                          >
                                            <MdDelete aria-label="isbuttondoubleclick" />
                                          </button>
                                        ) : (
                                          ''
                                        )}
                                        {(hasPermission('update:calendar') &&
                                          item.ersteller.toString().toUpperCase() ==
                                            User.Name.toString().toUpperCase()) ||
                                        (hasPermission('update:calendar') &&
                                          item.ersteller.toString().toUpperCase() !=
                                            User.Name.toString().toUpperCase()) ||
                                        (hasPermission('update:calendar') &&
                                          User.usertypeVP != 'P') ? (
                                          <button
                                            title="Eintrag bearbeiten"
                                            className=" w-auto mr-1 bg-blue-600 hover:bg-blue-500 text-white p-1 rounded text-xs"
                                            onClick={() => updateshow(item, 'standard')}
                                            aria-label="isbuttondoubleclick"
                                          >
                                            <MdEdit aria-label="isbuttondoubleclick" />
                                          </button>
                                        ) : (
                                          ''
                                        )}
                                      </span>
                                    </div>
                                    <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                      <span>
                                        <b>Betreff: </b>
                                        {item.betreff ? item.betreff : 'keine Angabe'}
                                      </span>
                                    </div>
                                    <div className="w-full pb-1 px-2 flex flex-row items-center text-xs text-wrap justify-start bg-white/65 truncate  rounded-b">
                                      <span>
                                        <b>Bemerkung: </b>
                                        {item.isNoteAttached != null
                                          ? item.isNoteAttached
                                          : 'keine Angabe'}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    title={
                                      '🔁 Serie: ' +
                                      item.titel +
                                      ' | Betreff: ' +
                                      item.betreff +
                                      ' | Zeitraum: ' +
                                      (item.zeitraum == 1440
                                        ? 'ganztags'
                                        : `${item.von} - ${addMinutesToTime(item.von.toString(), parseInt(item.zeitraum))}`)
                                    }
                                    style={{ background: item.boxColor }}
                                    key={'brrulesname' + item + index}
                                    className="w-full border dark:border-gray-800   border-gray-400 text-black rounded flex flex-col items-start justify-start "
                                  >
                                    <div className="w-full pt-1 uppercase font-bold px-2 flex flex-row items-center font-[Arial] text-xs justify-between bg-white/65 truncate  rounded-t">
                                      <span>
                                        {item.isprivate == false &&
                                        item.ersteller.toString().toUpperCase() !=
                                          User.Name.toString().toUpperCase()
                                          ? '🔁🌍 - '
                                          : '🔁🔒 Privat - '}{' '}
                                        ({item.realtimestart} -{' '}
                                        {addMinutesToTime(
                                          item.von.toString(),
                                          parseInt(item.zeitraum)
                                        )}
                                        ) Serien-Termin | {item.titel}
                                      </span>
                                      <span>
                                        {(hasPermission('delete:calendar') &&
                                          item.ersteller.toString().toUpperCase() ==
                                            User.Name.toString().toUpperCase()) ||
                                        (hasPermission('delete:calendar') &&
                                          item.ersteller.toString().toUpperCase() !=
                                            User.Name.toString().toUpperCase()) ||
                                        (hasPermission('delete:calendar') &&
                                          User.usertypeVP != 'P') ? (
                                          <button
                                            title="Eintrag löschen"
                                            className=" w-auto mr-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs"
                                            onClick={() => deleteMyEvent(item.id, 'rrule')}
                                            aria-label="isbuttondoubleclick"
                                          >
                                            <MdDelete aria-label="isbuttondoubleclick" />
                                          </button>
                                        ) : (
                                          ''
                                        )}
                                        {(hasPermission('update:calendar') &&
                                          item.ersteller.toString().toUpperCase() ==
                                            User.Name.toString().toUpperCase()) ||
                                        (hasPermission('update:calendar') &&
                                          item.ersteller.toString().toUpperCase() !=
                                            User.Name.toString().toUpperCase()) ||
                                        (hasPermission('update:calendar') &&
                                          User.usertypeVP != 'P') ? (
                                          <button
                                            title="Eintrag bearbeiten"
                                            className=" w-auto mr-1 bg-blue-600 hover:bg-blue-500 text-white p-1 rounded text-xs"
                                            onClick={() => updateshow(item, 'rrule')}
                                            aria-label="isbuttondoubleclick"
                                          >
                                            <MdEdit aria-label="isbuttondoubleclick" />
                                          </button>
                                        ) : (
                                          ''
                                        )}
                                      </span>
                                    </div>
                                    <div className="w-full py-0.5 px-2 flex flex-row items-center text-xs justify-start bg-white/65 truncate  ">
                                      <span>
                                        <b>Betreff: </b>
                                        {item.betreff ? item.betreff : 'keine Angabe'}
                                      </span>
                                    </div>
                                    <div className="w-full pb-1 px-2 flex flex-row items-center text-xs text-wrap justify-start bg-white/65 truncate  rounded-b">
                                      <span>
                                        <b>Bemerkung: </b>
                                        {item.isNoteAttached != null
                                          ? item.isNoteAttached
                                          : 'keine Angabe'}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </>
                  ))}
                  {myevents.length == 0 ? (
                    <div className="w-full flex text-sm flex-col items-center justify-center py-6 dark:text-gray-400 text-gray-500">
                      Keine Zeitlichen Termine vorhanden
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DailyListHeader
