import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import PostShare from '../postShare/PostShare'
import PostShareModal from '../postShareModal/PostShareModal';
import Logo from '../../Assets/icon-left-font-monochrome-black.png'
import { useState } from 'react';

import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';



function NavScrollExample() {

  const [show, setShow] = useState(false)
  
  return (
    <div className='navbar-complement' >
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <img src={Logo} className='logo' alt="logo Groupomania" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/user">Connection</Nav.Link>
              <Nav.Link href="/">Page d'acceuil</Nav.Link>
              <Nav.Link href="/post-share">Ajouter un article</Nav.Link>
              {/* <button
                onClick={ () => setShow(true) }
              >Ajouter un article</button> */}
              <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                style={{zIndex:"10"}}
                onClick={ () => setShow(true) }
              >
                Ajouter un article
              </Button>         
              <PostShareModal show={show}/>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavScrollExample;