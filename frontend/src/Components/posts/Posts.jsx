import './posts.css'
import { API_URL } from '../../config'
import React from 'react'
import { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'
import PostCard from '../postCard/PostCard'
import Loader from '../../Components/Loader/Loader';


export default function Posts () {
  const [ data, setData ]= useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      const response = await axios.get( API_URL );
      setData(response.data);
      setLoaded(true)
    })();
  }, []);


  return (
    <>
      { loaded 
        ? ( <div className="container-cards"> 
              { data.map(item => { return <PostCard key={uuidv4()} card={item} /> } ) } 
            </div>
          )
        : ( <><Loader/></>)
      }
    </>
  )
}