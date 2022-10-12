import Navbar from './Components/Navbar/Navbar'
import Home from './Containers/Home/Home';
import {Routes, Route} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddArticle from './Containers/AddArticle/AddArticle'
import Contact from './Containers/Contact/Contact'
import Article from './Containers/Article/Article' 
import Login from './Components/Login/Login'

function App() {
  return (
    <>
      <Navbar />
      {/* <Login /> */}
      <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/ecrire' element={<AddArticle />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/article' element={<Article />}/>
      </Routes>
    </>
  );
}

export default App;