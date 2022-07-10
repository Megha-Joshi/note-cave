import "../Label/label.css";
import { Sidebar } from "../Sidebar/sidebar";
import { useNote } from "../../Context/note-context";
import { NavbarResp } from "../Navbar/navbarResp";

const Label = () => {
const { tagItem, setTagItem } = useNote();
const addTagFunction = (e) => {
if(e.target.value !== "" && e.key === "Enter"){
setTagItem([...tagItem, e.target.value]);
e.target.value = "";
}
else{
setTagItem([...tagItem]);
}
}

const deleteTagFunction = (indexDeleted) => {
setTagItem(tagItem.filter((_,index) => index !== indexDeleted));
}
return (
<div className="App">
    <NavbarResp />
    <div className="main-section">
        <Sidebar />
        <div className="right-section">
            <div class="chips-container">
                <div class="container-one">
                    <p class="chips-content note-text-color">Label</p>
                    <ul class="chips-list">
                        {tagItem.map((item,index) => (
                        <li class="chips-item">{item}
                            <span className="icon-no-bg chips-icon" onClick={()=> deleteTagFunction(index)}><i
                                    class="fad fa-times-circle"></i></span>
                        </li>)
                        )}
                        <input placeholder="Press enter to add a label" class="chips-inp" onKeyUp={addTagFunction} />
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
);
}

export { Label };