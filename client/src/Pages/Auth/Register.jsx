import React, { useState } from "react";
import { baseURL } from "../../Util/constant";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Register = () => {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleReg = async (e) => {
    e.preventDefault();
    
    

    try {
        const response = await axios.post(`${baseURL}/v1/auth/register`, {
          email,
          password
        });
    
        // const { message, Token } = response.data;
    
        if (response.status === 201) {
          toast.success('Registration successful!');
          
        } else if(response.status === 401 ) {
          toast.error('User already exists');
        }
        else{
            toast.error('reg failed')
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data);
      }
    }

  return (

    <div>
    <form onSubmit={handleReg}>
      <input 
        type='email' 
        placeholder='email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type='password' 
        placeholder='password' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type='submit'>Register</button>
    </form>
    <ToastContainer />
  </div>

    )
}

export default Register