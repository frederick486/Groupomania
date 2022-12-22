import React from 'react'
import './postCard.css'
import {Link} from 'react-router-dom'

// import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


export default function PostCard(props) {

  return (
    <>
        <Link 
            to={ `/post/${props.card._id}` } 
            style={{textDecoration:"none", color:"black"} }
        >
            <div className='cardPost'>
                <div className='postCardHeader'>
                    {/* <Avatar 
                        sx={{ width: 56, height: 56 }}
                        alt="Auteur du post" 
                        // src="/static/images/avatar/1.jpg" 
                        src={props.card.profileImgUrl}
                    /> */}
                    {/* <p className='postCardHeaderPseudo'>{props.card.pseudo}</p> */}

                    {/* <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    /> */}

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar 
                            sx={{ width: 56, height: 56 }}
                            alt="Auteur du post" 
                            // src="/static/images/avatar/1.jpg" 
                            src={props.card.profileImgUrl}
                        />
                        </ListItemAvatar>
                        <ListItemText
                            style={{ marginLeft: "10px" }}
                            primary={props.card.title}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {props.card.pseudo}
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>

            </div>


                {/* <div className="postImageWrapper">
                    <img 
                        src={props.card.img} 
                        alt="" 
                    />
                </div> */}
        
                <img className="postImageWrapper"
                    src={props.card.postImgUrl} 
                    alt="" 
                />
                         
                {/* <h2>{props.card.title}</h2> */}
                <p>{props.card.desc}</p>
            </div>
        </Link>
    </>
  )
}