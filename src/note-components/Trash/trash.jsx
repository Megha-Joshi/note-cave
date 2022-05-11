import "../../public-css/root.css"
import "../Homepage/homepage.css"
import { Navbar } from "../Navbar/navbar";
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";

const Trash = () => {
const { noteState } = useNote();
const { trash } = noteState;
return (
<div className="App">
  <Navbar />
  <div className="main-section">
    <Sidebar />
    <div className="right-section">
      {trash.map((item) =>
      <div className="note-list">
        <div className="note-header">
          <h2 className="inp-title color">{item.title}</h2>
          <span><i class="far fa-thumbtack color"></i></span>
        </div>
        <p className="new-note-area note-area color">{item.mainContent}</p>
        <div className="note-footer">
          <div className="footer-icons">
            <span><i class="far fa-archive color"></i></span>
            <span><i class="far fa-trash color"></i></span>
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