import React from 'react'
import './userCard.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"
import { API_URL_USER_DELETE } from '../../config'
import axios from 'axios'

// Components Matérial UI
import Avatar from '@mui/material/Avatar';


export default function UserCard(props) {
    const navigate = useNavigate()

    const [token, setToken] = useState(null) 
    const [tokenValid, setTokenValid] = useState(false) 
    const [pseudo, setPseudo] = useState("")

    useEffect(()=> {
      setToken(localStorage.getItem("authToken"))
      setPseudo(localStorage.getItem("pseudo"))
  
      if(token) {
        const {exp} = jwtDecode(token)
    
        if(exp * 1000 > new Date().getTime()) {
          setTokenValid(true) 
        }
      }
    }, [token])

    const deleteUser = async (userId) => {
      // e.preventDefault();
      if(window.confirm("êtes vous sur de vouloir supprimer ce compte")){
        try {
          await axios.put( API_URL_USER_DELETE,
            { userId: userId },  
            { headers: { 'Authorization': `Bearer ${token}` }}
          )
          window.location.reload()
        } 
        catch (err) {
          console.log(err)
        }
      }
    }    

  return (
    <>
      { props.card.pseudo !== "administrateur" && (<>
        <div className='userCard'>

          <Avatar 
            sx={{ width: 56, height: 56 }}
            alt="Auteur du post" 
            // src="/static/images/avatar/1.jpg" 
            src={props.card.profileImgUrl}
          />

          <div className="userCard_infos">
            <span className="userCard_infos-pseudo">
              Utilisateur : {props.card.pseudo}
            </span>
          </div>

          { (tokenValid && pseudo === "administrateur") && (<>
            <button
              className='userCard-button-delete'
              onClick={async() => {await deleteUser(props.card._id)}}
            >
              supprimer cet utilisateur
            </button>
          </>)}  

        </div>          
      </>)}      
    </>
  )
}