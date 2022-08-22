
import './App.css';
import { useState } from 'react'


// const handleAnecdotes = ({set}) => {
//   return set()
// }


function handleVotes(selected, votes, setVotes) {
  votes[selected] += 1
  return setVotes(votes)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    "A common mistake that people make when trying to design something completely foolproof was to underestimate the ingenuity of complete fools. - Douglas Adams"
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  let copyVotes = [...votes]
  const maxVotes = Math.max(...copyVotes)

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => handleVotes(selected, copyVotes, setVotes)}>vote</button>
      <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>Next Anecdote</button>
      <h2>Anecdote with most votes</h2>
      {(maxVotes === 0) ? 'No best anecdote' : anecdotes[copyVotes.indexOf(maxVotes)]}
    </div>
  )
}

export default App