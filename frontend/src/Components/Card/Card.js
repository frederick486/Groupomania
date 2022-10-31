import React from 'react'
import './Card.css'
import Canyon from '../../Assets/Canyon.jpg'

export default function Card(props) {

  return (
    <div className='card'>
      {/* <img src={iten.picture} alt="Canyon" /> */}

      {props.children}
      
    </div>
  )
}