import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  const formatted_parts = () => parts.map(part =>
    <Part
      key={part.id}
      name={part.name}
      exercises={part.exercises}
    />
  )

  return (
    <div>
      {formatted_parts()}
    </div>
  )
}

export default Content
