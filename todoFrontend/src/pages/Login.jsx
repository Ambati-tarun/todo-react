import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Login(){
    const navigate = useNavigate();
    const signup =()=>{
        navigate("/SignUp");
    }
    const [signinMail , setsignInMail] = useState('');
    const [SignInpassword , setSignInPassword] = useState('');


    async function userSignIn(){
            const response = await axios.post("http://localhost:3000/v1/user/signin" , {
                mail : signinMail , 
                password : SignInpassword
            } ,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            localStorage.setItem("token" , response.data.token);
            console.log( response.data.token)

            if(response){
                console.log("user signin successfully ")
                navigate('/')
            }
    }
    return (
        <>
        <Navbar />
            <div className="flex items-center justify-center h-screen bg-color-offwhite">
                <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-md bg-color-lightgreen">
                    <h2 className="mb-8 font-mono text-3xl font-bold text-center ">Login</h2>
                    <div className="flex flex-col ">
                        <p className="mb-1 font-mono text-sm font-semibold ">Email</p>
                        <input onChange={e =>{ setsignInMail(e.target.value)     }} 
                            type="text" 
                            placeholder="Enter The Email"
                            className="w-full px-3 py-2 mb-5 font-mono leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        ></input>
                        <p className="mb-1 font-mono text-sm font-semibold jmt-6">Password</p>
                        <input onChange={e =>{ setSignInPassword(e.target.value) }} 
                            type="password" 
                            placeholder="Enter The Password"
                            className="w-full px-3 py-2 font-mono leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        ></input>
                    </div>
                    <div className="flex flex-col justify-between ">

                        <button onClick={userSignIn}
                        className="w-full p-2 mt-8 mb-4 font-mono font-semibold rounded-md bg-color-reddish text-color-offwhite text-l"
                        >Login</button>

                        <p className="justify-center w-full px-3 font-mono text-sm text-center "
                        >Create a New Account ? <button onClick={signup} className="underline align-baseline cursor-pointer ">Signup</button></p>
                    </div>
                </div>
            </div>
        </>
    )
}
