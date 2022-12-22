import "bootstrap/dist/css/bootstrap.min.css"
import "./signup.css"
import logo from "../../Assets/icon-left-font-monochrome-black.png"
import React, { useState, useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup () {

    const navigate = useNavigate()

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImgUrl, setprofileImgUrl] = useState(null);

    console.log("email : ", email)

    const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("pseudo", pseudo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImgUrl", profileImgUrl);

    try {
    await axios.post( "http://localhost:4000/api/user/signup" , formData, { 
        headers: { 
        "Content-Type": "multipart/form-data", 
        // 'Authorization': `Bearer ${token}`  
        },
    })
    .then((res) => {
      console.log("res", res)
        window.localStorage.setItem("authToken", res.data.token)
        window.localStorage.setItem("userId", res.data.userId)
        window.localStorage.setItem("pseudo", res.data.pseudo) 
        window.localStorage.setItem("profileImgUrl", res.data.profileImgUrl) 
        navigate('/')
    })
    } catch (err) {
    console.log(err)      
    }

    }
          
    return (
      <div className="Auth-form-container">
        <img className="mb-4" src={logo} alt="Groupomania" width="200" height="200"/>
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary">
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
               <input
                onChange={(e) => setPseudo(e.target.value)}                
                type="text"
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
                onChange={(e) => setEmail(e.target.value)}                
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}                
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            <label htmlFor="avatar">Ajoutez une image</label> 
            <input 
              label="Select a File"
              type="file"
              onChange={(e) => { setprofileImgUrl(e.target.files[0]) }}          
            />            
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