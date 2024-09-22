import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({
    Name: "", Email: "", Phone: "", Work: "", Password: "", cPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const letsGo = async (e) => {
    e.preventDefault();
    const { Name, Email, Phone, Work, Password, cPassword } = user;

    try {
      const res = await fetch('http://localhost:9000/register', {  // this is new should be learn http://localhost:9000/register not only register
        method: 'POST', // this CAPITAL LETTER is very very important
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Name, Email, Phone, Work, Password, cPassword
        })
      });

      const data = await res.json();
      if (res.status === 201) {
        alert("Registration Successfully")
        navigate("/login"); 
      } else {
        toast.error(data.error,{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } 

    catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="maincontainer">
      <div  style={{ fontFamily: "cursive", fontSize: 30,margin:20,textDecoration:"underline" }}>Registration Page:-</div>
      <div className="container2 container" style={{marginTop:5}}>
        <form className="row g-3" id="Signupres"  onSubmit={letsGo}  method='POST'>
        <div className="Regi" style={{fontFamily:"fantasy",textAlign:"center",fontSize:25,paddingRight:150,textDecoration:"underline",marginTop:30}}>Registration</div>
          <div className="col-md-5 col-sm-12" id="blocks1">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="inputName" name="Name" value={user.Name} onChange={handleChange} placeholder="Name..." style={{height:45}}/>
          </div>
          <div className="col-md-5 col-sm-12" id="blocks2" >
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail" name="Email" value={user.Email} onChange={handleChange} placeholder="name@example.com" style={{height:45}}/>
          </div>
          <div className="col-md-5 col-sm-12" id="blocks" >
            <label htmlFor="inputPhone" className="form-label">Phone No.</label>
            <input type="number" className="form-control" id="inputPhone" name="Phone" value={user.Phone} onChange={handleChange} placeholder="+91" style={{height:45}}/>
          </div>
          <div className="col-md-5 col-sm-12" id="blocks2" >
            <label htmlFor="inputWork" className="form-label">Work</label>
            <input type="text" className="form-control" id="inputWork" name="Work" value={user.Work} onChange={handleChange} placeholder="Work" style={{height:45}}/>
          </div>
          <div className="col-md-5 col-sm-12" id="blocks">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword" name="Password" value={user.Password} onChange={handleChange} placeholder="Password" style={{height:45}}/>
          </div> 
          <div className="col-md-5 col-sm-12" id="blocks2" >
            <label htmlFor="inputCPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="inputCPassword" name="cPassword" value={user.cPassword} onChange={handleChange} placeholder="Cpassword" style={{height:45}}/>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" style={{marginTop:10}} id="SUBbutt">Submit</button>
            <span  className="NotMember" >If a Member, <Link to="/login">Login</Link> </span>
          </div>
        </form>
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      </div>
      </div>
    </>
  );
}
