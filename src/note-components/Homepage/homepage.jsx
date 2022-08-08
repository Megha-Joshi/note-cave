import "../../public-css/root.css";
import "./homepage.css";
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { useAuth } from "../../Context/auth-context";
import { createNote, editNote } from "../../note-API/create-note";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFilter } from "../../Context/filter-context";
import { Filter } from "../Filter/filter";
import { useState } from "react";
import Modal from "react-modal";
import { NavbarResp } from "../Navbar/navbarResp.jsx";
import { toast } from "react-hot-toast";

const Homepage = () => {
const {noteState, noteDispatch, notes, setNote, tagItem} = useNote();
const {note, priority} = noteState;
const {authState} = useAuth();
const { token } = authState;
const navigate = useNavigate();
const { filterState, finalFilter} = useFilter();
const [modal, setModal] = useState(false);
const [ currNote, setCurrNote] = useState({});
const [newNote, setNewNote] = useState({ title: "", mainContent: "" , bgColor: "" , tags: "", priorityPlace: "",
currentDate: ""});

const editHandler = (editedNote) => {
setModal(true);
setCurrNote(editedNote);
setNewNote(editedNote);
}

const createNoteFunction = async () => {
if (token) {
  if(notes.title !== "" && notes.mainContent !== ""){
createNote(notes, token, noteDispatch);
setNote({ title: "", mainContent: "" , bgColor: "" , tags: "", priorityPlace: "", currentDate: ""});
}
else{
  toast.error("Please enter title and description");
}} else {
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
toast.success("Note added to trash");
}
}catch(error){
console.log(error);
toast.error("Note cannot add to trash");
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
toast.success("Note added to archive");
}
}catch(error){
console.log(error);
toast.error("Note cannot add to archive");
}
}

const customStyle = {
overlay: {
// top: "6rem",
backgroundColor: "rgba(52, 58, 64, 0.8)",
},
content: {
width: "18rem",
height: "25rem",
margin: "5rem auto",
backgroundColor: "var(--box-color)",
},
};

return (
<div className="App">
  <NavbarResp />
  <div className="main-section">
    <Sidebar />

    <div className="home-right-section">
      <div className="note-con" style={{backgroundColor: notes.bgColor}}>
        <div className="note-header">
          <input type="text" name="search" placeholder="Title of the note ..." value={notes.title}
            className="inp-title text-color title-font-size" onChange={(e)=> setNote(() => ({ ...notes, title: e.target.value }))}/>
        </div>
        <textarea type="text" placeholder="Start Writing your note ..." value={notes.mainContent}
          className="note-area text-color"
          onChange={(e)=> setNote(() => ({...notes, mainContent: e.target.value, currentDate: new Date().toLocaleString()}))}></textarea>
        <div className="note-footer">
          <select name="tags" className="select" onClick={(e)=> setNote(() => ({...notes, tags: e.target.value}))}>
            <option selected disabled>Tags</option>
            {tagItem.map((tagItemName) =>
            <option value={tagItemName}>{tagItemName}</option>
            )}
          </select>
          <select name="priority" className="select" onClick={(e)=> setNote(() => ({...notes, priorityPlace:
            e.target.value}))}>
            <option selected disabled>Priority</option>
            {priority.map((priorityName) =>
            <option value={priorityName}>{priorityName}</option>
            )}
          </select>
          <div className="footer-icons">
            <button onClick={createNoteFunction} className="icon-no-bg"><i class="far fa-plus plus-icon"></i></button>
            <input type="color" id="inp-color" value={notes.bgColor} onChange={(e)=> setNote(()=> ({...notes, bgColor:
            e.target.value}))}/>
          </div>
        </div>
      </div>

      {finalFilter(note, filterState).length === 0 ? ( <h1 className="no-note-content">No notes available</h1> ) :
      
      finalFilter(note, filterState).map((notes) =>
      <div className="note-list" style={{backgroundColor: notes.bgColor}}>
        <div className="note-header">
          <h2 className="inp-title color">{notes.title}</h2>
        </div>
        <hr></hr>
        <p className="new-note-area note-area color">{notes.mainContent}</p>
        <div className="note-tag">
          {notes.tags.length>0 ? <button className="color tag-btn">{notes.tags}</button>:
          <button className="color">{notes.tags}</button>}
          {notes.priorityPlace.length>0 ?
          <button className="color tag-btn">{notes.priorityPlace}</button>:
          <button className="color">{notes.priorityPlace}</button>
          }
        </div>
        <span className="color"><small className="small-text">{notes.currentDate}</small></span>
        <div className="note-footer">
          <div className="footer-icons">
            <button className="icon-no-bg" onClick={()=> editHandler(notes)}><i class="fad fa-edit color note-icons"></i></button>
            <button onClick={()=> addToArchive(notes)}className="icon-no-bg"><i
                class="fad fa-inbox-in color note-icons"></i></button>
            <button onClick={()=> addToTrash(notes)} className="icon-no-bg"><i class="far fa-trash color note-icons"></i></button>
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
            onChange={(e)=> setNewNote({...newNote, mainContent: e.target.value, currentDate : new Date().toLocaleString()})}></textarea>
          <div className="edit-modal-footer">
            <input type="color" id="inp-color" value={notes.bgColor} onChange={(e)=> setNewNote(()=> ({...newNote,
            bgColor:
            e.target.value}))}/>
            <select name="tags" className="modal-select" onClick={(e)=> setNewNote(() => ({...newNote, tags:
              e.target.value}))}>
              <option selected disabled>Tags</option>
              {tagItem.map((tagItemName) =>
              <option value={tagItemName}>{tagItemName}</option>
              )}
            </select>
            <select name="priority" className="modal-select" onClick={(e)=> setNewNote(() => ({...newNote,
              priorityPlace: e.target.value}))}>
              <option selected disabled>Priority</option>
              {priority.map((priorityName) =>
              <option value={priorityName}>{priorityName}</option>
              )}
            </select>
          </div>
          <button className="btn btn-primary-login btn-text" onClick={()=> editNote(token, currNote, newNote,
            noteDispatch)}>EDIT Task</button>
        </main>
      </Modal>
      )
      }


    </div>
    <Filter />
  </div>
</div>
);
}

export { Homepage };