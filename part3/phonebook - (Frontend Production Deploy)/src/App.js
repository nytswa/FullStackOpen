import { useEffect, useState } from 'react'
import { editErrorMessage } from './generalFunctions'
import * as contacts from './contactsRequests'


const GeneralInput = ({handler, value, name}) => {
  return (
    <div>
      {name}: <input type='text' onChange={handler} value={value} />
    </div>
  )
}

const NewContact = ({handleName, handleSubmit, handlePhone, nameValue, phoneValue}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Contact</h2>
      <GeneralInput handler={handleName} value={nameValue} name='name' ></GeneralInput>
      <GeneralInput handler={handlePhone} value={phoneValue} name='number' ></GeneralInput>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  const error = {
    color: message.color,
    background: 'rgb(240, 240, 240)',
    fontSize: 20,
    border: '1px solid rgb(11, 11, 11)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={error}>
      {message.message}
    </div>
  )
}

const Person = ({p, handler}) => <div className='contact'>{p.name} {p.number} <button onClick={() => handler(p)}>⤬</button></div>


const Contacts = ({persons, filter, handler}) => {
  return <div>
    <h2>Numbers</h2>
    {persons
        .filter((p)  => {
          return (filter === '') ? true : p.name.toLowerCase().startsWith(filter.toLowerCase())
        })
        .map((p) => {
          return <Person key={p.name} p={p} handler={handler}></Person>
      })}
  </div>
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  // const [persons, setPersons] = useState(getContacts());
  // useEffect( () => getContact(setPersons), [])
  // useEffect( () => getContacts(setPersons), [])
  useEffect( () => contacts.get(setPersons), [])

  const handler = (event, change) => {
    return change(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newPhone
    }
    if (persons.findIndex(element => element.name === person.name) === -1) {
      // Lo añade a la base de datos json-server
      contacts.add(person, persons, setPersons, editErrorMessage, setErrorMessage)

      // Simula estar en Sync: lo añade al estado local (sin id)
      // setPersons(persons.concat(person))
      

      const errorObject = {
        color: 'green',
        message: `${newName} has been added.`
      }
      editErrorMessage(setErrorMessage, 5000, errorObject)

      setNewName('')
      setNewPhone('')
    }
    else {
      let message = "is already added to phonebook, replace the old number with the new one provided?"
      if (window.confirm(`${person.name} ${message}`))  {
        // Look and find inside the state "database" (where it does have id)
        const getPerson = persons.find(e => e.name === person.name)
        // Change the number
        getPerson.number = person.number
        // Send as PUT request and update state
        contacts.edit(getPerson, persons, setPersons, editErrorMessage, setErrorMessage)
      }
    }
  }

  const handleDelete = (p) => {
    if (window.confirm(`Do you really want to delete ${p.name} from you contacts?`))  {
      // console.log('handleDelete', p)
      contacts.del(p.id, p.name, editErrorMessage, setErrorMessage)
      setPersons(persons
        .filter(m => m.id !== p.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}></Notification>
      <GeneralInput handler={ (e) => handler(e, setFilterBy) } value={filterBy} name='search'></GeneralInput>

      <NewContact 
        handleName={(e) => handler(e, setNewName)} 
        handlePhone={(e) => handler(e, setNewPhone)} 
        handleSubmit={handleSubmit} 
        nameValue={newName} 
        phoneValue={newPhone}
      ></NewContact>
      
      <Contacts persons={persons} filter={filterBy} handler={handleDelete}></Contacts>
    </div>
  )
}

export default App