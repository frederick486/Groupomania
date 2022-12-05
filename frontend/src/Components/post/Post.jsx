import './post.css';
import { API_URL } from '../../config';
import PostComment from '../postComment/PostComment'
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Post () {
  const [data, setData] = useState([])

  const [like, setLike] = useState(Number)
  const [isLiked, setIsLiked] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const id = location.pathname.split('/post/')[1]
  console.log("id : ", id)

  // const getData = () => {
  //   axios
  //     .get( API_URL + '/' + id )
  //     .then((response) => setData(response.data))
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL + '/' + id  );
      console.log(response);
        setData(response.data);
        console.log("response.data.likers : ", response.data.likers);
        console.log("response.data.likers.length : ", response.data.likers.length);
        setLike(response.data.likers.length)
    })();
  }, []);


  const deletePost = () => {
    axios
      .delete( API_URL + '/' + id )
      .then((response) => {        
        setData(response.data)
        navigate('/')
      })
      .catch((err) => console.log(err));    
  }


  const likeHandler = () => {
    try {
      axios.put( API_URL + '/like-post/' + id, { userId: "635abed658bac2c768a67cb4" } );
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

  // console.log("state de isLiked : ", isLiked)
  console.log("state de like : ", like)
  console.log("state de data : ", data)


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

        </div>
        <PostComment />

      </div>
    </>
  )
}