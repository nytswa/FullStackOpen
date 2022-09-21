import { useEffect, useState } from 'react'
import { getContacts } from './getContacts'
import { addContact } from './addContact'
import { delContact } from './delContact'


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

const Person = ({p, handler}) => <div>{p.name} {p.number} <button onClick={() => handler(p)}>⤬</button></div>


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

  // const [persons, setPersons] = useState(getContacts());
  // useEffect( () => getContact(setPersons), [])
  useEffect( () => getContacts(setPersons), [])

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
      addContact(person, persons, setPersons)

      // Simula estar en Sync: lo añade al estado local (sin id)
      // setPersons(persons.concat(person))
      
      setNewName('')
      setNewPhone('')
    }
    else {
      alert(`${person.name} is already added to phonebook.`)
    }
  }

  const handleDelete = (p) => {
    if (window.confirm(`Do you really want to delete ${p.name} from you contacts?`))  {
      // console.log('handleDelete', p)
      delContact(p.id)
      setPersons(persons
        .filter(m => m.id !== p.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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