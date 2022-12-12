import React, { useState } from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { API_URL } from '../../config';
import { useParams } from 'react-router-dom'

import axios from 'axios';

export default function PostCommentList({props}) {
    // console.log("props : ", props);

    const [comment, setComment] = useState([])

    const id = useParams().postId

    useEffect(() => {
        (async () => {
            const response = await axios.get( API_URL + '/' + id  );
            setComment(response.data.comments);
        })();
    }, []);
  
  
    return (            
        <List>  
            {comment.map((comment) => {
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
                    </ListItem>   
                )
            })}                      
        </List> 
    )                  
}
