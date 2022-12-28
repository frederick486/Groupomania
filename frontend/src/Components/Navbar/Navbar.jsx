import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import Logo from '../../Assets/icon-left-font-monochrome-black.png'
import PostShare from '../postShare/PostShare'
import { useState } from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';


export default function Topbar () {

  const [openPostShare, setOpenPostShare] = useState(false);
  const handleOpen = () => setOpenPostShare(true);
  const handleClose = () => setOpenPostShare(false);

  const [pseudo, setPseudo] = useState("")
  const [avatar, setAvatar] = useState("")

  useEffect(()=> {
    setPseudo(localStorage.getItem("pseudo"))
    setAvatar(localStorage.getItem("profileImgUrl"))
  }, [])

  
  return (
    <>
      <div className='navbar-complement' >
        <Navbar bg="light" expand="lg">
          <Container fluid>
            {/* <Navbar.Brand>
              <img src={Logo} className='logo' alt="logo Groupomania" />
            </Navbar.Brand> */}

            <Avatar 
              alt="Auteur du post" 
              // src="/static/images/avatar/1.jpg" 
              src={avatar}
            />



            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/login">Connection</Nav.Link>
                <Nav.Link href="/">Page d'acceuil</Nav.Link>
                <Nav.Link 
                  // href="/post-share"
                  // onClick={setOpenPostShare(true)}
                  onClick={handleOpen}
                >Ajouter un article</Nav.Link>
                {/* <button onClick={handleOpen}
                
                >Nouvel article</button> */}

                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {openPostShare && 
        (<PostShare 
          // handleClose = {() => setOpenPostShare(false)} 
          openPostShare = {openPostShare}
          setOpenPostShare = {setOpenPostShare}
          /> )} 
    </>
  );
}