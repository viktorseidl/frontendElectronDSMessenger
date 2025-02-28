import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
import { IoMdMove } from "react-icons/io";
import { MdDelete, MdEdit, MdNotes } from "react-icons/md"; 
import DialogEventDayEntry from "../../DialogEventDayEntry";
import dayjs from "dayjs";
import { calculateHeight, calculateTime, formatDateTimeAlarmToString, getGermanHolidays, getIntervalCount } from "./functions/functionHandler"; 

const ItemType = "EVENT";

const DayLayoutGrid = ({ fullheight,date }) => {
  const [dialogev,setdialogev]=useState(false)
  const [dtobj,setdtobj]=useState(null) 
  const [events, setEvents] = useState([
    {
      id: 1740388137775,
      time: 8,
      realtimestart: calculateTime(8,9).startTime,
      duration: 9,
      realtimeend: calculateTime(8,9).endTime,
      hexcolor: "#99ffFEFF",
      title: "Geburtstag Annemarie Hürten",
      datum:date,
      isNoteAttached: null,
      isEditable: false,
      isAlarm: false,
      isAlarmStamp: null,
      eventTyp: 0,
      isPublic: 1,
    },
    {
      id: 1740388167780,
      time: 0,
      realtimestart: calculateTime(0,3).startTime,
      duration: 3,
      realtimeend: calculateTime(0,3).endTime,
      hexcolor: "#c1cff7FF",
      title: "Team-Meeting",
      datum:date,
      isNoteAttached: 'hallo wie geht es dir',
      isEditable: true,
      isAlarm: true,
      isAlarmStamp: "28.02.2025 13:25",
      eventTyp: 0,
      isPublic: 0,
    },
  ]);

  const handleDrop = (timeSlot, item) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === item.id ? { ...ev, time: timeSlot,realtimestart:calculateTime(timeSlot,ev.duration).startTime,realtimeend:calculateTime(timeSlot,ev.duration).endTime } : ev))
    );
  };
  const showNoteIDS=(id,lastheight,toogle)=>{
    if(toogle==true&&document.getElementById("shownote"+id).style.display!='block'){
      document.getElementById(id).style.height='auto'
      document.getElementById("shownote"+id).style.display='block'
    }else{
      document.getElementById(id).style.height=lastheight+'px'
      document.getElementById("shownote"+id).style.display='none'

    }
  }
  const addEvent = (timeSlot, e) => { 
    if (e.target.classList.contains("resize-handle")) return;
    setdtobj(dayjs(date+' '+(timeSlot>9?timeSlot:'0'+timeSlot)+':00','DD.MM:YYYY HH:mm').toDate())
    setdialogev(true)  
  };
  const addNote=(Arr)=>{
    setdialogev(false)  //Close Dialog
    const timeSlot=Arr[1].getHours();
    const duration=getIntervalCount(Arr[1],Arr[2])
    const isprivate=Arr[7]?1:0 
    const startTag=Arr[1].getDate()
    const startMonat=(Arr[1].getMonth()+1)
    const startJahr=Arr[1].getFullYear()
    const isNote=Arr[3]!=null?Arr[3]:null
    const isAlarm=Arr[5]
    const alarmStamp=isAlarm?formatDateTimeAlarmToString(Arr[4]):null
    //UPDATE DATABASE /////////////////////////////////////////////////////////////////////////////////////////////ON ENTRY
    console.log(Arr)
    console.log(parseInt(date.split('.')[1])==startMonat) //Monat
    console.log(parseInt(date.split('.')[0])==startTag) //Tag
    console.log(parseInt(date.split('.')[2])==startJahr)  //Jahr
    if((parseInt(date.split('.')[1])==startMonat)&&(parseInt(date.split('.')[0])==startTag)&&(parseInt(date.split('.')[2])==startJahr)){
    const newObj={ 
      id: Date.now(),
      realtimestart: calculateTime(timeSlot,duration).startTime,
      time: timeSlot,
      duration: duration,
      realtimeend: calculateTime(timeSlot,duration).endTime,
      hexcolor: Arr[6].toString(),
      title: Arr[0].toString(),
      datum:(startTag>9?startTag:'0'+startTag)+'.'+(startMonat>9?startMonat:'0'+startMonat)+'.'+startJahr,
      isNoteAttached: isNote,
      isEditable: true,
      isAlarm: isAlarm,
      isAlarmStamp: alarmStamp,
      eventTyp: 0,  
      isPublic: isprivate,  
    }
    setEvents([
      ...events,
      newObj,
    ]);
    }
  }

  const updateEventDuration = (id, newDuration) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, duration: newDuration,realtimestart:calculateTime(ev.time,newDuration).startTime,realtimeend:calculateTime(ev.time,newDuration).endTime } : ev))
    );
  };
  const deleteMyEvent = (id) => {
    setEvents((prev) =>
      prev.filter((ev) => (ev.id !== id ))
    );
  };
  const closeDialog=()=>{
    setdialogev(!dialogev)
  }
  const getFeiertage=()=>{
    console.log(date)
    const [aday, amonth, ayear] = date!=null?date.split("."):[new Date().getDate(),new Date().getMonth(),new Date().getFullYear()];
  const parsedDate=new Date(`${ayear}-${amonth}-${aday}T00:00:00`).toISOString().split('T')[0]
    console.log(parsedDate)
 // console.log(formatDateTimeAlarmToString(parsedDate).split(' ')[0])
    let Feiertage=getGermanHolidays(date.split('.')[2])
    Feiertage=[...Feiertage,{
      id: 1740388137775,
      time: 8,
      realtimestart: calculateTime(8,9).startTime,
      duration: 9,
      realtimeend: calculateTime(8,9).endTime,
      hexcolor: "#99ffFEFF",
      title: "Geburtstag Annemarie Hürten",
      datum:parsedDate,
      isNoteAttached: null,
      isEditable: false,
      isAlarm: false,
      isAlarmStamp: null,
      eventTyp: 0,
      isPublic: 1,
    },
    {
      id: 1740388167780,
      time: 0,
      realtimestart: calculateTime(0,3).startTime,
      duration: 3,
      realtimeend: calculateTime(0,3).endTime,
      hexcolor: "#c1cff7FF",
      title: "Team-Meeting",
      datum:parsedDate,
      isNoteAttached: 'hallo wie geht es dir',
      isEditable: true,
      isAlarm: true,
      isAlarmStamp: "28.02.2025 13:25",
      eventTyp: 0,
      isPublic: 0,
    }]
    setEvents(Feiertage.filter((e)=>e.datum==parsedDate))
    console.log(date,Feiertage.filter((e)=>e.datum==parsedDate))
  }
  useEffect(()=>{ 
    getFeiertage()
  },[date])
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 divide-y dark:divide-gray-800 divide-gray-300">
        {[...Array(24)].map((_, index) => (
          <TimeSlot
            key={index}
            time={index}
            events={events}
            onDrop={handleDrop}
            addEvent={addEvent}
            updateEventDuration={updateEventDuration}
            deleteEvent={deleteMyEvent}
            showNoteIDS={showNoteIDS}
            height={fullheight}
          />
        ))}
      </div>
      <DialogEventDayEntry 
      show={dialogev}
      close={closeDialog}
      title={'Neuer Termin'}
      message={dtobj}
      callbackBtn2={addNote} 
      />
    </DndProvider>
  );
};

