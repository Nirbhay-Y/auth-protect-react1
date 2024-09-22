import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function About() {

    const [userdata,setuserData]=useState(null);
    const navigate = useNavigate();

    const callAboutPage = async () => {
        const token = localStorage.getItem("jwttoken");// Retrieve the token from localStorage

        if (!token) {
            // If there's no token, redirect to login
            navigate("/login");
            return;
        }

        try {
            const res = await fetch('http://localhost:9000/about', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include the token in the Authorization header
                },
                credentials: "include"
            });

            if (res.status === 401 || res.status === 403) {
                // If unauthorized, redirect to login
                navigate("/login");
                return;
            }

            const data = await res.json();
            console.log("About page data:",data);
            setuserData(data);
            

            if (res.status !== 200) {
                console.log("Failed to fetch about page, status:", res.status);
                throw new Error("Failed to fetch the about page");
            }

        }catch (error) {
            console.log("Error:", error.message);
            navigate("/login");
        }
    };
    
    useEffect(() => {
        callAboutPage();
    }, []);
    
    return (
        <>
            <Navbar></Navbar>
            <div style={{ fontFamily: "cursive", fontSize: 30,margin:8,textDecoration:"underline" }}>About Page:-</div>
            <div style={{height:650}}>
            <div className="form2" style={{height:600,backgroundColor:" rgb(43, 41, 41)",marginTop:20,borderRadius:10}}>
            <div className="container aboutinfo" >
                <form method="GET" style={{padding:10}} >
                <div className=" row row1">
                        <span id="Image"></span>
                        <div className="col-sm">
                            <div className="profile">
                                <h5 style={{marginTop:10}}>{userdata ? userdata.Name : "Loading..."}</h5>
                                <h6>{userdata ? userdata.Work : "Loading..."}</h6>
                                <p className="profile-photo mt-3 mb-5">
                                    Ranking:<span>1/10</span>
                                </p>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-bs-toggle="tab"
                                            href="#home"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="true"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="timeline-tab"
                                            data-bs-toggle="tab"
                                            href="#timeline"
                                            role="tab"
                                            aria-controls="timeline"
                                            aria-selected="false"
                                        >
                                            Timeline
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-sm">
                            <div className="profile-work" id="work" style={{display:"flex",flexDirection:"column"}}>
                                <p style={{fontFamily:"monospace",marginTop:15,textDecoration:"underline"}}>Work link</p>
                                <a
                                    href="https://www.instagram.com/neymarjr/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bootstrap-link"
                                    style={{color:"rgb(20, 19, 19)",cursore:"pointer"}}
                                    id="Blocks"
                                >
                                    Instagram
                                </a>
                                <br />
                                <a
                                    href="https://www.facebook.com/Cristiano/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bootstrap-link"
                                    style={{color:"rgb(20, 19, 19)",cursore:"pointer"}}
                                    id="Blocks"
                                >
                                    Facebook
                                </a>
                                <br />
                                <a
                                    href="https://www.netflix.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bootstrap-link"
                                    style={{color:"rgb(20, 19, 19)",cursore:"pointer"}}
                                    id="Blocks"
                                >
                                    Netflix
                                </a>
                                <br />
                                <a
                                    href="https://www.primevideo.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bootstrap-link"
                                    style={{color:"rgb(20, 19, 19)",cursore:"pointer",}}
                                    id="Blocks"
                                >
                                    Amazon Prime
                                </a>
                                <br />
                                <a
                                    href="https://getbootstrap.com/docs/5.0/components/navs-tabs/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bootstrap-link"
                                    style={{color:"rgb(20, 19, 19)",cursore:"pointer"}}
                                    id="Blocks"
                                >
                                    Bootstrap
                                </a>
                                <br />
                            </div>

                        </div>
                        <div className="col-sm pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>86429849684</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userdata ? userdata.Name : "Loading..."}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userdata ? userdata.Email : "Loading..."}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userdata ? userdata.Phone : "Loading..."}</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="timeline"
                                    role="tabpanel"
                                    aria-labelledby="timeline-tab"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Timeline Event 1</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Event details 1</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Timeline Event 2</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Event details 2</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Timeline Event 3</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Event details 3</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Timeline Event 4</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Event details 4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            </div>
        </>
    );
}