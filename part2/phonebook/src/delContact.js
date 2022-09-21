import axios from "axios"

export const delContact = (p) => {
    axios
        .delete(`http://localhost:3001/persons/${p.id}`)
        .then()
        .catch(function (error) {
            console.log(error);
        });
}