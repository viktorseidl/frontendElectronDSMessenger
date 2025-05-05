import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import { de } from 'date-fns/locale/de'
import { MdRepeat, MdTimelapse, MdTimer } from 'react-icons/md'
import DauerOptionList from './DauerOptionList'
registerLocale('de-DE', de)
const RRuleFormTerminierung = ({
  rruleterminstartdatumzeit,
  rruleterminstartdatumzeitaction,
  rruleterminendetype,
  rruleterminendetypeaction,
  rruleterminendetypedatum,
  rruleterminendetypedatumaction,
  rruleterminendetypewiederholungen,
  rruleterminendetypewiederholungenaction,
  rruletermindauer,
  rruletermindaueraction
}) => {
  return (
    <div className="w-full grid grid-cols-4 gap-x-6 items-start justify-items-start dark:bg-gray-900 bg-white px-0  dark:text-white text-black text-sm font-[Arial]">
      <div className="w-full col-span-4 flex flex-row items-start justify-start dark:bg-blue-900/40 bg-blue-700/10 pl-2 py-0.5 border-b dark:border-gray-700 border-gray-400 mb-2 mt-2">
        Terminierung
      </div>
      <div className="w-full col-span-4 flex flex-row items-start justify-evenly">
        <div className="h-8 flex flex-row items-center justify-start">
          <a className="text-sm">
            Beginn <MdTimelapse className="text-sm inline ml-1" />
          </a>
        </div>
        <div className="w-36 h-8">
          <DatePicker
            placeholderText="TT.MM.YYYY"
            locale={de}
            timeIntervals={15}
            timeFormat="HH:mm"
            title="Terminierung"
            timeCaption="Zeit"
            closeOnScroll={true}
            dateFormat={'Pp'}
            showTimeSelect
            className=" w-full  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
            selected={rruleterminstartdatumzeit}
            onChange={(date) => rruleterminstartdatumzeitaction(date)}
          />
        </div>
        <div className="w-56 h-8">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              title="Kategorie"
              name="kategorie"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 text-sm"
              placeholder="Kategorie"
              value={rruleterminendetype}
              onChange={(e) => rruleterminendetypeaction(e.target.value)}
            >
              <option value={'NODATE'} className="w-full dark:bg-gray-900">
                Kein Enddatum...
              </option>
              <option value={'DATE'} className="w-full dark:bg-gray-900">
                Endet am: (Datum)
              </option>
              <option value={'REPEAT'} className="w-full dark:bg-gray-900">
                Endet nach: (Anzahl-Wiederholungen)
              </option>
            </select>
          </label>
        </div>
      </div>
      {rruleterminendetype != 'NODATE' && rruleterminendetype == 'DATE' ? (
        <>
          <div className="w-full col-span-4 flex flex-row items-start justify-start mt-2 pl-6">
            <div className=" h-8 flex flex-row items-center justify-start">
              <a className="mr-6 text-sm">Endet am:</a>
            </div>
            <div className="w-36 h-8">
              <DatePicker
                placeholderText="TT.MM.YYYY"
                locale={de}
                title="Terminierung"
                closeOnScroll={true}
                dateFormat={'P'}
                className=" w-full  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1   outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                selected={rruleterminendetypedatum}
                onChange={(date) => rruleterminendetypedatumaction(date)}
              />
            </div>
          </div>
        </>
      ) : rruleterminendetype != 'NODATE' && rruleterminendetype != 'DATE' ? (
        <>
          <div className="w-full col-span-4 flex flex-row items-start justify-start mt-2 pl-6">
            <div className=" h-8 flex flex-row items-center justify-start">
              <a className="mr-3 text-sm">Endet nach:</a>
            </div>
            <div className="w-56 h-8 mr-2">
              <label className="  w-full flex flex-col items-center justify-center relative">
                <input
                  title="Anzahl Wiederholungen (z.B.: 2)"
                  name="Anzahl"
                  type="number"
                  className=" w-full font-[arial]  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                  placeholder="Anzahl"
                  value={rruleterminendetypewiederholungen}
                  onChange={(e) => rruleterminendetypewiederholungenaction(e.target.value)}
                />
                <MdRepeat className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
              </label>
            </div>
            <div className=" h-8 flex flex-row items-center justify-start">
              <a className="mr-3 text-sm">
                {rruleterminendetypewiederholungen > 1 ? 'Wiederholungen' : 'Wiederholung'}
              </a>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
      <div className="w-full col-span-4 flex flex-row items-start justify-start pl-6 mt-2">
        <div className=" h-8 flex flex-row items-center justify-start mr-8">
          <a className="mr-3 text-sm">Dauer:</a>
        </div>
        <div className="w-[60%] h-8">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              title="Kategorie"
              name="kategorie"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
              placeholder="Kategorie"
              value={rruletermindauer}
              onChange={(e) => rruletermindaueraction(e.target.value)}
            >
              <DauerOptionList />
            </select>
            <MdTimer className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
          </label>
        </div>
      </div>
    </div>
  )
}

export default RRuleFormTerminierung
