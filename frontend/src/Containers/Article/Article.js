import React from 'react'
import {useLocation} from 'react-router-dom'
import './Article.css'


export default function Article() {

  const location = useLocation()
  console.log(location)

  return (
    <div className="article-content">
        {/* <h2>Votre article : {location.state.title}</h2> */}
        <h2>Votre article :</h2>
        {/* <p>{location.state.body}</p> */}
        <p>{location.pathname.split('/')[2].replace('-','\s+')} </p>
    </div>
  )
}
