import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useState } from "react";

export function SignUp(){
   
    const [username , setUsername] = useState('');
    const [mail , setMail] = useState('');
    const [password , setPassword] = useState('');

    const navigate = useNavigate();
    const back = ()=>{
        navigate("/Login");

    }

    async function userSignup(){
        const response = await axios.post("http://localhost:3000/v1/user/signup" , {
            username , 
            mail , 
            password
        })

        localStorage.setItem("token" , response.data.token);
        console.log(response.data.token)
        back()
        

    }

     

    return(
        <> 

        
            <Navbar />
            <div>
                <div className="bg-color-offwhite flex items-center justify-center h-screen flex-col">
                    <div className="w-full mx-auto px-8 max-w-md rounded-lg shadow-md bg-color-lightgreen">
                        <h1 className="w-full text-3xl font-semibold text-center my-8 font-mono"> SignUp </h1>

                        <div className="flex flex-col ">

                            <p className="text-sm font-semibold mb-1 font-mono ">Username</p>
                            <input onChange={e => { setUsername(e.target.value) }} type="text"  placeholder="Enter The Username"
                                className="shadow appearance-none border font-mono rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></input>

                            <p className="text-sm font-semibold mb-1 mt-5 font-mono">Email</p>
                            <input onChange={e => { setMail(e.target.value)     }} type="email"  placeholder="Enter The Email Address"
                                className="shadow appearance-none font-mono border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></input>

                            <p className="text-sm font-semibold mb-1 mt-5 font-mono">Password</p>
                            <input onChange={e => { setPassword(e.target.value) }} type="password"  placeholder="Enter The Password"
                                className="shadow appearance-none border font-mono rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></input>

                        </div>
                        <div className="flex justify-between my-8">

                            <button className="bg-color-reddish  text-color-offwhite font-semibold py-2 px-4 rounded font-mono"  onClick={userSignup}>
                                Signup
                            </button>
                            <button className="bg-color-reddish  text-color-offwhite font-semibold py-2 px-4 rounded font-mono" onClick={back}>
                                Back
                            </button>
                            
                        </div>
                        {/* <div className="felx justify-between ">
                            <button  className=" bg-color-reddish my-5 p-2 rounded-md text-color-offwhite text-l font-semibol" onClick={userSignup}>signUp</button>
                            <button className=" bg-color-reddish my-5 p-2 rounded-md text-color-offwhite text-l font-semibol" onClick={back}>Back</button>
                        </div> */}
                    </div>

                </div>
            </div>
        </>
    )
}