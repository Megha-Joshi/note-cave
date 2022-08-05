import "../../public-css/root.css";
import "./navbar.css"
import { useTheme } from "../../Context/theme-context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
const { theme, setTheme } = useTheme();
return (
<nav className="navbar-section">
    <NavLink to="/">
        <h2 className="nav-heading">NOTE CAVE</h2>
    </NavLink>
    <div className="nav-icons">
        {theme === "light" ? (
        <button className="icon-no-bg" onClick={()=> setTheme("dark")}><i class="fas fa-moon fa-2x"> </i></button>
        ) : (
        <button className="icon-no-bg" onClick={()=> setTheme("light")}><i class="fas fa-sun fa-2x"></i></button>
        )}
    </div>
</nav>
);
}

export { Navbar };