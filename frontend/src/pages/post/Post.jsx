import './post.css';
import { API_URL } from '../../config';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from "jwt-decode"

// Components
import PostComment from '../../Components/postComment/PostComment';
import Navbar from '../../Components/navbar/Navbar'
import Loader from '../../Components/Loader/Loader';

// icônes Matérial UI
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CommentIcon from '@mui/icons-material/Comment';
// Components Matérial UI
import Avatar from '@mui/material/Avatar';

// Components timeago
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
  const [commentLength, setCommentLength] = useState(Number)
  const [click, setClick] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDiLiked, setisDiLiked] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [tokenValid, setTokenValid] = useState(false) 

  // let admin = false;
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
        setData(response.data);
        setLike(response.data.likers.length)
        setDisLike(response.data.unLikers.length)
        setCommentLength(response.data.comments.length)
        setIsLiked(response.data.likers.includes(localStorage.getItem("userId")))
        setisDiLiked(response.data.unLikers.includes(localStorage.getItem("userId")))
        setLoaded(true)

        if(token) {
          const {exp} = jwtDecode(token)
      
          if(exp * 1000 > new Date().getTime()) {
            setTokenValid(true) 
          }
        }        

        if(localStorage.getItem("pseudo") === "administrateur" ) {
          setAdmin(true);
        }
        console.log("admin :", admin)
    })();
  }, [click]);

  console.log("data :", data)
  console.log("admin :", admin)
  console.log("localStorage.getItem(pseudo) :", localStorage.getItem("pseudo"))

  let owner = false;
  if(data.userId === localStorage.getItem("userId")) {
    owner = true;
  }


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
          await axios.put( API_URL + '/like-post/' + id, 
          { 
            userId: localStorage.getItem("userId"), 
            like : -1
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

        if( localStorage.getItem("userId") === userId || admin) {

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
      <Navbar/>
      {loaded 
        ? (  
            <>
              <div className="post-wrapper">
                
                <img 
                  className='post-img'
                  src={data.postImgUrl} 
                  alt="" 
                />
                <div className="post-action">
                  <div className="post-header-avatar">
                    <Avatar 
                      sx={{ width: 56, height: 56 }}
                      alt="Votre avatar" 
                      // src="/static/images/avatar/1.jpg" 
                      src={data.profileImgUrl}
                    />

                    <div className="post-header-text">
                      <span className="postCard-header-text-pseudo">
                          Post de {data.pseudo}
                      </span>
                      <TimeAgo 
                        className='post-header-text-timeAgo'
                        date={`${data.createdAt}`} 
                        formatter={formatter} 
                      />
                    </div>
                  </div> 

                  <div className="post-action-owner">
                    {((owner && tokenValid) || admin) && (
                    
                      <>
                        <button 
                          style={{ border:"none", backgroundColor:"transparent", color:"#343a40" }}              
                          onClick={async () => { await uptdatePost(data.userId)}}                        
                        >
                          <EditOutlinedIcon fontSize='large' titleAccess='modifier ce post'/>
                        </button>

                        <button 
                          className='buttonDelette' 
                          onClick={async () => { await deletePost(data.userId)}}
                          // value={data.userId}
                          // onClick={deletePost}       
                        >
                          <DeleteOutlinedIcon fontSize='large' titleAccess='supprimer ce post'/>
                        </button> 
                      </>
                    )} 
  
                  </div>  

                  <div className="post-action-infos-comments">
                    <a className='comment-anchor' href='#commentaires'>
                     <CommentIcon className='commentIcon' fontSize='large'/>{commentLength}
                    </a>
                  </div>                      
              
                  <div className="post-action-allUsers">
                    <button className='button-like'
                      onClick={likePost} 
                    >
                      <ThumbUpAltIcon className='button-active-like-to-fly-over' fontSize='large'/>
                      { isLiked 
                        ? <ThumbUpAltIcon className='button-active-like' fontSize='large'/>                           
                        : <ThumbUpOffAltIcon className='button-inactive-like' fontSize='large'/> 
                      }
                      {like}
                    </button>
                    <hr className='post-action-allUsers-hr'/>
                    <button className='button-like'            
                      onClick={dislikePost} 
                    >
                      { isDiLiked 
                        ? <ThumbDownAltIcon className='button-active-dislike' fontSize='large'/> 
                        : <ThumbDownOffAltIcon fontSize='large'/> 
                      }
                      {dislike}
                    </button>
                  </div>
       
                </div> 
                <div className="post-desc">
                  <h3 className='post-title'>{data.title}</h3>
                  <p className='post-article'>{data.desc}</p>
                </div>                 
      
                <span id='commentaires'/>
                <PostComment />              
              </div> 
            </>
          ) 
        : ( <> <Loader/> </>)
      }
    </>
  )
}