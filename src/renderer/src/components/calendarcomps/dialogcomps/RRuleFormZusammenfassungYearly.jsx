import React from 'react'

const RRuleFormZusammenfassungYearly = ({
  rruleTerminJahresMuster,
  rruleTerminJaehrlichJahresMusterDatum_MonateArray,
  rruleTerminJaehrlichJahresMusterDatum_TageArray,
  rruleTerminJaehrlichJahresMusterJahrestag_TageArray,
  rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray,
  rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray
}) => {
  const ordinals = [
    { label: 'erste', value: 1 },
    { label: 'zweite', value: 2 },
    { label: 'dritte', value: 3 },
    { label: 'vierte', value: 4 },
    { label: 'letzte', value: -1 },
    { label: 'vorletzte', value: -2 },
    { label: 'drittletzte', value: -3 }
  ]
  console.log()
  return (
    <>
      <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 ">
        <div className="w-full ">
          Terminmuster:{' '}
          {rruleTerminJahresMuster == 'DATUM'
            ? 'nach Datum'
            : rruleTerminJahresMuster == 'WOCHENTAGMONAT'
              ? 'nach spezifischen Wochentagen'
              : rruleTerminJahresMuster == 'YEARDAY'
                ? 'nach spezifischen Kalendertagen'
                : 'nach spezifische Kalenderwochen'}
        </div>
      </div>
      {rruleTerminJahresMuster == 'DATUM' ? (
        <>
          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 mb-1 ">
            <div className="w-full ">Datum:</div>
          </div>
          <div className="w-[100%] grid grid-cols-3 items-start justify-items-start ">
            <div className="w-full">
              {rruleTerminJaehrlichJahresMusterDatum_TageArray.length > 1
                ? 'An den Tagen'
                : 'Am Tag'}
              :
            </div>
            <div className="w-full col-span-2">
              {rruleTerminJaehrlichJahresMusterDatum_MonateArray.length > 1
                ? 'in den Monaten'
                : 'im Monat'}
              :
            </div>
            <div className="w-full flex flex-col items-start justify-start pl-4">
              <div className="w-full grid grid-cols-2">
                {rruleTerminJaehrlichJahresMusterDatum_TageArray.length > 0 ? (
                  rruleTerminJaehrlichJahresMusterDatum_TageArray.map((item, index) => (
                    <a key={'djahmtag' + item + index}>- {item}.</a>
                  ))
                ) : (
                  <a>Kein Datum vorhanden</a>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start  col-span-2 pl-4">
              <div className="w-full grid grid-cols-3">
                {rruleTerminJaehrlichJahresMusterDatum_MonateArray.length > 0 ? (
                  rruleTerminJaehrlichJahresMusterDatum_MonateArray.map((item, index) => (
                    <a key={'djahmtagss' + item + index}>
                      -{' '}
                      {item == 1
                        ? 'Januar'
                        : item == 2
                          ? 'Februar'
                          : item == 3
                            ? 'März'
                            : item == 4
                              ? 'April'
                              : item == 5
                                ? 'Mai'
                                : item == 6
                                  ? 'Juni'
                                  : item == 7
                                    ? 'Juli'
                                    : item == 8
                                      ? 'August'
                                      : item == 9
                                        ? 'September'
                                        : item == 10
                                          ? 'Oktober'
                                          : item == 11
                                            ? 'November'
                                            : 'Dezember'}
                    </a>
                  ))
                ) : (
                  <a>Kein Datum vorhanden</a>
                )}
              </div>
            </div>
          </div>
        </>
      ) : rruleTerminJahresMuster == 'WOCHENTAGMONAT' ? (
        <>
          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2 mb-1 ">
            <div className="w-full ">Nach spezifischen Wochentagen:</div>
          </div>
          <div className="w-[100%] grid grid-cols-3 items-start justify-items-start ">
            <div className="w-full">
              {rruleTerminJaehrlichJahresMusterDatum_TageArray.length > 1
                ? 'An den Wochentagen'
                : 'An dem Wochentag'}
              :
            </div>
            <div className="w-full col-span-2">
              {rruleTerminJaehrlichJahresMusterDatum_MonateArray.length > 1
                ? 'in den Monaten'
                : 'im Monat'}
              :
            </div>
            <div className="w-full flex flex-col items-start justify-start pl-4">
              {rruleTerminJaehrlichJahresMusterDatum_TageArray.length > 0 ? (
                rruleTerminJaehrlichJahresMusterDatum_TageArray.map((item, index) => (
                  <a key={'djahmtag' + item + index}>
                    - jeder{' '}
                    {typeof item === 'string' && item.includes(':')
                      ? ordinals.find((o) => o.value == item.split(':')[0])?.label
                      : ''}{' '}
                    {typeof item === 'string' && item.includes(':')
                      ? item.split(':')[1] == 'MO'
                        ? 'Montag'
                        : item.split(':')[1] == 'DI'
                          ? 'Dienstag'
                          : item.split(':')[1] == 'MI'
                            ? 'Mittwoch'
                            : item.split(':')[1] == 'DO'
                              ? 'Donnerstag'
                              : item.split(':')[1] == 'FR'
                                ? 'Freitag'
                                : item.split(':')[1] == 'SA'
                                  ? 'Samstag'
                                  : 'Sonntag'
                      : ''}
                  </a>
                ))
              ) : (
                <a>Kein Datum vorhanden</a>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-start pl-4 col-span-2">
              <div className="w-full grid grid-cols-3">
                {rruleTerminJaehrlichJahresMusterDatum_MonateArray.length > 0 ? (
                  rruleTerminJaehrlichJahresMusterDatum_MonateArray.map((item, index) => (
                    <a key={'djahmtagss' + item + index}>
                      -{' '}
                      {item == 1
                        ? 'Januar'
                        : item == 2
                          ? 'Februar'
                          : item == 3
                            ? 'März'
                            : item == 4
                              ? 'April'
                              : item == 5
                                ? 'Mai'
                                : item == 6
                                  ? 'Juni'
                                  : item == 7
                                    ? 'Juli'
                                    : item == 8
                                      ? 'August'
                                      : item == 9
                                        ? 'September'
                                        : item == 10
                                          ? 'Oktober'
                                          : item == 11
                                            ? 'November'
                                            : 'Dezember'}
                    </a>
                  ))
                ) : (
                  <a>Kein Datum vorhanden</a>
                )}
              </div>
            </div>
          </div>
        </>
      ) : rruleTerminJahresMuster == 'YEARDAY' ? (
        <>
          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2  mb-1">
            <div className="w-full ">Nach spezifischen Kalendertagen:</div>
          </div>
          <div className="w-[100%] grid grid-cols-1 items-start justify-items-start ">
            <div className="w-full">
              {rruleTerminJaehrlichJahresMusterDatum_TageArray.length > 1
                ? 'An den Kalendertagen'
                : 'An den Kalendertagen'}
              :
            </div>
            <div className="w-full flex flex-col items-start justify-start px-4">
              <div className="w-full grid grid-cols-2">
                {rruleTerminJaehrlichJahresMusterJahrestag_TageArray.length > 0 ? (
                  rruleTerminJaehrlichJahresMusterJahrestag_TageArray.map((item, index) => (
                    <a key={'djahmtag' + item + index}>
                      - jeder{' '}
                      {item == 366
                        ? 'letzte Tag im Jahr (nur an Schaltjahre)'
                        : item == 365
                          ? 'letzte Tag im Jahr (nicht an Schaltjahre)'
                          : item == 1
                            ? 'erste Tag im Jahr'
                            : item + '. Tag im Jahr'}
                    </a>
                  ))
                ) : (
                  <a>Kein Datum vorhanden</a>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2  mb-1">
            <div className="w-full ">Nach spezifischen Kalenderwochen:</div>
          </div>
          <div className="w-full grid grid-cols-2 items-start justify-items-start ">
            <div className="w-full">
              {rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray.length > 1
                ? 'An den Kalenderwochen'
                : 'An den Kalenderwochen'}
              :
            </div>
            <div className="w-full">
              {rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray.length > 1
                ? 'an den Wochentagen'
                : 'an den Wochentagen'}
              :
            </div>
            <div className="w-full flex flex-col items-start justify-start px-4">
              {rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray.length > 0 ? (
                rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray.map((item, index) => (
                  <a key={'djahmtagss' + item + index}>
                    - jede{' '}
                    {item == 53
                      ? 'letzte Woche im Jahr (nur Jahre mit 53 Wochen)'
                      : item == 52
                        ? 'letzte Woche im Jahr (nur Jahre mit 52 Wochen)'
                        : item == 1
                          ? 'erste Woche im Jahr'
                          : item + '. Woche im Jahr'}
                  </a>
                ))
              ) : (
                <a>Kein Datum vorhanden</a>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-start pl-4">
              <div className="w-full grid grid-cols-2">
                {rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray.length > 0 ? (
                  rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray.map((item, index) => (
                    <a key={'djahmtag' + item + index}>
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
                    </a>
                  ))
                ) : (
                  <a>Kein Datum vorhanden</a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default RRuleFormZusammenfassungYearly
