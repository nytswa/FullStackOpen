import { useState } from 'react'

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


  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handlePhone = (e) => {
    setNewPhone(e.target.value)
  }

  const handleFilter = (e) => {
    setFilterBy(e.target.value)
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
      <form>
        <div>
          search: <input type='text' onChange={handleFilter} value={filterBy} />
        </div>
      </form>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Contact</h2>
        <div>
          name: <input type='text' onChange={handleName} value={newName} />
        </div>
        <div>
          number: <input type='text' onChange={handlePhone} value={newPhone} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* <div>debug: {newName} </div> */}
      {persons
        .filter((p)  => {
          return (filterBy === '') ? true : p.name.toLowerCase().startsWith(filterBy.toLowerCase())
        })
        .map((p) => {
          return <p key={p.name}>{p.name} {p.number}</p>
      })}
    </div>
  )
}

export default App