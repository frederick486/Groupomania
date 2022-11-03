import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Article.css';
import {useLocation} from 'react-router-dom'

export default function AxiosRequest() {
  const [data, setData] = useState([])

  const location = useLocation()
  console.log(location)

  const getData = () => {

    const id = location.pathname.split('/article/')[1]

    axios
      .get("http://localhost:4000/api/post/" + id)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return(
    <>
      <div className="article-content">
        <img src={data.picture} alt="Appareil photo Reflex" />
        <p>{data.comment}</p>
     </div>
    </>
  )
}