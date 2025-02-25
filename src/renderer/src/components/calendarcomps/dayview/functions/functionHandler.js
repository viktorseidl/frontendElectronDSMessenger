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

export const getTodayDate = () => {
    return dayjs().format("DD.MM.YYYY");
};