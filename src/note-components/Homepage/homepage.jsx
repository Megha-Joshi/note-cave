import "../../public-css/root.css";
import "./homepage.css";
import { Navbar } from "../Navbar/navbar";
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { useAuth } from "../../Context/auth-context";
import { createNote } from "../../note-API/create-note";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFilter } from "../../Context/filter-context";

const Homepage = () => {
const {noteState, noteDispatch, notes, setNote, tagItem} = useNote();
const {note, priority} = noteState;
const {authState} = useAuth();
const { token } = authState;
const navigate = useNavigate();
const { filterState, finalFilter} = useFilter();


const createNoteFunction = async () => {
if (token) {
createNote(notes, token, noteDispatch);
console.log("created")
setNote({ title: "", mainContent: "" , bgColor: "" , tags: "", priorityPlace: "", currentDate: ""});
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
      <div className="note-con" style={{backgroundColor: notes.bgColor}}>
        <div className="note-header">
          <input type="text" name="search" placeholder="Title of the note ..." value={notes.title}
            className="inp-title text-color" onChange={(e)=> setNote(() => ({ ...notes, title: e.target.value }))}/>
          <span><i class="far fa-thumbtack"></i></span>
        </div>
        <textarea type="text" placeholder="Start Writing your note ..." value={notes.mainContent}
          className="note-area text-color"
          onChange={(e)=> setNote(() => ({...notes, mainContent: e.target.value, currentDate: new Date().toLocaleString()}))}></textarea>
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
        <span>{notes.currentDate}</span>
        <div className="note-footer">
          <div className="footer-icons">
            <button className="icon-no-bg"><i class="fad fa-edit color"></i></button>
            <button onClick={()=> addToArchive(notes)}className="icon-no-bg"><i
                class="fad fa-inbox-in color"></i></button>
            <button onClick={()=> addToTrash(notes)} className="icon-no-bg"><i class="far fa-trash color"></i></button>
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