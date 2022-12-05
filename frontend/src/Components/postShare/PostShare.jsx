import './postShare.css'
import { API_URL } from '../../config' 
import { useState } from "react";
import axios from 'axios'

function PostShare () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault(); 
    let formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("img", file[0]);

    axios.post( API_URL , formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => {
        console.log(res)
    })
  };

  return (
    <>  
      <h1 className="title-form">{title}</h1>
      <form 
        className="container-form"
        onSubmit={submitHandler}
      >

        <label htmlFor="article">Votre article</label>
        <textarea            
          placeholder="Donner un titre à votre post"
          onChange={(e) => {
            setTitle(e.target.value);
          }}      
        ></textarea>

        <input 
            placeholder={" Quoid de neuf ?"} 
            // className='shareInput' 
          onChange={(e) => {
            setDesc(e.target.value);
          }}     
        />

        <label htmlFor="avatar">Ajoutez une image</label> 
        <input 
          label="Select a File"
          type="file"
          onChange={(e) => {
            setFile(e.target.files);
          }}
        />

        <button>Envoyer l'article</button>
      </form>      
    </>
  );
}

export default PostShare;