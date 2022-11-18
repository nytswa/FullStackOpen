import axios from "axios"

export const addContact = (person, persons, setPersons) => {
    axios
        .post("http://localhost:3001/persons", person)
        .then(response => {
            setPersons(persons.concat(response.data))
        })
        .catch(function (error) {
            console.log(error);
        });
}