import axios from 'axios'

export const getContacts = (state) => {
    axios
        .get("http://localhost:3001/persons")
        .then( response => {
            state(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}