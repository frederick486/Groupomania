import React from 'react'
import './postCard.css'
import {Link} from 'react-router-dom'


export default function PostCard(props) {

  return (
    <>
        <Link 
            to={ `/post/${props.card._id}` } 
            style={{textDecoration:"none", color:"black"} }
        >
            <div className='cardPost'>
                <div className="postImageWrapper">
                    <img 
                        src={props.card.img} 
                        alt="" 
                    />
                </div>
                <h2>{props.card.title}</h2>
                <p>{props.card.desc}</p>
            </div>
        </Link>
    </>
  )
}
