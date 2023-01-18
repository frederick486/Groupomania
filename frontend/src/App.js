import { Routes, Route } from 'react-router-dom'
import Home from "../src/pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import PostShare from './pages/postShare/PostShare'
import PostUpdate from "./pages/postUpdate/PostUpdate"
import Post from './pages/post/Post'


function App() {
  return (
    <>
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