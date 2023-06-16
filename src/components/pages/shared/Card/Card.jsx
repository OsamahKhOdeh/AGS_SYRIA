import React from 'react'
import './card.scss'
export const Card = (props) => {
  return (
    <div className='card'>
        <div className="card-tittle">
            <h5>{props.tittle}</h5>
        </div>
    </div>
  )
}

export default Card
