import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom'
import { baseURL } from "../../Util/constant";
import axios from 'axios';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async (e) => {
    navigate("/login");
    localStorage.removeItem("token");
  };

  const [admin,setAdmin] = useState({});


    useEffect(()=>{

        axios.get(`${baseURL}/v1/auth/getLoggedinUser`,{
            headers : {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .then((res)=>{
                setAdmin(res.data.user)
                console.log(res.data.user)
            }).catch((error)=>console.log(error))
    } ,[] )

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight"> 
          <img src="https://sihadi.s3.ap-south-1.amazonaws.com/NyaySaarthiLogo.png" style={{width:'15%'}} alt="" />
          
          </span>
        </div>
        
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
