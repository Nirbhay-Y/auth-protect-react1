import React,{useEffect,useState} from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by checking the presence of the JWT token in localStorage
        const token = localStorage.getItem("jwttoken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwttoken");
        setIsLoggedIn(false);  
    }

    return(
        <>
       <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgba(111, 117, 141, 0.15)' ,border: '1px solid black'}}>
  <div className="container-fluid">
    <span className="Photo"></span>
    <Link to="/" className="icon" style={{marginLeft:10}}>MyWeBsite</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{marginRight:25}}>
        <li className=" nav nav-item">
          <Link to="/" className="buttons" style={{ fontSize: 17,paddingTop:6 }}>Home</Link>
        </li>
        <li className="nav nav-item">
          <Link to="/about" className="buttons" style={{ fontSize: 17,paddingTop:6 }}>About you</Link>
        </li>
        <li className="nav nav-item">
          <Link to="/contact" className="buttons" style={{ fontSize: 17,paddingTop:6 }}>Contact us</Link>
        </li>
        {isLoggedIn ? (// this is must () for ternary operators
          <li className="nav nav-item">
           <button type="button" class="btn btn-danger"><Link to="/logout" className="buttons1" onClick={handleLogout} style={{ fontSize: 17,paddingBottom:10 }}>Logout</Link></button> 
          </li>
        ) : (
          <>
            <li className="nav nav-item">
              <Link to="/login" className="buttons" style={{ fontSize: 17,paddingTop:6 }}>Login</Link>
            </li>
            <li className="nav nav-item">
              <Link to="/signup" className="buttons" style={{ fontSize: 17,paddingTop:6 }}>Registration</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}