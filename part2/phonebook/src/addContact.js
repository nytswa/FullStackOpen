import axios from "axios"

export const addContact = (person) => {
    axios
        .post("http://localhost:3001/persons", person)
        .catch(function (error) {
            console.log(error);
        });
}