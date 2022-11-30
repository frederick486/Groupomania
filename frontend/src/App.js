import "./App.css"
import Navbar from "../src/Components/navbar/Navbar"
import Home from "../src/pages/home/Home"
import PostShare from "../src/Components/postShare/PostShare"
import Post from "../src/Components/post/Post"
import Auth from "../src/pages/login/Auth"
import {Routes, Route} from 'react-router-dom'
import Container from '@mui/material/Container';


function App() {
  return (
    // <Container>
    <>
      <Navbar />
      <Routes>
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="/user" element={<Auth />} />
          <Route path='/' element={<Home />}/>
          <Route path='/post-share' element={<PostShare />}/>
          <Route path='/post/:postId' element={<Post />}/>
      </Routes>
    {/* // </Container> */}
    </>
  );
}

export default App;
//-------------------------------------------------------------------------------
{/* <Route path='/article/:slug' element={<Article />}/> */}
{/* <Route exact path="/article" render={(props) => <Article {...props} />} /> */}
{/* <Navigate to="/article" postId={{ data: this.state.searchResults }} /> */}
{/* <Route path="/article" exact component={Article} /> */}
