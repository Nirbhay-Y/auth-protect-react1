import './App.css';
import About from './components/About';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup'; 
import Home from './components/Home';
import Logout from './components/Logout';

function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/about' element={<About></About>}/>
      <Route path='/contact' element={<Contact></Contact>}/>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/signup' element={<Signup></Signup>}/>
      <Route path='/logout' element={<Logout></Logout>}/>
    </Routes>
   </>
  )
}

export default App;
