import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import axios from "axios"
import { useState } from "react";



 export function Home(){
    const navigate = useNavigate();
   
   


    
    return(
        <>
            <Navbar />
            <div className="w-screen h-screen bg-color-offwhite">
                <div className="todoContent">
                    <p>"Introducing our Todo application, your ultimate productivity companion. With intuitive task management, customizable lists, and seamless organization, stay on top of your agenda effortlessly. Prioritize tasks, set deadlines, and enjoy a streamlined workflow. Experience productivity redefined with our user-friendly interface and powerful features."</p>

                </div>
                <div className="buttons px-auto flex flex-row  justify-between ">
                    <div className=" px-auto w-1/3 flex justify-between ">
                        <button onClick={()=>{
                            navigate("/addTodos")
                            console.log("called the AddTodos")
                        }} className="px-4 py-2 bg-color-reddish rounded-md text-color-offwhite font-mono "> Add Todo</button>
                        <button onClick={()=>{ navigate('/ShowTodo') }} 
                        className="px-4 py-2 bg-color-reddish rounded-md text-color-offwhite font-mono"> Show Todos</button>
                    </div>
                </div>
            </div>
        </>
    )
}

