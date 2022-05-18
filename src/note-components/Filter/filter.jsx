import { useNote } from "../../Context/note-context";
import { useFilter } from "../../Context/filter-context";

const Filter = () =>{
const { tagItem, noteState } = useNote();
const { priority, note } = noteState;
const { filterState, filterDispatch } = useFilter();
return(
<div>
    <div>
    <select name="filter" id="filter" onClick={(e) => filterDispatch({type: "TAGS", payload: e.target.value})}>
        {tagItem.map((tagItemName) =>
        <option value={tagItemName}>{tagItemName}</option>
        )}
    </select>
    </div>
    <div>
        <select  name="priority" id="priority" onClick={(e) => filterDispatch({type: "PRIORITY", payload: e.target.value})}>
        {priority.map((priorityName) =>
        <option value={priorityName}>{priorityName}</option>
        )}
    </select>
    </div>
    <button class="btn btn-primary-login btn-text" onClick={(e) => filterDispatch({type: "CLEAR_ALL", payload: filterState.allNotes})}>CLEAR ALL</button>
</div>
)
}

export { Filter };