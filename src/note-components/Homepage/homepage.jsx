import "../../public-css/root.css";
import "./homepage.css";
import { Navbar } from "../Navbar/navbar";
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { useAuth } from "../../Context/auth-context";
import { createNote } from "../../note-API/create-note";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
const {noteState, noteDispatch} = useNote();
const {note} = noteState;
const {authState} = useAuth();
const { token } = authState;
const [notes, setNote] = useState({ title: "", mainContent: "" });
const navigate = useNavigate();

const createNoteFunction = async () => {
if (token) {
createNote(notes, token, noteDispatch);
console.log("created")
setNote({ title: "", mainContent: "" });
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

return (
<div className="App">
  <Navbar />
  <div className="main-section">
    <Sidebar />

    <div className="right-section">
      <div className="note-con">
        <div className="note-header">
          <input type="text" name="search" placeholder="Title of the note ..." value={notes.title}
            className="inp-title text-color" onChange={(e)=> setNote(() => ({ ...notes, title: e.target.value }))}/>
          <span><i class="far fa-thumbtack"></i></span>
        </div>
        <textarea type="text" placeholder="Start Writing your note ..." value={notes.mainContent}
          className="note-area text-color"
          onChange={(e)=> setNote(() => ({...notes, mainContent: e.target.value}))}></textarea>
        <div className="note-footer">
          <div className="footer-icons">
            <button onClick={createNoteFunction} className="icon-no-bg"><i class="far fa-plus"></i></button>
            <span><i class="far fa-palette"></i></span>
            <span><i class="far fa-tag"></i></span>
            <span><i class="far fa-archive"></i></span>
          </div>
        </div>
      </div>

      {note.map((notes) =>
      <div className="note-list">
        <div className="note-header">
          <h2 className="inp-title color">{notes.title}</h2>
          <span><i class="far fa-thumbtack color"></i></span>
        </div>
        <p className="new-note-area note-area color">{notes.mainContent}</p>
        <div className="note-footer">
          <div className="footer-icons">
            <button onClick ={()=> addToArchive(notes)}className="icon-no-bg"><i class="far fa-archive color"></i></button>
            <button onClick={()=> addToTrash(notes)} className="icon-no-bg"><i
                class="far fa-trash color"></i></button>
          </div>
        </div>
      </div>
      )}


    </div>
  </div>
</div>
);
}

export { Homepage };