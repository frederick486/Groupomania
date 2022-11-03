import Navbar from './Components/Navbar/Navbar'
import Home from './Containers/Home/Home';
import {Routes, Route} from 'react-router-dom'
import AddArticle from './Containers/AddArticle/AddArticle'
import Contact from './Containers/Contact/Contact'
import Article from './Containers/Article/Article' 
import "./App.css"
import Auth from "./Components/Login/Auth"
// import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path='/' element={<Home />}/>
          <Route path='/ecrire' element={<AddArticle />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/article/:postId' element={<Article />}/>
      </Routes>
    </>
  );
}

export default App;
//-------------------------------------------------------------------------------
{/* <Route path='/article/:slug' element={<Article />}/> */}
{/* <Route exact path="/article" render={(props) => <Article {...props} />} /> */}
{/* <Navigate to="/article" postId={{ data: this.state.searchResults }} /> */}
{/* <Route path="/article" exact component={Article} /> */}
