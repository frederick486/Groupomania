import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css"
import logo from "../../Assets/icon-left-font-monochrome-black.png"
import React, { useState, useRef } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../Components/navbar/Navbar'
import Signup from '../signup/Signup'

export default function Login ({openLogin, setOpenLogin}) {
// export default function Login () {

  const navigate = useNavigate()

  const email = useRef();
  const password = useRef();

  const [openSignup, setOpenSignup] = useState(false);

  // const register = () => {setOpenSignup(true); setOpenLogin(false) };

  // const [token, setToken] = useState(null) 
  // console.log("token : ",token)

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Non utilisateur : ", email.current.value);
    console.log("Password : ", password.current.value);

    axios({
      method: "post",
      url: 'http://localhost:4000/api/user/login',
      // withCredentials: true,
      data: {
        email : email.current.value,
        password : password.current.value,
      },
    })
    .then((res) => {
      if (res.data.errors) {
        // emailError.innerHTML = res.data.errors.email;
        // passwordError.innerHTML = res.data.erros.password;
        console.log("password ou nom d'utilisateur incorecte")
      } else {
        console.log("res : ", res)
        window.localStorage.setItem("authToken", res.data.token)
        window.localStorage.setItem("userId", res.data.userId)
        window.localStorage.setItem("pseudo", res.data.pseudo)
        window.localStorage.setItem("profileImgUrl", res.data.profileImgUrl)
        // axios.defaults.headers["Authorization"] = "Bearer" + res.data.token
        // const tokenLocalStorage = localStorage.getItem("authToken")
        // setToken(tokenLocalStorage)

        // window.location.reload('/');
        navigate('/')
        setOpenLogin(false)
    
        // window.location = "/";

      }
    })
    .catch((error) => {
      console.log(error);
    }); 
  }

  return (
    <>
      {openLogin && (
      
        <div className="Auth-form-container">
          <img className="mb-4" src={logo} alt="Groupomania" width="200" height="200"/>
          {/* <button 
            className="Login-button-register"
            onClick={register}
          >
            Enregister vous
          </button> */}
          <form onSubmit={handleSubmit} className="Auth-form">
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
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      )} 

    {/* {openSignup 
      && (<Signup 
        openSignup={openSignup}
        setOpenSignup={setOpenSignup}      
      />)}     */}
     
    </>
  )
}