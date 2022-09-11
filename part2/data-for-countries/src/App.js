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
      {/* Alternative -> {Object.entries(object.languages).map( l =>  <li key={l}>{l[1]}</li> )} */}
      {Object.values(object.languages).map( l =>  <li key={l}>{l}</li> )}
    </ul>
    

    <div>
      <img src={object.flags.png} alt={object.name.official} width="75" height="50" /><br></br>
      <label>{`${object.name.official} flag`}</label>
    </div>
  </div>
}

const SimpleCountry = ({country, handler}) => {
  return <p>
    {country.name.common} 
    <button onClick={ () => handler(country) }>show</button>
  </p>
}

const Search = ({label, handler, value, placeholder}) => {
  return (
    <div>
      { label }
      <input type='text' onChange={e => handler(e)} value={ value } placeholder={ placeholder }/>
    </div>
  )
}

const Main = ({filterBy, countries, handler, showButton}) => {
  let filterCountries = [showButton[0]]

  if (filterBy.length === 0) {
    return 'Try writing something'

  // An additional elseif to SAVE some filtering work
  // } else if (filterBy.length < 3) {
  //   return "I won't start seaching just to save us some memory"

  } else if (!showButton[1]) {
    filterCountries = countries
      .filter( (c) => {
        return c.name.common.toLowerCase().includes(filterBy.toLowerCase())
      })
  }

  if (filterCountries.length === 0) {
    return 'Nothing Found'
  } else if (filterCountries.length > 10) {
    return 'Too many matches specify another filter'
  } else if (filterCountries.length === 1) {
    return <Country object={ filterCountries[0] }></Country>
  } else {
    return <div>
      {filterCountries
        .map( (c) => {
          return <SimpleCountry key={c.name.common} handler={(e) => handler(e, c)} country={c}></SimpleCountry>
        })}
    </div>
  }
}

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ filterBy, setFilterBy ] = useState('');
  const [ showButton, setShowButton ] = useState([{}, false]);
  

  useEffect( () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .catch(e => {
        console.log(e)
      })
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleSearch = (event) => {
    setFilterBy(event.target.value)
    setShowButton([{}, false])
  }

  const handleShow = (event, country) => {
    setShowButton([country, true])
  }

  if (countries.length === 0) {
    return 'fetching data...'
  }

  return (
    <div className="App">
        <Search 
          label='find countries:' 
          value={filterBy} 
          placeholder='search' 
          handler={handleSearch} 
        ></Search>

        <Main 
          filterBy={filterBy} 
          countries={countries}
          handler={handleShow}
          showButton={showButton}
        ></Main>
    </div>
  )
}

export default App;
