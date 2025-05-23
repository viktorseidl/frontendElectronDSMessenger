import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

/// USED ON MONTH
export function formatGermanDateMonthView(dateString) {
  // Split the input date string into day, month, and year
  const [day, month, year] = dateString.split('.')

  // Create a Date object (note: months are 0-indexed in JavaScript)
  const date = new Date(year, month - 1, day)

  // Define options for toLocaleDateString
  const options = { month: 'long', year: 'numeric' }

  // Convert the date to the desired format using the German locale
  return date.toLocaleDateString('de-DE', options)
}
export const getShiftedDateMonthView = (goBack, dateString) => {
  const parsedDate = dayjs(dateString, 'DD.MM.YYYY')

  if (!parsedDate.isValid()) {
    throw new Error('Invalid date format. Expected format: DD.MM.YYYY')
  }

  const newDate = goBack ? parsedDate.subtract(1, 'month') : parsedDate.add(1, 'month')

  return newDate.format('DD.MM.YYYY')
}
export const getTodayDate = () => {
  return dayjs().format('DD.MM.YYYY')
}
export function filterOnKategorieShortener(events, filter) {
  return events.filter((e) => e.katBezeichnung === filter.toString()).length > 0
    ? events.filter((e) => e.katBezeichnung === filter.toString())
    : []
}
export function formatGermanDateMonthViewOnDay(dateString) {
  // Split the input date string into day, month, and year
  const [day, month, year] = dateString.split('.')

  // Create a Date object (note: months are 0-indexed in JavaScript)
  const date = new Date(year, month - 1, day)

  // Define options for toLocaleDateString
  const options = { month: 'long' }

  // Convert the date to the desired format using the German locale
  return date.toLocaleDateString('de-DE', options)
}
export function getGermanHolidays(year) {
  // Helper function to calculate Easter Sunday (Ostersonntag) using the "Computus" algorithm
  function getEasterSunday(y) {
    const a = y % 19
    const b = Math.floor(y / 100)
    const c = y % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const month = Math.floor((h + l - 7 * m + 114) / 31)
    const day = ((h + l - 7 * m + 114) % 31) + 1
    return new Date(y, month - 1, day)
  }

  // Get Easter Sunday
  const easterSunday = getEasterSunday(year)

  // Function to get a date relative to Easter Sunday
  function getRelativeHoliday(daysOffset, name) {
    const date = new Date(easterSunday)
    date.setDate(easterSunday.getDate() + daysOffset)
    return { ddate: date.toLocaleDateString('de-DE'), date: date, name: name }
  }

  // Fixed holidays
  const fixedHolidays = [
    {
      ddate: new Date(year, 0, 1).toLocaleDateString('de-DE'),
      date: new Date(year, 0, 1),
      name: 'Neujahr'
    },
    {
      ddate: new Date(year, 4, 1).toLocaleDateString('de-DE'),
      date: new Date(year, 4, 1),
      name: 'Tag der Arbeit'
    },
    {
      ddate: new Date(year, 9, 3).toLocaleDateString('de-DE'),
      date: new Date(year, 9, 3),
      name: 'Tag der Deutschen Einheit'
    },
    {
      ddate: new Date(year, 11, 25).toLocaleDateString('de-DE'),
      date: new Date(year, 11, 25),
      name: 'Erster Weihnachtstag'
    },
    {
      ddate: new Date(year, 11, 26).toLocaleDateString('de-DE'),
      date: new Date(year, 11, 26),
      name: 'Zweiter Weihnachtstag'
    }
  ]

  // Easter-based holidays
  const movableHolidays = [
    getRelativeHoliday(-2, 'Karfreitag'),
    getRelativeHoliday(0, 'Ostersonntag'),
    getRelativeHoliday(1, 'Ostermontag'),
    getRelativeHoliday(39, 'Christi Himmelfahrt'),
    getRelativeHoliday(49, 'Pfingstsonntag'),
    getRelativeHoliday(50, 'Pfingstmontag')
  ]

  // Combine all holidays
  const allHolidays = [...fixedHolidays, ...movableHolidays]
  // Convert to event objects
  const events = allHolidays.map((holiday, index) => ({
    id: `holiday-${index}`,
    titel: holiday.name,
    ddate:
      (parseInt(holiday.ddate.split('.')[0]) > 9
        ? parseInt(holiday.ddate.split('.')[0])
        : '0' + parseInt(holiday.ddate.split('.')[0])) +
      '.' +
      (parseInt(holiday.ddate.split('.')[1]) > 9
        ? parseInt(holiday.ddate.split('.')[1])
        : '0' + parseInt(holiday.ddate.split('.')[1])) +
      '.' +
      holiday.ddate.split('.')[2],
    time: 0, // Full-day event
    realtimestartDate:
      (parseInt(holiday.date.toISOString().split('T')[0].split('-')[2]) > 9
        ? parseInt(holiday.date.toISOString().split('T')[0].split('-')[2])
        : '0' + parseInt(holiday.date.toISOString().split('T')[0].split('-')[2])) +
      '.' +
      (parseInt(holiday.date.toISOString().split('T')[0].split('-')[1]) > 9
        ? parseInt(holiday.date.toISOString().split('T')[0].split('-')[1])
        : '0' + parseInt(holiday.date.toISOString().split('T')[0].split('-')[1])) +
      '.' +
      holiday.date.toISOString().split('T')[0].split('-')[0],
    realtimestart: '00:00',
    duration: 24 * 4,
    realtimeendDate:
      (parseInt(holiday.date.toISOString().split('T')[0].split('-')[2]) > 9
        ? parseInt(holiday.date.toISOString().split('T')[0].split('-')[2])
        : '0' + parseInt(holiday.date.toISOString().split('T')[0].split('-')[2])) +
      '.' +
      (parseInt(holiday.date.toISOString().split('T')[0].split('-')[1]) > 9
        ? parseInt(holiday.date.toISOString().split('T')[0].split('-')[1])
        : '0' + parseInt(holiday.date.toISOString().split('T')[0].split('-')[1])) +
      '.' +
      holiday.date.toISOString().split('T')[0].split('-')[0],
    realtimeend: '23:59',
    ColorHex: '#f5d902', // Gold color for holidays
    datum: holiday.date.toISOString().split('T')[0], // Format YYYY-MM-DD
    isNoteAttached: null,
    isEditable: false,
    isAlarm: false,
    isAlarmStamp: null,
    eventTyp: null,
    isprivate: false,
    ersteller: 'System',
    haus: null,
    wohnbereich: null,
    kategorie: 'holidays',
    katBezeichnung: 'Feiertag',
    katBackColor: null,
    katForeColor: null,
    VerwaltungPflege: null,
    isPublic: true
  }))

  return events
}
export function checkSeason(dateString) {
  // Split the input date string into day, month, and year
  const [year, month, day] = dateString.split('-')
  let result
  const holidaysDates = calculateHolidaysForImage(year)

  if ((month == 1 && day == 1) || (month == 12 && day == 31)) {
    result = 'newyear'
  } else if (month == 1 && day == 6) {
    result = 'threesaints'
  } else if (month == holidaysDates[0].split('-')[1] && day == holidaysDates[0].split('-')[2]) {
    result = 'eastern'
  } else if (month == holidaysDates[1].split('-')[1] && day == holidaysDates[1].split('-')[2]) {
    result = 'eastern'
  } else if (month == holidaysDates[2].split('-')[1] && day == holidaysDates[2].split('-')[2]) {
    result = 'christihimmel'
  } else if (month == holidaysDates[3].split('-')[1] && day == holidaysDates[3].split('-')[2]) {
    result = 'pfingsten'
  } else if (month == holidaysDates[4].split('-')[1] && day == holidaysDates[4].split('-')[2]) {
    result = 'pfingsten'
  } else if (month == 5 && day == 1) {
    result = 'tagarbeit'
  } else if (month == 10 && day == 31) {
    result = 'halloween'
  } else if (month == 10 && day == 3) {
    result = 'tageinheit'
  } else if (month == 12 && day == 24) {
    result = 'christmas'
  } else if (month == 12 && day == 25) {
    result = 'christmas'
  } else if (month == 12 && day == 26) {
    result = 'christmas'
  } else if (month > 1 && month < 6) {
    result = 'spring'
  } else if (month > 5 && month < 10) {
    result = 'summer'
  } else if (month > 9 && month < 12) {
    result = 'autmn'
  } else {
    result = 'winter'
  }
  return result
}
function calculateHolidaysForImage(year) {
  // Calculate Easter Sunday using the Meeus/Jones/Butcher algorithm
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1

  // Create a Date object for Easter Sunday
  const easterSunday = new Date(year, month - 1, day)

  // Calculate Easter Monday (1 day after Easter Sunday)
  const easterMonday = new Date(easterSunday)
  easterMonday.setDate(easterSunday.getDate() + 1)

  // Calculate Christi Himmelfahrt (39 days after Easter Sunday)
  const christiHimmelfahrt = new Date(easterSunday)
  christiHimmelfahrt.setDate(easterSunday.getDate() + 39)
  /**
 * getRelativeHoliday(49 + 1, 'Pfingstsonntag'),
    getRelativeHoliday(50 + 1, 'Pfingstmontag')
 */
  const pfingstenSonntag = new Date(easterSunday)
  pfingstenSonntag.setDate(easterSunday.getDate() + 49)

  const pfingstenMontag = new Date(easterSunday)
  pfingstenMontag.setDate(easterSunday.getDate() + 50)

  // Format dates as YYYY-MM-DD
  const formatDate = (date) => {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }
  // Return the dates in an array
  return [
    formatDate(easterSunday),
    formatDate(easterMonday),
    formatDate(christiHimmelfahrt),
    formatDate(pfingstenSonntag),
    formatDate(pfingstenMontag)
  ]
}
