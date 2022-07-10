import "../../public-css/root.css"
import "../Homepage/homepage.css"
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { NavbarResp } from "../Navbar/navbarResp";

const Trash = () => {
const { noteState, noteDispatch } = useNote();
const { trash } = noteState;
return (
<div className="App">
  <NavbarResp />
  <div className="main-section">
    <Sidebar />
    <div className="right-section">
      {trash.length === 0 && <h2 className="page-heading">No trashed note</h2>}
      {trash.map((notes) =>
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
            <span><i class="fad fa-inbox-in color"></i></span>
            <button className="icon-no-bg" onClick={(e)=> noteDispatch({type:"DELETE_FROM_TRASH", payload:
              notes._id})}><i class="far fa-trash color"></i></button>
          </div>
        </div>
      </div>
      )}
    </div>
  </div>
</div>
);
}

export { Trash };