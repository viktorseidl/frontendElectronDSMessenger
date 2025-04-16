import React from 'react'
import { motion } from 'framer-motion'
import { adjustForMode, calculateHeight } from './functions/functionHandler'
import { useTheme } from '../../../styles/ThemeContext'
const EventKategorien = ({ event }) => {
  const { theme } = useTheme()

  return (
    <motion.div
      // Ensures the event stays visible while dragging
      className={`p-1 text-black rounded dark:ring-1 ring-1 dark:ring-gray-700 ring-gray-400 relative calshadow overflow-hidden `}
      id={event.id}
      style={{
        minHeight: '28px',
        height: `${calculateHeight(96, 40)}px`,
        background: `${theme ? adjustForMode('#cccccc', 'light') : adjustForMode('#DDDDDD', 'dark')}`
      }}
    >
      <div className="w-full flex flex-row items-start justify-start">
        <div className={` w-48 h-full max-w-52 flex flex-col text-xs   truncate`}>
          <div className="w-full flex flex-col items-center justify-start  truncate gap-y-1">
            <b
              title={'Ganztages-Einträge'}
              className="w-full  truncate mb-2 flex flex-col items-center justify-start"
            >
              <span className={`w-full dark:bg-white/20 bg-black/10  text-black rounded-t  p-1`}>
                Ganztages-Einträge
              </span>
            </b>
            {event.filter((e) => e.katBezeichnung === 'Geburtstag').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Geburtstag')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Mit. Geburtstag</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Geburtstag')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full truncate p-2 py-1 dark:bg-white/70 bg-white/70 flex flex-row items-center justify-start rounded "
                    >
                      {item.titel}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'BewohnerGeburtstag').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'BewohnerGeburtstag')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bew. Geburtstag</b>
                {event
                  .filter((e) => e.katBezeichnung === 'BewohnerGeburtstag')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full truncate p-2 py-1 dark:bg-white/70 bg-white/70 flex flex-row items-center justify-start rounded "
                    >
                      {item.titel}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'BewohnerGEZ').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'BewohnerGEZ')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bew. GEZ</b>
                {event
                  .filter((e) => e.katBezeichnung === 'BewohnerGEZ')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/80 bg-white/80 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Endet: {item.realtimeendDate}</a>
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Personalausweis').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Personalausweis')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bew. Personalausweis</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Personalausweis')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/80 bg-white/80 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Endet: {item.realtimeendDate}</a>
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Pflegewohngeld').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Pflegewohngeld')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bew. Pflegewohngeld</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Pflegewohngeld')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/80 bg-white/80 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Endet: {item.realtimeendDate}</a>
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Tabellenwohngeld').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Tabellenwohngeld')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bew. Tabellenwohngeld</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Tabellenwohngeld')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/80 bg-white/80 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Endet: {item.realtimeendDate}</a>
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'BewohnerGenehmigung').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'BewohnerGenehmigung')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bew. Genehmigung</b>
                {event
                  .filter((e) => e.katBezeichnung === 'BewohnerGenehmigung')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Von: {item.realtimestartDate}</a>
                      <a className="w-full truncate">Bis: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Schwerbehindertausweis').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Schwerbehindertausweis')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bew. Schwerbehindertausweis</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Schwerbehindertausweis')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/80 bg-white/80 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Endet: {item.realtimeendDate}</a>
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'BewohnerGenehmigung').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'BewohnerGenehmigung')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bew. Genehmigung</b>
                {event
                  .filter((e) => e.katBezeichnung === 'BewohnerGenehmigung')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Von: {item.realtimestartDate}</a>
                      <a className="w-full truncate">Bis: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Pflegevisite').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Pflegevisite')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Pflegevisite</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Pflegevisite')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Evaluierung').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Evaluierung')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Evaluierung</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Evaluierung')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Wundauswertung').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Wundauswertung')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Wundauswertung</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Wundauswertung')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Wundvermessung').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Wundvermessung')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Wundvermessung</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Wundvermessung')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Evaluierung Betreuung').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Evaluierung Betreuung')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Evaluierung Betreuung</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Evaluierung Betreuung')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Bradenskala').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Bradenskala')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Bradenskala</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Bradenskala')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Nortonskala').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Nortonskala')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Nortonskala</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Nortonskala')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen')[0]
                      .ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Dekubitusprophylaxemaßnahmen</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Dekubitusprophylaxemaßnahmen')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Sicherheitstechnische Kontrolle').length >
            0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Sicherheitstechnische Kontrolle')[0]
                      .ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Sicherheitstechnische Kontrolle</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Sicherheitstechnische Kontrolle')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
            {event.filter((e) => e.katBezeichnung === 'Evaluierung Kontraktur').length > 0 ? (
              <div
                style={{
                  background: `${adjustForMode(
                    event.filter((e) => e.katBezeichnung === 'Evaluierung Kontraktur')[0].ColorHex,
                    'dark'
                  )}`
                }}
                className="w-full p-1 flex flex-col items-start justify-start rounded-sm gap-y-1 border border-gray-800"
              >
                <b className="mb-2">Evaluierung Kontraktur</b>
                {event
                  .filter((e) => e.katBezeichnung === 'Evaluierung Kontraktur')
                  .map((item, index) => (
                    <div
                      title={item.titel}
                      key={'bname' + item + index}
                      className="w-full  p-2 py-1 dark:bg-white/60 bg-white/50 flex flex-col items-start justify-center rounded "
                    >
                      <a className="w-full truncate underline ">{item.titel}</a>
                      <a className="w-full truncate">Bew.: {item.Bewohner}</a>
                      <a className="w-full truncate">Nächste: {item.realtimeendDate}</a>
                      {item.Bemerkung != null ? (
                        <a className="w-full underline truncate mt-1">Bemerkung:</a>
                      ) : (
                        ''
                      )}
                      {item.Bemerkung != null ? (
                        <span className="text-wrap ">{item.Bemerkung}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventKategorien
