import './post.css';
import { API_URL } from '../../config';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from "jwt-decode"

// Components
import PostComment from '../postComment/PostComment';

// icônes Matérial UI
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

// Components Matérial UI
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'


export default function Post () {
  const navigate = useNavigate()
  const id = useParams().postId
  const token = localStorage.getItem("authToken")
  const formatter = buildFormatter(frenchStrings)

  const [data, setData] = useState([])
  const [like, setLike] = useState(Number)
  const [dislike, setDisLike] = useState(Number)
  const [click, setClick] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDiLiked, setisDiLiked] = useState(false)

  // const [owner, setOwner] = useState(false)
 
  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
        setData(response.data);
        setLike(response.data.likers.length)
        setDisLike(response.data.unLikers.length)
        setIsLiked(response.data.likers.includes(localStorage.getItem("userId")))
        setisDiLiked(response.data.unLikers.includes(localStorage.getItem("userId")))
    })();
  }, [click]);

  console.log("data :", data)

  let owner = false;
  if(data.userId === localStorage.getItem("userId")) {
    owner = true;
  }

  console.log("owner : ", owner)


  const likePost = async () => {

    if(token) {
      const {exp} = jwtDecode(token)

      if(exp * 1000 > new Date().getTime()) {

        try {
          await axios.put( API_URL + '/like-post/' + id, 
          { 
            userId: localStorage.getItem("userId"), 
            like : 1
          } );
          setClick(!click)

        } catch (err) {
          console.log(err)
        }

      } else {
        alert("Veuillez vous connecter à nouveau")
      }
    } else {
      alert("Veuillez vous connecter pour liker ce post")
    }
  }  


  const dislikePost = async () => {

    if(token) {
      const {exp} = jwtDecode(token)

      if(exp * 1000 > new Date().getTime()) {

        try {
          // await axios.put( API_URL + '/like-post/' + id, { userId: "635abed658bac2c768a67cb4" } );
          await axios.put( API_URL + '/like-post/' + id, 
          { 
            userId: localStorage.getItem("userId"), 
            like : -1
          } );
          setClick(!click)
          // const response = await axios.get( API_URL + '/' + id  );
          // setData(response.data);

        } catch (err) {
          console.log(err)
        }

      } else {
        alert("Veuillez vous connecter à nouveau")
      }
    } else {
      alert("Veuillez vous connecter pour liker ce post")
    }

  }  
 

  const uptdatePost = async (userId) => {
  
    if(token) {      
      const {exp} = jwtDecode(token)

      if(exp * 1000 > new Date().getTime()) {

        if(localStorage.getItem("userId") === userId) {

          navigate(`/post-update/${id}`)        

        } else { 
          alert("Vous devez être l'auteur de ce post pour pouvoir le modifier") 
        }
      } else { 
        alert("votre session a expiré. Merci de vous reconnecter") 
      }
    } else { 
      alert("Vous devez être connecté pour modifié un de vos post") 
    }    

  }


  const deletePost = async (userId) => {

    if(token) {
      const {exp} = jwtDecode(token)

      if(exp * 1000 > new Date().getTime()) {

        if(localStorage.getItem("userId") === userId) {

          if(window.confirm("êtes vous sur de vouloir supprimer ce post ?")) {

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
            
          }        
        } else { 
          alert("Vous devez être l'auteur de ce post pour pouvoir le supprimer") 
        }
      } else { 
        alert("votre session a expiré. Merci de vous reconnecter") 
      }
    } else { 
      alert("Vous devez être connecté pour supprimer un de vos post") 
    }
  }


  return(
    <>
      <div className="post-wrapper">
        <h3>Posté par {data.pseudo}</h3>
        <TimeAgo date={`${data.createdAt}`} formatter={formatter} />
        
        <img 
          className='post-img'
          src={data.postImgUrl} 
          alt="" 
        />
        <h3 className='post-title'>{data.title}</h3>
        <p className='post-article'>{data.desc}</p>

        <div className="post-action">
       
          <div className="post-action-allUsers">
            <button 
              onClick={likePost} 
              style={{ border:"none", backgroundColor:"transparent" }}
            >
              { isLiked 
                ? <ThumbUpAltIcon className='button-active-like' /> 
                : <ThumbUpOffAltIcon /> 
              }
              {like}
            </button>
            <button            
              onClick={dislikePost} 
              style={{ border:"none", backgroundColor:"transparent" }}
            >
              { isDiLiked 
                ? <ThumbDownAltIcon className='button-active-dislike'/> 
                : <ThumbDownOffAltIcon/> 
              }
              {dislike}
            </button>
          </div>

          <div className="post-action-owner">
            {owner && (
              <>
              <button 
                style={{ border:"none", backgroundColor:"transparent" }}              
                onClick={async () => { await uptdatePost(data.userId)}}
              >
              <EditOutlinedIcon/>
              </button>

              <button 
              className='buttonDelette' 
              onClick={async () => { await deletePost(data.userId)}}
              // value={data.userId}
              // onClick={deletePost}
              // style={{ display:"none" }}
              // className='button'             
              >
              <DeleteOutlinedIcon/>
              </button> 
              </>
            )}

          </div>
      
        </div>
      
        <PostComment />
       
      </div>
    </>
  )
}