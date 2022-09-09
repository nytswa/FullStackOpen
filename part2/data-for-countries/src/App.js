import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({object}) => {
  return <div>
    <h2>{object.name.common}</h2>
    <p>Official Name: <strong>{object.name.official}</strong> </p>
    <p>Capital: {object.capital}</p>
    <p>Area: {object.area}</p>
    
    <h4>Languages</h4>
    <ul>
      {/* {Object.entries(object.languages).map( l =>  <li key={l}>{l[1]}</li> )} */}
      {Object.values(object.languages).map( l =>  <li key={l}>{l}</li> )}
    </ul>
    

    <div>
      <img src={object.flags.png} alt={object.name.official} width="75" height="50" /><br></br>
      <label>{`${object.name.official} flag`}</label>
    </div>
  </div>
}

const Search = ({label, handler, value, placeholder}) => {
  return (
    <div>
      { label }
      <input type='text' onChange={e => handler(e)} value={ value } placeholder={ placeholder }/>
    </div>
  )
}

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ countriesOnDisplay, setCountriesOnDisplay ] = useState([]);
  const [ filterBy, setFilterBy ] = useState('');

  useEffect( () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .catch(e => {
        console.log(e)
      })
      .then(response => {
        setCountries(response.data);
        console.log('Data Received (example) :', response.data[0]);
      })
  }, []);

  const handleSearch = (event) => {
    setFilterBy(event.target.value)
  }


  if (countries.length === 0) {
    return 'fetching data...'
  }

  return (
    <div className="App">
        <Search label='find countries:' value={filterBy} placeholder='search' handler={handleSearch} autofocus></Search>

        {(filterBy.length < 4) ? 'Too many matches specify another filter' : 
          countries
            .filter( c => {
              return (filterBy.length < 4) ? false : c.name.common.toLowerCase().includes(filterBy.toLowerCase())
            })
            .map( c => {
              return <Country key={c.name.official} object={ c }></Country>
            })
        }

    </div>
  )
}

export default App;
