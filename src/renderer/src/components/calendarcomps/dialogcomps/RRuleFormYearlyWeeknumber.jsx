import React, { useRef } from 'react'
import { MdClose } from 'react-icons/md'
const RRuleFormYearlyWeeknumber = ({
  rruleterminjahr_jahrestage_wochennummer_array,
  rruleterminjahr_jahrestage_wochennummer_array_action,
  rruleterminjahr_jahrestage_wochentage_array,
  rruleterminjahr_jahrestage_wochentage_array_action
}) => {
  const _yearlybyweekref = useRef('')
  const tage = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO']
  return (
    <>
      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-3">
        <div className=" h-8 flex flex-row items-center justify-start mr-8">
          <a className="mr-3 text-sm">Kalenderwoche:</a>
        </div>
        <div className="w-[28%] h-8">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              ref={_yearlybyweekref}
              title="Nach spezifischen Kalenderwochen"
              name="Kalenderwochen"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
              placeholder="Nach spezifischen Kalenderwochen"
            >
              {Array.from({ length: 53 }, (_, i) => i + 1).map((item, index) => (
                <option
                  key={'ywknb' + item + index}
                  value={item}
                  className="w-full dark:bg-gray-900"
                >
                  {item == 53
                    ? 'letzte Woche im Jahr (nur Jahre mit 53 Wochen)'
                    : item == 52
                      ? 'letzte Woche im Jahr (nur Jahre mit 52 Wochen)'
                      : item == 1
                        ? 'erste Woche im Jahr'
                        : item + '. Woche im Jahr'}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-32 text-xs flex flex-col items-center justify-center h-8">
          <button
            onClick={() =>
              rruleterminjahr_jahrestage_wochennummer_array_action(_yearlybyweekref.current.value)
            }
            className=" h-8 flex flex-row items-center px-2 justify-center dark:bg-blue-600 bg-blue-400/30 rounded-sm"
          >
            + Hinzufügen
          </button>
        </div>
      </div>
      <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2  dark:text-white text-black text-xs font-[Arial]">
        Spezifische Kalenderwochen im Jahr ({rruleterminjahr_jahrestage_wochennummer_array.length})
      </div>
      <div className="w-full col-span-4 flex flex-col items-start justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial] ">
        {rruleterminjahr_jahrestage_wochennummer_array.length > 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-xs divide-y dark:divide-gray-700 ring-1 ring-gray-700">
            {rruleterminjahr_jahrestage_wochennummer_array.map((item, index) => (
              <div key={'ywmmnb' + item + index} className="w-full text-left  py-1">
                <a className="mx-6">{index + 1}.</a>
                jede{' '}
                {item == 53
                  ? 'letzte Woche im Jahr (nur Jahre mit 53 Wochen)'
                  : item == 52
                    ? 'letzte Woche im Jahr (nur Jahre mit 52 Wochen)'
                    : item == 1
                      ? 'erste Woche im Jahr'
                      : item + '. Woche im Jahr'}
                <MdClose
                  onClick={() => rruleterminjahr_jahrestage_wochennummer_array_action(item)}
                  className="mx-6 float-right mt-0.5 cursor-pointer"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-1 text-xs ring-1 ring-gray-700">
            Keine Kalenderwochen vorhanden
          </div>
        )}
      </div>
      <div className="w-full col-span-4 h-8 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2   dark:text-white text-black text-sm font-[Arial]">
        <a className="mr-3 h-8">Wochentage:</a>
        <div className="w-[80%] h-8 grid grid-cols-7 items-start justify-items-start gap-1">
          {tage.map((item, index) => (
            <div
              key={'ywtndb' + item + index}
              onClick={() => rruleterminjahr_jahrestage_wochentage_array_action(item)}
              className={`w-full cursor-pointer flex flex-col items-center justify-center ring-1 ring-gray-700 ${rruleterminjahr_jahrestage_wochentage_array.includes(item) ? ' bg-blue-400/30 ' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RRuleFormYearlyWeeknumber
