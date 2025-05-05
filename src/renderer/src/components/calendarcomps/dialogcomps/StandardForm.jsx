import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import { de } from 'date-fns/locale/de'
import { MdTimelapse } from 'react-icons/md'
registerLocale('de-DE', de)
const StandardForm = ({
  terminstartdatumzeit,
  terminstartdatumzeitaction,
  terminendedatumzeit,
  terminendedatumzeitaction,
  terminspeichernstandard
}) => {
  return (
    <>
      <div className="w-full grid grid-cols-4 gap-x-6 items-start justify-items-start dark:bg-gray-900 bg-white px-0 py-2 dark:text-white text-black text-sm font-[Arial]">
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
              selected={terminstartdatumzeit}
              onChange={(date) => terminstartdatumzeitaction(date)}
            />
          </div>

          <div className="h-8 flex flex-row items-center justify-start">
            <a className="text-sm">
              Endet am <MdTimelapse className="text-sm inline ml-1" />
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
              selected={terminendedatumzeit}
              onChange={(date) => terminendedatumzeitaction(date)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-end dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial]">
        <button
          onClick={() => terminspeichernstandard()}
          className={`px-4 py-2 mb-2 rounded-sm dark:bg-gray-800 bg-gray-300/60 dark:hover:bg-gray-700 hover:bg-gray-100 outline-none ring-1 dark:ring-gray-700 ring-gray-400/80 dark:text-gray-300 text-gray-800`}
        >
          Eintrag speichern
        </button>
      </div>
    </>
  )
}

export default StandardForm
