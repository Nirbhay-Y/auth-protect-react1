import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate=useNavigate(); 

    useEffect(() => {
        // Perform the navigation when the component mounts
        navigate("/login");
    }, []);
    return null;
}