const nodemon = require("nodemon")
const {Schema, model} = require('mongoose')

// Schema / Structure
const personSchema = new Schema({
    name: String,
    number: Number
})

// Changing toJSON (pre-processing before saving)
// edit toJSON, antes de que se mande a la base de datos
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Model
const Person = model('Person', personSchema)


//// Instance example
// const person = new Person ({
//     name: 'Austin',
//     number: 1234
// })
//// Saving
// person.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.error(err)
//     })


module.exports = Person