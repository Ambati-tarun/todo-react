import { useState } from "react";
import { Navbar } from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export function Update(){
    const navigate = useNavigate();
    const location = useLocation();
    const { todo } = location.state;
    console.log(todo);

    const [prevTask, setPrevTask] = useState(todo.task);
    const [prevDescription, setPrevDescription] = useState(todo.description);
    const [updateTask, setUpdateTask] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');

    console.log(prevTask)
    console.log(prevDescription)
    console.log(updateTask)
    console.log(updateDescription)

    function updateTodoReq(){
        
        try {
            const response = axios.put("http://localhost:3000/v1/task/updatetodo" , {
            prevTask : prevTask,
            prevDescription : prevDescription,
            task : updateTask,
            description : updateDescription

        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        navigate('/ShowTodo')
        window.location.reload();
        console.log("success")

        } catch (error) {
            console.log("there is an error " , error)
        }
        
    }
    return (
        <>
            <div>
                <Navbar />
                <div className=" flex justify-center items-center w-screen h-screen bg-color-offwhite">
                <div className=" container grid grid-cols-2 bg-color-lightgreen   w-full max-w-4xl  p-8 rounded-lg shadow-md">
                    <div className=" flex flex-col mx-6">

                    <h1 className="text-2xl font-mono font-semibold underline mb-4 ">Task</h1>

                        <div className="flex flex-row">

                            <div className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 font-mono leading-tight focus:outline-none focus:shadow-outline mr-4">{prevTask}</div>
                            
                            <div className="">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex felx-row">

                            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 font-mono leading-tight focus:outline-none focus:shadow-outline mr-4">{prevDescription}</div>
                            
                            <div className="">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className=" ">

                        <h1 className="text-2xl font-mono font-semibold mb-3">Update</h1>

                        <div className="flex flex-col ">

                        
                            <input onChange={(e) => {const value = e.target.value;
                                                        setUpdateTask(value !== "" ? value : prevTask);
                                                    }}
                                    type="text" 
                                    placeholder="Task" 
                                    className="font-mono mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

                            <input onChange={(e) => {const value = e.target.value;
                                                        setUpdateDescription(value !== "" ? value : prevDescription);
                                                    }}
                                    type="text" 
                                    placeholder="Description" 
                                    className="font-mono mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>

                        <div className="flex justify-between mt-2">
                            <button onClick={updateTodoReq}
                                    className="bg-color-reddish  text-color-offwhite font-semibold py-2 px-4 rounded font-mono"
                                    >Update</button>
                            <button onClick={() => navigate('/ShowTodo')}
                                    className="bg-color-reddish  text-color-offwhite font-semibold py-2 px-4 rounded font-mono"
                                    >Back</button>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
        </>
    );
}
