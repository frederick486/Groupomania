import './posts.css'
import { API_URL } from '../../config'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import {getArticles} from '../../Redux/articles/articleReducer'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'
import PostCard from '../postCard/PostCard'


export default function Posts () {
  const [ data, setData ]= useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL );
        setData(response.data);
    })();
  }, []);


  return (
    <>
      <h1 className='home-title'>dernières nouvelles : </h1>
      <div className="container-cards">

        if(data) {
          data.map(item => {
            return (
              <PostCard 
                key={uuidv4()} 
                card={item}
              />
            )
          })
        }
        
      </div>
    </>
  )
}