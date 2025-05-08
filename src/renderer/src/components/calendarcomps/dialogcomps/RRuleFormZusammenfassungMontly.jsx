import React, { useEffect } from 'react'

const RRuleFormZusammenfassungMontly = ({
  rruleTerminMonatMuster,
  rruleTerminJaehrlichJahresMusterDatum_TageArray
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
  return (
    <>
      {rruleTerminMonatMuster == 'DAY' ? (
        <>
          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2   mb-1">
            <div className="w-full ">Spezifische Tage im Monat:</div>
          </div>
          <div className="w-full flex flex-col items-start justify-start pl-4">
            <div className="w-full grid grid-cols-2">
              {rruleTerminJaehrlichJahresMusterDatum_TageArray.length > 0 ? (
                rruleTerminJaehrlichJahresMusterDatum_TageArray.map((item, index) => (
                  <div key={'rzsmodnb' + item + index} className="w-full">
                    - jeden {item}. im Monat
                  </div>
                ))
              ) : (
                <div className="w-full">Keine vorhanden</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 items-start justify-items-start mt-2  mb-1">
            <div className="w-full ">Spezifische Wochentage im Monat:</div>
          </div>
          <div className="w-full flex flex-col items-start justify-start pl-4">
            <div className="w-full grid grid-cols-2">
              {rruleTerminJaehrlichJahresMusterDatum_TageArray.length > 0 ? (
                rruleTerminJaehrlichJahresMusterDatum_TageArray.map((item, index) => (
                  <div className="w-full">
                    - jeder {ordinals.find((o) => o.value == item.split(':')[0])?.label}{' '}
                    {item.split(':')[1] == 'MO'
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
                                : 'Sonntag'}{' '}
                    im Monat
                  </div>
                ))
              ) : (
                <div className="w-full">Keine vorhanden</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default RRuleFormZusammenfassungMontly
