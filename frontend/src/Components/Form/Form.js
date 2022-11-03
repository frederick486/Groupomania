// // import React, {useState, useEffect} from 'react'
// // import {useSelector, useDispatch} from 'react-redux'
// // import './Form.css'
// // import Navbar from '../../Components/Navbar/Navbar'

// // export default function Form() {
// //     const [article, setArticle] = useState({
// //         title:"",
// //         body:"",
// //     });

// //     const dispatch = useDispatch();

// //     const handleForm = (e) => {
// //         e.preventDefault();

// //         const newArticle = {
// //             title: article.title,
// //             body: article.body,
// //         };

// //         dispatch({
// //             type: 'ADDARTICLE',
// //             payload: article,
// //         });

// //         setArticle({
// //             title:"",
// //             body:"",
// //         })
// //     };

// //     const addNewTitle = (e) => {
// //         const newObjState = {...article, title: e.target.value};
// //         setArticle(newObjState);
// //     };

// //     const addNewBody = (e) => {
// //         const newObjState = {...article, body: e.target.value};
// //         setArticle(newObjState);
// //     };
  
// //   return (
// //     <>  
// //     <Navbar />
// //         <h1 className="title-form">Ecrivez un article</h1>
// //         <form className="container-form" onSubmit={handleForm}>
// //             <label htmlFor="title">Titre</label>
// //             <input 
// //                 value={article.title}
// //                 onInput={addNewTitle}
// //                 type="text" 
// //                 id="title" 
// //                 placeholder="Entrez votre nom"
// //                 // className='inp-title' 
// //             />

// //             <label htmlFor="article">Votre article</label>
// //             <textarea 
// //                 value={article.body}
// //                 onInput={addNewBody}
// //                 id="article" 
// //                 placeholder="Votre article"
// //                 // className='inp-body'
// //             ></textarea>

// //             <button>Envoyer l'article</button>
// //         </form>      
// //     </>
// //   );
// // }

// //---------------------------------------------------------------------------------------

// import React, {useState, useRef, useEffect} from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import './Form.css'
// import Navbar from '../../Components/Navbar/Navbar'
// import axios from "axios";

// export default function Form() {

//     const title = useRef();
//     const body = useRef();
//     const imageUrl = useRef();

//     const handleForm = (e) => {
//         e.preventDefault();

//         console.log("imageUrl.current.value------>", imageUrl.current.value) // imageUrl.current.value------> C:\fakepath\hellfire-elixir-sauce.jpg

//         axios({
//             method: "post",
//             url: 'http://localhost:4200/api/publication',
//             // withCredentials: true,
//             data: {
//                 title : title.current.value,
//                 body : body.current.value,
//                 imageUrl : imageUrl.current.value, // << sur MongoDB, ça enregistre : "C:\fakepath\nom-du-fichier.jpg"
//                 // imageUrl : imageUrl.current.files, // << 400 (Bad Request)
//                 // imageUrl : e.target.files[0], // <<< Uncaught TypeError: Cannot read properties of undefined (reading '0')
//             },
//         })
//         .then((res) => {
//             if (res.data.errors) {
//             console.log("echec de l'envoi")
//             } else {
//             window.location = "/";
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         }); 


//     };
 
//   return (
//     <>  
//     <Navbar />
//         <h1 className="title-form">Ecrivez un article</h1>
//         <form className="container-form" encType='multipart/form-data' onSubmit={handleForm}>
//             <label htmlFor="title">Titre</label>
//             <input 
//                 // value={article.title} // control input
//                 // onInput={addNewTitle} // control input
//                 ref={title} // uncontrol input
//                 type="text" 
//                 id="title" 
//                 placeholder="Entrez votre nom"
//                 // className='inp-title' 
//             />

//             <label htmlFor="article">Votre article</label>
//             <textarea 
//                 // value={article.body} // control input
//                 // onInput={addNewBody} // control input
//                 ref={body} // uncontrol input
//                 id="article" 
//                 placeholder="Votre article"
//                 // className='inp-body'
//             ></textarea>

//             <label htmlFor="avatar">Choose a profile picture:</label> 
//             <input 
//                 ref={imageUrl}
//                 type="file"
//                 id="avatar" 
//                 name="avatar"
//                 accept="image/png, image/jpeg" 
//             />

//              <button>Envoyer l'article</button>
//         </form>      
//     </>
//   );
// }

// //------------------------------------------------------------------------------------

import { useState } from "react";
import axios from 'axios'
import './Form.css'

function Form() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault(); //prevent the form from submitting
    let formData = new FormData();

    formData.append("comment", comment);
    formData.append("picture", selectedFiles[0]);

    axios.post("http://localhost:4000/api/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => {
        console.log(res)
    })
  };

  return (
    <>  
      <h1 className="title-form">Ecrivez un article</h1>
      <form 
        className="container-form"
        onSubmit={submitHandler}
      >

        <label htmlFor="article">Votre article</label>
        <textarea            
            placeholder="Votre article"
            onChange={(e) => {
              setComment(e.target.value);
            }}      
        ></textarea>

        <label htmlFor="avatar">Choose a profile picture:</label> 
        <input 
          label="Select a File"
          type="file"
          onChange={(e) => {
            setSelectedFiles(e.target.files);
          }}
        />

        <button>Envoyer l'article</button>
      </form>      
    </>
  );
}

export default Form;