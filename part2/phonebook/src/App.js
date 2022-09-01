import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '39-445-3532323'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handlePhone = (e) => {
    setNewPhone(e.target.value)
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
      <form onSubmit={handleSubmit}>
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
      <div>debug: {newName} </div>
      {persons.map((p) => {
          return <p key={p.name}>{p.name} {p.number}</p>
      })}
    </div>
  )
}

export default App