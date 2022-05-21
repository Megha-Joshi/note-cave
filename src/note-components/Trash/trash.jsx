import "../../public-css/root.css"
import "../Homepage/homepage.css"
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";

const Trash = () => {
const { noteState, noteDispatch } = useNote();
const { trash } = noteState;
return (
<div className="App">
  <div className="main-section">
    <Sidebar />
    <div className="right-section">
    <h2 className="page-heading">Trash</h2>
      {trash.map((item) =>
      <div className="note-list">
        <div className="note-header">
          <h2 className="inp-title color">{item.title}</h2>
        </div>
        <p className="new-note-area note-area color">{item.mainContent}</p>
        <div className="note-footer">
          <div className="footer-icons">
            <span><i class="fad fa-inbox-in color"></i></span>
            <button className="icon-no-bg" onClick={(e) => noteDispatch({type:"DELETE_FROM_TRASH", payload: item._id})}><i class="far fa-trash color"></i></button>
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