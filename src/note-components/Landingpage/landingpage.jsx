import "./landingpage.css";

const Landingpage = () => {
return (
<div className="App">
    <div className="main-container">
        <div className="left-container">
            <h1 className="heading">NOTE CAVE</h1>
            <section className="content-section">
                <h2>Save your thoughts, wherever you are!!! </h2>
                <p className="para-content title title-content">Note Cave offers
                    you the easiest way to create notes and to-do lists, capture ideas, and more. </p>
                <div>
                    <button className="btn btn-primary-login btn-text">JOIN NOW</button>
                    <button className="btn btn-secondary-login">Already have an account?</button>
                </div>
            </section>
        </div>
        <div className="right-container">
            <img src="./notes.png" alt="Notes" className="home-img" />
        </div>
    </div>
</div>
);
}

export { Landingpage };