import "./App.css";
import logo from "./logo.png";
import { Navbar } from "./note-components/Navbar/navbar";
import {Landingpage} from "./note-components/Landingpage/landingpage";
import { Homepage } from "./note-components/Homepage/homepage";

function App() {
  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;
