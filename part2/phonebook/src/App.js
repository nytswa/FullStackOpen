import { useState } from 'react'

const GeneralInput = ({handler, value, name}) => {
  return (
    <div>
      {name}: <input type='text' onChange={handler} value={value} />
    </div>
  )
}

const SearchBar = ({handler, value, name}) => {
  return (
    <GeneralInput handler={handler} value={value} name={name} ></GeneralInput>
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

const Person = ({p}) => <p>{p.name} {p.number}</p>

const Contacts = ({persons, filter}) => {
  return <div>
    <h2>Numbers</h2>
    {persons
        .filter((p)  => {
          return (filter === '') ? true : p.name.toLowerCase().startsWith(filter.toLowerCase())
        })
        .map((p) => {
          return <Person key={p.name} p={p}></Person>
      })}
  </div>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterBy, setFilterBy] = useState('')

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
      setPersons(persons.concat(person))
      setNewName('')
    }
    else {
      alert(`${person.name} is already added to phonebook.`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar handler={ (e) => handler(e, setFilterBy) } value={filterBy} name='search'></SearchBar>

      <NewContact 
        handleName={(e) => handler(e, setNewName)} 
        handlePhone={(e) => handler(e, setNewPhone)} 
        handleSubmit={handleSubmit} 
        nameValue={newName} 
        phoneValue={newPhone}
        ></NewContact>
      
      <Contacts persons={persons} filter={filterBy}></Contacts>
    </div>
  )
}

export default App