import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Article.css';


export default function AxiosRequest() {
  const [data, setData] = useState([])

  const getData = () => {
    axios
    .get("http://localhost:4000/api/post/63614cf0c396463a8b74dfa7")
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

