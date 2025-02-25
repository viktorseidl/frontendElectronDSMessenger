import React, { useState, useEffect, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

// Helper functions
const timeToPixels = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const pixelsToTime = (pixels) => {
  const hours = Math.floor(pixels / 60);
  const minutes = Math.floor(pixels % 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

// Timeline Component
const Timeline = ({ date }) => {
  const [events, setEvents] = useState([]);
  const timelineRef = useRef(null);

  // Handle adding a new event
  const handleAddEvent = (startTime, endTime) => {
    const newEvent = {
      id: Date.now(),
      title: "New Event",
      startTime,
      endTime,
    };
    setEvents([...events, newEvent]);
  };

  // Handle updating an event
  const handleUpdateEvent = (id, newStartTime, newEndTime) => {
    const updatedEvents = events.map((event) =>
      event.id === id
        ? { ...event, startTime: newStartTime, endTime: newEndTime }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex h-screen dark:bg-gray-800 dark:text-white">
        {/* Timeline Column */}
        <div className="w-20 bg-gray-100 dark:bg-gray-700">
          {Array.from({ length: 24 }).map((_, hour) => (
            <div
              key={hour}
              className="h-15 flex items-center justify-center border-b border-gray-200 dark:border-gray-600"
            >
              {`${String(hour).padStart(2, "0")}:00`}
            </div>
          ))}
        </div>

        {/* Event Column */}
        <div
          ref={timelineRef}
          className="flex-1 relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const offsetY = e.clientY - rect.top;
            const startTime = pixelsToTime(offsetY);
            const endTime = pixelsToTime(offsetY + 30); // Default 30 minutes
            handleAddEvent(startTime, endTime);
          }}
        >
          {/* Current Time Line */}
          <CurrentTimeLine />

          {/* Events */}
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              onUpdate={(newStartTime, newEndTime) =>
                handleUpdateEvent(event.id, newStartTime, newEndTime)
              }
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

// Event Component
const Event = ({ event, onUpdate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "event",
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isResizing }, resize] = useDrag(() => ({
    type: "resize",
    item: { id: event.id },
    collect: (monitor) => ({
      isResizing: monitor.isDragging(),
    }),
  }));

  // Handle dragging
  const handleDrag = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const newStartTime = pixelsToTime(offsetY);
    const duration = timeToPixels(event.endTime) - timeToPixels(event.startTime);
    const newEndTime = pixelsToTime(offsetY + duration);
    onUpdate(newStartTime, newEndTime);
  };

  // Handle resizing
  const handleResize = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const newEndTime = pixelsToTime(offsetY);
    if (timeToPixels(newEndTime) - timeToPixels(event.startTime) >= 5) {
      onUpdate(event.startTime, newEndTime);
    }
  };

  return (
    <motion.div
      ref={drag}
      className="absolute bg-blue-500 text-white p-2 rounded cursor-move"
      style={{
        top: `${timeToPixels(event.startTime)}px`,
        height: `${timeToPixels(event.endTime) - timeToPixels(event.startTime)}px`,
        opacity: isDragging ? 0.5 : 1,
      }}
      onDrag={handleDrag}
    >
      {event.title}
      <div
        ref={resize}
        className="absolute bottom-0 left-0 right-0 h-2 bg-blue-700 cursor-ns-resize"
        onDrag={handleResize}
      ></div>
    </motion.div>
  );
};
// Current Time Line Component
const CurrentTimeLine = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTimePixels = currentTime.getHours() * 60 + currentTime.getMinutes();

  return (
    <div
      className="absolute left-0 right-0 h-0.5 bg-green-500 z-10"
      style={{ top: `${currentTimePixels}px` }}
    ></div>
  );
};

export default Timeline;