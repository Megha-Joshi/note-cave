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
return (
<div className="App">
  <Navbar />
  <div className="main-section">
    <Sidebar />
    <div className="right-section">
      {archive.map((item) =>
      <div className="note-list">
        <div className="note-header">
          <h2 className="inp-title color">{item.title}</h2>
          <span><i class="far fa-thumbtack color"></i></span>
        </div>
        <p className="new-note-area note-area color">{item.mainContent}</p>
        <div className="note-footer">
          <div className="footer-icons">
            <span><i class="far fa-archive color"></i></span>
            <button onClick={()=> addToTrashFromArchive(item)} className="icon-no-bg"><i
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