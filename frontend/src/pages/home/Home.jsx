// import React from 'react'  // <<< plus nécessaire depuis React V17
import "./home.css"
import Posts from "../../Components/posts/Posts";
import Navbar from "../../Components/navbar/Navbar"


export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="homeContainer" id="homeContainer">
        <Posts/>
      </div>
    </>
  )
}
