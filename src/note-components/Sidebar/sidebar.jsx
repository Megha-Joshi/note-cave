import "../Homepage/homepage.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth-context";
const Sidebar = () => {

    const { authDispatch } = useAuth();
    const navigate = useNavigate();

    const currentActiveColor = ({isActive}) => ({
        color : isActive ? "#990033" : "#c3c0c0"
    })

    const logoutHandler = () => {
        navigate("/")
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        authDispatch({ type: "LOGOUT" });
        }

return (
<div className="left-section">
    <NavLink style={currentActiveColor} to="/home">
    <div className="list left-icon">
        <span><i class="far fa-home icon-color"></i></span>
        <p>Home</p>
    </div>
    </NavLink>
    <NavLink style={currentActiveColor} to="/label">
    <div className="list left-icon">
        <span><i class="far fa-tag icon-color"></i></span>
        <p>Label</p>
    </div>
    </NavLink>
    <NavLink style={currentActiveColor} to="/archive">
    <div className="list left-icon">
        <span><i class="far fa-archive icon-color"></i></span>
        <p>Archieve</p>
    </div>
    </NavLink>
    <NavLink style={currentActiveColor} to="/trash">
    <div className="list left-icon">
        <span><i class="far fa-trash icon-color"></i></span>
        <p>Trash</p>
    </div>
    </NavLink>
    <div className="list left-icon">
        <span><i class="far fa-sign-out-alt icon-color"></i></span>
        <p onClick={logoutHandler}>Logout</p>
    </div>
</div>
);
}

export { Sidebar };