import { Navbar } from "../Navbar/navbar";
import { Sidebar } from "../Sidebar/sidebar";
import "../Label/label.css"
import { useNote } from "../../Context/note-context";

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
    <Navbar />
    <div className="main-section">
        <Sidebar />
        <div className="right-section">
            <h2 className="page-heading">Label</h2>
                <div class="chips-container">
                    <div class="container-one">
                        <p class="chips-content">Label</p>
                        <div class="items">
                                <ul class="chips-btn-one">
                                    {tagItem.map((item,index) => (
                                    <li class="first chips-btn">{item}
                                    <span className="icon-no-bg" onClick={()=> deleteTagFunction(index)}><i class="fad fa-times-circle"></i></span>
                                    </li>) 
                                    )}
                                    <input placeholder="Press enter to add a label" class="chips-inp"onKeyUp={addTagFunction}/>
                                    
                                </ul>
                                </div>
                    </div>
                </div>
        </div>
    </div>
</div>
);
}

export { Label };