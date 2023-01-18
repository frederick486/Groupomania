// import React from 'react'  // <<< plus nécessaire depuis React V17
import "./home.css"
import Posts from "../../Components/posts/Posts";
import Navbar from "../../Components/navbar/Navbar"
import { useNavigate } from "react-router-dom";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { useEffect } from 'react';
import { useState } from 'react';
import jwtDecode from "jwt-decode"


export default function Home() {

  const navigate = useNavigate()

  const [token, setToken] = useState(null) 
  const [tokenValid, setTokenValid] = useState(false) 

  useEffect(()=> {
    setToken(localStorage.getItem("authToken"))

    if(token) {
      const {exp} = jwtDecode(token)
  
      if(exp * 1000 > new Date().getTime()) {
        setTokenValid(true) 
      }
    }
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

        {tokenValid 
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

        <Posts/>
      </div>
    </>
  )
}