import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Article.css';
import {useLocation} from 'react-router-dom'

export default function AxiosRequest() {
  const [data, setData] = useState([])

  const location = useLocation()
  const id = location.pathname.split('/article/')[1]
  console.log("id : ", id)

  const getData = () => {

    // const id = location.pathname.split('/article/')[1]

    axios
      .get("http://localhost:4000/api/post/" + id)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const deletePost = () => {
    // const id = location.pathname.split('/article/')[1]

    axios
      .delete("http://localhost:4000/api/post/" + id)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }

  return(
    <>
      <div className="article-content">
        <img src={data.picture} alt="Appareil photo Reflex" />
        <p>{data.comment}</p>
        <button onClick={deletePost}>Supprimer</button>
     </div>
    </>
  )
}