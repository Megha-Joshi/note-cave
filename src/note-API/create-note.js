import axios from "axios";

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
        } else throw new Error();
    } catch (error) {
        console.log(error);
    }
};

export {
    createNote
};