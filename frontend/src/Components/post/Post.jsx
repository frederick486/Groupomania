import './post.css';
import { API_URL } from '../../config';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
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


  const deletePost = async (e) => {

    console.log("e.target.value : ", e.target.value)

    try {
      await axios.delete( API_URL + '/' + id )
        .then((response) => {        
          setData(response.data)
          navigate('/')
        })          
    } catch (err) {
      console.log(err)      
    }

    if(token) {
      const {exp} = jwtDecode(token)

      if(exp * 1000 > new Date().getTime()) {

        if(e.target.value === localStorage.getItem("userId")) {
          alert("vous pouvez supprimer ce post")

        } else {
          alert("(En principe) vous devez être l'auteur de ce post pour pouvoir le supprimer")
        }
      } else {
        alert("votre session a expiré. Merci de vous reconnecter")
      }
    } else {
      alert("Vous devez être connecté pour supprimer un de vos post")
    }
 
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
            // style={{ display:"none" }}
            // className='button' 
            className='buttonDelette' 
            onClick={deletePost}
            value={data.userId}
          >
            <DeleteForeverIcon style={{ fontSize:"50px" }}/>
          </button>
        
          <button 
            className={[isLiked ? 'active-like' : 'button'].join(' ')} 
            onClick={likeHandler} 
          >
            Like {like}
          </button>

        <Link
          to={ `/post-update/${id}` } 
          style={{textDecoration:"none", color:"black"} }        
        >
          <button className='button'>
            Modifier
          </button>
        </Link>

        </div>
      
        <PostComment />
       
      </div>
    </>
  )
}