import React from 'react'
import { useState } from 'react';
import './postComment.css'

import { API_URL } from '../../config';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// Formulaire
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// Affichage
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';


export default function PostComment ({props}) {

    const [pseudo, setPseudo] = useState("")
    const [comment, setComment] = useState("");

    const [comments, setComments] = useState([])

    const navigate = useNavigate()
    const id = useParams().postId

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get( API_URL + '/' + id  );
                setComments(response.data.comments);
            } catch (err) {
                console.log(err)            
            }
        })();
    }, []);        

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("pseudo :", pseudo)
        console.log("comment :", comment)

        try {
            await axios.put( API_URL + '/comment-post/' + id, 
                { 
                    commenterId: "63581eb8f1df05c37b29011a",
                    commenterPseudo: pseudo,
                    text: comment        
                }, 
                setComment("")
            );
        } catch (err) {
            console.log(err)
        }

        try {
            const response = await axios.get( API_URL + '/' + id  );
            setComments(response.data.comments);
        } catch (err) {
            console.log(err)            
        }

    }

    const deleteComment = async (e) => {
        // console.log("e.target.id : ", e.target.id)

        try {
            await axios.put( API_URL + '/delete-comment-post/' + id, 
            { commentId: e.target.id }
        )                     
        } catch (err) {
            console.log(err)            
        }

        try {
            const response = await axios.get( API_URL + '/' + id  );
            setComments(response.data.comments);
        } catch (err) {
            console.log(err)            
        }        

    }


  return (
    <>
        <div className='commentContainer'>
            <form 
                className='commentFom' 
                onSubmit={submitHandler}
            >
    
                <TextField
                    id="input-with-icon-textfield"
                    label="Pseudo"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    onChange={ (e) => { setPseudo(e.target.value); } } 
                    name="pseudo"
                />

                <TextField
                    id="standard-multiline-static"
                    label="Commentaire :"
                    multiline
                    rows={4}
                    // defaultValue="Quoid de neuf ?"
                    placeholder="Quoi de neuf ?"
                    variant="standard"
                    onChange={ (e) => { setComment(e.target.value); } }                     
                    name="comment"
                    value={comment || ""}
                />

                <Button 
                    variant="contained" 
                    type="Submit"
                    endIcon={<SendIcon />}
                >
                Send
                </Button>

            </form>

            <List>  
                {comments.map((comment) => {
                    return(
                        <ListItem 
                            alignItems="flex-start"
                            key={comment._id}
                        >
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={comment.commenterPseudo}
                            secondary={
                            <React.Fragment>
                                <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                >
                                {/* {comment.commenterPseudo} */}
                                </Typography>
                                {comment.text}
                                {/* {"Affiche moi quelquechose !!!"} */}
                            </React.Fragment>
                            }
                        />
                        <button
                            id={comment._id}
                            onClick={deleteComment}
                        >
                            Supprimer
                        </button>

                        </ListItem>   
                    )
                })}                      
            </List> 
        </div>         
    </>
    )  
}
