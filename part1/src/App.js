import './App.css';
import Title from "./Title.js"

// comment
function App() {
  const mensaje = 'Hello'

  return (
    <div className="App"> 
      <Title message="◇ ️⚠ ™" />
      {mensaje + ' world'}
    </div>
  );
}

export default App;
