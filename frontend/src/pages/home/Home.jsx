// import React from 'react'  // <<< plus nécessaire depuis React V17
import "./home.css"
import Navbar from "../../Components/navbar/Navbar";
import Posts from "../../Components/posts/Posts";



export default function Home() {
  return (
    <>
      {/* <Navbar/> */}
      <div className="homeContainer">
       <Posts/>
      </div>
    </>
  )
}
