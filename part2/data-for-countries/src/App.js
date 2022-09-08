import './App.css';
import { useState, useEffect } from 'react'




function App() {
  const { countries, setCountires } = useState([])
  const { searchCountry, setSearchCountry } = useState('');

  useEffect( () => {
    axios
      .then
  }, []);

  const handleSearch = (e) => {
    setSearchCountry(e.target.value)
  }

  return (
    <div className="App">
      <form>
        <input type='text' onChange={handleSearch} value={ searchCountry }>find countries</input>
      </form>
    </div>
  );
}

export default App;
