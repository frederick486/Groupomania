import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import Logo from '../../Assets/icon-left-font-monochrome-black.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"
import { API_URL_USER } from '../../config';
import axios from 'axios';

// Components Matérial UI
import Avatar from '@mui/material/Avatar';


export default function Topbar () {

  const navigate = useNavigate()

  const [token, setToken] = useState(null) 
  const [tokenValid, setTokenValid] = useState(false) 

  const [pseudo, setPseudo] = useState("")
  const [avatar, setAvatar] = useState("")

  useEffect(()=> {
    setPseudo(localStorage.getItem("pseudo"))
    setAvatar(localStorage.getItem("profileImgUrl"))
    setToken(localStorage.getItem("authToken"))

    if(token) {
      const {exp} = jwtDecode(token)
  
      if(exp * 1000 > new Date().getTime()) {
        setTokenValid(true) 
      }
    }
  }, [token])

  const deconnexion = (e) => {
    e.preventDefault();
    localStorage.clear()
    setToken(null)
    setTokenValid(false)
    navigate('/')
  }

  const deleteUser = async (e) => {
    e.preventDefault();
    if(window.confirm("êtes vous sur de vouloir supprimer votre compte")){
      try {
        await axios.delete( API_URL_USER, {
          headers: { 'Authorization': `Bearer ${token}`  }
        })
        localStorage.clear()
        setToken(null) // <<< relance le useEffect
        setTokenValid(false)
        navigate('/')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <div className='navbar-complement' >
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <div className="navbar-avatar-wrapper">
              <Avatar 
                alt="Utilisateur" 
                src={tokenValid
                      ? avatar
                      : "../../Assets/noAvatar.png" 
                    }
              />
              
              {tokenValid
                ? (<>
                    <div className="navbar-avatar-text">
                      <span className='navbar-avatar-pseudo' >Connecté en tant que <b>"{pseudo}"</b></span>
                      <button 
                        className='navbar-avatar-button-delete'
                        onClick={deleteUser}>Supprimer mon compte
                      </button>
                    </div>

                  </>
                )
                : <span className='navbar-avatar-pseudo' >Non connecté</span>
              }
            </div>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                { tokenValid 
                  ? <Nav.Link onClick={deconnexion}>Déconnexion</Nav.Link>
                  : <Nav.Link href="/login">Connection</Nav.Link>
                }                
                
                { !tokenValid && <Nav.Link href='/signup'>Enregistrement</Nav.Link> }
            
                <Nav.Link href="/">Page d'acceuil</Nav.Link>

                { tokenValid && <Nav.Link href="/post-share"> Ajouter un article </Nav.Link> }
  
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>             
    </>
  );
}