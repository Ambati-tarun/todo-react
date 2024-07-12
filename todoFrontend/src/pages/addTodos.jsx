import { useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";

export function AddTodos(){
    const [task , setTask] = useState('');
    const [description , setDescription] = useState('')

    async function addTodobackend(){
        try {
            
            const userId = await axios.get("http://localhost:3000/v1/task/getid" , {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            } )
            
            const response = await axios.post("http://localhost:3000/v1/task/addtodo" ,
            {
                userId : userId ,
                task : task,
                description : description,
                isCompleted : false,
                delete : false
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            } catch (error) {
                console.log('error in adding the todo')   
            }
        }
    
        function clearData(){
            setTask('')
            setDescription('')
        }
    
    return(
        <>
        <Navbar />
        <div className="bg-color-offwhite  h-screen  justify-center flex flex-col items-center">
            <div className="card w-full max-w-2xl mx-auto bg-color-lightgreen rounded-lg p-8 flex flex-col">
                <div className="text-center text-3xl font-semibold font-mono mb-4"> Add Todo</div>
                <h1 className="text-md font-semibold mb-1 font-mono mt-4">Task</h1>
                <input  onChange={(e) =>{ setTask(e.target.value)       }} 
                        value={task} type="text"
                        placeholder="Enter the Task"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-mono leading-tight focus:outline-none focus:shadow-outline"></input>
                <h1 className="text-md font-semibold mb-1 font-mono mt-6">Description</h1>
                <input  onChange={(e) =>{ setDescription(e.target.value)}} value={description} type="text" placeholder="Enter the Task Description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight font-mono focus:outline-none focus:shadow-outline"                ></input>
            
                <div className="buttons flex flex-row justify-evenly mt-4 ">
                    <button onClick={()=>{addTodobackend() ; clearData()}}
                    className=" px-6 bg-color-reddish my-5 p-2 rounded-md text-color-offwhite text-l font-semibold font-mono">Add</button>
                    <button onClick={clearData} className="px-6 bg-color-reddish my-5 p-2 rounded-md text-color-offwhite text-l font-semibold font-mono">Clear</button>
                </div>
                
            </div>
        </div>
            
        </>
    )
}
