import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function Navbar(){
    const [loginLogo , setLoginLogo] =useState('Login')
    const navigate = useNavigate();

    function checkToken(){
        const token = localStorage.getItem("token")
        if(token && token !== ""){
            return true 
        }
        else{
            return false;
        }
    }
    // if(checkToken){
    //     setLoginLogo("loggedIn")
    // }
    return (
        <>
            <nav >
                <ul className=" flex justify-between px-5 py-5 bg-color-reddish">
                    <li>
                        <button
                            onClick={() => {
                                navigate("/");
                            }}
                            className="text-color-offwhite text-xl font-mono"
                        >
                            Todo
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                navigate("/Login");
                            }}
                            className="text-color-offwhite text-xl font-mono"
                        >
                            {loginLogo}
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
    
    
}