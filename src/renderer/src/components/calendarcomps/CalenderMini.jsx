import React, { useEffect, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import dayjs from "dayjs";
import "dayjs/locale/de"; // German month names
import { Link, useParams } from "react-router-dom";
import { getTodayDate } from "./dayview/functions/functionHandler";

const CalendarMini = ({ date,layout }) => {
    
  const [initialDate,setInitialDate] = useState(dayjs(date, "DD.MM.YYYY").locale("de"))
  const [currentDate, setCurrentDate] = useState(initialDate);

  const today = dayjs(); // Get today's date
  const year=initialDate.year();
  const monthName = currentDate.format("MMMM YYYY");
  const firstDayOfMonth = currentDate.startOf("month");
  const startDay = firstDayOfMonth.day();
  const startOffset = (startDay + 6) % 7;
  const prevMonthDays = firstDayOfMonth.subtract(startOffset, "day");
  const totalCells = 7 * 6;
  const daysArray = Array.from({ length: totalCells }, (_, i) => prevMonthDays.add(i, "day"));

  const changeMonth = (direction) => {
    setCurrentDate(currentDate.add(direction, "month"));
  }; 
  useEffect(()=>{
    setCurrentDate(dayjs(date, "DD.MM.YYYY").locale("de"))
  },[date])
  return (
    <div className="w-full mt-2">
      
      {/* Header */}
      <div className="flex flex-row items-center justify-between text-sm font-[arial] p-2 px-4">
        <div className="pl-2">
          <b>{monthName}</b>
        </div>
        <div>
          <button onClick={() => changeMonth(-1)} className="p-1 bg-transparent hover:bg-blue-300/40 rounded-full text-2xl">
            <MdArrowLeft />
          </button>
          <button onClick={() => changeMonth(1)} className="p-1 bg-transparent hover:bg-blue-300/40 rounded-full text-2xl">
            <MdArrowRight />
          </button>
        </div>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 text-xs font-[arial] px-4 py-0">
        {["M.Montag", "D.Dienstag", "M.Mittwoch", "D.Donnerstag", "F.Freitag", "S.Samstag", "S.Sonntag"].map((day) => (
          <div title={day.split('.')[1]} key={day} className="w-full aspect-square flex dark:text-yellow-700 items-center justify-center font-bold">
            {day.split('.')[0]}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-xs font-[arial] px-4 py-0">
        {daysArray.map((day, index) => {
          const isCurrentMonth = day.month() === currentDate.month();
          const isToday = day.isSame(today, "day");
          const isselect = day.isSame(initialDate, "day");

          return (
            <Link to={'/calendar/'+layout+'/'+year+'/'+(1+Number(currentDate.month()))+'/'+day.date()} key={index} className="w-full flex items-center justify-center">
              <span
                className={`w-5/6 rounded-full aspect-square flex items-center justify-center cursor-pointer 
                  ${isCurrentMonth ? "hover:bg-blue-400/20" : "text-gray-400"} 
                  ${isToday&&isCurrentMonth ? "bg-blue-500 text-white font-bold" : ''}
                  ${isselect ? "bg-blue-500 text-white font-bold" : ''} 
                  `}
              >
                {day.date()}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMini;