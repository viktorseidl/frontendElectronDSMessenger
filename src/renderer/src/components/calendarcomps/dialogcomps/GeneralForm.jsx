import { util } from 'node-forge'
import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import Switch from './Switch'
import { de } from 'date-fns/locale/de'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { MdDone, MdError, MdEvent, MdNote, MdPerson3, MdPublic, MdPublicOff } from 'react-icons/md'
registerLocale('de-DE', de)
const GeneralForm = ({
  kategorien,
  terminbetreff,
  terminbetreffaction,
  terminkategorie,
  terminkategorieaction,
  terminsichtbarkeit,
  terminsichtbarkeitaction,
  terminwohnbereich,
  terminwohnbereichaction,
  terminbemerkung,
  terminbemerkungaction,
  terminerinnerungswitch,
  terminerinnerungswitchaction,
  terminerinnerungdatum,
  terminerinnerungdatumaction,
  iserror,
  errorarray,
  issuccess
}) => {
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const Bereiche = JSON.parse(util.decode64(window.sessionStorage.getItem('userWohnbereiche')))
  useEffect(() => {}, [iserror])
  return (
    <>
      <div className="w-full grid grid-cols-10 items-start justify-items-start dark:bg-gray-950 bg-gray-200 border-b dark:border-gray-800 border-gray-300 px-6 py-2 dark:text-white text-black text-xs font-[Arial]">
        <div className="w-full col-span-1  h-full flex flex-row items-center justify-center ">
          <MdPerson3 />
        </div>
        <div className="col-span-8 w-full">
          {(User.usertypeVP == 'P'
            ? 'Benutzer: System - Pflege'
            : 'Benutzer: System - Verwaltung') +
            ' - ' +
            (User.Gruppe != null ? User.Gruppe + ' - ' : '') +
            User.Name +
            ' - ' +
            User.Mitarbeitername}
        </div>
      </div>
      {iserror ? (
        <div className="w-full flex flex-col items-center justify-start dark:bg-gray-900 bg-white px-6 py-2 pt-2 dark:text-white text-black text-sm font-[Arial]">
          <div className="w-full px-2 py-1 dark:bg-red-700 bg-red-600 rounded-sm text-xs text-white flex flex-col items-start justify-start">
            <div className="w-full border-b flex flex-row items-center justify-start border-white">
              <MdError className="inline mr-2" /> ERROR
            </div>
            <ul className="w-full list-disc list-inside mt-1">
              {errorarray.length > 0 &&
                errorarray.map((item, index) => (
                  <li key={'errormessagestxt' + index + item}>{item}</li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        ''
      )}
      {issuccess ? (
        <div className="w-full flex flex-col items-center justify-start dark:bg-gray-900 bg-white px-6 py-2 pt-2 dark:text-white text-black text-sm font-[Arial]">
          <div className="w-full px-2 py-1 dark:bg-lime-700 bg-lime-600 rounded-sm text-xs text-white flex flex-col items-start justify-start">
            <div className="w-full flex flex-row items-center justify-start">
              <MdDone className="inline mr-2" /> Eintrag wurde gespeichert.
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="w-full flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2 pt-2 dark:text-white text-black text-sm font-[Arial]">
        <label className="  w-full flex flex-col items-center justify-center relative">
          <input
            title="Betreff des Termins"
            name="title"
            className=" w-full font-[arial]  h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
            placeholder="Betreff des Termins"
            value={terminbetreff}
            onChange={(e) => terminbetreffaction(e.target.value)}
          />
          <MdEvent className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
        </label>
      </div>
      <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
        <div className="w-[30%] h-8 flex flex-row items-center justify-start">
          <a className="mr-2.5 text-sm">Kategorie</a>
        </div>
        <div className="w-[70%] h-8 flex flex-row items-center justify-start">
          <label className="  w-full flex flex-col items-center justify-center relative">
            <select
              title="Kategorie"
              name="kategorie"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
              placeholder="Kategorie"
              value={terminkategorie}
              onChange={(e) => terminkategorieaction(e.target.value)}
            >
              <option className="w-full dark:bg-gray-900">Privater Eintrag</option>
              {kategorien.length > 0 &&
                kategorien.map((item, index) => (
                  <option key={'kategorienmap' + item + index} className="w-full dark:bg-gray-900">
                    {item.bezeichnung}
                  </option>
                ))}
            </select>
            <IoIosInformationCircleOutline className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
          </label>
        </div>
      </div>
      <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
        <div className="w-[30%] h-8 flex flex-row items-center justify-start">
          <a className="mr-2.5 text-sm">Sichtbarkeit</a>
        </div>
        <div className="w-[70%] h-8 flex flex-row items-center justify-start">
          <label className=" w-full flex flex-col items-center justify-center relative">
            <select
              title="Sichtbarkeit"
              name="title"
              className=" w-full font-[arial]  h-8 dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
              value={terminsichtbarkeit}
              onChange={(e) => terminsichtbarkeitaction(e.target.value)}
            >
              <option value={'ME'}>Privat</option>
              <option value={'PUB'}>Öffentlich (Pflege + Verwaltung)</option>
              <option value={'P'}>Pflege</option>
              <option value={'V'}>Verwaltung</option>
            </select>
            {terminsichtbarkeit != 'ME' ? (
              <MdPublic className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
            ) : (
              <MdPublicOff className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
            )}
          </label>
        </div>
      </div>
      {terminsichtbarkeit == 'P' ? (
        <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 py-2 dark:text-white text-black text-sm font-[Arial]">
          <div className="w-[30%] h-8 flex flex-row items-center justify-start">
            <a className="mr-2.5 text-sm">Wohnbereich</a>
          </div>
          <div className="w-[70%] h-8 flex flex-row items-center justify-start">
            <label className="w-full flex flex-col items-center justify-center relative">
              <select
                title="Sichtbarkeit"
                name="title"
                className=" w-full  h-8 font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
                value={terminwohnbereich}
                onChange={(e) => terminwohnbereichaction(e.target.value)}
              >
                <option key={'BDaalle'} value={'null'}>
                  Alle Bereiche
                </option>
                {Bereiche.length > 0 &&
                  Bereiche.map((item, index) => (
                    <option
                      key={'BerDa' + item + index}
                      value={item.Hausname + ':X:' + item.Station}
                    >
                      {item.Hausname} {item.Station}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="w-full flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 py-2 pt-2 dark:text-white text-black text-sm font-[Arial]">
        <label className="  w-full flex flex-col items-center justify-center relative">
          <textarea
            title="Notiz hinzufügen"
            className="resize-none w-full font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 h-16 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-2 px-3 pl-14 text-sm"
            placeholder="Notiz hinzufügen ..."
            value={terminbemerkung !== undefined ? terminbemerkung : ''}
            onChange={(e) => terminbemerkungaction(e.target.value)}
          />
          <MdNote className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
        </label>
      </div>
      <div className="w-full flex flex-row items-start justify-start dark:bg-gray-900 bg-white px-6 pt-2 dark:text-white text-black text-sm font-[Arial]">
        <div className="w-[30%] h-8 flex flex-row items-center justify-start">
          <a className="mr-2.5 text-sm">Erinnerung</a>
          <Switch setter={terminerinnerungswitchaction} wert={terminerinnerungswitch} />
        </div>
        <div className="w-[70%] h-8 flex flex-row items-center justify-start">
          {terminerinnerungswitch == true ? (
            <div className="w-full flex flex-row items-start justify-start ">
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
                className=" w-full ml-2 h-8  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 outline-none shadow-gray-700/25   dark:ring-gray-700 ring-gray-400 py-2 px-4 text-sm"
                selected={terminerinnerungdatum}
                onChange={(date) => terminerinnerungdatumaction(date)}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

export default GeneralForm
