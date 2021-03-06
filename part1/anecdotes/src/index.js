import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdotes, index}) => (
  <div>
    {anecdotes[index]}
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Votes = ({count}) => {
  const votes = (count !== 1) ? 'votes' : 'vote'
  return (
    <div>
      has {count} {votes}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const setToValue = (value) => () => setSelected(value)

  const [points, setPoints] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0)
  )
  const addPoint = (index) => () => {
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)
  }
  const highestRatedIndex = points.indexOf(Math.max(...points))

  const randomIndex = () => {
    const number = Math.floor(
      Math.random() * props.anecdotes.length
    )
    return (number === selected) ? randomIndex() : number
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdotes={props.anecdotes} index={selected} />
      <Votes count={points[selected]} />
      <div>
        <Button handleClick={addPoint(selected)} text="vote" />
        <Button handleClick={setToValue(randomIndex)} text="next anecdote" />
      </div>
      <Header text="Anecdote with the most votes" />
      <Anecdote anecdotes={props.anecdotes} index={highestRatedIndex} />
      <Votes count={points[highestRatedIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
