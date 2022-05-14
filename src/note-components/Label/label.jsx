import { Navbar } from "../Navbar/navbar";
import { Sidebar } from "../Sidebar/sidebar";
import "../Label/label.css"

const Label = () => {
return (
<div className="App">
    <Navbar />
    <div className="main-section">
        <Sidebar />
        <div className="right-section">
            <h2 className="page-heading">Label</h2>
                <div class="chips-container">
                    <div class="container-one">
                        <div class="items">
                            <div class="btn">
                                <p class="first">Lemon</p>
                                <img src="https://api.iconify.design/maki:cross-11.svg" alt="cross" class="image" />
                            </div>
                            <p>New fruit...</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>
);
}

export { Label };