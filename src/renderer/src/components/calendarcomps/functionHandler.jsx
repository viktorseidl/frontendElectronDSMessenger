import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
export const getShiftedDateMonthMini = (goBack, dateString) => {
  const parsedDate = dayjs(dateString, 'DD.MM.YYYY')

  if (!parsedDate.isValid()) {
    throw new Error('Invalid date format. Expected format: DD.MM.YYYY')
  }
  const newDate = goBack ? parsedDate.subtract(1, 'month') : parsedDate.add(1, 'month')

  return newDate.format('DD.MM.YYYY')
}
export function addMinutesToTime(startTime, minutesToAdd) {
  const [hours, minutes] = startTime.split(':').map(Number)
  const startDate = new Date()

  startDate.setHours(hours)
  startDate.setMinutes(minutes + minutesToAdd)

  const endHours = String(startDate.getHours()).padStart(2, '0')
  const endMinutes = String(startDate.getMinutes()).padStart(2, '0')

  return `${endHours}:${endMinutes}`
}
