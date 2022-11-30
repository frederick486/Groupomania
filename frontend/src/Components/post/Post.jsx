import './post.css';
import { API_URL } from '../../config';
import PostComment from '../postComment/PostComment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function AxiosRequest() {
  const [data, setData] = useState([])
  const [like, setLike] = useState(100)
  const [likeactive, setLikeactive] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const id = location.pathname.split('/post/')[1]
  console.log("id : ", id)

  function likef() {
    if(likeactive){
      setLikeactive(false)
      setLike(like - 1)
    } else {
      setLikeactive(true)
      setLike(like + 1)
    }
  }

  const getData = () => {
    axios
      // .get("http://localhost:4000/api/post/" + id)
      .get( API_URL + '/' + id )
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const deletePost = () => {
    axios
      // .delete("http://localhost:4000/api/post/" + id)
      .delete( API_URL + '/' + id )
      .then((response) => {        
        setData(response.data)
        navigate('/')
      })
      .catch((err) => console.log(err));    
  }

  return(
    <>
      <div className="article-content">
        <img src={data.img} alt="Appareil photo Reflex" />
        <p>{data.desc}</p>

        <div className="postReact">
          <button 
            className='button' 
            onClick={deletePost}
          >
            Supprimer
          </button>

          <button 
            className={[likeactive ? 'active-like' : 'button'].join(' ')} 
            onClick={likef}
          >
            Like {like}
          </button>

        </div>
        <PostComment/>

     </div>
    </>
  )
}