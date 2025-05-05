import React from 'react'
import { MdPattern } from 'react-icons/md'
import RRuleFormMonthlyWeekday from './RRuleFormMonthlyWeekday'
import RRuleFormMonthlyWeekDayNumber from './RRuleFormMonthlyWeekDayNumber'

const RRuleFormMonthlyForms = ({
  rruleterminmonatmuster,
  rruleterminmonatmuster_action,
  rruleterminmonat_datum_tage_array_action,
  rruleterminmonat_wochentage_tage_array,
  rruleterminmonat_wochentage_tage_array_action,
  rruleterminmonat_reset_tagearray_action
}) => {
  return (
    <>
      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
        <div className=" h-8 flex flex-row items-center justify-start mr-8">
          <a className="mr-3 text-sm">Muster des Termin:</a>
        </div>
        <div className="w-[60%] h-8">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              title="Muster"
              name="Muster"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
              placeholder="Muster"
              value={rruleterminmonatmuster}
              onChange={(e) => {
                rruleterminmonat_reset_tagearray_action()
                rruleterminmonatmuster_action(e.target.value)
              }}
            >
              <option value={'DAY'} className="w-full dark:bg-gray-900">
                spezifische Tage im Monat
              </option>
              <option value={'WEEKDAY'} className="w-full dark:bg-gray-900">
                Wochentag spezifisch im Monat
              </option>
            </select>
            <MdPattern className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
          </label>
        </div>
      </div>
      {rruleterminmonatmuster == 'DAY' ? (
        <RRuleFormMonthlyWeekDayNumber
          rruleterminmonat_datum_tage_array_action={rruleterminmonat_datum_tage_array_action}
          rruleterminmonat_wochentage_tage_array={rruleterminmonat_wochentage_tage_array}
        />
      ) : (
        <RRuleFormMonthlyWeekday
          rruleterminmonat_wochentage_tage_array={rruleterminmonat_wochentage_tage_array}
          rruleterminmonat_wochentage_tage_array_action={
            rruleterminmonat_wochentage_tage_array_action
          }
        />
      )}
    </>
  )
}

export default RRuleFormMonthlyForms
