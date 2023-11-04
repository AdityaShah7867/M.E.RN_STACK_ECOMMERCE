import React, { useEffect, useState } from 'react'
import { baseURL } from "../Util/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/v1/cart/`,{
        headers : {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        setProducts(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      
      {products.map((product) => (
            <li key={product.product.name} className="bg-white shadow-lg rounded-lg">
              <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.product.name}</h2>
                <h2 className="text-xl font-semibold mb-2">{product.product.price}</h2>
                <p className="text-gray-700 text-base mb-4">{product.quantity}</p>
              </div>
            </li>
          ))}
    </div>
  )
}

export default Cart