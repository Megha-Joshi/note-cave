import "./homepage.css";
import { Navbar } from "../Navbar/navbar";

const Homepage = () => {
return (
<div className="App">
  <Navbar />
  <div className="main-section">
    <div className="left-section">
      <div className="list left-icon">
        <span><i class="far fa-home text-color"></i></span>
        <p>Home</p>
      </div>
      <div className="list left-icon">
        <span><i class="far fa-tag text-color"></i></span>
        <p>Label</p>
      </div>
      <div className="list left-icon">
        <span><i class="far fa-archive text-color"></i></span>
        <p>Archieve</p>
      </div>
      <div className="list left-icon">
        <span><i class="far fa-trash text-color"></i></span>
        <p>Trash</p>
      </div>
      <div className="list left-icon">
        <span><i class="far fa-user-circle text-color"></i></span>
        <p>Profile</p>
      </div>
    </div>

    <div className="right-section">
      <div className="note-con">
        <div className="note-header">
          <textarea type="text" placeholder="Start Writing your note ..." className="note-area text-color"></textarea>
          <span><i class="far fa-thumbtack"></i></span>
        </div>
        <div className="note-footer">
          <label className="footer-text text-color">Created on </label>
            <input type="date" className="date"/>
          <div className="footer-icons">
            <span><i class="far fa-palette"></i></span>
            <span><i class="far fa-tag"></i></span>
            <span><i class="far fa-archive"></i></span>
            <span><i class="far fa-trash"></i></span>
          </div>
        </div>
      </div>
      <div className="note-con">
        <div className="note-header">
          <input type="text" name="search" placeholder="Title of the note ..."className="inp-title text-color"/>
          <span><i class="far fa-thumbtack"></i></span>
        </div>
        <textarea type="text" placeholder="Start Writing your note ..." className="note-area text-color" ></textarea>
        <div className="note-footer">
          <label className="footer-text text-color">Created on </label>
            <input type="date" className="date"/>
          <div className="footer-icons">
            <span><i class="far fa-palette"></i></span>
            <span><i class="far fa-tag"></i></span>
            <span><i class="far fa-archive"></i></span>
            <span><i class="far fa-trash"></i></span>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
);
}

export { Homepage };