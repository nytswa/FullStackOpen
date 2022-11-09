import './App.css';
import {useState} from 'react' 


const Button = ({onclick, text}) => {
  return <button onClick={onclick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}


const Statistics = ({good, neutral, bad}) => {
  // Calculus
  const all = good + neutral + bad;
  const score = (good - bad) / all;
  const percentage = (good / all) * 100;

  return <div>
    <StatisticLine text="Good" value={good}></StatisticLine>
    <StatisticLine text="Neutral" value={neutral}></StatisticLine>
    <StatisticLine text="Bad" value={bad}></StatisticLine>
    
    <StatisticLine text="all" value={all}></StatisticLine>
    <StatisticLine text="average" value={score}></StatisticLine>
    <StatisticLine text="positive" value={percentage + '%'}></StatisticLine> 
   
    {/* <p>all {all}</p>
    <p>average {score}</p>
    <p>positive {percentage} %</p> */}
  </div>
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return <div>
    <h1>Give Feedback</h1>

    <Button onclick={() => setGood(good + 1)} text="good"></Button>
    <Button onclick={() => setNeutral(neutral + 1)} text="neutral"></Button>
    <Button onclick={() => setBad(bad + 1)} text="bad"></Button>

    <h1>Statistics</h1>
    {((good + neutral + bad) === 0) ? 'No feedback given' : 
      <table>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </table>
    }
  </div>
}

export default App;
