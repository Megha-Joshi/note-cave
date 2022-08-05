import "../../public-css/root.css";
import "./navbar.css"
import { useTheme } from "../../Context/theme-context";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useNote } from "../../Context/note-context";
import { useFilter } from "../../Context/filter-context";
import { useAuth } from "../../Context/auth-context";

const NavbarResp = () => {
const navigate = useNavigate();
const { authDispatch } = useAuth();
const { theme, setTheme } = useTheme();
const [sidebar, setSidebar ] = useState(false);
const [filter, setFilter] = useState(false);
const { tagItem, noteState } = useNote();
const { priority } = noteState;
const { filterState, filterDispatch } = useFilter();

const currentActiveColor = ({isActive}) => ({
textDecoration: isActive ? "underline" : "none"
})

const logoutHandler = () => {
navigate("/")
localStorage.removeItem("token");
localStorage.removeItem("user");
authDispatch({ type: "LOGOUT" });
}
return (
<nav className="navbar-section">
    <NavLink to="/">
        <h2 className="nav-heading">NOTE CAVE</h2>
    </NavLink>
    <div className="nav-icons">
        {theme === "light" ? (
        <button onClick={()=> setTheme("dark")}><i class="fas fa-moon fa-2x"> </i></button>
        ) : (
        <button onClick={()=> setTheme("light")}><i class="fad fa-sun fa-2x"></i></button>
        )}
        <button onClick={()=> setSidebar(true)}><i class="fad fa-bars fa-2x bar-hide"></i></button>
        <button onClick={()=> setFilter(true)}><i class="fas fa-filter fa-2x filter-hide"></i></button>
    </div>
    {sidebar &&
    <div className="left-list-hide">
        <p onClick={()=> setSidebar(false)}><i className="far fa-times list-close"></i></p>
        <ul className="left-list">
            <NavLink style={currentActiveColor} to="/home" className="list-color">
                <li className="list left-icon"><span><i class="far fa-home icon-color"></i></span>Home</li>
            </NavLink>
            <NavLink style={currentActiveColor} to="/label" className="list-color">
                <li className="list left-icon"><span><i class="far fa-tag icon-color"></i></span>Label</li>
            </NavLink>
            <NavLink style={currentActiveColor} to="/archive" className="list-color">
                <li className="list left-icon"><span><i class="far fa-archive icon-color"></i></span>Archive</li>
            </NavLink>
            <NavLink style={currentActiveColor} to="/trash" className="list-color">
                <li className="list left-icon"><span><i class="far fa-trash icon-color"></i></span>Trash</li>
            </NavLink>
            <NavLink style={currentActiveColor} to="/" className="list-color">
                <li className="list list-icon" onClick={logoutHandler}><span><i
                            class="far fa-sign-out-alt icon-color"></i></span>Logout</li>
            </NavLink>
        </ul>
    </div>
    }

    {filter &&
    <div className="left-list-hide">
        <p onClick={()=> setFilter(false)}><i className="far fa-times list-close"></i></p>
        <div>
            <div className="filter-top">
                <h3 className="filter-head">Filter</h3>
                <button class="btn-secondary-login" onClick={(e)=> filterDispatch({type: "CLEAR_ALL", payload:
                    filterState.allNotes})}>CLEAR ALL</button>
            </div>
            <label className="label-filter label-head">Sort By Label</label>
            {tagItem.map((tagItem)=> (
            <label class="label-filter">
                <input type="radio" name="tag" value={ tagItem} onClick={(e)=>filterDispatch({type : "TAGS", payload :
                e.target.value})}/> {tagItem} </label>
            ))}
            <label className="label-filter label-head">Sort By Priority</label>
            {priority.map((priorityName)=> (
            <label class="label-filter">
                <input type="radio" name="priority" value={ priorityName} className="inp-filter"
                    onClick={(e)=>filterDispatch({type :
                "PRIORITY", payload : e.target.value})}/> {priorityName} </label>

            ))}
        </div>
    </div>}
</nav>
);
}

export { NavbarResp };