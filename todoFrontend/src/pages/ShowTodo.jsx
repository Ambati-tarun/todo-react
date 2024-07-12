import { Navbar } from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ShowTodo(){
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    function exportToShowAllTodos(todo){
        navigate('/allTodo' , {state : todo})
    }

    useEffect(()=>{
        async function fetchTodo(){
            try {
                const response = await axios.get("http://localhost:3000/v1/task/gettodo", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setTodos(response.data.tasks);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTodo();
    }, []);

    function handleUpdate(todo){
        navigate('/update', { state: { todo } });
    }

    function isCompleted(todo){
        try {
            const completed = axios.put("http://localhost:3000/v1/task/completed" , {
                task : todo.task,
                description : todo.description
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            window.location.reload();
        } catch (error) {
            console.log("there is an error " , error )   
        }
    }


    function unfinshed(todo){
        try {
            const completed = axios.put("http://localhost:3000/v1/task/unfinished" , {
                task : todo.task,
                description : todo.description
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            window.location.reload();
        } catch (error) {
            console.log("there is an error " , error )   
        }
    }


    function deleteTodo(todo){
        try {
            const completed = axios.put("http://localhost:3000/v1/task/delete" , {
                task : todo.task,
                description : todo.description
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
        } catch (error) {
            console.log("there is an error " , error )   
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-start justify-items-stretch w-screen h-screen pt-5 bg-color-offwhite">
                
                <div className="flex flex-row justify-between ">

                    <div className="main w-full mx-auto p-8 max-w-md rounded-lg shadow-md bg-color-lightgreen">
                        <div className="text-center bg-color-reddish px-4 py-3 rounded-lg font-mono text-color-offwhite">Todos To Complete</div>
                            {todos.map((todo, index) => 
                                (todo.isCompleted === false && todo.delete === false) && (
                                (
                                    <div key={index} className="flex flex-col p-4 border  m-3  ">
                                        <div >
                                        <h1 className="text-sm font-semibold mb-1 font-mono">Task</h1>
                                            <h1 className=" overflow-hidden text-balance shadow appearance-none  rounded w-full py-1 px-3 mb-4 text-gray-900 font-mono leading-tight focus:outline-none focus:shadow-outline mr-4">
                                                {todo.task}
                                            </h1> 
                                        <h1 className="text-sm font-semibold mb-1 font-mono">Description</h1>
                                            <h1 className="overflow-x-auto text-wrap shadow appearance-none  rounded w-full py-1 px-3 text-gray-900 font-mono leading-tight focus:outline-none focus:shadow-outline mr-4">
                                                {todo.description}
                                            </h1> 
                                        </div>  
                                        <div className="p-2 grid grid-cols-3 gap-6 mt-3">
                                            <button className="bg-color-reddish  text-color-offwhite  py-2 text-sm px-2 rounded font-mono"  onClick={() => handleUpdate(todo)}>Update</button>
                                            <button className="bg-color-reddish  text-color-offwhite  py-2 text-sm px-2 rounded font-mono" onClick={() => isCompleted(todo)}>Done</button>
                                            <button className="bg-color-reddish  text-color-offwhite  py-2 text-sm px-2 rounded font-mono" onClick={() => deleteTodo(todo)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            ))}
                    </div>

                    <div className="main w-full mx-auto p-8 max-w-md rounded-lg shadow-md bg-color-lightgreen">
                        <div className="text-center bg-color-reddish px-4 py-3 rounded-lg font-mono text-color-offwhite">Completed todos</div>
                        {todos.map((todo, index) => 
                            (todo.isCompleted === true && todo.delete === false) && (
                            (
                                <div key={index} className="flex flex-col p-4 border m-3 ">
                                    <div>
                                        <h1 className="text-sm font-semibold mb-1 font-mono">Task</h1>
                                        <h1 className=" overflow-hidden text-balance shadow appearance-none  rounded w-full py-1 px-3 mb-4 text-gray-900 font-mono leading-tight focus:outline-none focus:shadow-outline mr-4">
                                                {todo.task}
                                        </h1> 
                                        <h1 className="text-sm font-semibold mb-1 font-mono">Description</h1>

                                        <h1 className="overflow-x-auto text-wrap shadow appearance-none  rounded w-full py-1 px-3 text-gray-900 font-mono leading-tight focus:outline-none focus:shadow-outline mr-4">
                                                {todo.description}
                                        </h1> 
                                    </div>  
                                    <div className="items-center">
                                        <button className="bg-color-reddish  text-color-offwhite  py-2 text-sm px-2 rounded font-mono mt-4" onClick={()=>unfinshed(todo)}>Un Done</button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                </div>

            </div>
            
        </>
    );
    
}
