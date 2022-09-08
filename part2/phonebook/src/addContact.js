import axios from "axios"

export const addContact = (person) => {
    axios
        .post("http://localhost:3001/persons", person)
}