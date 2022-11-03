import Navbar from './Components/Navbar/Navbar'
import Home from './Containers/Home/Home';
import {Routes, Route} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddArticle from './Containers/AddArticle/AddArticle'
import Contact from './Containers/Contact/Contact'
import Article from './Containers/Article/Article' 
// import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Auth from "./Components/Login/Auth"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path='/' element={<Home />}/>
          <Route path='/ecrire' element={<AddArticle />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/article/:slug' element={<Article />}/>
          {/* <Route path="/article" exact component={Article} /> */}
      </Routes>
    </>
  );
}

export default App;
