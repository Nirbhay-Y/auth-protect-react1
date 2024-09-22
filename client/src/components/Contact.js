import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
    const navigate=useNavigate();
    const [userdata,setuserData]=useState({Name:"",Message:"",Work:"",Phone:"",Email:""});

    const callAboutPage = async () => {
        const token = localStorage.getItem("jwttoken");// Retrieve the token from localStorage

        if (!token) {
            // If there's no token, redirect to login
            navigate("/login");
            return;
        }

        try {
            const res = await fetch('http://localhost:9000/contact', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include the token in the Authorization header
                },
                credentials: "include"
            });
            console.log("Token from localStorage:", token);

             if (res.status !== 200) {
                navigate("/login");
                return;
            }

            const data = await res.json();
            setuserData({ ...userdata, Name: data.Name, Email: data.Email, Phone: data.Phone, Work: data.Work });

        } catch (error) {
            console.log("Error:", error.message);
            navigate("/login");
        }
    };
    
    useEffect(() => {
        callAboutPage();
    }, []);
    
    const HandleChange=(e)=>{
        e.preventDefault();
      setuserData({...userdata,[e.target.name]:e.target.value});
    }

    const letsSubmit=async(e)=>{
        e.preventDefault();
        const{Name,Message,Work,Phone,Email}=userdata;
        
      try {
          const res = await fetch('http://localhost:9000/senddata', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ Name,Message,Work,Phone,Email })
          });

          const data = await res.json();
          if (res.status === 201) {
              toast.success(data.message,{
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
      } catch (err) {
          alert("Error: " + err.message);
      }
    }

    

    return(
        <>
        <Navbar></Navbar>
        <div style={{ fontFamily: "cursive", fontSize: 30,margin:20,textDecoration:"underline" }}>Contact Page:-</div>
       <div className="box">
        <div className="insidebox">
         <div><h5 className="inmesaage" style={{textDecoration:"underline"}}>Name:-</h5></div>
         <div className="Phoneno">
            <h4 className="hover" style={{marginTop:9.5}}>{userdata ? userdata.Name : "Loading..."}</h4>
         </div>
        </div>
        <div className="insidebox">
        <div><h5 className="inmesaage" style={{textDecoration:"underline"}}>Work:-</h5></div>
         <div className="Phoneno" >
            <h4 style={{marginTop:9.5}}>{userdata ? userdata.Work : "Loading..."}</h4>{/*ternary operator is must*/}
         </div>
        </div>
        <div className="insidebox">
        <div><h5 className="inmesaage" style={{textDecoration:"underline"}}>Phone No.</h5></div>
         <div className="Phoneno">
            <h5 style={{marginTop:9.5}}>+91 {userdata ? userdata.Phone: "Loading..."}</h5>
         </div>
        </div>
       </div>
       <form method="POST">
       <div className="message">
            <div className="messagebox">
                <div className="manage">
                    <div className="name">
                    <label for="exampleInputEmail1" class="form-label"><h6 className="inmesaage">Name</h6></label>
                    <input type="email" class=" form-control" name="Name" value={userdata ? userdata.Name : "Loading..."} onChange={HandleChange} id="exampleInputEmail1" placeholder="Name" aria-describedby="emailHelp"/>
                    </div>
                    <div className="Email">
                    <label for="exampleInputEmail1" class="form-label"><h6 className="inmesaage">Email</h6></label>
                    <input type="email" class=" form-control" id="exampleInputEmail1" name="Email" value={userdata ? userdata.Email : "Loading..."} onChange={HandleChange} placeholder="Email" aria-describedby="emailHelp"/>
                    </div>
                    </div>
                    <div className="MessageName">
                         <h5 className="inmesaage" style={{textDecoration:"underline"}} >Message</h5>
                    </div>
                    <div className="textarea">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name="Message" onChange={HandleChange} style={{height: 100}}></textarea>
                    </div>
                    <div>
                    <button type="submit" className=" button btn btn-primary" onClick={letsSubmit}>Submit</button>
                    </div>
            </div>    
        </div>
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
        </form>
        </>
    )
}