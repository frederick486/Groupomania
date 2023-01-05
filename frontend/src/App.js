import "./App.css"
import Navbar from "../src/Components/navbar/Navbar"
import Home from "../src/pages/home/Home"
import Post from "../src/Components/post/Post"
import { Routes, Route } from 'react-router-dom'
import PostUpdate from "./pages/postUpdate/PostUpdate"
import PostShare from './pages/postShare/PostShare'
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"


function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/post-share' element={<PostShare />}/>
        <Route path='/post-update/:postId' element={<PostUpdate />}/>
        <Route path='/post/:postId' element={<Post />}/>
      </Routes>
    </>
  );
}

export default App;