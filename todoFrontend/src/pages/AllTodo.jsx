import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export function AllTodo(){
    const navigate = useNavigate();
    return <>
        <Navbar /> 
        <button onClick={ ()=>navigate("/ShowTodo")}> Back </button>
    </>
}