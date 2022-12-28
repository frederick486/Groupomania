// import React from 'react'
import './loader.css'

export default function Loader() {
  return (
    <div className='loader-wrapper '>
        {/* <div class="loader"></div> */}
        <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}