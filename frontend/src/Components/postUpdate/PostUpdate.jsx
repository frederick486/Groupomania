import './postUpdate.css'
import { API_URL } from '../../config' 
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function PostUpdate () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState([]);
  const [data, setData] = useState([])

  const location = useLocation()
  const id = location.pathname.split('/post-update/')[1]  

  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
        setData(response.data);
    })();
  }, []);  

  const submitHandler = (e) => {
    e.preventDefault(); 
    let formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("img", file[0]);
 
    try {
      axios.put( API_URL + '/' + id, formData, {        
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location = "/";
    } catch (err) {
        console.log(err)
    }    

    // window.location = "/";    
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
          // placeholder={" Donner un titre à votre post"} 
          defaultValue={data.title}
          onChange={(e) => { setTitle(e.target.value) }}      
        />

        <textarea            
          // placeholder="Ajouter une description"
          defaultValue={data.desc}
          onChange={(e) => { setDesc(e.target.value) }}     
        ></textarea>        

        <label htmlFor="avatar">Ajoutez une image</label> 
        <input 
          label="Select a File"
          type="file"
          onChange={(e) => { setFile(e.target.files) }}
        />

        <button>Envoyer</button>
      </form>      
    </>
  );
}