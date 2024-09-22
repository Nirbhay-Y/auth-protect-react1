import React, { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function Login() {
  
    const[Login,setLogin]=useState({
        Email:"",Password:""
    })

    const handleChange=(e)=>{
           e.preventDefault();
           setLogin({...Login,[e.target.name]:e.target.value});
    }

    const LetsGo = async (e) => {
      e.preventDefault();
      const { Email, Password } = Login;
      try {
          const res = await fetch('http://localhost:9000/signin', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ Email, Password })
          });

          const data = await res.json();
          if (res.status === 201) {
              localStorage.setItem("jwttoken", data.token); // Store the token
              toast.success("Login Successfully",{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
          }else {
            toast.error(data.error,  {
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
      } catch (err) {
          alert("Error: " + err.message);
      }
  };
  

    return(
        <>
       <Navbar></Navbar>
       <div style={{ fontFamily: "cursive", fontSize: 30,margin:20,textDecoration:"underline" }}>Login Page:-</div>
       <div className="container1 container">
        <form onSubmit={LetsGo} className="form1" method="POST" >
            <div style={{fontFamily:"fantasy",textAlign:"center",fontSize:25,textDecoration:"underline"}}>login</div>
        <div class=" mb-3">
        <label htmlFor="inputEmail" className="form-label" style={{fontSize:22}}>Email</label>
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  name="Email" value={Login.Email} onChange={handleChange} style={{height:50}} />
</div>
<div class="mb-3">
<label htmlFor="inputPassword" className="form-label" style={{fontSize:22}}>Password</label>
  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="Password" value={Login.Password}  onChange={handleChange} style={{height:50}}/>
</div>
<button type="submit" class="btn btn-primary" style={{marginTop:2}}>Submit</button>
<span style={{float:"right",marginTop:10,fontFamily:"inherit",fontSize:17}}>Not a Member ? <Link to="/signup">SignUp</Link></span>
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
        </>
    )
}