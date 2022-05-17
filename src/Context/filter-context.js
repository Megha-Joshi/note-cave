import { createContext, useReducer, useContext } from "react";
import { useNote } from "./note-context";

const FilterContext = createContext();


const FilterProvider = ({children}) => {
    const { noteState } = useNote();
    const { note} = noteState;
    console.log(note);
    const filterReducerFun = (filterState, action) => {
        switch(action.type){
            case "TAGS" :
                return{
                    ...filterState,
                    sortByLabel: action.payload,
                }
            case "PRIORITY" :
                return{
                    ...filterState,
                    sortByPriority: action.payload,
                }
            case "CLEAR_ALL" :
                return{
                    ...filterState,
                    sortByLabel: "",
                    sortByPriority: "",
                    allNotes: filterState.allNotes
                }
            default:
                return filterState;
        }
    };
    const [filterState, filterDispatch ] = useReducer(filterReducerFun, {
        sortByLabel: "",
        sortByPriority: "",
        allNotes: [...note]
    });

    const tagFilter = (note, filterOnTag) => {
        if (note!==[] || note!== "undefined"){
            const showData = [...note];
                if(filterOnTag !==  ""){
                        const arr = showData.filter((item) =>
                            item.tags === filterOnTag
                        )
                        return arr;
                }
                return showData;
                }
        }

    const priorityFilter = (note, filterOnPriority) =>{
        if (note!==[] || note!== "undefined"){
            const showData = [...note];
            if(filterOnPriority!== ""){
                    const arr = showData.filter((item)=>
                    filterOnPriority === item.priorityPlace)
                    return arr;
                }
            return showData;
        }
    }

    const finalFilter = (note , filterState) =>{
        const {sortByLabel, sortByPriority} = filterState;
        const labelFilter = tagFilter(note, sortByLabel);
        const prioFilter = priorityFilter(labelFilter, sortByPriority);
        return prioFilter;
    }

    return(<FilterContext.Provider value={{filterState, filterDispatch, finalFilter}}>{children}</FilterContext.Provider>)
};

const useFilter = () => useContext(FilterContext);

export { useFilter, FilterProvider };