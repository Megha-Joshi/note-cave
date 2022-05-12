import "../../public-css/root.css"
import "../Homepage/homepage.css"
import { Navbar } from "../Navbar/navbar";
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";

const Archive = () => {
  const { noteState } = useNote();
  const { archive } = noteState;
return (
<div className="App">
  <Navbar />
  <div className="main-section">
    <Sidebar />
    <div className="right-section">
        Archived notes
    </div>
  </div>
</div>
);
}

export { Archive };