import './users.css'
import { API_URL_USER } from '../../config'
import React from 'react'
import { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'
import UserCard from '../../Components/userCard/UserCard'
import Navbar from '../../Components/navbar/Navbar'

export default function Users () {
  const [ data, setData ]= useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL_USER );
        setData(response.data);
    })();
  }, []);

  return (
    <>
      <Navbar/>
      <div className="container-userCards">
        <h2>Liste des utilisateurs</h2>
        {data.map(user => {
          return <UserCard key={uuidv4()} card={user} />
        })}        
      </div>
    </>
  )
}