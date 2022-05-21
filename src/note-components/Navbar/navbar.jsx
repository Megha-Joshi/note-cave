import "./navbar.css"
import { useTheme } from "../../Context/theme-context";

const Navbar = () => {
const { theme, setTheme } = useTheme();
return (
<nav className="navbar-section">
    <h2 className="text-color nav-heading">NOTE CAVE</h2>
    {theme === "light" ? (
    <button onClick={()=> setTheme("dark")}><i class="fas fa-moon fa-2x"> </i></button>
    ) : (
    <button onClick={()=> setTheme("light")}><i class="fad fa-sun fa-2x"></i></button>
    )}
</nav>
);
}

export { Navbar };