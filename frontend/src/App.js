import "./App.css"
import Navbar from "../src/Components/navbar/Navbar"
import Home from "../src/pages/home/Home"
import Post from "../src/Components/post/Post"
import Auth from "../src/pages/login/Auth"
import {Routes, Route} from 'react-router-dom'
import PostUpdate from "./Components/postUpdate/PostUpdate"
import PostShare from "./Components/postShare/PostShare"


function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/user" element={<Auth />} />
          <Route path='/' element={<Home />}/>
          <Route path='/post-share' element={<PostShare />}/>
          <Route path='/post-update/:postId' element={<PostUpdate />}/>
          <Route path='/post/:postId' element={<Post />}/>
      </Routes>
    </>
  );
}

export default App;