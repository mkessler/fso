import React from 'react'

const Total = ({ parts }) => {
  const total_exercises = parts.reduce((sum, part) =>
    sum + part.exercises, 0
  )

  return (
    <p>
      Number of exercises {total_exercises}
    </p>
  )
}

export default Total
