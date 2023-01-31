import './postUpdate.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../config' 
import axios from 'axios'

import noPicture from '../../Assets/no-picture.png'

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
  // }, [file, newFile]);  
  }, [newFile]);  

  console.log("File :", file)
  console.log("newFile :", newFile)


  const updatePost = async (e) => {
    e.preventDefault(); 
  
    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("postImgUrl", newFile);
    // formData.append("postImgUrl", file);
 
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
  };

  return (
    <>  
      <div className="postUpdate-wrapper">
        <h1 className="postUpdate-title-form">Modifiez votre post ...</h1>
        <form 
          onSubmit={ updatePost }
          className="postUpdate-container-form"
        >

          <div className="postUpdate-wrapper-preview-Img">

            {
              (file === null && newFile === null)
                ? ( <img className='postUpdate-preview-Img' src={noPicture} alt="" /> )
                : (newFile === null && file !== null)  
                  ? ( <img className='postUpdate-preview-Img' src={file} alt="" /> )
                  : ( <img className='postUpdate-preview-Img' src={URL.createObjectURL(newFile)} alt="" /> )
            }

            <Cancel 
              className='postUpdate-preview-Img-cancel-icone' 
              onClick={(e) => {setFile(null); setNewFile(null)} } 
              // onClick={(e) => {setNewFile(null)} } 
            />
          </div>

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
          
          <div className="postUpdate-button-wrapper">
            <button 
              onClick={()=>{navigate('/')}}
              className='postUpdate-button-cancel'
            >Annuler
            </button>

            <button
              type="Submit"
              className='postUpdate-button-send'
            >                   
              Envoyer
            </button>
          </div>
        </form> 
      </div>
    </>
  );
}