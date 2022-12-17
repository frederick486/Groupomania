import './postComment.css'
import { API_URL } from '../../config';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from "jwt-decode"

// Formulaire
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// Affichage
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


export default function PostComment ({props}) {

    const [pseudo, setPseudo] = useState("")
    const [comment, setComment] = useState("");
    const [userId, setUserId] = useState("")

    const [comments, setComments] = useState([])

    const id = useParams().postId

    const token = localStorage.getItem("authToken")


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get( API_URL + '/' + id  );
                setComments(response.data.comments);
                setPseudo(localStorage.getItem("pseudo"))
                setUserId(localStorage.getItem("userId"))
            } catch (err) {
                console.log(err)            
            }
        })();
    }, []);        

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("pseudo :", pseudo)
        console.log("comment :", comment)
        console.log("userId :", userId)


        if(token) {
            const {exp} = jwtDecode(token)
          
            if(exp * 1000 > new Date().getTime()) {

                try {
                    await axios.put( API_URL + '/comment-post/' + id, 
                        { 
                            commenterId: userId,
                            commenterPseudo: pseudo,
                            text: comment        
                        }, 
                        setComment("")
                    )

                    const response = await axios.get( API_URL + '/' + id  );
                    setComments(response.data.comments);

                } catch (err) {
                    console.log(err)
                }                           
            } else {
                alert("votre session a expiré. Merci de vous reconnecter")
            }
        } else { 
            alert("Vous devez être connecté pour laisser un commentaire")
        }        

    }

    const deleteComment = async (commentId, commenterId) => {

        if(token) {
            const {exp} = jwtDecode(token)

            if(exp * 1000 > new Date().getTime()) {

                if(commenterId === localStorage.getItem("userId")) {

                    try {
                        await axios.put( API_URL + '/delete-comment-post/' + id, 
                            { commentId: commentId },
                            { headers: { 'Authorization': `Bearer ${token}`  }},                    

                        ) 

                        const response = await axios.get( API_URL + '/' + id  );
                        setComments(response.data.comments); 

                    } catch (err) {
                        console.log(err)            
                    }
            
                } else {
                    alert("vous devez être l'auteur de ce commentaire pour pouvoir le supprimer")
                }
            } else {
              alert("votre session a expiré. Merci de vous reconnecter")
            }
        } else {
            alert("Vous devez être connecté pour supprimer un commentaire")
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
                    id="standard-multiline-static"
                    label="Commentaire :"
                    multiline
                    rows={4}
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
                                </Typography>
                                {comment.text}
                            </React.Fragment>
                            }
                        />
                        <button
                            onClick={async () => { await deleteComment(comment._id, comment.commenterId);} }
                            // id={comment._id}
                            // value={comment.commenterId}                            
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
