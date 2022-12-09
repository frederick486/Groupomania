import "bootstrap/dist/css/bootstrap.min.css"
import "./auth.css"
import logo from "../../Assets/icon-left-font-monochrome-black.png"
import React, { useState, useRef } from "react"
import axios from "axios";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }


  if (authMode === "signin") {

    const email = useRef();
    const password = useRef();
  
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
          window.location = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      }); 
    }

    return (
      <div className="Auth-form-container">
        <img className="mb-4" src={logo} alt="Groupomania" width="200" height="200"/>
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
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
    )
  } else if (authMode === "signup") {

    const email = useRef();
    const password = useRef();
    // const fullName = useRef();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Non utilisateur : ", email.current.value);
      console.log("Password : ", password.current.value);
       
      axios({
        method: "post",
        url: 'http://localhost:4000/api/user/signup',
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
          window.location = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      }); 
    }

    return (
      <div className="Auth-form-container">
        <img className="mb-4" src={logo} alt="Groupomania" width="200" height="200"/>
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            {/* <div className="form-group mt-3">
              <label>Full Name</label>
               <input
                ref={fullName}
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              /> 
             </div> */} 
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                ref={email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                ref={password}
                type="password"
                className="form-control mt-1"
                placeholder="Password"
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
    )
  }
}