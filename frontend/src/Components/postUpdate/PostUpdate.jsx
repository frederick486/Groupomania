import './postUpdate.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../config' 
import axios from 'axios'

import { Link } from 'react-router-dom';

// Components Matérial UI
import TextField from '@mui/material/TextField';

// icones Matérial UI
import { Cancel, PermMedia } from '@mui/icons-material'

export default function PostUpdate () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null); //Url
  const [newFile, setNewFile] = useState(null); // Binaire

  const navigate = useNavigate()
  const id = useParams().postId
  const token = localStorage.getItem("authToken")

 
  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
        setTitle(response.data.title)
        setDesc(response.data.desc)
        setFile(response.data.postImgUrl)
    })();
  }, []);  

  console.log("newFile :", newFile)

  useEffect(() => {
    setFile("")
  }, [newFile])

  const submitHandler = async (e) => {
    e.preventDefault(); 

    if(newFile != null) {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("postImgUrl", newFile);
   
      try {
        await axios.put( API_URL + '/' + id, formData, {        
          headers: { 
            "Content-Type": "multipart/form-data", 
            'Authorization': `Bearer ${token}` 
          },
        });
        navigate('/')
      } catch (err) {
        console.log(err)
      } 
    } else {
   
      try {
        await axios.put( API_URL + '/updatePostWithoutImg/' + id, 
        {
          title:title,
          desc:desc
        }, 
        {        
          headers: { 
            'Authorization': `Bearer ${token}` 
          },
        });
        navigate('/')
      } catch (err) {
        console.log(err)
      }       
    }   
  
  };

  return (
    <>  
      <h1 className="postUpdate-title-form">Modifiez votre post ...</h1>
      
      <form 
        onSubmit={submitHandler}
        className="postUpdate-container-form"
      >

        <span className='postUpdate-textSaizure-object'>Modifiez votre titre</span>
        <textarea
          className='postUpdate-textfield-title'
          defaultValue={title}
          onChange={(e) => { setTitle(e.target.value) }}   
        >         
        </textarea>

        <span className='postUpdate-textSaizure-object'>Modifiez votre description</span>
        <textarea          
          className='postUpdate-textfield-desc'  
          defaultValue={desc}
          onChange={(e) => { setDesc(e.target.value) }}     
        ></textarea>
            
        <label 
          htmlFor="file" // <<< associé à l'id de <input/>
          className='postUpdate-label-choseFile'
        > 
          <PermMedia htmlColor='blue'/>
          <span className='postUpdate-label-choseFile-text'>Modifiez votre fichier</span>
          <input 
            style={{ display:"none" }} // <<< à revoir 
            label="Modifiez votre fichier"
            type="file"
            id="file"  // <<< associé au HtmlFor de <label/>
            accept=".png,.jpeg,.jpg" 
            onChange={(e) => { setNewFile(e.target.files[0]) }}
          />
        </label>

        {/* ------------------------- preview ------------------------ */}
        {file && (
          <div className="postUpdate-wrapper-preview-Img">
            <img className='postUpdate-preview-Img' src={file} alt="" />
            <Cancel 
              className='postUpdate-preview-Img-cancel-icone' 
              onClick={(e) => setFile(null)} 
            />
          </div>
        )}                       

        {/* ------------------------- preview ------------------------ */}
        {newFile && (
          <div className="postUpdate-wrapper-preview-Img">
            <img className='postUpdate-preview-Img' src={URL.createObjectURL(newFile)} alt="" />
            <Cancel 
              className='postUpdate-preview-Img-cancel-icone' 
              onClick={(e) => setNewFile(null)} 
            />
          </div>
        )}           

        <div className="postUpdate-button-wrapper">
          <Link 
            to="/"
            className='postUpdate-button-cancel'
          >Annuler</Link>
          <button
            type="Submit"
            className='postUpdate-button-send'
          >                   
            Envoyer
          </button>
        </div>

      </form>      
    </>
  );
}