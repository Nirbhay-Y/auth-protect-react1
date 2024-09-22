import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Home() {
    const [userdata, setUserData] = useState({Name:""}); // Initially null to indicate loading
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const callAboutPage = async () => {
        const token = localStorage.getItem("jwttoken");

        if (!token) {
            // If there's no token, redirect to login
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

            const data = await res.json();
            setUserData({ Name: data.Name });
            setIsLoading(false); // Data has been fetched, stop loading

        } catch (error) {
            console.log("Error:", error.message);
            setIsLoading(false); // Stop loading even if there's an error
        }
    };

    useEffect(() => {
        callAboutPage();
    }, []);

    return ( 
        <>
            <Navbar />
            <div style={{ fontFamily: "cursive", fontSize: 30,margin:20,textDecoration:"underline" }}>Home Page:-</div>
            <div className="middlebox" >
                <div className="containerbox" >
                    <div><h2 style={{ textAlign: "center",marginTop:10 }}>Welcome</h2></div>
                    <div>
                        <h3 style={{
                            textAlign: "center", 
                            marginTop: 20, 
                            fontFamily: "monospace", 
                            fontSize: 30
                        }}>
                            {isLoading ? "Loading..." : userdata.Name}
                        </h3>
                    </div>
                    <div style={{ textAlign: "center", marginTop: 20, fontFamily: "monospace", fontSize: 20 }}>
                        Happy, to meet you!
                    </div>
                </div>
            </div>
        </>
    );
}
