import './postShare.css'
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config' 
import axios from 'axios'

// Components Matérial UI
import TextField from '@mui/material/TextField';

// icones Matérial UI
import { Cancel } from '@mui/icons-material'
import { PermMedia } from "@mui/icons-material";


export default function PostShare ({openPostShare, setOpenPostShare}) {

  const token = localStorage.getItem("authToken")
  const pseudo = localStorage.getItem("pseudo")
  const profileImgUrl = localStorage.getItem("profileImgUrl")
  const navigate = useNavigate()


  // const [openPostShare, setOpenPostShare] = useState(true);
  // // // const handleOpen = () => setOpenPostShare(true);
  // const handleClose = () => setOpenPostShare(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null);

  // console.log("state de file : ", file)

  const submitHandler = async (e) => {
    e.preventDefault(); 

    if(file) {

      let formData = new FormData();
      formData.append("pseudo", pseudo);
      formData.append("profileImgUrl", profileImgUrl);
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("postImgUrl", file);
  
      try {
        await axios.post( API_URL , formData, { 
          headers: { 
            "Content-Type": "multipart/form-data", 
            'Authorization': `Bearer ${token}`  
          },
        }); 
      } catch (err) {
        console.log(err)      
      }

    } else {

        try {
          await axios.post( API_URL + '/createPostWwithoutPostImg', 
          {
            pseudo:pseudo,
            profileImgUrl:profileImgUrl,
            title:title,
            desc:desc
          }, 
          {        
            headers: { 
              'Authorization': `Bearer ${token}` 
            },
          });
        } catch (err) {
          console.log(err)          
        }
    }
    // navigate('/')
    setOpenPostShare(false)
    window.location.reload('/');
  };

  return (
    <>
      {openPostShare && (  
        <div className='postshare-wrapper'>
        <h1 className="postShare-title-form">Nouveau post</h1>
        <form 
        onSubmit={submitHandler}
        className="postShare-container-form"
      >
        <TextField
          placeholder="Placeholdker"
          // multiline
          className='postShare-textfield-title'
          id="outlined-basic" 
          label="Titre" 
          variant="outlined"           
          onChange={(e) => { setTitle(e.target.value) }}      
        />              

        <TextField
          className='postShare-textfield-desc'
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          // defaultValue="Ajouter une description!"
          // placeholder="Ajouter une description!"
          onChange={(e) => { setDesc(e.target.value) }}     
        />        

        <label 
          className='postShare-label-choseFile'
          htmlFor="file" // <<< associé à l'id de <input/>
        >
          <PermMedia htmlColor='blue'/>
          <span className='postShare-label-choseFile-text'>Ajouter une image</span>
          <input 
            style={{ display:"none" }} // <<< à revoir
            type="file" 
            id="file" // <<< associé au HtmlFor de <label/>
            accept=".png,.jpeg,.jpg" 
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label> 

        {/* -------------------------- preview -------------------------- */}
        {file && (
          <div className="postShare-wrapper-preview-Img">
            <img className='postShare-preview-Img' src={URL.createObjectURL(file)} alt="" />
            <Cancel 
              className='postShare-preview-Img-cancel-icone' 
              onClick={() => setFile(null)} 
            />
          </div>
        )} 

        <div className="postShare-button-wrapper">
          <button 
            // to="/"
            // onClick={handleClose}
            onClick={()=>{setOpenPostShare(false)}}
            className='postShare-button-cancel'
          >Annuler
          </button>

          <button
            type="Submit"
            className='postShare-button-send'
          >                   
            Envoyer
          </button>
        </div>
      </form>   
        </div>
      )} 
    </>
  );
}