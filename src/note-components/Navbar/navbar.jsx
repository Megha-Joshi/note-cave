import { useAuth } from "../../Context/auth-context";
import { useNavigate } from "react-router-dom";
import "./navbar.css"
const Navbar = () => {
const { authDispatch } = useAuth();
const navigate = useNavigate();

const logoutHandler = () => {
navigate("/")
localStorage.removeItem("token");
localStorage.removeItem("user");
authDispatch({ type: "LOGOUT" });
}
return (
<nav className="navbar-section">
    <h2 className="text-color nav-heading">NOTE CAVE</h2>
    <div>
        <input type="text" placeholder="Search" name="search" class="search-box" />
    </div>
    <div>
        <button class="btn btn-primary-login btn-text" onClick={logoutHandler}>Logout</button>
    </div>
    <div>
        <img src="./avatar.jpeg" class="avatar-image sm"></img>
    </div>
</nav>
);
}

export { Navbar };