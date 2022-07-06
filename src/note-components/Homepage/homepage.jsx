import "../../public-css/root.css";
import "./homepage.css";
import { Navbar } from "../Navbar/navbar";
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { useAuth } from "../../Context/auth-context";
import { createNote, editNote } from "../../note-API/create-note";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFilter } from "../../Context/filter-context";
import { useState } from "react";
import Modal from "react-modal";

const Homepage = () => {
const {noteState, noteDispatch, notes, setNote, tagItem} = useNote();
const {note, priority} = noteState;
const {authState} = useAuth();
const { token } = authState;
const navigate = useNavigate();
const { filterState, finalFilter} = useFilter();
const [modal, setModal] = useState(false);
const [ currNote, setCurrNote] = useState({});
const [newNote, setNewNote] = useState({ title: "", mainContent: "" , bgColor: "" , tags: "", priorityPlace: ""});

const editHandler = (editedNote) => {
  setModal(true);
  setCurrNote(editedNote)
}


const createNoteFunction = async () => {
if (token) {
createNote(notes, token, noteDispatch);
console.log("created")
setNote({ title: "", mainContent: "" , bgColor: "" , tags: "", priorityPlace: ""});
} else {
navigate("/login");
}
};

const addToTrash = async (item) => {
try{
const response = await axios({
method: "DELETE",
url: `/api/notes/${item._id}`,
headers: {authorization : token}
});
if(response.status === 200 || response.status === 201){
noteDispatch({
type: "DELETE_NOTE",
payload: {note: response.data.notes, trash: item},
});
}
}catch(error){
console.log(error);
}
}

const addToArchive = async(item) => {
try{
const response = await axios({
method: "POST",
url: `/api/notes/archives/${item._id}`,
headers: {authorization : token},
data: {note: item},
});
if(response.status === 200 || response.status === 201){
noteDispatch({
type: "ADD_TO_ARCHIVE",
payload: {note: response.data.notes, archive: response.data.archives}
});
}
}catch(error){
console.log(error);
}
}

const customStyle = {
  overlay: {
  top: "6rem",
  backgroundColor: "rgba(52, 58, 64, 0.8)",
  },
  content: {
  width: "18rem",
  // height: "20rem",
  margin: "5rem auto",
  backgroundColor: "var(--box-color)",
  },
  };

return (
<div className="App">
  <Navbar />
  <div className="main-section">
    <Sidebar />

    <div className="right-section">
      <div className="note-con" style={{backgroundColor: notes.bgColor}}>
        <div className="note-header">
          <input type="text" name="search" placeholder="Title of the note ..." value={notes.title}
            className="inp-title text-color" onChange={(e)=> setNote(() => ({ ...notes, title: e.target.value }))}/>
          <span><i class="far fa-thumbtack"></i></span>
        </div>
        <textarea type="text" placeholder="Start Writing your note ..." value={notes.mainContent}
          className="note-area text-color"
          onChange={(e)=> setNote(() => ({...notes, mainContent: e.target.value}))}></textarea>
        <div className="note-footer">
          <select name="tags" onClick={(e)=> setNote(() => ({...notes, tags: e.target.value}))}>
            <option selected disabled>Tags</option>
            {tagItem.map((tagItemName) =>
            <option value={tagItemName}>{tagItemName}</option>
            )}
          </select>
          <select name="priority" onClick={(e)=> setNote(() => ({...notes, priorityPlace: e.target.value}))}>
            <option selected disabled>Priority</option>
            {priority.map((priorityName) =>
            <option value={priorityName}>{priorityName}</option>
            )}
          </select>
          <div className="footer-icons">
            <button onClick={createNoteFunction} className="icon-no-bg"><i class="far fa-plus"></i></button>
            <input type="color" value={notes.bgColor} onChange={(e)=> setNote(()=> ({...notes, bgColor:
            e.target.value}))}/>
            <span><i class="far fa-tag"></i></span>
          </div>
        </div>
      </div>

      {finalFilter(note, filterState).map((notes) =>
      <div className="note-list" style={{backgroundColor: notes.bgColor}}>
        <div className="note-header">
          <h2 className="inp-title color">{notes.title}</h2>
          <span><i class="far fa-thumbtack color"></i></span>
        </div>
        <p className="new-note-area note-area color">{notes.mainContent}</p>
        <span>{notes.tags}</span>
        <span>{notes.priorityPlace}</span>
        <div className="note-footer">
          <div className="footer-icons">
            <button className="icon-no-bg" onClick={() => editHandler(notes)}><i class="fad fa-edit color"></i></button>
            <button onClick={()=> addToArchive(notes)}className="icon-no-bg"><i
                class="fad fa-inbox-in color"></i></button>
            <button onClick={()=> addToTrash(notes)} className="icon-no-bg"><i class="far fa-trash color"></i></button>
          </div>
        </div>
      </div>
      )}

      {
      modal && (
      <Modal isOpen={ modal } style={ customStyle }>
        <header className="modal-header">
          <h3 className="card-title">Edit Note</h3>
          <i class="fas fa-times icon-color" onClick={()=> setModal(false)}></i>
        </header>
        <main className="modal-subhead">
          <input type="text" placeholder="Note Title" className="inp-box" value={newNote.title} onChange={(e)=>
          setNewNote({...newNote, title: e.target.value})}/>
          <textarea type="text" placeholder="Note Description" className="inp-box" value={newNote.mainContent}
            onChange={(e)=> setNewNote({...newNote, mainContent: e.target.value})}></textarea>
          <input type="color" value={newNote.bgColor} onChange={(e)=> setNewNote(()=> ({...newNote, bgColor:
          e.target.value}))}/>
          <div className="time-container">
            <div className="time-box">
              <label className="time-head">Duration</label>
              <select name="tags" onClick={(e)=> setNewNote(() => ({...newNote, tags: e.target.value}))}>
                <option selected disabled>Tags</option>
                {tagItem.map((tagItemName) =>
                <option value={tagItemName}>{tagItemName}</option>
                )}
              </select>
            </div>
            <div className="time-box">
              <label className="time-head">Break</label>
              <select name="priority" onClick={(e)=> setNewNote(() => ({...newNote, priorityPlace: e.target.value}))}>
                <option selected disabled>Priority</option>
                {priority.map((priorityName) =>
                <option value={priorityName}>{priorityName}</option>
                )}
              </select>
            </div>
          </div>
          <button className="btn btn-info btn-text btn-modal" onClick={()=> editNote(token, currNote, newNote, noteDispatch)}>EDIT Task</button>
        </main>
      </Modal>
      )
      }


    </div>
  </div>
</div>
);
}

export { Homepage };