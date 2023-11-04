import React, { useState } from "react";
import { baseURL } from "../../Util/constant";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    
    

    try {
        const response = await axios.post(`${baseURL}/v1/auth/login`, {
          email,
          password
        });
    
        const { message, Token } = response.data;
    
        if (response.status === 200) {
          navigate('/home');
          toast.success('Login successful!');
          localStorage.setItem('token', Token);
          
 
        } else {
          toast.error('Invalid email or password');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred');
      }
    }

    
  

  return (
    <div>
    <form onSubmit={handleLogin}>
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
      <button type='submit'>Login</button>
    </form>
    <ToastContainer />
  </div>
  );
};

export default Login;
