import React, { useRef } from 'react'
import { MdClose } from 'react-icons/md'
const RRuleFormMonthlyWeekday = ({
  rruleterminmonat_wochentage_tage_array,
  rruleterminmonat_wochentage_tage_array_action
}) => {
  const _monthbydayrefOrdinary = useRef('')
  const _monthbydayrefWeekday = useRef('')
  const tagename = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO']
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
      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
        <div className=" h-8 flex flex-row items-center justify-start mr-8">
          <a className="mr-3 text-sm">Jeder:</a>
        </div>
        <div className="w-[28%] h-8 mr-2">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              ref={_monthbydayrefOrdinary}
              title="Nach spezifischen Wochentag"
              name="Wochentag"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
              placeholder="Nach spezifischen Wochentag"
            >
              {ordinals.map((item, index) => (
                <option value={item.value} className="w-full dark:bg-gray-900">
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-[28%] h-8">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              ref={_monthbydayrefWeekday}
              title="Nach spezifischen Wochentag"
              name="Wochentag"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
              placeholder="Nach spezifischen Wochentag"
            >
              {tagename.map((item, index) => (
                <option value={item} className="w-full dark:bg-gray-900">
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
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-32 text-xs flex flex-col items-center justify-center h-8">
          <button
            onClick={() =>
              rruleterminmonat_wochentage_tage_array_action(
                _monthbydayrefOrdinary.current.value + ':' + _monthbydayrefWeekday.current.value
              )
            }
            className=" h-8 flex flex-row items-center px-2 justify-center dark:bg-blue-600 bg-blue-400/30 rounded-sm"
          >
            + Hinzufügen
          </button>
        </div>
      </div>
      <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-xs font-[Arial]">
        Spezifische Wochentage im Monat ({rruleterminmonat_wochentage_tage_array.length})
      </div>
      <div className="w-full col-span-4 flex flex-col items-start justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial] ">
        {rruleterminmonat_wochentage_tage_array.length > 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-xs divide-y dark:divide-gray-700 ring-1 ring-gray-700">
            {console.log(rruleterminmonat_wochentage_tage_array)}
            {rruleterminmonat_wochentage_tage_array.map((item, index) => (
              <div className="w-full text-left  py-1">
                <a className="mx-6">{index + 1}.</a>
                jeder {ordinals.find((o) => o.value == item.split(':')[0])?.label}{' '}
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
                            : 'Sonntag'}
                <MdClose
                  onClick={() => rruleterminmonat_wochentage_tage_array_action(item)}
                  className="mx-6 float-right mt-0.5 cursor-pointer"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-1 text-xs ring-1 ring-gray-700">
            Keine Tage vorhanden
          </div>
        )}
      </div>
    </>
  )
}

export default RRuleFormMonthlyWeekday
