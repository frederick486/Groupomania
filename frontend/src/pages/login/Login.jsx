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
      
      <div className="Auth-form-container">
        <img className="mb-4" src={logo} alt="Groupomania" width="200" height="200"/>
        {/* <button 
          className="Login-button-register"
          onClick={register}
        >
          Enregister vous
        </button> */}
        <form onSubmit={connection} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Pas encore membre ?{" "}
              {/* <button className="link-primary"> */}

            </div>
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
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
     
    </>
  )
}