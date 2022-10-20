import axios from "axios"

export const editContact = (person, persons, setPersons) => {
    axios
        .put(`http://localhost:3001/persons/${person.id}`, person)
        .then(response => {
            setPersons(persons.map( n => n.id !== person.id ? n : response.data ))
        })
        .catch(function (error) {
            console.log(error);
        });
}