import axios from "axios";
import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';



export const Login=()=>{
    const [input,setInput]=useState({});  
    const [message,setMessage]=useState('');
    const history=useNavigate();

    const handleInput=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            const response=await axios.post('http://localhost:5000/login', input);
           
           
            if(response.status===200){
                localStorage.setItem('userId',response.data.userId);
                history('/')
                

            }
            else{
                setMessage(response.data.message);

            }
            
           
            
            }
        
        catch(error){
            console.error(error);
        }
    };

    return(

        <form>
            <label>Email:</label>
            <input type="text" placeholder="emailxyz@gmail.com" name="Email" value={input.Email || ''} onChange={handleInput}/>
            <label>Password:</label>
            <input type="password" placeholder="password" name="Password" value={input.Password || ''} onChange={handleInput}/>
            <button type="button" onClick={handleSubmit}>Login</button>
            <p>{message}</p>
          
        </form>
    )
};