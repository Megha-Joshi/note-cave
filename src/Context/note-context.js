import { createContext, useReducer, useContext } from "react";

const NoteContext = createContext();

const noteReducerFun = (noteState,{ type, payload }) => {
    switch (type) {
      case "ADD_NOTES":
        return { ...noteState, note: payload };
      case "DELETE_NOTE":
        return { ...noteState, 
          note: payload.note,
          trash: [...noteState.trash, { ...payload.trash }] };
      case "ADD_TO_ARCHIVE":
        return{...noteState,
          note: payload.note,
          archive: payload.archive
          }
      case "DELETE_NOTE_FROM_ARCHIVE":
        return{
          ...noteState,
          archive: payload.archive,
          trash: [...noteState.trash, { ...payload.trash }] };
      default:
        return noteState;
    }
  };

const NoteProvider = ({children}) => {
    const [noteState, noteDispatch] = useReducer(noteReducerFun, {note:[], trash:[], archive: []})

    return(<NoteContext.Provider value={{noteState, noteDispatch}}>{children}</NoteContext.Provider>);
};

const useNote = () => useContext(NoteContext);

export { useNote, NoteProvider };