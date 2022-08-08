import "../../public-css/root.css"
import "../Homepage/homepage.css"
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { useAuth } from "../../Context/auth-context";
import axios from "axios";
import { NavbarResp } from "../Navbar/navbarResp.jsx";
import { toast } from "react-hot-toast";

const Archive = () => {
const { noteState, noteDispatch } = useNote();
const { archive } = noteState;
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
toast.success("Note moved to trash");
}
}catch(error){
toast.error("Note cannot moved to trash");
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
toast.success("Note restored from archive");
}
}catch(error){
toast.success("Note cannot restore from archive");
console.log(error);
}
}
return (
<div className="App">
  <NavbarResp />
  <div className="main-section">
    <Sidebar />
    <div className="right-section">
      {archive.length === 0 ? <h2 className="page-heading">No archived notes</h2> : <h2 className="page-heading">Archived notes</h2>}
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
                class="fad fa-inbox-out color note-icons"></i></button>
            <button onClick={()=> addToTrashFromArchive(notes)} className="icon-no-bg"><i
                class="far fa-trash color note-icons"></i></button>
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