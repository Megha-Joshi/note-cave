import "../Homepage/homepage.css"
import { Link } from "react-router-dom";

const Sidebar = () => {
return (
<div className="left-section">
    <div className="list left-icon text-color">
        <span><i class="far fa-home icon-color"></i></span>
        <p>Home</p>
    </div>
    <div className="list left-icon text-color">
        <span><i class="far fa-tag icon-color"></i></span>
        <p>Label</p>
    </div>
    <Link to="/archive" className="text-color">
    <div className="list left-icon">
        <span><i class="far fa-archive icon-color"></i></span>
        <p>Archieve</p>
    </div>
    </Link>
    <Link to="/trash" className="text-color">
    <div className="list left-icon">
        <span><i class="far fa-trash icon-color"></i></span>
        <p>Trash</p>
    </div>
    </Link>
    <div className="list left-icon text-color">
        <span><i class="far fa-user-circle icon-color"></i></span>
        <p>Profile</p>
    </div>
</div>
);
}

export { Sidebar };