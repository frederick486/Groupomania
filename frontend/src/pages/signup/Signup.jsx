import "bootstrap/dist/css/bootstrap.min.css"
import "./signup.css"
import logo from "../../Assets/icon-left-font-monochrome-black.png"
import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL_USER_SIGNUP } from '../../config'
import defaultImage from '../../Assets/no-avatar.png'

// icones Matérial UI
import { Cancel } from '@mui/icons-material'
import { PermMedia } from "@mui/icons-material";


export default function Signup () {

  const navigate = useNavigate()

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setfile] = useState(null);

  const register = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("pseudo", pseudo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImgUrl", file);

    try {
      await axios.post( API_URL_USER_SIGNUP , formData, { 
        headers: { "Content-Type": "multipart/form-data", },
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
    alert("cet identifiant est déja pris")
    }
  }
          
  return (
    <>     
      <div className="signup-container">
        <div className="signup-form-container">
            <img className="signup-form-logo" src={logo} alt="Groupomania"/>
            <h3 className="signup-form-title">Créez votre compte</h3>
            <div className="text-center">
              Déja enregistré ?{" "}
              <Link 
                className="signup-Link-to-login"
                to={'/login'}
              >
                Connectez vous
              </Link>          
            </div> 

            <form onSubmit={register} className="signup-form">
              <div className="signup-form-content">
                <div className="form-group mt-3">
                  <label>Pseudo</label>
                  <input
                    onChange={(e) => setPseudo(e.target.value)}                
                    type="text"
                    className="form-control mt-1"
                    placeholder="e.g Jane Doe"
                    required
                  /> 
                </div> 
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}    
                    required            
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password"
                    className="form-control mt-1"
                    placeholder="Password"
                    required 
                    minLength="6"
                  />
                </div>
            
                <div className="signup-buttons-container">

                  <button 
                    onClick={()=>{navigate('/')}}
                    className="signup-button-cancel"
                  >
                    Annuler
                  </button>

                  <button 
                    className="signup-button-register"
                    type="submit" >
                    Enregistrer
                  </button>

                </div>
              </div>

              <div className="signup-form-profilImg-wrapper">
              <div className="signup-wrapper-preview-Img">
                {(file === null) 
                  ? ( <img className='signup-preview-Img' src={defaultImage} alt="Image par défaut" />)                  
                  : ( <img className='signup-preview-Img' src={URL.createObjectURL(file) } alt="Prévisualisation" />)
                }
                  
                <Cancel 
                  className='signup-preview-Img-cancel-icone' 
                  onClick={() => setfile(null)} 
                />
              </div>              

                <label 
                  className='signup-label-choseFile'
                  htmlFor="avatar"
                >
                  
                  <PermMedia htmlColor='blue'/>
                  <span className='signup-label-choseFile-text'>Importer une image</span>
                  <input 
                    style={{ display:"none" }} // <<< à revoir
                    label="Select a File"
                    type="file"
                    id="avatar"
                    accept=".png,.jpeg,.jpg" 
                    onChange={(e) => { setfile(e.target.files[0]) }}          
                  />  
                </label> 
              </div>

            </form>
        </div>                      
      </div>     
    </>
  )  
}