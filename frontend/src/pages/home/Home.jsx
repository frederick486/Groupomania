// import React from 'react'  // <<< plus nécessaire depuis React V17
import "./home.css"
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode"
import { API_URL } from '../../config'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

import Navbar from "../../Components/navbar/Navbar"
import PostCard from '../../Components/postCard/PostCard'
import Loader from '../../Components/Loader/Loader';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';


export default function Home () {
  const [data, setData]= useState([]);
  const [loaded, setLoaded] = useState(false)
  const [token, setToken] = useState(null) 
  const [tokenValid, setTokenValid] = useState(false) 

  const navigate = useNavigate()

  useEffect(()=> {

    (async () => {
      const response = await axios.get( API_URL );
      setData(response.data);
      setLoaded(true)    

      setToken(localStorage.getItem("authToken"))
      
      if(token) {
        const {exp} = jwtDecode(token)
    
        if(exp * 1000 > new Date().getTime()) {
          setTokenValid(true) 
        }
      }
    })();

  }, [token])  

  return (
    <>
      <Navbar />

      <a className="home-top-button" href="#top">
        <span className="home-top-button-icone">
            ^
        </span>
      </a>

      <div className="groupomania-home-cards-container" id="homeContainer">

        { tokenValid 
          ? <div className="groupomania-home-button-addPost-wrapper">
              <button 
                onClick={()=>{navigate('/post-share')}}
                className="groupomania-home-button-addPost"
              >
                <PostAddOutlinedIcon/>
                Ajouter un post
              </button>  
            </div> 
          : <div className="groupomania-home-button-addPost-wrapper">
              <button 
                onClick={()=>{navigate('/login')}}
                className="groupomania-home-button-addPost"
              >
                <PostAddOutlinedIcon/>
                Connectez vous pour ajouter un post
              </button>  
            </div> 
        }

        { loaded 
          ? ( <div className="container-cards"> 
                { data.map(item => { return <PostCard key={uuidv4()} card={item} /> } ) } 
              </div>
            )
          : ( <><Loader/></>)
        } 

      </div>
    </>
  )
}