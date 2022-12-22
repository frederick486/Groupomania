import './postShare.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config' 
import axios from 'axios'

// icones
import { Cancel } from '@mui/icons-material'


export default function PostShare () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [postImgFile, setPostImgfile] = useState(null);

  const token = localStorage.getItem("authToken")
  const pseudo = localStorage.getItem("pseudo")
  const profileImgUrl = localStorage.getItem("profileImgUrl")

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault(); 
    let formData = new FormData();

    formData.append("pseudo", pseudo);
    formData.append("profileImgUrl", profileImgUrl);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("postImgUrl", postImgFile);

    try {
      await axios.post( API_URL , formData, { 
        headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${token}`  },
      }); 
      navigate('/')
    } catch (err) {
      console.log(err)      
    }

  };

  return (
    <>  
      <h1 className="title-form">Nouveau post</h1>
      <form 
        className="container-form"
        onSubmit={submitHandler}
      >

        <label htmlFor="article">Votre article</label>

        <input 
          placeholder={" Donner un titre à votre post"} 
          // className='shareInput' 
          onChange={(e) => { setTitle(e.target.value) }}      
        />

        <textarea            
          placeholder="Ajouter une description"
          onChange={(e) => { setDesc(e.target.value) }}     
        ></textarea>       

        {postImgFile && (
          <div className="shareImgContainer">
            <img className='shareImg' src={URL.createObjectURL(postImgFile)} alt="" />
            <Cancel 
              className='shareCancelImg' 
              onClick={() => setPostImgfile(null)} 
            />
          </div>
        )}        

        <label htmlFor="avatar">Ajoutez une image</label> 
        <input 
          label="Select a File"
          type="file"
          onChange={(e) => { setPostImgfile(e.target.files[0]) }}          
        />

        <button>Envoyer</button>
      </form>   
    </>
  );
}



// // import * as React from 'react';
// import Button from '@mui/joy/Button';
// import TextField from '@mui/joy/TextField';
// import Modal from '@mui/joy/Modal';
// import ModalDialog from '@mui/joy/ModalDialog';
// import Stack from '@mui/joy/Stack';
// import Add from '@mui/icons-material/Add';
// import Typography from '@mui/joy/Typography';
// import Textarea from '@mui/joy/Textarea';

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API_URL } from '../../config' 
// import axios from 'axios'

// // // icones
// import { Cancel } from '@mui/icons-material'
// import {PermMedia} from "@mui/icons-material";

// export default function PostShareModal (props) {
//   const [open, setOpen] = useState(false);

//   useEffect(()=> {
//     setOpen(props.show)
//   }, [props])

//   console.log("props.show :", props.show)
//   console.log("state de open : ", open)

//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("")
//   const [file, setFile] = useState(null);
//   const token = localStorage.getItem("authToken")

//   const navigate = useNavigate()

//   const submitHandler = async (e) => {
//     e.preventDefault(); 
//     let formData = new FormData();

//     formData.append("title", title);
//     formData.append("desc", desc);
//     formData.append("img", file);
//     // formData.append("token", token);

//     try {
//       await axios.post( API_URL , formData, { 
//         headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${token}`  },
//       }); 
//       // navigate('/')
//       setOpen(false);
//       window.location.reload();
//     } catch (err) {
//       console.log(err)      
//     }

//   };

//   return (
//     <>
//       {/* <Button
//         variant="outlined"
//         color="neutral"
//         startDecorator={<Add />}
//         onClick={() => setOpen(true)}
//         style={{zIndex:"10"}}
//       >
//         New project
//       </Button> */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <ModalDialog
//           aria-labelledby="basic-modal-dialog-title"
//           aria-describedby="basic-modal-dialog-description"
//           sx={{
//             maxWidth: 500,
//             borderRadius: 'md',
//             p: 3,
//             boxShadow: 'lg',
//           }}
//         >
//           <Typography
//             id="basic-modal-dialog-title"
//             component="h2"
//             level="inherit"
//             fontSize="1.25em"
//             mb="0.25em"
//           >
//             Nouveau post
//           </Typography>
//           <Typography
//             id="basic-modal-dialog-description"
//             mt={0.5}
//             mb={2}
//             textColor="text.tertiary"
//           >
//             Fill in the information of the project.
//           </Typography>
//           <form
//             onSubmit={submitHandler}

//             // onSubmit={(event) => {
//             //   event.preventDefault();
//             //   setOpen(false);
//             // }}
//           >
//             <Stack spacing={2}>
//               <TextField 
//                 label="Titre" 
//                 autoFocus required 
//                 onChange={(e) => { setTitle(e.target.value) }}      
//               /> 
//               {/* <TextField label="Description" required /> */}

//               {/* <label htmlFor="article">Votre article</label> */}

//            {/* <input 
//           placeholder={" Donner un titre à votre post"} 
//           // className='shareInput' 
//           onChange={(e) => { setTitle(e.target.value) }}      
//         /> */}

//         {/* <textarea            
//           placeholder="Ajouter une description"
//           onChange={(e) => { setDesc(e.target.value) }}     
//         ></textarea>        */}

//         <Textarea
//           placeholder="Ajouter une description!"
//           onChange={(e) => { setDesc(e.target.value) }}     
//           required
//           sx={{ mb: 1 }}
//         />

//         {file && (
//           <div className="shareImgContainer">
//             <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
//             <Cancel 
//               className='shareCancelImg' 
//               onClick={() => setFile(null)} 
//             />
//           </div>
//         )}        

//         <label htmlFor="file">
//           <PermMedia htmlColor='tomato' className='shareIcon'/>
//           <span className='shareOptionText'>Photo or Video</span>
//           <input 
//             style={{ display:"none" }}
//             type="file" 
//             id="file" 
//             accept=".png,.jpeg,.jpg" 
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </label> 


//               <Button type="submit">Submit</Button>
//             </Stack>
//           </form>
//         </ModalDialog>
//       </Modal>
//     </>
//   );
// }