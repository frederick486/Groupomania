import './postComment.css'
import { API_URL } from '../../config';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from "jwt-decode"

// Formulaires
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Composents Matérial UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Icônes Matérial UI
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// Composents Modal Matérial UI
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';


export default function PostComment ({props}) {

    const [pseudo, setPseudo] = useState("")
    const [userId, setUserId] = useState("")
    const [avatar, setAvatar] = useState("")
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState(null);
    const [send, setSend] = useState(false);
    const [commentId, setCommentId] = useState();
    const [tokenValid, setTokenValid] = useState(false) 
    const [admin, setAdmin] = useState(false);
    const [click, setClick] = useState(false);

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

                if(token) {
                    const {exp} = jwtDecode(token)
                
                    if(exp * 1000 > new Date().getTime()) {
                      setTokenValid(true) 
                    }
                }
                
                if(localStorage.getItem("pseudo") === "administrateur" ) {
                    setAdmin(true);
                }                

            } catch (err) {
                console.log(err)            
            }
        })();
    }, [send, click]);        

    useEffect(()=> {
        setOpen(false)
    }, [send])


    const createComment = async (e) => {
        e.preventDefault()

        if(token) {
            const {exp} = jwtDecode(token)
          
            if(exp * 1000 > new Date().getTime()) {

                try {
                    await axios.put( API_URL + '/comment-post/' + id, 
                        { 
                            commenterUserId: userId,
                            commenterPseudo: pseudo,
                            commenterProfilImgUrl: avatar,
                            text: comment        
                        }, 
                        { headers: { 'Authorization': `Bearer ${token}`  }},   
                    );
                    setComment("");
                    setClick(!click)
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

                if(commenterId === localStorage.getItem("userId") || admin) {

                    if(window.confirm("êtes vous sur de vouloir supprimer ce commentaire ?")) {
                        try {
                            await axios.put( API_URL + '/delete-comment-post/' + id, 
                                { commentId: commentId },
                                { headers: { 'Authorization': `Bearer ${token}`  }}
                            ); 
                            setClick(!click)    
                        } catch (err) {
                            console.log(err)            
                        }  
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


    const modalModifComment = async (commentId, commenterId, comment) => {

        if(token) {
            const {exp} = jwtDecode(token)

            if(exp * 1000 > new Date().getTime()) {

                if(commenterId === localStorage.getItem("userId")) {
                    setOpen(true)
                    setCommentId(commentId);
                    setComment(comment)

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

    const modifComment = async (text) => {

        if(text !== null) {
            try {

                await axios.patch( API_URL + '/edit-comment-post/' + id, 
                    { 
                        commentId: commentId,
                        text: text
                    },
                    { headers: { 'Authorization': `Bearer ${token}`  }}
                ); 
                setText(null); // <<< !!!!!
                setSend(false);
            } catch (err) {
                console.log(err)            
            }  

        } else {
            setText(null); // <<< !!!!!
            setSend(false);
            setOpen(false) 
        }
     
    }

  return (
    <>
        <div className='commentContainer'>
            { tokenValid 
                ?   <form 
                        className='commentFom' 
                        onSubmit={ createComment }
                    >
                        <span className='commentHeader'>Commenter en tant que</span>

                        <div className="commentHeaderAvatarPseudo">
                            <Avatar 
                                alt="Auteur du post" 
                                src={ tokenValid
                                    ? avatar
                                    : "../../Assets/noAvatar.png" 
                                }
                            />
                            <span className='commentHeaderPseudo'>
                                {tokenValid 
                                    ? pseudo
                                    : "non connecté"
                                }                
                            </span>                            
                        </div>

                        <TextField
                            id="standard-multiline-static"
                            label="Commentaire :"
                            multiline
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
                : <Link className='comment-form-notconnect' to='/login'>Connectez vous pour laisser un commentaire</Link>
            }

            <List
                className='listComment'
            >  
                {comments.map((comment) => {
                    return(
                        <div key={comment._id}>
                            <Divider variant="inset" component="li"/>
                            <ListItem 
                                alignItems="flex-start"
                            >
                                <ListItemAvatar>
                                    <Avatar 
                                        alt="Avatar utilisateur" 
                                        src={comment.commenterProfilImgUrl}
                                    />
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
                                
                                {(comment.commenterUserId === localStorage.getItem("userId")  || admin) && (   
                                    <div className="commentFieldIcones">    

                                        <button
                                            onClick={async () => { await deleteComment(comment._id, comment.commenterUserId);} }
                                            style={{ border:"none", backgroundColor:"transparent" }}                          
                                        >
                                            <DeleteOutlinedIcon fontSize='small'/>
                                        </button>
            
                                        <button
                                            onClick={async () => { await modalModifComment(comment._id, comment.commenterUserId, comment.text);} }
                                            style={{ border:"none", backgroundColor:"transparent" }}
                                        >
                                            <EditOutlinedIcon fontSize='small'/>
                                        </button> 
                                                            
                                    </div> 
                                )}
                  
            
                            </ListItem>  
                        </div>                
                    )
                })}                      
            </List> 
        </div>         

        <React.Fragment>

        <Modal 
            open={open} 
            onClose={() => {setOpen(false); setComment(""); }}
        >
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
                id="basic-modal-dialog-description"
                mt={0.5}
                mb={2}
            >
                Modifiez votre commentaire :
            </Typography>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setSend(true);
                    modifComment(text);
                    setComment("");
                    setText(null); // <<< comment modifié
                }}
            >
                <Stack spacing={2}>
                <TextField 
                    multiline
                    rows={4}
                    defaultValue={comment}
                    onChange={ (e) => { setText(e.target.value); } }                     
                />
                <Button type="submit">Modifier</Button>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </React.Fragment>
    </>
    )  
}
