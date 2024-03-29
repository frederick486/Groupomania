import './navbar.css'
import Logo from '../../Assets/icon-left-font-monochrome-black.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"
import { API_URL_USER_DELETE } from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Components Matérial UI
import Avatar from '@mui/material/Avatar';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

export default function Topbar () {

  const navigate = useNavigate()

  const [token, setToken] = useState(null) 
  const [tokenValid, setTokenValid] = useState(false) 

  const [pseudo, setPseudo] = useState("")
  const [avatar, setAvatar] = useState("")
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  }

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
    localStorage.clear();
    setToken(null);
    setTokenValid(false);
    navigate('/');
    window.location.reload();
  }

  const deleteUser = async (e) => {
    e.preventDefault();
    if(window.confirm("êtes vous sur de vouloir supprimer votre compte")){
      try {
        await axios.put( API_URL_USER_DELETE, 
          { userId: localStorage.getItem("userId") },  
          { headers: { 'Authorization': `Bearer ${token}`  }}
        )
        localStorage.clear();
        setToken(null); // <<< relance le useEffect
        setTokenValid(false);
        navigate('/');
        window.location.reload();
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <div className='groupomania-navbar' >

        <div className="groupomania-navbar-menu">
          <Link to="/">
            <img className='groupomania-navbar-logo' alt='logo Groupomania' src={Logo}/>
          </Link>

          <button 
            className='groupomania-navbar-toggle-button' 
            onClick={toggleNav}>
              <Avatar alt="Utilisateur" src={tokenValid ? avatar : "../../Assets/noAvatar.png" } />
              <ExpandMoreIcon/>
          </button>
        </div>      

        {toggleMenu && (
          <div className='groupomania-navbar-toggle-menu'>
            { tokenValid
              ? (<>
                  <button 
                    className='groupomania-navbar-button-menu' 
                  >
                    <InfoOutlinedIcon/>
                    <span className='groupomania-navbar-button-menu-text'>
                      Connecté en tant que <b>"{pseudo}"</b>
                    </span>
                  </button>

                  <hr className='groupomania-navbar-link-hr'/>

                  { pseudo === "administrateur" && (<>
                    <Link 
                      className='groupomania-navbar-button-menu link'
                      to="/users-list">
                      <InputOutlinedIcon/>
                      <span className='groupomania-navbar-button-menu-text'>Voir les utilisateurs</span> 
                    </Link>
                    <hr className='groupomania-navbar-link-hr'/>
                  </>)}

                  { pseudo !== "administrateur" && (<>
                    <button 
                      className='groupomania-navbar-button-menu warning' 
                      onClick={deleteUser}
                    >
                      <DeleteOutlineIcon/>
                      <span className='groupomania-navbar-button-menu-text'>Supprimer mon compte</span>
                    </button>
                    <hr className='groupomania-navbar-link-hr'/>                                
                  </>)}

                </>
              )
              : (<><button className='groupomania-navbar-button-menu'>
                    <InfoOutlinedIcon/>
                    <span className='groupomania-navbar-button-menu-text'>Non connecté</span> 
                  </button>
                  <hr className='groupomania-navbar-link-hr'/>
                </>)
            }

            { tokenValid 
              ? <button 
                  className='groupomania-navbar-button-menu overview'  
                  onClick={deconnexion}>
                    <PowerSettingsNewIcon/>
                    <span className='groupomania-navbar-button-menu-text'>Déconnexion</span>
                  </button>
              : (
                <>
                  <Link 
                    className='groupomania-navbar-button-menu link'
                    to="/login">
                    <InputOutlinedIcon/>
                    <span className='groupomania-navbar-button-menu-text'>Connection</span> 
                  </Link>
                  <hr className='groupomania-navbar-link-hr'/>
                </>)
            }                
                
            { !tokenValid 
              && <Link 
                  className='groupomania-navbar-button-menu link'
                  to='/signup'>
                    <AppRegistrationOutlinedIcon/>
                    <span className='groupomania-navbar-button-menu-text'>Enregistrement</span>                     
                  </Link> }    
          </div>
        )}

      </div>             
    </>
  );
}