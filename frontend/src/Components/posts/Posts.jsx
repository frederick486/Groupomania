import './posts.css'
import { API_URL } from '../../config'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import {getArticles} from '../../Redux/articles/articleReducer'
import {v4 as uuidv4} from 'uuid'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default function Posts () {
  const [ data, setData ]= useState([]);

  useEffect(() => {
    (async () => {
      // const response = await axios.get("http://localhost:4000/api/post");
      const response = await axios.get( API_URL );
      console.log(response);
        setData(response.data);
    })();
  }, []);

  return (
    <>
      <h1 className='home-title'>dernières nouvelles : </h1>
      <div className="container-cards">
        {data && data.map(item => {
          return (

            // <Link to={ { pathname: `/post/${item._id}` }} style={{textDecoration:"none"} }>
            <Link to={ `/post/${item._id}` } style={{textDecoration:"none", color:"black"} }>
              <div className='cardPost' key={uuidv4()}>
                <div className="postImageWrapper">
                  <img src={item.img} alt="" />
                </div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </Link>
          )

        })}
      </div>
    </>
  )
}