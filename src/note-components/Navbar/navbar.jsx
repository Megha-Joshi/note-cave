import "./navbar.css"
const Navbar = () => {
return (
<div className="App">
    <nav className="navbar-section">
        <h2 className="text-color nav-heading">NOTE CAVE</h2>
        <div>
        <input type="text" placeholder="Search" name="search" class="search-box" />
        </div>
        <div>
            <button class="btn btn-primary-login btn-text">Filter</button>
        </div>
        <div>
        <img src="./avatar.jpeg" class="avatar-image sm"></img>
        </div>
    </nav>
</div>
);
}

export { Navbar };