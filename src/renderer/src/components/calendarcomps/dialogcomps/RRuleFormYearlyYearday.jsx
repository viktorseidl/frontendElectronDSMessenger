import React, { useRef } from 'react'
import { MdClose } from 'react-icons/md'
const RRuleFormYearlyYearday = ({
  rruleterminjahr_jahrestage_tage_array,
  rruleterminjahr_jahrestage_tage_array_action
}) => {
  const _yearlybydayref = useRef('')
  return (
    <>
      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-3">
        <div className=" h-8 flex flex-row items-center justify-start mr-8">
          <a className="mr-3 text-sm">Kalendertag:</a>
        </div>
        <div className="w-[28%] h-8">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              ref={_yearlybydayref}
              title="Nach spezifischen Wochentag"
              name="Wochentag"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
              placeholder="Nach spezifischen Wochentag"
            >
              {Array.from({ length: 366 }, (_, i) => i + 1).map((item, index) => (
                <option
                  key={'jahrtagss' + item + index}
                  value={item}
                  className="w-full dark:bg-gray-900"
                >
                  {item == 366
                    ? 'letzte Tag im Jahr (nur an Schaltjahre)'
                    : item == 365
                      ? 'letzte Tag im Jahr (nicht an Schaltjahre)'
                      : item == 1
                        ? 'erste Tag im Jahr'
                        : item + ' Tag im Jahr'}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-32 text-xs flex flex-col items-center justify-center h-8">
          <button
            onClick={() =>
              rruleterminjahr_jahrestage_tage_array_action(_yearlybydayref.current.value)
            }
            className=" h-8 flex flex-row items-center px-2 justify-center dark:bg-blue-600 bg-blue-400/30 rounded-sm"
          >
            + Hinzufügen
          </button>
        </div>
      </div>
      <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2  dark:text-white text-black text-xs font-[Arial]">
        Spezifische Kalendertage im Jahr ({rruleterminjahr_jahrestage_tage_array.length})
      </div>
      <div className="w-full col-span-4 flex flex-col items-start justify-start dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial] ">
        {rruleterminjahr_jahrestage_tage_array.length > 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-xs divide-y dark:divide-gray-700 ring-1 ring-gray-700">
            {rruleterminjahr_jahrestage_tage_array.map((item, index) => (
              <div key={'yyld' + item + index} className="w-full text-left  py-1">
                <a className="mx-6">{index + 1}.</a>
                jeder{' '}
                {item == 366
                  ? 'letzte Tag im Jahr (nur an Schaltjahre)'
                  : item == 365
                    ? 'letzte Tag im Jahr (nicht an Schaltjahre)'
                    : item == 1
                      ? 'erste Tag im Jahr'
                      : item + '. Tag im Jahr'}
                <MdClose
                  onClick={() => rruleterminjahr_jahrestage_tage_array_action(item)}
                  className="mx-6 float-right mt-0.5 cursor-pointer"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-1 text-xs ring-1 ring-gray-700">
            Keine Kalendertage vorhanden
          </div>
        )}
      </div>
    </>
  )
}

export default RRuleFormYearlyYearday
