import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

//USED ON DAILY
export function getGermanHolidaysDay(year) {
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
    return { date, name }
  }

  // Fixed holidays
  const fixedHolidays = [
    { date: new Date(year, 0, 1), name: 'Neujahr' },
    { date: new Date(year, 4, 1), name: 'Tag der Arbeit' },
    { date: new Date(year, 9, 3), name: 'Tag der Deutschen Einheit' },
    { date: new Date(year, 11, 25), name: 'Erster Weihnachtstag' },
    { date: new Date(year, 11, 26), name: 'Zweiter Weihnachtstag' }
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
      parseInt(holiday.date.toISOString().split('T')[0].split('-')[0]),
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
      parseInt(holiday.date.toISOString().split('T')[0].split('-')[0]),
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

export function formatGermanDate(dateString) {
  // Split the input date string into day, month, and year
  const [day, month, year] = dateString.split('.')

  // Create a Date object (note: months are 0-indexed in JavaScript)
  const date = new Date(year, month - 1, day)

  // Define options for toLocaleDateString
  const options = { day: 'numeric', month: 'long', year: 'numeric' }

  // Convert the date to the desired format using the German locale
  return date.toLocaleDateString('de-DE', options)
}
export const getShiftedDate = (goBack, dateString) => {
  const parsedDate = dayjs(dateString, 'DD.MM.YYYY')

  if (!parsedDate.isValid()) {
    throw new Error('Invalid date format. Expected format: DD.MM.YYYY')
  }

  const newDate = goBack ? parsedDate.subtract(1, 'day') : parsedDate.add(1, 'day')

  return newDate.format('DD.MM.YYYY')
}
export const getTodayDate = () => {
  return dayjs().format('DD.MM.YYYY')
}
export function calculateHeight(duration, cellHeight) {
  // Each duration unit represents 15 minutes
  const minutesPerUnit = 15
  const totalMinutes = duration * minutesPerUnit

  // Since cellHeight represents 60 minutes, find the height per minute
  const heightPerMinute = cellHeight / 60

  // Calculate and return the final height
  return totalMinutes * heightPerMinute
}
export function adjustForMode(hex, mode = 'dark', factor = 0.2) {
  // Ensure valid hex format
  if (!/^#?[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(hex)) {
    if (mode === 'dark') {
      hex = '#666666'
    } else {
      hex = '#EEEEEE'
    }
  }
  if (mode === 'dark' && (hex === '#000000' || hex === '#000000FF')) {
    hex = '#666666'
  } else if (mode === 'light' && (hex === '#000000' || hex === '#000000FF')) {
    hex = '#DEDEDE'
  }
  // Remove '#' if present
  hex = hex.replace('#', '')

  // Convert hex to RGB
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)
  let a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) : 255

  // Adjust brightness
  if (mode === 'dark') {
    factor = 0.02
    r = Math.max(0, r * (1 - factor)) // Darken
    g = Math.max(0, g * (1 - factor))
    b = Math.max(0, b * (1 - factor))
    a = 255
  } else {
    factor = 0.7
    r = Math.min(255, r + (255 - r) * factor) // Lighten
    g = Math.min(255, g + (255 - g) * factor)
    b = Math.min(255, b + (255 - b) * factor)
    a = 230
  }
  if (hex.length === 8) {
    newHex += toHex(a)
  }
  // Convert back to hex
  const toHex = (c) => Math.round(c).toString(16).padStart(2, '0')
  let newHex = `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`

  return newHex
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
    return { date, name }
  }

  // Fixed holidays
  const fixedHolidays = [
    { date: new Date(year, 0, 1), name: 'Neujahr' },
    { date: new Date(year, 4, 1), name: 'Tag der Arbeit' },
    { date: new Date(year, 9, 3), name: 'Tag der Deutschen Einheit' },
    { date: new Date(year, 11, 25), name: 'Erster Weihnachtstag' },
    { date: new Date(year, 11, 26), name: 'Zweiter Weihnachtstag' }
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
      parseInt(holiday.date.toISOString().split('T')[0].split('-')[0]),
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
      parseInt(holiday.date.toISOString().split('T')[0].split('-')[0]),
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
