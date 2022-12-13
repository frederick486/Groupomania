import './post.css';
import { API_URL } from '../../config';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import PostComment from '../postComment/PostComment';
// import PostCommentForm from '../postCommentForm/PostCommentForm'
// import PostCommentList from '../postCommentList/PostCommentList';


export default function Post () {
  const [data, setData] = useState([])

  const [like, setLike] = useState(Number)
  const [isLiked, setIsLiked] = useState(false)

  const navigate = useNavigate()
  const id = useParams().postId
 
  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
        setData(response.data);
        setLike(response.data.likers.length)
    })();
  }, []);


  const deletePost = async () => {
    try {
      await axios.delete( API_URL + '/' + id )
        .then((response) => {        
          setData(response.data)
          navigate('/')
        })          
    } catch (err) {
      console.log(err)      
    }
 
  }


  const likeHandler = async () => {
    try {
      await axios.put( API_URL + '/like-post/' + id, { userId: "635abed658bac2c768a67cb4" } );
    } catch (err) {
      console.log(err)
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
            className='button' 
            onClick={deletePost}
          >
            Supprimer
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
        {/* <PostCommentForm props={data}/>
        <PostCommentList props={data.comments}/> */}
      
        <PostComment />
       
      </div>
    </>
  )
}