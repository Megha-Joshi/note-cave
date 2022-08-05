import "../../public-css/root.css"
import "../Homepage/homepage.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth-context";
const Sidebar = () => {

const { authDispatch } = useAuth();
const navigate = useNavigate();

const currentActiveColor = ({isActive}) => ({
textDecoration: isActive ? "underline" : "none"
})

const logoutHandler = () => {
// navigate("/")
localStorage.removeItem("token");
localStorage.removeItem("user");
authDispatch({ type: "LOGOUT" });
navigate("/")
}

return (
<aside className="left-section left-section-hide">
    <ul className="left-list">
        <NavLink style={currentActiveColor} to="/home" className="list-color">
            <li className="list left-icon"><span><i class="far fa-home icon-color"></i></span>Home</li>
        </NavLink>
        <NavLink style={currentActiveColor} to="/label" className="list-color">
            <li className="list left-icon"><span><i class="far fa-tag icon-color"></i></span>Tags</li>
        </NavLink>
        <NavLink style={currentActiveColor} to="/archive" className="list-color">
            <li className="list left-icon"><span><i class="far fa-archive icon-color"></i></span>Archive</li>
        </NavLink>
        <NavLink style={currentActiveColor} to="/trash" className="list-color">
            <li className="list left-icon"><span><i class="far fa-trash icon-color"></i></span>Trash</li>
        </NavLink>
        <NavLink style={currentActiveColor} to="/" className="list-color">
            <li className="list left-icon" onClick={logoutHandler}><span><i
                        class="far fa-sign-out-alt icon-color"></i></span>Logout</li>
        </NavLink>
    </ul>
</aside>
);
}

export { Sidebar };