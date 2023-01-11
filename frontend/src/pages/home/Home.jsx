// import React from 'react'  // <<< plus nécessaire depuis React V17
import "./home.css"
import Posts from "../../Components/posts/Posts";
import Navbar from "../../Components/navbar/Navbar"
import logo from "../../Assets/icon-left-font-monochrome-black.png"


export default function Home() {
  return (
    <>
      <Navbar />

      <a className="home-top-button" href="#top">
        <span className="home-top-button-icone">
            ^
        </span>
     </a>

      <img className="home-logo" src={logo} alt="Groupomania"/>

      <div className="homeContainer" id="homeContainer">
        <Posts/>
      </div>
    </>
  )
}