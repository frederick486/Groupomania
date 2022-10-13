import "bootstrap/dist/css/bootstrap.min.css"
import "./Auth.css"
import logo from "../../Assets/icon-left-font-monochrome-black.png"
import React, { useState, useRef } from "react"

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  // const inputRefUser = useRef();
	// const inputRefPassword = useRef();

  // const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log("Non utilisateur : ", inputRefUser.current.value);
	// 	console.log("Password : ", inputRefPassword.current.value);

  //   // création de l'envoi
  //   const bodyEnvoie = {
  //   email: inputRefUser.current.value,
  //   password : inputRefPassword.current.value
  //   }

  //   // requête API
  //   fetch('http://localhost:4200/api/auth/login', {
  //     method: "POST",
  //     body: JSON.stringify(bodyEnvoie),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }        
  //   })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     // const orderId = data.orderId
  //     console.log("data", data)
  //     // window.location.href = "../html/confirmation.html" + "?orderId=" + orderId
  //   })
  //   .catch((err) => console.log(err))

  // }

  if (authMode === "signin") {

    const inputRefUser = useRef();
    const inputRefPassword = useRef();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Non utilisateur : ", inputRefUser.current.value);
      console.log("Password : ", inputRefPassword.current.value);
  
      // création de l'envoi
      const bodyEnvoie = {
      email: inputRefUser.current.value,
      password : inputRefPassword.current.value
      }
  
      // requête API
      fetch('http://localhost:4200/api/auth/login', {
        method: "POST",
        body: JSON.stringify(bodyEnvoie),
        headers: {
          'Content-Type': 'application/json'
        }        
      })
      .then((res) => res.json())
      .then((data) => {
        // const orderId = data.orderId
        console.log("data", data)
        // window.location.href = "../html/confirmation.html" + "?orderId=" + orderId
      })
      .catch((err) => console.log(err))
  
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
                ref={inputRefUser}
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                ref={inputRefPassword}
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

    const inputRefUser = useRef();
    const inputRefPassword = useRef();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Non utilisateur : ", inputRefUser.current.value);
      console.log("Password : ", inputRefPassword.current.value);
  
      // création de l'envoi
      const bodyEnvoie = {
      email: inputRefUser.current.value,
      password : inputRefPassword.current.value
      }
  
      // requête API
      fetch('http://localhost:4200/api/auth/signup', {
        method: "POST",
        body: JSON.stringify(bodyEnvoie),
        headers: {
          'Content-Type': 'application/json'
        }        
      })
      .then((res) => res.json())
      .then((data) => {
        // const orderId = data.orderId
        console.log("data", data)
        // window.location.href = "../html/confirmation.html" + "?orderId=" + orderId
      })
      .catch((err) => console.log(err))
  
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
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                ref={inputRefUser}
                type="email"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                ref={inputRefPassword}
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