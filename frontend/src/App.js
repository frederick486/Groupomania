import Navbar from './Components/Navbar/Navbar'
import Home from './Containers/Home/Home';
import {Routes, Route} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddArticle from './Containers/AddArticle/AddArticle'
import Contact from './Containers/Contact/Contact'
import Article from './Containers/Article/Article' 
// import Login from './Components/Login/Login'
// import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Auth from "./Components/Login/Auth"

function App() {
  return (
    <>
      <Navbar />
      {/* <Login /> */}
      <Routes>
          <Route path="/auth" element={<Auth />} />
          {/* <Route path='/login' element={<Login />}/> */}
          <Route path='/' element={<Home />}/>
          <Route path='/ecrire' element={<AddArticle />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/articles/:slug' element={<Article />}/>
      </Routes>
    </>
  );
}

export default App;
