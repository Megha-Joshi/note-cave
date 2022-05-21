import "../../public-css/root.css"
import "../Homepage/homepage.css"
import { Navbar } from "../Navbar/navbar";
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { useAuth } from "../../Context/auth-context";
import axios from "axios";

const Archive = () => {
const { noteState, noteDispatch } = useNote();
const { note, trash, archive } = noteState;
const {authState} = useAuth();
const { token } = authState;

const addToTrashFromArchive = async (item) => {
try{
const response = await axios({
method: "DELETE",
url: `/api/archives/delete/${item._id}`,
headers: {authorization : token}
});
if(response.status === 200 || response.status === 201){
noteDispatch({
type: "DELETE_NOTE_FROM_ARCHIVE",
payload: {archive: response.data.archives, trash: item},
});
}
}catch(error){
console.log(error);
}
}

const restoreFromArchive = async (item) =>{
try{
const response = await axios({
method: "POST",
url: `/api/archives/restore/${item._id}`,
headers: {authorization : token}
});
if(response.status === 200 || response.status === 201){
noteDispatch({
type: "RESTORE_NOTE_FROM_ARCHIVE",
payload: {note: response.data.notes, archive: response.data.archives}
});
}
}catch(error){
console.log(error);
}
}
return (
<div className="App">
  <div className="main-section">
    <Sidebar />
    <div className="right-section">
      <h2 className="page-heading">Archive</h2>
      {/* {archive.map((item) =>
      <div className="note-list">
        <div className="note-header">
          <h2 className="inp-title color">{item.title}</h2>
        </div>
        <p className="new-note-area note-area color">{item.mainContent}</p>
        <div className="note-footer">
          <div className="footer-icons">
            <button onClick={()=> restoreFromArchive(item)} className="icon-no-bg"><i
                class="fad fa-inbox-out color"></i></button>
            <button onClick={()=> addToTrashFromArchive(item)} className="icon-no-bg"><i
                class="far fa-trash color"></i></button>
          </div>
        </div>
      </div>
      )} */}

      {archive.map((notes) =>
        <div className="note-list">
        <div className="note-header">
          <h2 className="inp-title color">{notes.title}</h2>
        </div>
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
          <button onClick={()=> restoreFromArchive(notes)} className="icon-no-bg"><i
                class="fad fa-inbox-out color"></i></button>
            <button onClick={()=> addToTrashFromArchive(notes)} className="icon-no-bg"><i
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

export { Archive };