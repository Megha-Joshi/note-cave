import "../../public-css/root.css"
import "./landingpage.css";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/navbar.jsx";

const Landingpage = () => {
return (
<div className="App">
    <Navbar />
    <div className="main-container">
        <div className="right-container">
            <img src="./home-img.svg" alt="Notes" className="home-img" />
        </div>
        <div className="left-container">
            <h1 className="heading">NOTE CAVE</h1>
            <section className="content-section">
                <h2>Save your thoughts, wherever you are!!! </h2>
                <p className="para-content title title-content">Note Cave offers
                    you the easiest way to create notes and to-do lists, capture ideas, and more. </p>
                <div>
                    <Link to="/signup">
                    <button className="btn btn-primary-login btn-text">JOIN NOW</button>
                    </Link>
                    <Link to="/login">
                    <button className="btn btn-secondary-login">Already have an account?</button>
                    </Link>
                </div>
            </section>
        </div>
    </div>
</div>
);
}

export { Landingpage };