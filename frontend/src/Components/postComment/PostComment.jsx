import './postComment.css'
import { useRef } from 'react';
import PostShare from '../postShare/PostShare';
// import { useState } from 'react';

export default function PostComment () {
    // const [comment, setComment] = useState("")
    const comment = useRef();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log("Submit");
        console.log(comment.current.value);
    
        // let formData = new FormData();

        // formData.append("comment", comment);
    
        // axios.post("http://localhost:4000/api/post", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }).then(res => {
        //     console.log(res)
        // })

    };    


    return (
        <>  
            <PostShare title="Ajouter un commentaire"/>
            {/* <h1>Laisser un commentaire</h1>
            <form 
                cl
                onSubmit={handleSubmit}
            >
    
                <label htmlFor="article">Votre commentaire</label>
                <textarea            
                    placeholder="taper votre texte"
                    // onChange={(e) => {
                    // setComment(e.target.value);
                    // }}      
                    ref={comment}
                ></textarea>
      
                <button>Envoyer</button>
            </form>       */}
            {/* <Article/> */}
        </>
    )
}