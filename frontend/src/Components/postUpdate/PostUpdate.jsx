import './postUpdate.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../config' 
import axios from 'axios'

// icones
import { Cancel } from '@mui/icons-material'


export default function PostUpdate () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null);
  const [data, setData] = useState([])

  const navigate = useNavigate()
  const id = useParams().postId
 
  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
        setData(response.data);
        setFile(response.data.img)
    })();
  }, []);  

  const submitHandler = async (e) => {
    e.preventDefault(); 
    let formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("img", file);
 
    try {
      await axios.put( API_URL + '/' + id, formData, {        
        headers: { "Content-Type": "multipart/form-data",
        },
      });
      // window.location = "/";
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
          // placeholder={" Donner un titre à votre post"} 
          defaultValue={data.title}
          onChange={(e) => { setTitle(e.target.value) }}      
        />

        <textarea            
          // placeholder="Ajouter une description"
          defaultValue={data.desc}
          onChange={(e) => { setDesc(e.target.value) }}     
        ></textarea>        

        {file && (
          <div className="shareImgContainer">
            {/* <img className='shareImg' src={URL.createObjectURL(file)} alt="" /> */}
            <img className='shareImg' src={data.img} alt="" />
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