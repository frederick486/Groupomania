import React from 'react'
import { useState } from 'react';

import { API_URL } from '../../config';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import './postComment.css'
import PostCommentList from '../postCommentList/PostCommentList'

// Formulaire
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


export default function PostComment({props}) {

    const [pseudo, setPseudo] = useState("")
    const [comment, setComment] = useState("");

    const navigate = useNavigate()
    const id = useParams().postId

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
                } 
            );
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
                />

                <Button 
                    variant="contained" 
                    type="Submit"
                    endIcon={<SendIcon />}
                >
                Send
                </Button>

            </form>

            <PostCommentList props={props.comments}/>

        </div>
         
        {/* <div className='commentList'>
        </div> */}
    </>
    )
  
}
