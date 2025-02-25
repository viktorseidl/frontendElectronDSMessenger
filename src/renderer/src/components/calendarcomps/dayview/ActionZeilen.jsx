import React, { useState,useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

const ItemType = { MEETING: "meeting" };

const ActionZeilen = ({ date, meetings, setMeetings }) => {
   

    const timeSlots = Array.from({ length: 24 }, (_, i) => i); // 24-hour format

  const getPosition = (startTime, endTime) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinutes = parseInt(startTime.split(":")[1]);
    const endHour = parseInt(endTime.split(":")[0]);
    const endMinutes = parseInt(endTime.split(":")[1]);

    const startY = startHour * 60 + startMinutes; // Convert time to pixel position
    const endY = endHour * 60 + endMinutes;
    const duration = endY - startY;
    console.log(JSON.stringify({ top: startY, height: duration }))
    return { top: startY, height: duration };
  };

  return (
    <DndProvider className="h-full w-full" backend={HTML5Backend}>
      <div className="relative w-full h-full">
        {/* Grid Layout */}
        <div className="w-full h-full dark:bg-gray-900 bg-blue-50 flex flex-row items-start justify-start">
          {/* Left Column (Hours) */}
          <div className="w-40 flex flex-col dark:bg-gray-800 bg-white items-start justify-evenly h-full border-r dark:border-gray-700 border-gray-300 divide-y dark:divide-gray-700 divide-gray-300">
            {timeSlots.map((hour) => (
              <div key={hour} className="w-full h-16 flex items-center justify-center">
                {hour}:00
              </div>
            ))}
          </div>

          {/* Right Column (Time Slots) */}
          <div className="relative w-full h-full flex flex-col items-start divide-y dark:divide-gray-700 divide-gray-300">
            {timeSlots.map((hour) => (
              <TimeSlot key={hour} hour={hour} setMeetings={setMeetings} />
            ))}

            {/* Meeting Overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {meetings.map((meeting) => {
                const { top, height } = getPosition(meeting.start, meeting.end);
                return (
                  <MeetingItem
                    key={meeting.id}
                    meeting={meeting}
                    top={top}
                    height={height}
                    setMeetings={setMeetings}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

// Draggable Meeting Component
const MeetingItem = ({ meeting, top, height, setMeetings }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.MEETING,
    item: { id: meeting.id, start: meeting.start, end: meeting.end },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="absolute left-10 w-5/6 bg-blue-500 text-white rounded-lg shadow-lg p-2 cursor-pointer pointer-events-auto"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <strong>{meeting.title}</strong>
      <br />
      {meeting.start} - {meeting.end}
    </motion.div>
  );
};

// Droppable Time Slot Component
const TimeSlot = ({ hour, setMeetings }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.MEETING,
    drop: (item) => handleDrop(item, hour, setMeetings),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDrop = (item, newHour, setMeetings) => {
    const newStart = `${newHour}:00`;
    const newEnd = `${newHour + 1}:00`;

    setMeetings((prevMeetings) =>
      prevMeetings.map((m) =>
        m.id === item.id ? { ...m, start: newStart, end: newEnd } : m
      )
    );
  };

  return (
    <div
      ref={drop}
      className={`w-full h-16 flex items-center justify-center ${
        isOver ? "bg-blue-300" : ""
      }`}
    ></div>
  );
};

export default ActionZeilen;