import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import { de } from 'date-fns/locale/de'
import { MdRepeat, MdTimelapse, MdTimer } from 'react-icons/md'
registerLocale('de-DE', de)
const RRuleFormSerienmuster = ({
  rruleterminfrequenz,
  rruleterminfrequenzaction,
  rruleterminwiederholungsmuster,
  rruleterminwiederholungsmusteraction,
  fullrruleterminjahr_jahrestage_tage_array_action
}) => {
  return (
    <div className="w-full grid grid-cols-4 gap-x-6 items-start justify-items-start dark:bg-gray-900 bg-white px-0  dark:text-white text-black text-sm font-[Arial]">
      <div className="w-full col-span-4 flex flex-row items-start justify-start dark:bg-blue-900/40 bg-blue-700/10 pl-2 py-0.5  border-b dark:border-gray-700 border-gray-400 mt-6 mb-2">
        Serienmuster
      </div>
      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6">
        <div className=" h-8 flex flex-row items-center justify-start mr-8">
          <a className="mr-3 text-sm">Muster:</a>
        </div>
        <div className="w-[60%] h-8">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              title="Muster"
              name="Muster"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
              placeholder="Muster"
              value={rruleterminfrequenz}
              onChange={(e) => {
                fullrruleterminjahr_jahrestage_tage_array_action([])
                rruleterminfrequenzaction(e.target.value)
              }}
            >
              <option value={'DAILY'} className="w-full dark:bg-gray-900">
                täglich
              </option>
              <option value={'WEEKLY'} className="w-full dark:bg-gray-900">
                wöchentlich
              </option>
              <option value={'MONTHLY'} className="w-full dark:bg-gray-900">
                monatlich
              </option>
              <option value={'YEARLY'} className="w-full dark:bg-gray-900">
                jährlich
              </option>
            </select>
            <MdTimer className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
          </label>
        </div>
      </div>
      <div className="w-full col-span-4 flex flex-row items-start justify-start mt-2 pl-6">
        <div className=" h-8 flex flex-row items-center justify-start">
          <a className="mr-3 text-sm">Wiederholungsmuster :</a>
        </div>
        <div className=" h-8 flex flex-row items-center justify-start">
          <a className="mr-3 text-sm">
            {rruleterminfrequenz == 'YEARLY'
              ? rruleterminwiederholungsmuster > 1
                ? 'Alle'
                : 'Jedes'
              : rruleterminfrequenz == 'MONTHLY'
                ? rruleterminwiederholungsmuster > 1
                  ? 'Alle'
                  : 'Jeden'
                : rruleterminfrequenz == 'WEEKLY'
                  ? rruleterminwiederholungsmuster > 1
                    ? 'Alle'
                    : 'Jede'
                  : rruleterminwiederholungsmuster > 1
                    ? 'Alle'
                    : 'Jeden'}
          </a>
        </div>
        <div className="w-32 h-8 mr-2">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <input
              title="Anzahl Wiederholungen (1 = Alle)"
              name="Anzahl"
              type="number"
              className=" w-full font-[arial]  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
              placeholder="Anzahl"
              value={rruleterminwiederholungsmuster}
              onChange={(e) => {
                rruleterminwiederholungsmusteraction(e.target.value)
              }}
            />
            <MdRepeat className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
          </label>
        </div>
        <div className=" h-8 flex flex-row items-center justify-start">
          <a className="mr-3 text-sm">
            {rruleterminfrequenz == 'YEARLY'
              ? rruleterminwiederholungsmuster > 1
                ? 'Jahre'
                : 'Jahr'
              : rruleterminfrequenz == 'MONTHLY'
                ? rruleterminwiederholungsmuster > 1
                  ? 'Monate'
                  : 'Monat'
                : rruleterminfrequenz == 'WEEKLY'
                  ? rruleterminwiederholungsmuster > 1
                    ? 'Wochen'
                    : 'Woche'
                  : rruleterminwiederholungsmuster > 1
                    ? 'Tage'
                    : 'Tag'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default RRuleFormSerienmuster
