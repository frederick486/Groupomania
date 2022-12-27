import React from 'react'
import './postCard.css'
import { Link } from 'react-router-dom'

// Components Matérial UI
import Avatar from '@mui/material/Avatar';

// Components Matérial UI (timeago)
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'


export default function PostCard(props) {
    const formatter = buildFormatter(frenchStrings)

  return (
    <>
        <Link 
            to={ `/post/${props.card._id}` } 
            style={{textDecoration:"none", color:"black"} }
        >
            <div className='postCard'>
                <div className='postCard-header'>

                    <div className="postCard-header-avatar">
                        <Avatar 
                            sx={{ width: 56, height: 56 }}
                            alt="Auteur du post" 
                            // src="/static/images/avatar/1.jpg" 
                            src={props.card.profileImgUrl}
                        />

                        <div className="postCard-header-text">
                            <span className="postCard-header-text-pseudo">
                                Post de {props.card.pseudo}
                            </span>
                            <TimeAgo 
                                className='postCard-header-text-timeAgo'
                                date={`${props.card.createdAt}`} 
                                formatter={formatter} 
                            />
                        </div>
                    </div>
                </div>

                <div className="postCard-img-wrapper">
                    <img className="postCard-img"
                        src={props.card.postImgUrl} 
                        alt="" 
                    />
                </div>

                <div className="postCard-desc">
                    <h5>{props.card.title}</h5>                                                   
                    <p>{props.card.desc}</p>
                </div>

            </div>
        </Link>
    </>
  )
}