// //10/11/22------------------------------------------------------------------------------------------------

// import React, {useState, useEffect} from 'react'
// import './Navbar.css'
// import {Link} from 'react-router-dom'

// export default function Navbar() {

//     const [toggleMenu, setToggleMenu] = useState(false);
//     const [largeur, setLargeur] = useState(window.innerWidth);

//     const toggleNav = () => {
//         setToggleMenu(!toggleMenu);
//     }

//     useEffect(() => {
//         const changeWidth = () => {
//             setLargeur(window.innerWidth);
//         }

//         window.addEventListener('resize', changeWidth);

//         return () => {
//             window.removeEventListener('resize', changeWidth);
//         }

//     }, [])

//   return (
//     <nav>
//     {(toggleMenu || largeur > 500) && (
//       <ul className="liste">
//         <li className="items"><Link to='/'>Acceuil</Link></li>
//         <li className="items"><Link to='/ecrire'>Ecrire</Link></li>
//         <li className="items"><Link to='/contact'>Contact</Link></li>
//       </ul>
//       )}
//       <button 
//         onClick={toggleNav}
//         className="btn-navbar">BTN</button>
//     </nav>
//   )
// }

// //------------------------------------------------------------------------------------------------

// import './Navbar.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import icone from '../../Assets/icon-left-font-monochrome-black.png'
// import { Link } from 'react-router-dom';
// import { Button } from 'bootstrap';
// import React from 'react';

// function Navbar () {

//     return (
//         <div className="container">
//         {/* <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"> */}
//         <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 mb-4 border-bottom">
//           <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
//             <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use href="frontend/public/favicon.ico"/></svg>
//             <img className="bi me-2" src={icone} alt="Groupomania" width="40" height="32"/>
//           </a>
        
//           <div className="col-md-3 text-end">
//             <button><Link to="/">Home</Link></button>
//             <button type="button" className="btn btn-outline-primary me-2"><Link to="/login">Login</Link></button>
//             <button type="button" className="btn btn-primary"><Link to="/signup">Sign-up</Link></button>
//           </div>
//         </header>
//       </div>
//     )
// }

// export default Navbar

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'


function NavScrollExample() {
  return (
    <nav>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}

export default NavScrollExample;