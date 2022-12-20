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
  const [newFile, setNewFile] = useState(null);
  const [data, setData] = useState([])

  const navigate = useNavigate()
  const id = useParams().postId
  const token = localStorage.getItem("authToken")

 
  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
        setData(response.data);
        setFile(response.data.img)
        setDesc(response.data.desc)
    })();
  }, []);  

  const submitHandler = async (e) => {
    e.preventDefault(); 
    let formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);
    // formData.append("img", file);
    formData.append("img", newFile);
 
    try {
      await axios.put( API_URL + '/' + id, formData, {        
        headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${token}` },
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
          defaultValue={data.title}
          onChange={(e) => { setTitle(e.target.value) }}      
        />

        <textarea            
          defaultValue={desc}
          onChange={(e) => { setDesc(e.target.value) }}     
        ></textarea>        

        {newFile && (
          <div className="shareImgContainer">
            <img className='shareImg' src={URL.createObjectURL(newFile)} alt="" />
            {/* <img className='shareImg' src={data.img} alt="" /> */}
            <Cancel 
              className='shareCancelImg' 
              onClick={(e) => setNewFile(null)} 
            />
          </div>
        )}       

        <label htmlFor="avatar">Modifiez votre image</label> 
        <input 
          label="Select a File"
          type="file"
          onChange={(e) => { setNewFile(e.target.files[0]) }}
        />

        <button>Envoyer</button>
      </form>      
    </>
  );
}