// import React from 'react'  // <<< plus nécessaire depuis React V17
import "./home.css"
import Posts from "../../Components/posts/Posts";


export default function Home() {
  return (
    <>
      <div className="homeContainer">
       <Posts/>
      </div>
    </>
  )
}
