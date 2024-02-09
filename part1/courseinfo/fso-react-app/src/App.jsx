import Feedback from "./components/Feedback"
import Header from "./components/Header"
import Stats from "./components/Stats"

import { useState } from "react"

const App = () => {

  // Managing state
  const [lastBtnClicked, setLastBtnClicked] = useState("")
  const [stats, setStats] = useState({
    Good: 0,
    Neutral: 0,
    Bad: 0
  })

  // Anecdotes exercise
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [anecdote, setAnecdote] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  function selectRandomAnecdote() {
    const random = Math.floor(Math.random() * anecdotes.length)
    setAnecdote(random)
  }

  function handleAnecdotesVotes() {
    const copyOfVotes = [...votes];
    copyOfVotes[anecdote] += 1;
    setVotes(copyOfVotes);
  }

  function anecdoteWithMostVotes() {
    const indexOfAnecdoteWithMostVotes = votes.indexOf(Math.max(...votes));
    return anecdotes[indexOfAnecdoteWithMostVotes];
  }

  return (
    <div style={{maxWidth: "500px", margin: "0 auto"}}>
      <div>
        <Header />
        <Feedback
          lastBtnClicked={lastBtnClicked}
          setLastBtnClicked={setLastBtnClicked}
          setStats={setStats}
        />
        <Stats stats={stats} />
      </div>
      <div className="anecdotes">
        <h2>Anecdote:</h2>
        <p>{anecdotes[anecdote]}</p>
        <p>This anedote has {votes[anecdote]} votes</p>
        <button onClick={selectRandomAnecdote}>Next anecdote</button>
        <button onClick={handleAnecdotesVotes}>Vote</button>
        <h2>Anecdote with most votes</h2>
        <p>{anecdoteWithMostVotes()}</p>
      </div>
    </div>
  )
}

export default App