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

// Icônes
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


export default function PostComment ({props}) {

    const [pseudo, setPseudo] = useState("")
    const [userId, setUserId] = useState("")
    const [avatar, setAvatar] = useState("")
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([])

    const id = useParams().postId
    const token = localStorage.getItem("authToken")

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get( API_URL + '/' + id  );
                setUserId(localStorage.getItem("userId"))
                setPseudo(localStorage.getItem("pseudo"))
                setAvatar(localStorage.getItem("profileImgUrl"))
                setComments(response.data.comments);
            } catch (err) {
                console.log(err)            
            }
        })();
    }, []);        

    const submitHandler = async (e) => {
        e.preventDefault()

        if(token) {
            const {exp} = jwtDecode(token)
          
            if(exp * 1000 > new Date().getTime()) {

                try {
                    await axios.put( API_URL + '/comment-post/' + id, 
                        { 
                            commentatorUserId: userId,
                            commentatorPseudo: pseudo,
                            commentatorProfilImgUrl: avatar,
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
                            { headers: { 'Authorization': `Bearer ${token}`  }}
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

    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("")
    const [send, setSend] = useState(false)

    useEffect(()=> {
        setOpen(false)
    }, [send])

    console.log("state de text : ", text)

    const updateComment = async (commentId, commenterId) => {

        if(token) {
            const {exp} = jwtDecode(token)

            if(exp * 1000 > new Date().getTime()) {

                if(commenterId === localStorage.getItem("userId")) {
                    setOpen(true)

                    try {
                        await axios.patch( API_URL + '/edit-comment-post/' + id, 
                            { 
                                commentId: commentId,
                                text: text
                            },
                            // { headers: { 'Authorization': `Bearer ${token}`  }}
                        ) 
                        // setOpen(false)
            
                        const response = await axios.get( API_URL + '/' + id  );
                        setComments(response.data.comments); 
            
                    } catch (err) {
                        console.log(err)            
                    }       

                } else {
                    alert("vous devez être l'auteur de ce commentaire pour pouvoir le modifier")
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
                <span className='commentHeader'>Commenter en tant que</span>

                <div className="commentHeaderAvatarPseudo">
                    <Avatar 
                        alt="Auteur du post" 
                        // src="/static/images/avatar/1.jpg" 
                        src={avatar}
                    />
                    <span className='commentHeaderPseudo'>{pseudo}</span>                            
                </div>

                <TextField
                    id="standard-multiline-static"
                    label="Commentaire :"
                    multiline
                    // rows={1}
                    placeholder="Quoi de neuf ?"
                    variant="standard"
                    onChange={ (e) => { setComment(e.target.value); } }                     
                    name="comment"
                    value={comment || ""}
                />

                <button
                    type="Submit"
                    className='commentFomButton'
                >                   
                   Envoyer
                </button>

            </form>

            <List
                className='listComment'
            >  
                {comments.map((comment) => {
                    return(
                        <ListItem 
                            alignItems="flex-start"
                            key={comment._id}
                        >
                        <ListItemAvatar>
                            <Avatar 
                                alt="Remy Sharp" 
                                // src="/static/images/avatar/1.jpg" 
                                src={comment.commentatorProfilImgUrl}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={comment.commentatorPseudo}
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
                        <div className="commentFieldIcones">
                            <button
                                onClick={async () => { await deleteComment(comment._id, comment.commentatorUserId);} }
                                style={{ border:"none", backgroundColor:"transparent" }}
                                // id={comment._id}
                                // value={comment.commenterId}                            
                            >
                                {/* <DeleteIcon fontSize='small'/> */}
                                {/* <DeleteTwoToneIcon fontSize='small' /> */}
                                <DeleteOutlinedIcon fontSize='small'/>


                            </button>
                            <button
                                onClick={async () => { await updateComment(comment._id, comment.commentatorUserId);} }
                                // onClick={async () => { await openModal(comment._id, comment.commentatorUserId);} }
                                style={{ border:"none", backgroundColor:"transparent" }}
                            >
                                <EditOutlinedIcon fontSize='small'/>
                            </button> 
                        </div>
                       

                        </ListItem>   
                    )
                })}                      
            </List> 
        </div>         

        <React.Fragment>

        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{
                maxWidth: 500,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
            }}
            >
            <Typography
                id="basic-modal-dialog-title"
                component="h2"
                level="inherit"
                fontSize="1.25em"
                mb="0.25em"
            >
                Create new project
            </Typography>
            <Typography
                id="basic-modal-dialog-description"
                mt={0.5}
                mb={2}
                // textColor="text.tertiary"
            >
                Fill in the information of the project.
            </Typography>
            <form
                // onSubmit={(event) => {
                // event.preventDefault();
                // setOpen(false);
                // }}
                onSubmit={(event) => {
                event.preventDefault();
                setSend(true);
                }}

            >
                <Stack spacing={2}>
                <TextField 
                    label="Description" 
                    required 
                    onChange={ (e) => { setText(e.target.value); } }                     
                />
                <Button type="submit">Submit</Button>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </React.Fragment>
        );

    </>
    )  
}
