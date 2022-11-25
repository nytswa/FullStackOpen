import axios from "axios"

// Relative URL
const baseURL = '/api/persons'
// LOCAL url "http://localhost:3001/api/persons"
// 1º Heroku Backend "https://evening-river-11436.herokuapp.com/api/persons"

// ADD
export const add = (person, persons, setPersons, editErrorMessage, setErrorMessage) => {
    axios
        .post(baseURL, person)
        .then(response => {
            setPersons(persons.concat(response.data))
            const errorObject = {
                color: 'green',
                message: `${person.name} has been added.`
            }
            editErrorMessage(setErrorMessage, 5000, errorObject)
        })
        .catch(function (error) {
            console.log(error);
            const errorObject = {
                color: 'red',
                message: error.response.data.error
            }
            editErrorMessage(setErrorMessage, 5000, errorObject)
        });
}

// DELETE
export const del = (id, name, editErrorMessage, setErrorMessage) => {
    axios
        .delete(`${baseURL}/${id}`)
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
        .put(`${baseURL}/${person.id}`, person)
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
        .get(baseURL)
        .then( response => {
            state(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}
