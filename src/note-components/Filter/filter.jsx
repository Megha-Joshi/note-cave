import "../Homepage/homepage.css"
import { useNote } from "../../Context/note-context";
import { useFilter } from "../../Context/filter-context";

const Filter = () =>{
const { tagItem, noteState } = useNote();
const { priority } = noteState;
const { filterState, filterDispatch } = useFilter();
return(
<div className="filter-section filter-section-hide">
    <div className="filter-top">
        <h3 className="filter-head">Filter</h3>
        <button class="btn-secondary-login" onClick={(e)=> filterDispatch({type: "CLEAR_ALL", payload:
            filterState.allNotes})}>CLEAR ALL</button>
    </div>
    <label className="label-filter label-head">Sort By Tags</label>
    {tagItem.map((tagItem)=> (
    <label class="label-filter">
        <input type="radio" name="tag" value={ tagItem} checked={filterState.sortByLabel=== tagItem} onClick={(e)=>filterDispatch({type : "TAGS", payload :
        e.target.value})}/> {tagItem} </label>
    ))}
    <label className="label-filter label-head">Sort By Priority</label>
    {priority.map((priorityName)=> (
    <label class="label-filter">
        <input type="radio" name="priority" value={ priorityName} className="inp-filter" checked={filterState.sortByPriority=== priorityName}
            onClick={(e)=>filterDispatch({type :
        "PRIORITY", payload : e.target.value})}/> {priorityName} </label>

    ))}
</div>
)
}

export { Filter };