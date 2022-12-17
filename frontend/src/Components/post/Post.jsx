import './post.css';
import { API_URL } from '../../config';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from "jwt-decode"

import PostComment from '../postComment/PostComment';

// icônes
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Post () {
  const [data, setData] = useState([])

  const [like, setLike] = useState(Number)
  const [isLiked, setIsLiked] = useState(false)

  const navigate = useNavigate()
  const id = useParams().postId

  const token = localStorage.getItem("authToken")
 
  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
        setData(response.data);
        setLike(response.data.likers.length)
    })();
  }, []);

  console.log("data :", data)

  const deletePost = async (userId) => {

    if(token) {
      const {exp} = jwtDecode(token)

      if(exp * 1000 > new Date().getTime()) {

        if(localStorage.getItem("userId") === userId) {
          alert("Vous êtes l'auteur de ce post et vous pouvez le supprimer")
          try {
            await axios.delete( API_URL + '/' + id,
              { headers: { 'Authorization': `Bearer ${token}`  }}
            )
              .then((response) => {        
                setData(response.data)
                navigate('/')
              })          
          } catch (err) {
            console.log(err)      
          }          
        } else { alert("Vous devez être l'auteur de ce post pour pouvoir le supprimer") }
      } else { alert("votre session a expiré. Merci de vous reconnecter") }
    } else { alert("Vous devez être connecté pour supprimer un de vos post") }
  
  }


  const likeHandler = async () => {

    if(token) {
      const {exp} = jwtDecode(token)

      if(exp * 1000 > new Date().getTime()) {

        try {
          // await axios.put( API_URL + '/like-post/' + id, { userId: "635abed658bac2c768a67cb4" } );
          await axios.put( API_URL + '/like-post/' + id, 
          { userId: localStorage.getItem("userId") } );
        } catch (err) {
          console.log(err)
        }

      } else {
        alert("Veuillez vous connecter à nouveau")
      }
    } else {
      alert("Veuillez vous connecter pour liker ce post")
    }

    // setLike(isLiked ? like - 1 : like + 1)
    // setIsLiked(!isLiked)     

    if(isLiked){
      setIsLiked(false)
      setLike(like - 1)
    } else {
      setIsLiked(true)
      setLike(like + 1)
    }
  }  


  const uptdatePost = async (userId) => {
    console.log("userId : ", userId)

    if(token) {
      const {exp} = jwtDecode(token)
      if(exp * 1000 > new Date().getTime()) {
        if(localStorage.getItem("userId") === userId) {
          alert("Vous êtes l'auteur de ce post et vous pouvez le modifier")
            navigate(`/post-update/${id}`)        
        } else { alert("Vous devez être l'auteur de ce post pour pouvoir le modifier") }
      } else { alert("votre session a expiré. Merci de vous reconnecter") }
    } else { alert("Vous devez être connecté pour modifié un de vos post") }    

  }

  return(
    <>
      <div className="article-content">
        <img 
          src={data.img} 
          alt="" 
        />
        <h2>{data.title}</h2>
        <p>{data.desc}</p>

        <div className="postReact">
          <button 
            className='buttonDelette' 
            onClick={async () => { await deletePost(data.userId)}}
            // value={data.userId}
            // onClick={deletePost}
            // style={{ display:"none" }}
            // className='button'             
          >
            <DeleteForeverIcon style={{ fontSize:"50px", color:"red"}}/>
          </button>
        
          <button 
            className={[isLiked ? 'active-like' : 'button'].join(' ')} 
            onClick={likeHandler} 
          >
            Like {like}
          </button>

          <button 
            className='button'
            onClick={async () => { await uptdatePost(data.userId)}}
          >
            Modifier
          </button>

        </div>
      
        <PostComment />
       
      </div>
    </>
  )
}