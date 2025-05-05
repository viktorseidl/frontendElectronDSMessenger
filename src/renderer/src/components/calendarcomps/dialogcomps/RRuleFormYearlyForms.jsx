import React from 'react'
import { MdTimer } from 'react-icons/md'
import RRuleFormYearlyDatum from './RRuleFormYearlyDatum'
import RRuleFormYearlyWeekdayMonth from './RRuleFormYearlyWeekdayMonth'
import RRuleFormYearlyYearday from './RRuleFormYearlyYearday'
import RRuleFormYearlyWeeknumber from './RRuleFormYearlyWeeknumber'

const RRuleFormYearlyForms = ({
  rruleterminjahresmuster,
  rruleterminjahresmusteraction,
  rruleterminjahr_datum_monate_array,
  rruleterminjahr_datum_monate_array_action,
  rruleterminjahr_datum_tage_array,
  rruleterminjahr_datum_tage_array_action,
  rruleterminjahr_wochentage_monate_array,
  rruleterminjahr_wochentage_monate_array_action,
  rruleterminjahr_wochentage_tage_array,
  rruleterminjahr_wochentage_tage_array_action,
  fullrruleterminjahr_jahrestage_tage_array_action,
  rruleterminjahr_jahrestage_tage_array,
  rruleterminjahr_jahrestage_tage_array_action,
  rruleterminjahr_jahrestage_wochennummer_array,
  rruleterminjahr_jahrestage_wochennummer_array_action,
  rruleterminjahr_jahrestage_wochentage_array,
  rruleterminjahr_jahrestage_wochentage_array_action
}) => {
  return (
    <>
      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
        <div className=" h-8 flex flex-row items-center justify-start mr-8">
          <a className="mr-3 text-sm">Muster des Termin:</a>
        </div>
        <div className="w-[70%] h-8">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              title="Muster"
              name="Muster"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
              placeholder="Muster"
              value={rruleterminjahresmuster}
              onChange={(e) => {
                fullrruleterminjahr_jahrestage_tage_array_action([])
                rruleterminjahresmusteraction(e.target.value)
              }}
            >
              <option value={'DATUM'} className="w-full dark:bg-gray-900">
                Datum: [Monat][Tag]
              </option>
              <option value={'WOCHENTAGMONAT'} className="w-full dark:bg-gray-900">
                Spezifischer Wochentag: [erste][Wochentag] im [Monat]
              </option>
              <option value={'YEARDAY'} className="w-full dark:bg-gray-900">
                Spezifischer Kalendertag: [Zahl des Kalendertages]
              </option>
              <option value={'WEEKNUMBER'} className="w-full dark:bg-gray-900">
                Spezifische Kalenderwoche: [Kalenderwoche]
              </option>
            </select>
            <MdTimer className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
          </label>
        </div>
      </div>
      {rruleterminjahresmuster == 'DATUM' ? (
        <RRuleFormYearlyDatum
          rruleterminjahr_datum_monate_array={rruleterminjahr_datum_monate_array}
          rruleterminjahr_datum_monate_array_action={rruleterminjahr_datum_monate_array_action}
          rruleterminjahr_datum_tage_array={rruleterminjahr_datum_tage_array}
          rruleterminjahr_datum_tage_array_action={rruleterminjahr_datum_tage_array_action}
        />
      ) : rruleterminjahresmuster == 'WOCHENTAGMONAT' ? (
        <RRuleFormYearlyWeekdayMonth
          rruleterminjahr_wochentage_monate_array={rruleterminjahr_wochentage_monate_array}
          rruleterminjahr_wochentage_monate_array_action={
            rruleterminjahr_wochentage_monate_array_action
          }
          rruleterminjahr_wochentage_tage_array={rruleterminjahr_wochentage_tage_array}
          rruleterminjahr_wochentage_tage_array_action={
            rruleterminjahr_wochentage_tage_array_action
          }
        />
      ) : rruleterminjahresmuster == 'YEARDAY' ? (
        <RRuleFormYearlyYearday
          rruleterminjahr_jahrestage_tage_array={rruleterminjahr_jahrestage_tage_array}
          rruleterminjahr_jahrestage_tage_array_action={
            rruleterminjahr_jahrestage_tage_array_action
          }
        />
      ) : (
        <RRuleFormYearlyWeeknumber
          rruleterminjahr_jahrestage_wochennummer_array={
            rruleterminjahr_jahrestage_wochennummer_array
          }
          rruleterminjahr_jahrestage_wochennummer_array_action={
            rruleterminjahr_jahrestage_wochennummer_array_action
          }
          rruleterminjahr_jahrestage_wochentage_array={rruleterminjahr_jahrestage_wochentage_array}
          rruleterminjahr_jahrestage_wochentage_array_action={
            rruleterminjahr_jahrestage_wochentage_array_action
          }
        />
      )}
    </>
  )
}

export default RRuleFormYearlyForms
