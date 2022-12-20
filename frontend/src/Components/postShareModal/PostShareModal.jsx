import './postShareModal.css'

// import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Textarea from '@mui/joy/Textarea';
import TextField from '@mui/material/TextField';


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config' 
import axios from 'axios'

// // icones
import { Cancel } from '@mui/icons-material'
import {PermMedia} from "@mui/icons-material";

export default function PostShareModal (props) {
  const [open, setOpen] = useState(false);

  useEffect(()=> {
    setOpen(props.show)
  }, [props])

  console.log("props.show :", props.show)
  console.log("state de open : ", open)

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("authToken")

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault(); 
    let formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("img", file);
    // formData.append("token", token);

    try {
      await axios.post( API_URL , formData, { 
        headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${token}`  },
      }); 
      // navigate('/')
      // setOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err)      
    }

  };

  return (
    <>
      <Modal 
        open={open} 
        onClose={() => setOpen(false)}
      >
        <ModalDialog
          className="postShareBox"
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
            Nouveau post
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Fill in the information of the project.
          </Typography>
          <form
            onSubmit={submitHandler}
          >
            <Stack spacing={2}>

              <TextField
                id="outlined-textarea"
                label="Titre" 
                placeholder="Placeholder"
                multiline
                onChange={(e) => { setTitle(e.target.value) }}      
              />              

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                // defaultValue="Ajouter une description!"
                // placeholder="Ajouter une description!"
                onChange={(e) => { setDesc(e.target.value) }}     
              />        
    
              <label htmlFor="file">
                <PermMedia htmlColor='blue' className='shareIcon'/>
                <span className='shareOptionText'>Photo or Video</span>
                <input 
                  style={{ display:"none" }}
                  type="file" 
                  id="file" 
                  accept=".png,.jpeg,.jpg" 
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label> 

              {file && (
                <div className="shareImgContainer">
                  <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
                  <Cancel 
                    className='shareCancelImg' 
                    onClick={() => setFile(null)} 
                  />
                </div>
              )} 

              <Button type="submit">Submit</Button>

            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}