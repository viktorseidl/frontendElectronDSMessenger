import React from 'react'
import { formatDateTimeAlarmToStringEntryInterface } from './functionHandler'
import RRuleFormZusammenfassungYearly from './RRuleFormZusammenfassungYearly'
import RRuleFormZusammenfassungMontly from './RRuleFormZusammenfassungMontly'

const RRuleFormZusammenfassung = ({
  rruleTerminStartDatumZeit,
  rruleTerminEndeTypeDatum,
  rruleTerminEndeType,
  rruleTerminDauer,
  rruleTerminFrequenz,
  rruleTerminWiederholungsMuster,
  rruleTerminJahresMuster,
  rruleTerminJaehrlichJahresMusterDatum_MonateArray,
  rruleTerminJaehrlichJahresMusterDatum_TageArray,
  rruleTerminJaehrlichJahresMusterJahrestag_TageArray,
  rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray,
  rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray,
  rruleTerminMonatMuster
}) => {
  return (
    <>
      <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-blue-900/40 bg-blue-700/10 pl-2 py-0.5   border-b dark:border-gray-700 border-gray-400 mt-6 mb-2 dark:text-white text-black font-[Arial]">
        Zusammenfassung
      </div>
      <div className="w-full col-span-4 flex flex-col items-center justify-end dark:bg-gray-900 bg-white px-6 mt-0  dark:text-white text-black text-sm font-[Arial]">
        <div className="w-full flex flex-col items-start justify-start ring-1 dark:ring-gray-700 ring-gray-400 p-2 text-xs">
          <div className="w-full grid grid-cols-2 items-start justify-items-start ">
            <div className="w-full">
              Startet am:{' '}
              {rruleTerminStartDatumZeit != null
                ? formatDateTimeAlarmToStringEntryInterface(rruleTerminStartDatumZeit).split(' ')[0]
                : 'Kein Startdatum vorhanden'}
            </div>
            <div className="w-full">
              Endet:{' '}
              {rruleTerminEndeType == 'NODATE'
                ? 'Kein Enddatum'
                : rruleTerminEndeType == 'DATE'
                  ? rruleTerminEndeTypeDatum != null
                    ? formatDateTimeAlarmToStringEntryInterface(rruleTerminEndeTypeDatum).split(
                        ' '
                      )[0]
                    : 'Kein Enddatum vorhanden'
                  : ''}{' '}
            </div>
          </div>
          <div className="w-full grid grid-cols-2 items-start justify-items-start ">
            <div className="w-full">
              Uhrzeit:{' '}
              {rruleTerminStartDatumZeit != null
                ? formatDateTimeAlarmToStringEntryInterface(rruleTerminStartDatumZeit).split(' ')[1]
                : 'HH:MM'}
            </div>
            <div className="w-full">
              Dauer:{' '}
              {rruleTerminDauer == 1440
                ? 'ganztägig'
                : rruleTerminDauer / 60 < 1
                  ? `${rruleTerminDauer} Minuten`
                  : `${rruleTerminDauer / 60} Stunden`}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 ">
            <div className="w-full ">Serienmuster:</div>
          </div>
          <div className="w-full grid grid-cols-2 items-start justify-items-start ">
            <div className="w-full">
              Muster:{' '}
              {rruleTerminFrequenz == 'YEARLY'
                ? 'jährlich'
                : rruleTerminFrequenz == 'MONTHLY'
                  ? 'monatlich'
                  : rruleTerminFrequenz == 'WEEKLY'
                    ? 'wöchentlich'
                    : 'täglich'}
            </div>
            <div className="w-full">
              Wiederholungsmuster:{' '}
              {rruleTerminFrequenz == 'YEARLY'
                ? rruleTerminWiederholungsMuster > 1
                  ? `Alle ${rruleTerminWiederholungsMuster} Jahre`
                  : `jedes Jahr`
                : rruleTerminFrequenz == 'MONTHLY'
                  ? rruleTerminWiederholungsMuster > 1
                    ? `Alle ${rruleTerminWiederholungsMuster} Monate`
                    : `jeden Monat`
                  : rruleTerminFrequenz == 'WEEKLY'
                    ? rruleTerminWiederholungsMuster > 1
                      ? `Alle ${rruleTerminWiederholungsMuster} Wochen`
                      : `jede Woche`
                    : rruleTerminWiederholungsMuster > 1
                      ? `Alle ${rruleTerminWiederholungsMuster} Tage`
                      : `jeden Tag`}
            </div>
          </div>
          {rruleTerminFrequenz == 'YEARLY' ? (
            <RRuleFormZusammenfassungYearly
              rruleTerminJahresMuster={rruleTerminJahresMuster}
              rruleTerminJaehrlichJahresMusterDatum_MonateArray={
                rruleTerminJaehrlichJahresMusterDatum_MonateArray
              }
              rruleTerminJaehrlichJahresMusterDatum_TageArray={
                rruleTerminJaehrlichJahresMusterDatum_TageArray
              }
              rruleTerminJaehrlichJahresMusterJahrestag_TageArray={
                rruleTerminJaehrlichJahresMusterJahrestag_TageArray
              }
              rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray={
                rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray
              }
              rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray={
                rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray
              }
            />
          ) : rruleTerminFrequenz == 'WEEKLY' ? (
            <>
              <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2  mb-1 ">
                <div className="w-full ">Wochentage:</div>
              </div>
              <div className="w-full flex flex-col items-start justify-start pl-4">
                <div className="w-full grid grid-cols-2">
                  {rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray.length > 0 ? (
                    rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray.map((item, index) => (
                      <div className="w-full" key={'wkd' + item + index}>
                        -{' '}
                        {item == 'MO'
                          ? 'Montag'
                          : item == 'DI'
                            ? 'Dienstag'
                            : item == 'MI'
                              ? 'Mittwoch'
                              : item == 'DO'
                                ? 'Donnerstag'
                                : item == 'FR'
                                  ? 'Freitag'
                                  : item == 'SA'
                                    ? 'Samstag'
                                    : 'Sonntag'}
                      </div>
                    ))
                  ) : (
                    <div className="w-full">Keine Daten vorhanden</div>
                  )}
                </div>
              </div>
            </>
          ) : rruleTerminFrequenz == 'MONTHLY' ? (
            <RRuleFormZusammenfassungMontly
              rruleTerminMonatMuster={rruleTerminMonatMuster}
              rruleTerminJaehrlichJahresMusterDatum_TageArray={
                rruleTerminJaehrlichJahresMusterDatum_TageArray
              }
            />
          ) : (
            ''
          )}
          {/*<div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 ">
            <div className="w-full ">Farbe:</div>
          </div>
          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-1 pl-4 ">
            <div style={{ background: terminFarbe }} className="w-20 p-1 py-2"></div>
          </div>*/}
        </div>
      </div>
    </>
  )
}

export default RRuleFormZusammenfassung
