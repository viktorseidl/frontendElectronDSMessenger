 import React,{useEffect, useState} from "react";
 import { useDrag, useDrop } from "react-dnd";
 import { motion } from "framer-motion";
import { MdHistory, MdPostAdd, MdPriorityHigh } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaPaintBrush, FaSave } from "react-icons/fa";
import { util } from "node-forge";
import DecText from "../utils/DecText";
import { useFetchAuthAll } from "../services/useFetchAll";
import DialogLetedPosteds from "./DialogLetedPosteds";

 const ItemTypes = {
    NOTE: "note",
  };
  
  // Note Component
  const Note = ({ id, text, x, y, moveNote, deleteNote,prio, updateNoteText, updateNotePrio,hexcolor,updateNoteColor }) => {
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: ItemTypes.NOTE,
        item: { id, x, y },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }),
      [id, x, y]
    );
    const [isEditing, setIsEditing] = useState(false);
    const [isTinte, setIsTinte] = useState(false);
    const [newText, setNewText] = useState(text);
  
    const handleSaveText = () => {
      setIsEditing(false);
      updateNoteText(id, newText); // Call update function when text is saved
    };
    const handleColor = (id,color) => {
      setIsTinte(false);
      updateNoteColor(id, color); // Call update function when text is saved
    };
    return (
      <motion.div
        ref={drag}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: isDragging ? 0.9 : 1 }}
        style={{
          position: "absolute",
          left: x,
          top: y,
          cursor: "grab",
          zIndex: isDragging ? 1000 : 1,
        }}
      >
        <div ref={drag} style={{background:(prio>0?' #ff9872FF ': hexcolor.toString())}} className={'w-80 bg-yellow-200 rounded border-t border-gray-700/20 text-black dark:shadow-[rgba(0,148,255,0.4)] shadow-[rgba(0,0,0,0.2)] shadow-lg p-3'}>
          <div> 
            {isEditing ? (
            <div>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full p-1 h-60 bg-white/60 resize-none border rounded overflow-auto dark:scrollbar-thumb-gray-300 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-track-gray-100 scrollbar-track-gray-100 outline-none"
              />
              <button
                title="Speichern"
                className="mt-2 p-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-600 hover:text-gray-800"
                onClick={handleSaveText}
              >
                <FaSave />
              </button>
            </div>
          ) : (
            <div>
              {
                prio>0?
                <button  onClick={()=>updateNotePrio(id,prio)} className="w-full mb-2 text-sm text-white  py-1 bg-red-500 hover:bg-red-400 rounded">Wichtig</button>:''
              }
               <pre className="font-[arial] text-[14px] my-2" onDoubleClick={() => setIsEditing(true)}>{text.trim()==''?'Jetzt beschriften ...':text}</pre>
              <button className="mt-2 text-white  p-2 bg-red-500 hover:bg-red-400 rounded"
              onClick={() => deleteNote(id)} ><FaTrash /></button> 
              {
                prio==0?
                <button  onClick={()=>updateNotePrio(id,prio)} className="mt-2 ml-2 text-white  p-2 bg-gray-500 hover:bg-gray-400 rounded"
                ><MdPriorityHigh /></button> :''
              }
              {
                isTinte?
                <div className="w-full grid grid-cols-8 items-start justify-start gap-x-1 mt-4 bg-black/30 rounded p-2">
                    <div onClick={()=>handleColor(id,'#b5f5c6FF')} className="w-full cursor-pointer aspect-square bg-[#b5f5c6FF] ring-1 ring-gray-600"></div>
                    <div onClick={()=>handleColor(id,'#c1cff7FF')} className="w-full cursor-pointer aspect-square bg-[#c1cff7FF] ring-1 ring-gray-600"></div>
                    <div onClick={()=>handleColor(id,'#e0c4f5FF')} className="w-full cursor-pointer aspect-square bg-[#e0c4f5FF] ring-1 ring-gray-600"></div>
                    <div onClick={()=>handleColor(id,'#ffc972FF')} className="w-full cursor-pointer aspect-square bg-[#ffc972FF] ring-1 ring-gray-600"></div>
                    <div onClick={()=>handleColor(id,'#99ffFEFF')} className="w-full cursor-pointer aspect-square bg-[#99ffFEFF] ring-1 ring-gray-600"></div>
                    <div onClick={()=>handleColor(id,'#fef08aFF')} className="w-full cursor-pointer aspect-square bg-[#fef08aFF] ring-1 ring-gray-600"></div>
                    <div onClick={()=>handleColor(id,'#ff72eaFF')} className="w-full cursor-pointer aspect-square bg-[#ff72eaFF] ring-1 ring-gray-600"></div>
                    <div onClick={()=>handleColor(id,'#87ff72FF')} className="w-full cursor-pointer aspect-square bg-[#87ff72FF] ring-1 ring-gray-600"></div>
                </div>:
                <button  onClick={()=>setIsTinte(true)} className="mt-2 ml-2 text-white  p-2 bg-blue-500 hover:bg-blue-400 rounded"
                  ><FaPaintBrush /></button> 
              }
            </div>
          )} 
            
          </div>
        </div>
      </motion.div>
    );
  };
