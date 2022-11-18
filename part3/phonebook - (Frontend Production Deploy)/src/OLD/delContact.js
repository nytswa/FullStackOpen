import axios from "axios"

export const delContact = (id) => {
    axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then()
        .catch(function (error) {
            console.log(error);
        });
}