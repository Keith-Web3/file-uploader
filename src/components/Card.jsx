import React from 'react'
import '../sass/card.scss'

function Card({ children, className }) {
  return <div className={`card ${className}`}>{children}</div>
}

export default Card