const PinWall = () => {
  const [notes, setNotes] = useState([]);
  const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user')))
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(DecText(localStorage.getItem('dbConfig'))).value)).localhost:''
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.NOTE,
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const newX = Math.round(parseInt(item.x) + delta.x);
        const newY = Math.round(parseInt(item.y) + delta.y);
        moveNote(parseInt(item.id), newX, newY);
      },
    }),
    [notes]
  );

  const moveNote = async (id, x, y) => {
    console.log(id,x,y)
    // Update note position locally
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, x, y } : note))
    ); 
    // Save updated position to the database 
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=updateNotePositionOnID&a="+util.encode64(User.Name),'ssdsdsd',"PUT", JSON.stringify({mid:id,xk:x,yk:y}), null); 
    getAllMyNotesActive()
  };

  const addNote = async () => {
    let i=new Date().getTime()
    const newNote = {
      id: i,
      text: ``,
      x: 50,
      y: 50,
      prio:0,
      hexcolor:'#fef08aFF'
    };

    setNotes([...notes, newNote]);

    // Save new note to the database  addNewNote
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=addNewNote&a="+util.encode64(User.Name),'ssdsdsd',"POST", JSON.stringify({pid:i}), null);  
    getAllMyNotesActive()
  };

  const deleteNote = async (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); 
    // Delete note from the database
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=updateNoteDeleteOnID&a="+util.encode64(User.Name),'ssdsdsd',"DELETE", JSON.stringify({mid:id}), null);  
    getAllMyNotesActive()
  };
  const updateNoteText = async (id, newText) => {
    // Update text locally
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    ); 
    // Save updated text to the database 
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=updateNoteTextOnID&a="+util.encode64(User.Name),'ssdsdsd',"PUT", JSON.stringify({mid:id,txt:newText}), null);  
    getAllMyNotesActive()
  };
  const updateNotePrio = async (id, prio) => {
    // Update text locally
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, prio: prio>0?0:1 } : note
      )
    ); 
    // Save updated text to the database
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=updateNotePriorityOnID&a="+util.encode64(User.Name),'ssdsdsd',"PUT", JSON.stringify({mid:id,prio:prio>0?0:1}), null); 
    getAllMyNotesActive() 
  };
  const updateNoteColor = async (id, color) => {
    // Update text locally
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, hexcolor: color } : note
      )
    ); 
    // Save updated text to the database
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=updateNoteColorOnID&a="+util.encode64(User.Name),'ssdsdsd',"PUT", JSON.stringify({mid:id,color:color}), null); 
    getAllMyNotesActive() 
  }; 
  const getAllMyNotesActive = async ()=>{
    const apache=localStorage.getItem('dbConfig')?JSON.parse(util.decode64(JSON.parse(DecText(localStorage.getItem('dbConfig'))).value)).localhost:''
    const User=JSON.parse(util.decode64(window.sessionStorage.getItem('user'))) 
    const query=await useFetchAuthAll("http://"+apache+"/electronbackend/index.php?path=getNotesAllActive&a="+util.encode64(User.Name),'ssdsdsd',"GET", null, null);
    console.log(query)
    if(query.length>0){
      setNotes(query)
    }
  } 
const closeDialog = (e) => {
  if (e.target === e.currentTarget) {
    setIsDialogOpen(false); 
  }
};
  useEffect(()=>{
    getAllMyNotesActive()
  },[]) 
  return (
    <div className="relative w-full h-full  shadow-inner z-10">
      <DialogLetedPosteds
      show={isDialogOpen}
      close={closeDialog}
      title={'Meine gelöschten Notizen'}
      updater={getAllMyNotesActive}
      cancelBtn={true}
       />
      <div ref={drop} className="w-full h-full">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            x={note.x}
            y={note.y}
            prio={note.prio}
            hexcolor={note.hexcolor}
            moveNote={moveNote}
            deleteNote={deleteNote}
            updateNoteText={updateNoteText}
            updateNotePrio={updateNotePrio}
            updateNoteColor={updateNoteColor}
          />
        ))}
      </div>
      <button
        onClick={()=>setIsDialogOpen(true)}
        title="Gelöschte Elemente"
        className="absolute bottom-4 right-20 bg-red-500 p-4 rounded text-white"
      >
        <MdHistory />
      </button>
      <button
      title="Neue Notiz erstellen"
        onClick={addNote}
        className="absolute bottom-4 right-4 bg-blue-500 p-4 rounded text-white"
      >
        <MdPostAdd />
      </button>
    </div>
  );
};

export default PinWall;
