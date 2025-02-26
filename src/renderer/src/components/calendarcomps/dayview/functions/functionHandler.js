import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const getShiftedDate = (goBack, dateString) => {
  const parsedDate = dayjs(dateString, "DD.MM.YYYY");

  if (!parsedDate.isValid()) {
    throw new Error("Invalid date format. Expected format: DD.MM.YYYY");
  }

  const newDate = goBack ? parsedDate.subtract(1, "day") : parsedDate.add(1, "day");

  return newDate.format("DD.MM.YYYY");
};
export const getShiftedDateMonth = (goBack, dateString) => {
  const parsedDate = dayjs(dateString, "DD.MM.YYYY");

  if (!parsedDate.isValid()) {
    throw new Error("Invalid date format. Expected format: DD.MM.YYYY");
  }

  const newDate = goBack ? parsedDate.subtract(1, "month") : parsedDate.add(1, "month");

  return newDate.format("DD.MM.YYYY");
};

export const getTodayDate = () => {
    return dayjs().format("DD.MM.YYYY");
};

export function getGermanHolidays(year) {
  // Helper function to calculate Easter Sunday (Ostersonntag) using the "Computus" algorithm
  function getEasterSunday(y) {
    const a = y % 19;
    const b = Math.floor(y / 100);
    const c = y % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, month - 1, day);
  }

  // Get Easter Sunday
  const easterSunday = getEasterSunday(year);

  // Function to get a date relative to Easter Sunday
  function getRelativeHoliday(daysOffset, name) {
    const date = new Date(easterSunday);
    date.setDate(easterSunday.getDate() + daysOffset);
    return { date, name };
  }

  // Fixed holidays
  const fixedHolidays = [
    { date: new Date(year, 0, 1), name: "Neujahr (New Year's Day)" },
    { date: new Date(year, 4, 1), name: "Tag der Arbeit (Labour Day)" },
    { date: new Date(year, 9, 3), name: "Tag der Deutschen Einheit (Unity Day)" },
    { date: new Date(year, 11, 25), name: "Erster Weihnachtstag (Christmas Day)" },
    { date: new Date(year, 11, 26), name: "Zweiter Weihnachtstag (Boxing Day)" },
  ];

  // Easter-based holidays
  const movableHolidays = [
    getRelativeHoliday(-2, "Karfreitag (Good Friday)"),
    getRelativeHoliday(0, "Ostersonntag (Easter Sunday)"),
    getRelativeHoliday(1, "Ostermontag (Easter Monday)"),
    getRelativeHoliday(39, "Christi Himmelfahrt (Ascension Day)"),
    getRelativeHoliday(49, "Pfingstsonntag (Pentecost Sunday)"),
    getRelativeHoliday(50, "Pfingstmontag (Pentecost Monday)"),  
  ];

  // Combine all holidays
  const allHolidays = [...fixedHolidays, ...movableHolidays];

  // Convert to event objects
  const events = allHolidays.map((holiday, index) => ({
    id: `holiday-${index}`,
    time: 0, // Full-day event
    realtimestart: "00:00",
    duration: 24,
    realtimeend: "23:59",
    hexcolor: "#FFD700", // Gold color for holidays
    title: holiday.name,
    date: holiday.date.toISOString().split("T")[0], // Format YYYY-MM-DD
    iseditable: false,
  }));

  return events;
}
export function formatGermanDate(dateString) {
  // Split the input date string into day, month, and year
  const [day, month, year] = dateString.split('.');

  // Create a Date object (note: months are 0-indexed in JavaScript)
  const date = new Date(year, month - 1, day);

  // Define options for toLocaleDateString
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // Convert the date to the desired format using the German locale
  return date.toLocaleDateString('de-DE', options);
}
export function calculateTime(x, duration) {
  // Convert the multipliers to minutes
  const startMinutes = x * 60;
  const endMinutes = startMinutes + (duration * 15);

  // Format the time as HH:MM
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60).toString().padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    return `${hours}:${mins}`;
  };

  return {
    startTime: formatTime(startMinutes),
    endTime: formatTime(endMinutes),
  };
}
export function calculateHeight(duration, cellHeight) {
  // Each duration unit represents 15 minutes
  const minutesPerUnit = 15;
  const totalMinutes = duration * minutesPerUnit;

  // Since cellHeight represents 60 minutes, find the height per minute
  const heightPerMinute = cellHeight / 60;

  // Calculate and return the final height
  console.log(totalMinutes * heightPerMinute)
  return totalMinutes * heightPerMinute;
}
