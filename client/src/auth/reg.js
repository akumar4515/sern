import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Reg = () => {

  const [input, setInput] = useState({});
  const [ message,setMessage]=useState('')
  const history=useNavigate();



  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };



  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(input===''){
      setMessage('enter empty field');
    }
    else{


      try{
        const response=await axios.post('http://localhost:5000/signUp', input)
        setMessage(response.data.message); 
        if(response.data.success){
          history('/login');

        }
       
     }
     catch(error){
         console.error(error);
     
     }
    }

  };

  return (
    <>
      <form>
        <p>{message}</p>
      <label>Name:</label>
        <input
          type="text"
          name="Name"
          value={input.Name || ''}
          onChange={handleInput}
        />
        <label>Email:</label>
        <input
          type="text"
          name="Email"
          value={input.Email || ''}
          onChange={handleInput}
        />
        <label>Username:</label>
        <input
          type="text"
          name="Username"
          value={input.Username || ''}
          onChange={handleInput}
        />
        <label>Password:</label>
        <input
          type="password"
          name="Password"
          value={input.Password || ''}
          onChange={handleInput}
        />
        <label>Re-Enter Password:</label>
        <input
          type="password"
          name="Repassword"
          value={input.Repassword || ''}
          onChange={handleInput}
        />
        <button type="button" onClick={handleSubmit}>SignUp</button>
        
        
      </form>
    </>
  );
};



