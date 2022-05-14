import "./App.css";
import logo from "./logo.png";
import { Navbar } from "./note-components/Navbar/navbar";
import {Landingpage} from "./note-components/Landingpage/landingpage";
import { Homepage } from "./note-components/Homepage/homepage";
import { Login } from "./note-components/Authentication/login";
import { Signup } from "./note-components/Authentication/signup";
import { Route, Routes} from "react-router-dom";
import { Trash } from "./note-components/Trash/trash";
import { Archive } from "./note-components/Archive/archive";
import { Label } from "./note-components/Label/label";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/archive" element={<Archive />}/>
        <Route path="/label" element={<Label />}/>
      </Routes>
    </div>
  );
}

export default App;
