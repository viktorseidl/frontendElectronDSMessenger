import React, { Fragment, useEffect, useRef, useState } from 'react'
import imgs from './../../../assets/Logo.png'
import { MdClose, MdTimelapse } from 'react-icons/md'
import { util } from 'node-forge'
import GeneralForm from './../dialogcomps/GeneralForm'
import { useFetchAuthAll } from '../../../services/useFetchAll'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import { de } from 'date-fns/locale/de'
registerLocale('de-DE', de)
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
const UpdateEntryStandard = ({ show, close, title, kategorien, updateObject }) => {
  console.log(updateObject)
  if (updateObject == null) return false
  const apache = localStorage.getItem('dbConfig')
    ? JSON.parse(util.decode64(JSON.parse(localStorage.getItem('dbConfig')).value)).localhost
    : 'localhost'
  const Bereiche = JSON.parse(util.decode64(window.sessionStorage.getItem('userWohnbereiche')))

  const _divRef = useRef('')
  /* Error_Handling */
  const [isError, setIsError] = useState(false)
  const [errorArray, setErrorArray] = useState([])
  const [success, setSuccess] = useState(false)
  /* General Data */
  const [terminBetreff, setTerminBetreff] = useState('')
  const [terminKategorie, setTerminKategorie] = useState('Privater Eintrag')
  const [terminSichtbarkeit, setTerminSichtbarkeit] = useState('ME')
  const [terminWohnbereich, setTerminWohnbereich] = useState(null)
  const [terminBemerkung, setTerminBemerkung] = useState(undefined)
  const [terminErinnerungSwitch, setTerminErinnerungSwitch] = useState(false)
  const [terminErinnerungDatum, setTerminErinnerungDatum] = useState(null)
  const [terminFarbe, setTerminFarbe] = useState('#72c4ff')
  /* Standard */
  const [standardTerminStartDatumZeit, setStandardTerminStartDatumZeit] = useState(null)
  const [standardTerminEndeDatumZeit, setStandardTerminEndeDatumZeit] = useState(null)

  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))

  const closer = (e) => {
    if (!e.target.closest("[aria-label='Ditab']")) {
      setTerminBetreff('')
      setTerminSichtbarkeit(false)
      setTerminBemerkung(null)
      setTerminFarbe('#72c4ff')
      setTerminErinnerungSwitch(false)
      close()
    }
  }
  const generalFieldCheck = () => {
    let Arr = []
    if (terminBetreff?.trim().length == 0 || terminBetreff?.trim().length > 250) {
      Arr.push(
        'Betreff: Bitte geben Sie einen Betreff für diesen Eintrag an, dieser darf nicht länger als 250 Zeichen sein'
      )
    }
    if (terminKategorie?.trim().length == 0) {
      Arr.push('Kategorie: Bitte geben Sie eine Kategorie für diesen Eintrag an')
    }
    if (
      !terminSichtbarkeit?.trim() == 'ME' ||
      !terminSichtbarkeit?.trim() == 'PUB' ||
      !terminSichtbarkeit?.trim() == 'V' ||
      !terminSichtbarkeit?.trim() == 'P'
    ) {
      Arr.push('Sichtbarkeit: Bitte geben Sie an wer diesen Eintrag sehen darf')
    }
    if (
      terminSichtbarkeit == 'P' &&
      !(terminWohnbereich === null || terminWohnbereich?.trim().length > 0)
    ) {
      Arr.push(
        'Wohnbereich: Bitte geben Sie an für welchen Wohnbereich oder Bereiche dieser Eintrag sichtbar sein darf'
      )
    }
    if (terminBemerkung !== undefined && terminBemerkung?.trim().length > 500) {
      Arr.push('Notiz: Es sind nur maximal 500 Zeichen für eine Notiz erlaubt.')
    }
    if (terminErinnerungSwitch !== false && terminErinnerungDatum == null) {
      Arr.push('Erinnerung: Bitte geben Sie Datum und Uhrzeit an.')
    }
    if (
      terminErinnerungSwitch !== false &&
      terminErinnerungDatum !== null &&
      new Date() > terminErinnerungDatum
    ) {
      Arr.push('Erinnerung: Das Datum liegt in der Vergangenheit.')
    }
    if (Arr.length > 0) {
      return [false, Arr]
    } else {
      return [true, Arr]
    }
  }
  const terminUpdate = async () => {
    setSuccess(false)
    setIsError(false)
    /* 1- Filter and Check GeneralData */
    const generalData = generalFieldCheck()
    /* 2- Filter and Check StandardData */
    let Arr = generalData[1]
    if (standardTerminStartDatumZeit === null) {
      Arr.push('Beginn: Bitte geben Sie ein Startdatum und Uhrzeit an.')
    }
    if (standardTerminEndeDatumZeit === null) {
      Arr.push('Endet am: Bitte geben Sie ein Endedatum und Uhrzeit an.')
    }
    if (
      standardTerminStartDatumZeit !== null &&
      standardTerminEndeDatumZeit !== null &&
      standardTerminStartDatumZeit > standardTerminEndeDatumZeit
    ) {
      Arr.push('Datumangaben (Beginn und Ende): Die Datumsangaben sind falsch.')
    }
    if (generalData[0] === false || Arr.length > 0) {
      setErrorArray(Arr)
      setIsError(true)
      _divRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      return false
    } else {
      /* START MAKING ENTRIES */
      let Obj = {
        terminID: updateObject.id,
        terminAnwender: User.Name,
        terminAnwenderTyp: User.usertypeVP,
        terminBetreff: terminBetreff,
        terminKategorie: terminKategorie,
        terminSichtbarkeit: terminSichtbarkeit,
        terminWohnbereich: terminWohnbereich,
        terminBemerkung: terminBemerkung == null ? '' : terminBemerkung,
        terminErinnerungSwitch: terminErinnerungSwitch,
        terminErinnerungDatum:
          terminErinnerungDatum !== null && terminErinnerungSwitch == true
            ? terminErinnerungDatum.toISOString()
            : null,
        standardTerminStartDatumZeit: standardTerminStartDatumZeit.toISOString(),
        standardTerminEndeDatumZeit: standardTerminEndeDatumZeit.toISOString()
      }

      const query = await useFetchAuthAll(
        'http://' + apache + '/electronbackend/index.php?path=updateStandardEventInKalendar',
        'ssdsdsd',
        'PUT',
        JSON.stringify(Obj),
        null
      )
      if (Array.isArray(query)) {
        //Fehler
        setErrorArray(query)
        setIsError(true)
        _divRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        return false
      } else if (query == true) {
        setErrorArray([])
        setIsError(false)
        setSuccess(true)
        _divRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          close()
        }, 2000)
      } else {
        setErrorArray([
          'Fehlgeschlagen: Der Eintrag konnte nicht gespeichert werde. Bitte prüfen Sie die Daten und versuchen es erneut.'
        ])
        setIsError(true)
        _divRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }
  useEffect(() => {
    console.log(updateObject)
    if (updateObject.titel != null && updateObject.titel.trim().length > 0) {
      setTerminBetreff(updateObject.titel.trim())
    }
    if (
      updateObject.kategorie === 0 ||
      updateObject.kategorie === null ||
      updateObject.kategorie === undefined
    ) {
      setTerminKategorie('Privater Eintrag')
    } else {
      setTerminKategorie(
        kategorien
          ?.filter((k) => parseInt(k.ID) == updateObject.kategorie)[0]
          .bezeichnung.trim() === undefined
          ? 'Privater Eintrag'
          : kategorien
              ?.filter((k) => parseInt(k.ID) == updateObject.kategorie)[0]
              .bezeichnung.trim()
      )
    }
    if (updateObject.isprivate == true) {
      setTerminSichtbarkeit('ME')
    } else if (updateObject.isprivate != true && updateObject.VerwaltungPflege == null) {
      setTerminSichtbarkeit('PUB')
    } else if (updateObject.isprivate != true && updateObject.VerwaltungPflege == 'P') {
      setTerminSichtbarkeit('P')
    } else if (updateObject.isprivate != true && updateObject.VerwaltungPflege == 'V') {
      setTerminSichtbarkeit('V')
    }
    if (
      updateObject.isprivate != true &&
      updateObject.VerwaltungPflege == 'P' &&
      updateObject.wohnbereich != null &&
      Bereiche.filter((v) => v.Station == updateObject.wohnbereich).length > 0
    ) {
      setTerminWohnbereich(
        Bereiche.filter((v) => v.Station == updateObject.wohnbereich)[0].Hausname +
          ':X:' +
          updateObject.wohnbereich
      )
    }
    if (updateObject.isNoteAttached != null) {
      setTerminBemerkung(updateObject.isNoteAttached)
    }
    if (updateObject.isAlarm == true && updateObject.isAlarmStamp != null) {
      setTerminErinnerungSwitch(true)
      const [datePart, timePart] = updateObject.isAlarmStamp.split(' ')
      const [day, month, year] = datePart.split('.').map(Number)
      const [hours, minutes] = timePart.split(':').map(Number)
      const dateAlarmStam = new Date(year, month - 1, day, hours, minutes)
      setTerminErinnerungDatum(dateAlarmStam)
    }
    if (updateObject.realtimestart != null && updateObject.realtimestartDate != null) {
      const [datePart, timePart] = [updateObject.realtimestartDate, updateObject.realtimestart]
      const [day, month, year] = datePart.split('.').map(Number)
      const [hours, minutes] = timePart.split(':').map(Number)
      const daterealstart = new Date(year, month - 1, day, hours, minutes)
      setStandardTerminStartDatumZeit(daterealstart)
    }
    if (updateObject.realtimeend != null && updateObject.realtimeendDate != null) {
      const [datePart, timePart] = [updateObject.realtimeendDate, updateObject.realtimeend]
      const [day, month, year] = datePart.split('.').map(Number)
      const [hours, minutes] = timePart.split(':').map(Number)
      const daterealend = new Date(year, month - 1, day, hours, minutes)
      setStandardTerminEndeDatumZeit(daterealend)
    }
  }, [show, updateObject])
  return (
    <Fragment>
      {show && (
        <div
          className="fixed inset-0 z-10  dark:bg-gray-600 bg-black dark:bg-opacity-50 bg-opacity-40 flex justify-center items-center"
          onClick={closer}
        >
          <div
            aria-label="Ditab"
            className="min-w-[30%] max-w-[35%] max-h-[85%] flex z-40 flex-col ring-1 ring-[#0c101b] dark:ring-[#1b243b] rounded-sm"
          >
            <div
              id="titlebar"
              className={
                'w-1/2 dark:bg-[#1b243b] bg-[#0c101b] flex flex-row items-center justify-between'
              }
            >
              <span className="font-[Arial] dark:text-white text-white text-sm flex flex-row items-center justify-center gap-x-2">
                <img src={imgs} className="w-10 h-2  " />
                {title}
              </span>
              <MdClose onClick={close} className="inline cursor-pointer" />
            </div>

            <div
              ref={_divRef}
              className="w-full h-[85%] overflow-auto flex flex-col scrollbar-thin scrollbar-thumb-gray-500  scrollbar-track-gray-200"
            >
              <GeneralForm
                terminbetreff={terminBetreff}
                terminbetreffaction={setTerminBetreff}
                terminkategorie={terminKategorie}
                terminkategorieaction={setTerminKategorie}
                kategorien={kategorien}
                terminsichtbarkeit={terminSichtbarkeit}
                terminsichtbarkeitaction={setTerminSichtbarkeit}
                terminwohnbereich={terminWohnbereich}
                terminwohnbereichaction={setTerminWohnbereich}
                terminbemerkung={terminBemerkung}
                terminbemerkungaction={setTerminBemerkung}
                terminerinnerungswitch={terminErinnerungSwitch}
                terminerinnerungswitchaction={setTerminErinnerungSwitch}
                terminerinnerungdatum={terminErinnerungDatum}
                terminerinnerungdatumaction={setTerminErinnerungDatum}
                iserror={isError}
                errorarray={errorArray}
                issuccess={success}
              />

              <div className="w-full dark:bg-gray-900 bg-white px-6  ">
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
                        selected={standardTerminStartDatumZeit}
                        onChange={(date) => setStandardTerminStartDatumZeit(date)}
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
                        selected={standardTerminEndeDatumZeit}
                        onChange={(date) => setStandardTerminEndeDatumZeit(date)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row items-center justify-end dark:bg-gray-900 bg-white px-6 py-2  dark:text-white text-black text-sm font-[Arial]">
                  <button
                    onClick={() => terminUpdate()}
                    className={`px-4 py-2 mb-2 rounded-sm dark:bg-gray-800 bg-gray-300/60 dark:hover:bg-gray-700 hover:bg-gray-100 outline-none ring-1 dark:ring-gray-700 ring-gray-400/80 dark:text-gray-300 text-gray-800`}
                  >
                    Eintrag speichern
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UpdateEntryStandard
