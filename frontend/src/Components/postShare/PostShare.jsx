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

        {file && (
          <div className="shareImgContainer">
            <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
            <Cancel 
              className='shareCancelImg' 
              onClick={() => setFile(null)} 
            />
          </div>
        )}        

        <label htmlFor="avatar">Ajoutez une image</label> 
        <input 
          label="Select a File"
          type="file"
          onChange={(e) => { setFile(e.target.files[0]) }}          
        />

        <button>Envoyer</button>
      </form>      
    </>
  );
}