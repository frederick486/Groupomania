import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Article.css';
import {useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function AxiosRequest() {
  const [data, setData] = useState([])
  const [like, setLike] = useState(100)
  const [likeactive, setLikeactive] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const id = location.pathname.split('/article/')[1]
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

    // const id = location.pathname.split('/article/')[1]

    axios
      .get("http://localhost:4000/api/post/" + id)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const deletePost = () => {
    // const id = location.pathname.split('/article/')[1]

    axios
      .delete("http://localhost:4000/api/post/" + id)
      .then((response) => {        
        setData(response.data)
        navigate('/')
      })
      .catch((err) => console.log(err));

    
  }

  return(
    <>
      <div className="article-content">
        <img src={data.picture} alt="Appareil photo Reflex" />
        <p>{data.comment}</p>

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

     </div>
    </>
  )
}