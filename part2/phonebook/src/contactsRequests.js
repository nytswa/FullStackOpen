import axios from "axios"


// ADD
export const add = (person, persons, setPersons) => {
    axios
        .post("http://localhost:3001/persons", person)
        .then(response => {
            setPersons(persons.concat(response.data))
        })
        .catch(function (error) {
            console.log(error);
        });
}

// DELETE
export const del = (id, name, editErrorMessage, setErrorMessage) => {
    axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then( () => {
            const errorObject = {
                color: 'green',
                message: `${name} has been deleted.`
            }
            editErrorMessage(setErrorMessage, 5000, errorObject)
        })
        .catch(function (error) {
            console.log(error);
            const errorObject = {
                color: 'red',
                message: `Error 404 Not Found. Couldn't delete. ${name} has already been removed from the server.`
            }
            editErrorMessage(setErrorMessage, 5000, errorObject)
        });
}

// PUT / EDIT
export const edit = (person, persons, setPersons, editErrorMessage, setErrorMessage) => {
    axios
        .put(`http://localhost:3001/persons/${person.id}`, person)
        .then(response => {
            setPersons(persons.map( n => n.id !== person.id ? n : response.data ))
            const errorObject = {
                color: 'green',
                message: `${person.name} has been edited.`
            }
            editErrorMessage(setErrorMessage, 5000, errorObject)
        })
        .catch(function (error) {
            console.log(error);

            const errorObject = {
                color: 'red',
                message: `Information from ${person.name} has already been removed from the server.`
            }
            editErrorMessage(setErrorMessage, 5000, errorObject)
        });
}

// GET ALL
export const get = (state) => {
    axios
        .get("http://localhost:3001/persons")
        .then( response => {
            state(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}
