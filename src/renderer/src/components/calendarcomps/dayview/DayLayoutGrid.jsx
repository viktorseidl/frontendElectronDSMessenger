import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
const ItemType = "EVENT";

const DayLayoutGrid = ({ fullheight }) => {
  const [events, setEvents] = useState([{
    "id": 1740388167775,
    "time": 5,
    "realtimestart": 0,
    "duration": 3,
    "realtimeend": 0,
    "hexcolor": '#99ffFEFF',
    "title": "New Event"
  },{
    "id": 1740388167780,
    "time": 0,
    "realtimestart": 0,
    "duration": 3,
    "realtimeend": 0,
    "hexcolor": '#c1cff7FF',
    "title": "New Event"
  }]);

  const handleDrop = (timeSlot, item) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === item.id ? { ...ev, time: timeSlot } : ev
      )
    );
  };

  const addEvent = (timeSlot, e) => { 
    console.log(events)
    if (e.target.classList.contains("resize-handle")) return;
    setEvents([...events, { id: Date.now(), realtimestart:0, time: timeSlot, duration: 1, realtimeend:0, hexcolor:'#ff72eaFF', title: "New Event" }]);
  };

  const updateEventDuration = (id, newDuration) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, duration: newDuration } : ev))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 divide-y dark:divide-gray-800 divide-gray-300">
        {[...Array(24)].map((_, index) => (
            <TimeSlot key={index} time={index} events={events} onDrop={handleDrop} addEvent={addEvent} updateEventDuration={updateEventDuration} height={fullheight} />
        ))}
       
      </div>
    </DndProvider>
  );
};

const TimeSlot = ({ time, events, onDrop, addEvent, updateEventDuration, height }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item) => onDrop(time, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const slotEvents = events.filter((event) => event.time === time);

  return (
    <div ref={drop} className={`h-[40px] p-2 ${isOver ? "bg-blue-200" : "dark:bg-gray-950 bg-stone-100"}`} onClick={(e) => addEvent(time, e)}>
      <div className="flex space-x-2">
        {slotEvents.map((event) => (
          <Event key={event.id} event={event} updateEventDuration={updateEventDuration} />
        ))}
      </div>
    </div>
  );
};

const Event = ({ event, updateEventDuration }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: event,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isResizing, setIsResizing] = useState(false);

  const handleDoubleClick = () => {
    setIsResizing(true);
  };

  const handleResize = (e) => {
    if (!isResizing) return;
    e.stopPropagation();
    updateEventDuration(event.id, event.duration + 1);
    setIsResizing(false);
  };

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2  text-black rounded relative ${isDragging ? "opacity-50" : ""}`}
      style={{ height: `${event.duration * 40}px`, background:`${event.hexcolor}` }}
      onDoubleClick={handleDoubleClick}
    >
      {event.title} ({formatTime(event.time)} - {formatTime(event.time + event.duration)})
      {isResizing && (
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700 cursor-s-resize resize-handle"
          onMouseDown={handleResize}
        ></div>
      )}
    </motion.div>
  );
};

const formatTime = (time) => {
  const hours = Math.floor(time / 4);
  const minutes = (time % 4) * 15;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};



export default DayLayoutGrid;