import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css"
import logo from "../../Assets/icon-left-font-monochrome-black.png"
import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_USER_LOGIN } from '../../config'

export default function Login () {
  const navigate = useNavigate()

  const email = useRef();
  const password = useRef();

  const connection = async (e) => {
    e.preventDefault();

    // const isAdmin = false;
    // if(email === "administrateur@gmail.com" && password === "password@1234" ) {
    //   isAdmin = true
    // }    

    try {
      await axios.post( API_URL_USER_LOGIN,
        {
          email : email.current.value,
          password : password.current.value,
        },
      )
      .then((res) => {    
        console.log("res : ", res)
        window.localStorage.setItem("authToken", res.data.token)
        window.localStorage.setItem("userId", res.data.userId)
        window.localStorage.setItem("pseudo", res.data.pseudo)
        window.localStorage.setItem("profileImgUrl", res.data.profileImgUrl)
        // window.localStorage.setItem("isAdmin", isAdmin)
        // axios.defaults.headers["Authorization"] = "Bearer" + res.data.token

        navigate('/')
      })            
    } catch (err) {
      console.log(err)
      alert("identifiant ou mot de passe incorrecte")        
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <img className="login-form-logo" src={logo} alt="Groupomania"/>
          <h3 className="login-form-title">Identifiez-vous</h3>
          <div className="login-text-link">
              Pas encore membre ?{" "}
              <Link 
                className="login-Link-to-signup"
                to={'/signup'}
              >
                Enregistez-vous
              </Link>
          </div>
                
          <form onSubmit={connection} className="login-form">

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                ref={email}
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                ref={password}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>

            <div className="login-buttons-container">

              <button 
                onClick={()=>{navigate('/')}}
                className="login-button-cancel"
              >
                Annuler
              </button>

              <button 
                className="login-button-register"
                type="submit" >
                Connexion
              </button>

            </div>              

          </form>
        </div>
      </div>    
    </>
  )
}