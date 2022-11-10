import { useState } from "react";
import axios from 'axios'
import './Form.css'

function Form() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault(); //prevent the form from submitting
    let formData = new FormData();

    formData.append("comment", comment);
    formData.append("picture", selectedFiles[0]);

    axios.post("http://localhost:4000/api/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => {
        console.log(res)
    })
  };

  return (
    <>  
      <h1 className="title-form">Ecrivez un article</h1>
      <form 
        className="container-form"
        onSubmit={submitHandler}
      >

        <label htmlFor="article">Votre article</label>
        <textarea            
          placeholder="Votre article"
          onChange={(e) => {
            setComment(e.target.value);
          }}      
        ></textarea>

        <label htmlFor="avatar">Choose a profile picture:</label> 
        <input 
          label="Select a File"
          type="file"
          onChange={(e) => {
            setSelectedFiles(e.target.files);
          }}
        />

        <button>Envoyer l'article</button>
      </form>      
    </>
  );
}

export default Form;