const TimeSlot = ({ time, events, onDrop, addEvent, updateEventDuration,deleteEvent,showNoteIDS }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item) => onDrop(time, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const slotEvents = events.filter((event) => event.time === time); 
  return (
    <div
      ref={drop}
      className={`h-[40px] p-0 ${
        isOver ? "dark:bg-gray-600/40 bg-blue-200" : "dark:bg-gray-950 bg-stone-100"
      }`}
      onDoubleClick={(e) => addEvent(time, e)}
    >
      <div className="flex space-x-2 max-w-full overflow-hidden">
        {slotEvents.map((event) => (
          <Event key={event.id} event={event} updateEventDuration={updateEventDuration} deleteEvent={deleteEvent} showNoteIDS={showNoteIDS} />
        ))}
      </div>
    </div>
  );
};

const Event = ({ event, updateEventDuration,deleteEvent,showNoteIDS }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDraggingAllowed, setIsDraggingAllowed] = useState(false);
  let longPressTimer = null;

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: event,
    canDrag: () => isDraggingAllowed, // Only allow dragging if `isDraggingAllowed` is true
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleLongPressStart = () => {
    longPressTimer = setTimeout(() => {
      setIsDraggingAllowed(true);
    }, 100); // 500ms long press threshold
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer);
    setTimeout(() => setIsDraggingAllowed(false), 200); // Prevent immediate re-dragging
  };
  
  const handleResize = (e) => {
    if (!isResizing) return;
    e.stopPropagation();
    updateEventDuration(event.id, event.duration + 1);
    setIsResizing(false);
  };

  return (
    <motion.div
      ref={preview} // Ensures the event stays visible while dragging 
      className={`p-1 text-black rounded relative calshadow ${isDragging ? "opacity-50" : ""}`}
      id={event.id}
      style={{ minHeight:'28px', height: `${calculateHeight(event.duration,40)}px`,background: `${event.hexcolor}` }}
    >
      <div className="w-full flex flex-row items-start justify-start">
      <div className={`${event.isEditable?' -mt-[5px]  ':' mt-0 '} text-xs`}>
      {
        event.isNoteAttached!=null?
        <button
        onClick={()=>showNoteIDS(event.id,calculateHeight(event.duration,40),true)}
        className="inline w-5 mr-1 mt-1  group aspect-square text-center bg-yellow-100 hover:bg-yellow-200 ring-1 outline-none ring-gray-300 text-black p-1 rounded text-xs"
      >
        <MdNotes />
      </button>:''
      }
      </div>
      <div className={` w-48 h-full max-w-52 flex flex-col text-xs   truncate`}>
        <div className="w-full flex flex-row items-center justify-start  truncate">({event.realtimestart} - {event.realtimeend})  |
        <b title={event.title} className="px-1  truncate"> {event.title}</b></div>
        <div className="w-full text-wrap hidden mt-2" onClick={()=>showNoteIDS(event.id,calculateHeight(event.duration,40),false)} id={"shownote"+event.id}>
          {event.isNoteAttached} 
        </div>
        </div>
      {
        event.isEditable||event.isPublic==0?
        <>
        
      <button
        ref={drag}
        className=" w-auto mr-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs"
        onClick={()=>deleteEvent(event.id)}
      >
        <MdDelete />
      </button>
      <button
        ref={drag}
        className=" w-auto mr-1 bg-blue-600 hover:bg-blue-500 text-white p-1 rounded text-xs"
        onMouseDown={handleLongPressStart} // Start long press detection
        onMouseUp={handleLongPressEnd} // Reset after release
        onMouseLeave={handleLongPressEnd} // Reset if moved away
      >
        <MdEdit />
      </button> 
      <button
        ref={drag}
        className=" w-auto bg-gray-700 hover:bg-gray-600 text-white p-1 rounded text-xs"
        onMouseDown={handleLongPressStart} // Start long press detection
        onMouseUp={handleLongPressEnd} // Reset after release
        onMouseLeave={handleLongPressEnd} // Reset if moved away
      >
        <IoMdMove />
      </button> 
        </>:''
      }
      </div> 
      

      {/* Drag Handle Button */}
      

      {/* Resizing Handle */}
      {isResizing && (
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700 cursor-s-resize resize-handle"
          onMouseDown={handleResize}
        ></div>
      )}
    </motion.div>
  );
};

 

export default DayLayoutGrid;