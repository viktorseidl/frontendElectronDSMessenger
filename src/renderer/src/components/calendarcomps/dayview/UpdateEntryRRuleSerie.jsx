import React, { Fragment, useEffect, useRef, useState } from 'react'
import imgs from './../../../assets/Logo.png'
import { MdClose, MdColorize, MdTimelapse } from 'react-icons/md'
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
import RRuleFormTerminierung from '../dialogcomps/RRuleFormTerminierung'
import RRuleFormSerienmuster from '../dialogcomps/RRuleFormSerienmuster'
import RRuleFormYearlyForms from '../dialogcomps/RRuleFormYearlyForms'
dayjs.extend(customParseFormat)
const UpdateEntryRRuleSerie = ({ show, close, title, kategorien, updateObject }) => {
  console.log(show, updateObject)
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
  const [rruleTerminStartDatumZeit, setRruleTerminStartDatumZeit] = useState(null)
  const [rruleTerminEndeType, setRruleTerminEndeType] = useState('NODATE')
  const [rruleTerminEndeTypeDatum, setRruleTerminEndeTypeDatum] = useState(null)
  const [rruleTerminEndeTypeWiederholungen, setRruleTerminEndeTypeWiederholungen] = useState(1)
  const [rruleTerminDauer, setRruleTerminDauer] = useState(1440)
  const [rruleTerminWiederholungsMuster, setRruleTerminWiederholungsMuster] = useState(1)
  const [rruleTerminFrequenz, setRruleTerminFrequenz] = useState('DAILY')
  const [rruleTerminJahresMuster, setRruleTerminJahresMuster] = useState('DATUM')
  const [
    rruleTerminJaehrlichJahresMusterDatum_MonateArray,
    setRruleTerminJaehrlichJahresMusterDatum_MonateArray
  ] = useState([])
  const [
    rruleTerminJaehrlichJahresMusterDatum_TageArray,
    setRruleTerminJaehrlichJahresMusterDatum_TageArray
  ] = useState([])
  const [
    rruleTerminJaehrlichJahresMusterJahrestag_TageArray,
    setRruleTerminJaehrlichJahresMusterJahrestag_TageArray
  ] = useState([])
  const [
    rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray,
    setRruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray
  ] = useState([])
  const [
    rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray,
    setRruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray
  ] = useState([])
  const [rruleTerminMonatMuster, setRruleTerminMonatMuster] = useState('DAY')
  const User = JSON.parse(util.decode64(window.sessionStorage.getItem('user')))

  const toggleRruleTerminJaehrlichMonateArray = (month) => {
    setRruleTerminJaehrlichJahresMusterDatum_MonateArray(
      (prevDays) =>
        prevDays.includes(month)
          ? prevDays.filter((d) => d !== month) // remove it
          : [...prevDays, month] // add it
    )
  }
  const toggleRruleTerminJaehrlichTageArray = (day) => {
    setRruleTerminJaehrlichJahresMusterDatum_TageArray(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const toggleRruleTerminMonatsTageWochenSpezifischArray = (day) => {
    setRruleTerminJaehrlichJahresMusterDatum_TageArray(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const toggleRruleTerminJahrestageArray = (day) => {
    setRruleTerminJaehrlichJahresMusterJahrestag_TageArray(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const toggleRruleTerminWochennummerArray = (day) => {
    setRruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
  const toggleDay = (day) => {
    setRruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // remove it
          : [...prevDays, day] // add it
    )
  }
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
  useEffect(() => {
    if (updateObject.betreff != null && updateObject.betreff.trim().length > 0) {
      setTerminBetreff(updateObject.betreff.trim())
    }
    if (updateObject.kategorie != 0) {
      setTerminKategorie(
        kategorien
          .filter((k) => parseInt(k.ID) === parseInt(updateObject.kategorie))[0]
          .kategoriename.trim()
      )
    }
    if (updateObject.VerwaltungPflege != null) {
      setTerminSichtbarkeit(updateObject.VerwaltungPflege)
    }
    if (
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
      const [year, month, day] = datePart.split('-').map(Number)
      const [hours, minutes, seconds] = timePart.split(':').map(Number)
      const dateAlarmStam = new Date(year, month - 1, day, hours, minutes)
      setTerminErinnerungDatum(dateAlarmStam)
    }
    if (updateObject.realtimestart != null && updateObject.realtimestartDate != null) {
      const [datePart, timePart] = [updateObject.realtimestartDate, updateObject.realtimestart]
      const [day, month, year] = datePart.split('.').map(Number)
      const [hours, minutes] = timePart.split(':').map(Number)
      const daterealstart = new Date(year, month - 1, day, hours, minutes)
      setRruleTerminStartDatumZeit(daterealstart)
    }
    if (updateObject.boxColor != null) {
      setTerminFarbe(updateObject.boxColor)
    }
    if (updateObject.endetyp != null) {
      setRruleTerminEndeType(updateObject.endetyp)
    }
    if (updateObject.endetyp == 'DATE' && updateObject.endetypdate != null) {
      const [datePart, timePart] = updateObject.endetypdate.split(' ')
      const [year, month, day] = datePart.split('-').map(Number)
      const [hours, minutes, seconds] = timePart.split(':').map(Number)
      const dateAlarmStam = new Date(year, month - 1, day, hours, minutes)
      setRruleTerminEndeTypeDatum(dateAlarmStam)
    }
    if (
      updateObject.endetyp == 'REPEAT' &&
      updateObject.endetyprepeats != null &&
      parseInt(updateObject.endetyprepeats) > 0
    ) {
      setRruleTerminEndeTypeWiederholungen(parseInt(updateObject.endetyprepeats))
    }
    if (updateObject.repeatfrequenz != null) {
      setRruleTerminFrequenz(updateObject.repeatfrequenz)
    }
    if (updateObject.repeatmuster != null) {
      setRruleTerminWiederholungsMuster(updateObject.repeatmuster)
    }
    if (parseInt(updateObject.zeitraum) > 0 && updateObject.zeitraum != null) {
      setRruleTerminDauer(parseInt(updateObject.zeitraum))
    }
    if (
      updateObject.repeatfrequenz == 'YEARLY' &&
      (updateObject.jahrmuster == 'DATUM' || updateObject.jahrmuster == 'WOCHENTAGMONAT') &&
      updateObject.bymontharray != null &&
      updateObject.bymontharray.length > 0
    ) {
      setRruleTerminJaehrlichJahresMusterDatum_MonateArray(updateObject.bymontharray)
    }
    if (
      updateObject.repeatfrequenz == 'YEARLY' &&
      updateObject.bymonthdayarray != null &&
      updateObject.bymonthdayarray.length > 0 &&
      updateObject.jahrmuster == 'DATUM'
    ) {
      setRruleTerminJaehrlichJahresMusterDatum_TageArray(updateObject.bymonthdayarray)
    }
    if (updateObject.repeatfrequenz == 'YEARLY') {
      setRruleTerminJahresMuster(updateObject.jahrmuster)
    }
    if (
      updateObject.repeatfrequenz == 'YEARLY' &&
      updateObject.bydayarray != null &&
      updateObject.bydayarray.length > 0 &&
      updateObject.jahrmuster == 'WOCHENTAGMONAT'
    ) {
      setRruleTerminJaehrlichJahresMusterDatum_TageArray(updateObject.bydayarray)
    }
    if (updateObject.repeatfrequenz == 'YEARLY') {
      setRruleTerminJahresMuster(updateObject.jahrmuster)
    }
    if (
      updateObject.repeatfrequenz == 'YEARLY' &&
      updateObject.byyeardayarray != null &&
      updateObject.byyeardayarray.length > 0 &&
      updateObject.jahrmuster == 'YEARDAY'
    ) {
      setRruleTerminJaehrlichJahresMusterJahrestag_TageArray(updateObject.byyeardayarray)
    }
    if (updateObject.repeatfrequenz == 'YEARLY') {
      setRruleTerminJahresMuster(updateObject.jahrmuster)
    }
    /*
    if (updateObject.realtimeend != null && updateObject.realtimeendDate != null) {
      const [datePart, timePart] = [updateObject.realtimeendDate, updateObject.realtimeend]
      const [day, month, year] = datePart.split('.').map(Number)
      const [hours, minutes] = timePart.split(':').map(Number)
      const daterealend = new Date(year, month - 1, day, hours, minutes)
      setStandardTerminEndeDatumZeit(daterealend)
    }*/
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
                <RRuleFormTerminierung
                  rruleterminstartdatumzeit={rruleTerminStartDatumZeit}
                  rruleterminstartdatumzeitaction={setRruleTerminStartDatumZeit}
                  rruleterminendetype={rruleTerminEndeType}
                  rruleterminendetypeaction={setRruleTerminEndeType}
                  rruleterminendetypedatum={rruleTerminEndeTypeDatum}
                  rruleterminendetypedatumaction={setRruleTerminEndeTypeDatum}
                  rruleterminendetypewiederholungen={rruleTerminEndeTypeWiederholungen}
                  rruleterminendetypewiederholungenaction={setRruleTerminEndeTypeWiederholungen}
                  rruletermindauer={rruleTerminDauer}
                  rruletermindaueraction={setRruleTerminDauer}
                />
                <RRuleFormSerienmuster
                  rruleterminfrequenz={rruleTerminFrequenz}
                  rruleterminfrequenzaction={setRruleTerminFrequenz}
                  rruleterminwiederholungsmuster={rruleTerminWiederholungsMuster}
                  rruleterminwiederholungsmusteraction={setRruleTerminWiederholungsMuster}
                  fullrruleterminjahr_jahrestage_tage_array_action={
                    setRruleTerminJaehrlichJahresMusterDatum_TageArray
                  }
                />
                <div className="w-full grid grid-cols-4 gap-x-6 items-start justify-items-start dark:bg-gray-900 bg-white px-0  dark:text-white text-black text-sm font-[Arial]">
                  {rruleTerminFrequenz == 'YEARLY' ? (
                    <RRuleFormYearlyForms
                      rruleterminjahresmuster={rruleTerminJahresMuster}
                      rruleterminjahresmusteraction={setRruleTerminJahresMuster}
                      rruleterminjahr_datum_monate_array={
                        rruleTerminJaehrlichJahresMusterDatum_MonateArray
                      }
                      rruleterminjahr_datum_monate_array_action={
                        toggleRruleTerminJaehrlichMonateArray
                      }
                      rruleterminjahr_datum_tage_array={
                        rruleTerminJaehrlichJahresMusterDatum_TageArray
                      }
                      rruleterminjahr_datum_tage_array_action={toggleRruleTerminJaehrlichTageArray}
                      rruleterminjahr_wochentage_monate_array={
                        rruleTerminJaehrlichJahresMusterDatum_MonateArray
                      }
                      rruleterminjahr_wochentage_monate_array_action={
                        toggleRruleTerminJaehrlichMonateArray
                      }
                      rruleterminjahr_wochentage_tage_array={
                        rruleTerminJaehrlichJahresMusterDatum_TageArray
                      }
                      rruleterminjahr_wochentage_tage_array_action={
                        toggleRruleTerminMonatsTageWochenSpezifischArray
                      }
                      rruleterminjahr_jahrestage_tage_array={
                        rruleTerminJaehrlichJahresMusterJahrestag_TageArray
                      }
                      rruleterminjahr_jahrestage_tage_array_action={
                        toggleRruleTerminJahrestageArray
                      }
                      fullrruleterminjahr_jahrestage_tage_array_action={
                        setRruleTerminJaehrlichJahresMusterDatum_TageArray
                      }
                      rruleterminjahr_jahrestage_wochennummer_array={
                        rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray
                      }
                      rruleterminjahr_jahrestage_wochennummer_array_action={
                        toggleRruleTerminWochennummerArray
                      }
                      rruleterminjahr_jahrestage_wochentage_array={
                        rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray
                      }
                      rruleterminjahr_jahrestage_wochentage_array_action={toggleDay}
                    />
                  ) : rruleTerminFrequenz == 'MONTHLY' ? (
                    <>
                      {/*<RRuleFormMonthlyForms
                          rruleterminmonatmuster={rruleTerminMonatMuster}
                          rruleterminmonatmuster_action={setRruleTerminMonatMuster}
                          rruleterminmonat_datum_tage_array_action={
                            toggleRruleTerminJaehrlichTageArray
                          }
                          rruleterminmonat_wochentage_tage_array={
                            rruleTerminJaehrlichJahresMusterDatum_TageArray
                          }
                          rruleterminmonat_wochentage_tage_array_action={
                            toggleRruleTerminMonatsTageWochenSpezifischArray
                          }
                          rruleterminmonat_reset_tagearray_action={resetMonatTageArr}
                        />*/}
                    </>
                  ) : rruleTerminFrequenz == 'WEEKLY' ? (
                    <>
                      {/*<RRuleFormWeeklyForms
                          rruleterminwoche_tage_array={
                            rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray
                          }
                          rruleterminwoche_tage_array_action={toggleDay}
                        />*/}
                    </>
                  ) : (
                    ''
                  )}
                  <div className="w-full col-span-4 flex flex-row items-center justify-start dark:bg-gray-900 bg-white px-6 mt-2  dark:text-white text-black text-sm font-[Arial]">
                    <label className="  w-full flex flex-col items-center justify-center relative">
                      <input
                        title="Farbe"
                        name="hexcolor"
                        className=" w-full h-8 font-[arial]  dark:placeholder:text-blue-200/60 bg-[#edeae9] dark:text-white dark:hover:bg-gray-800 hover:bg-blue-200/40 placeholder:text-gray-500 rounded text-gray-800 dark:bg-gray-900 ring-1 dark:ring-gray-700 ring-gray-400   outline-none py-1 px-3 pl-14 text-sm"
                        type="color"
                        placeholder="Betreff"
                        value={terminFarbe}
                        onChange={(e) => setTerminFarbe(e.target.value)}
                      />
                      <MdColorize className="absolute inset left-4 text-lg top-[0.55rem] dark:text-blue-200/60 text-gray-900/40 " />
                      <MdClose
                        onClick={() => 'handleFilterChange("Betrefftxt", "")'}
                        className={
                          'absolute hidden cursor-pointer inset right-3 text-2xl top-[0.1rem] text-gray-500 hover:text-gray-400'
                        }
                      />
                    </label>
                  </div>
                  {/*<RRuleFormZusammenfassung
                        rruleTerminStartDatumZeit={rruleTerminStartDatumZeit}
                        rruleTerminEndeType={rruleTerminEndeType}
                        rruleTerminEndeTypeDatum={rruleTerminEndeTypeDatum}
                        rruleTerminDauer={rruleTerminDauer}
                        rruleTerminFrequenz={rruleTerminFrequenz}
                        rruleTerminWiederholungsMuster={rruleTerminWiederholungsMuster}
                        rruleTerminJahresMuster={rruleTerminJahresMuster}
                        rruleTerminJaehrlichJahresMusterDatum_MonateArray={
                          rruleTerminJaehrlichJahresMusterDatum_MonateArray
                        }
                        rruleTerminJaehrlichJahresMusterDatum_TageArray={
                          rruleTerminJaehrlichJahresMusterDatum_TageArray
                        }
                        rruleTerminJaehrlichJahresMusterJahrestag_TageArray={
                          rruleTerminJaehrlichJahresMusterJahrestag_TageArray
                        }
                        rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray={
                          rruleTerminJaehrlichJahresMusterJahrestag_WochennummerArray
                        }
                        rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray={
                          rruleTerminJaehrlichJahresMusterJahrestag_WochenTageArray
                        }
                        rruleTerminMonatMuster={rruleTerminMonatMuster}
                      />*/}
                  <div className="w-full col-span-4 flex flex-row items-center justify-end dark:bg-gray-900 bg-white px-6 my-6  dark:text-white text-black text-sm font-[Arial]">
                    <button
                      onClick={(e) => 'terminSpeichernSerie()'}
                      className={`px-4 py-2 mb-2 rounded-sm dark:bg-gray-800 bg-gray-300/60 dark:hover:bg-gray-700 hover:bg-gray-100 outline-none ring-1 dark:ring-gray-700 ring-gray-400/80 dark:text-gray-300 text-gray-800`}
                    >
                      Eintrag speichern
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UpdateEntryRRuleSerie
