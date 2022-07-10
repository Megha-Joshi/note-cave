import axios from "axios";
import {
    toast
} from "react-hot-toast";

const createNote = async (note, token, noteDispatch) => {
    try {
        const resp = await axios.post(
            "/api/notes", {
                note: note
            }, {
                headers: {
                    authorization: token
                }
            }
        );

        if (resp.status === 201) {
            localStorage.setItem("note", resp.data.notes);
            noteDispatch({
                type: "ADD_NOTES",
                payload: resp.data.notes
            });
            toast.success("New Note created !");
        } else throw new Error();
    } catch (error) {
        console.log(error);
        toast.error("Note cannot be created");
    }
};

const editNote = async (token, note, newNote, noteDispatch) => {
    try {
        const resp = await axios.post(
            `/api/notes/${note._id}`, {
                note: newNote
            }, {
                headers: {
                    authorization: token
                }
            }
        );

        if (resp.status === 200 || resp.status === 201) {
            noteDispatch({
                type: "ADD_NOTES",
                payload: resp.data.notes
            });
            toast.success("Note edited !");
        }
    } catch (error) {
        console.log(error);
        toast.error("Note cannot be edited");
    }
}

export {
    createNote,
    editNote
};