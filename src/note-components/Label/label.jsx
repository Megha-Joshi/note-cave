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
                        <div class="items">
                            <div class="chips-btn">
                                <ul>
                                    {tagItem.map((item,index) => (
                                    <li class="first">{item}
                                    <button className="icon-no-bg" onClick={()=> deleteTagFunction(index)}><i class="fad fa-times-circle"></i></button>
                                    </li>) 
                                    )}
                                    
                                </ul>
                                
                            </div>
                            <input placeholder="Enter new label" onKeyUp={addTagFunction}/>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>
);
}

export { Label };