import './postShare.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config' 
import axios from 'axios'

// Components Matérial UI
import TextField from '@mui/material/TextField';

// icones Matérial UI
import { Cancel } from '@mui/icons-material'
import { PermMedia } from "@mui/icons-material";

import defaultImage from '../../Assets/no-picture.png'


export default function PostShare () {

  const token = localStorage.getItem("authToken")
  const pseudo = localStorage.getItem("pseudo")
  const profileImgUrl = localStorage.getItem("profileImgUrl")
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const createPost = async (e) => {
    e.preventDefault(); 

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

    navigate('/')
  };

  return (
    <>       
      <div className='postshare-wrapper'>
        <h1 className="postShare-title-form">Nouveau post</h1>
        <form 
            onSubmit={ createPost }
            className="postShare-container-form"
          >

          <div className="postShare-wrapper-preview-Img">
            {(file === null) 
              ? ( <img className='postShare-preview-Img' src={defaultImage} alt="Image par défaut" />)                  
              : ( <img className='postShare-preview-Img' src={URL.createObjectURL(file) } alt="Prévisualisation" />)
            }

            <Cancel 
              className='postShare-preview-Img-cancel-icone' 
              onClick={() => setFile(null)} 
            />
          </div>

          <label 
            className='postShare-label-choseFile'
            htmlFor="file" // <<< associé à l'id de <input/>
          >
            <PermMedia htmlColor='blue'/>
            <span className='postShare-label-choseFile-text'>Importer une image</span>
            <input 
              style={{ display:"none" }} // <<< à revoir
              type="file" 
              id="file" // <<< associé au HtmlFor de <label/>
              accept=".png,.jpeg,.jpg,.gif" 
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label> 
                      
          <TextField
            placeholder="Placeholdker"
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
            onChange={(e) => { setDesc(e.target.value) }}     
          />        

          <div className="postShare-button-wrapper">
            <button 
              onClick={()=>{navigate('/')}}
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
    </>
  );
}