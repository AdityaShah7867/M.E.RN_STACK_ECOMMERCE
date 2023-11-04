import React, { useEffect, useState } from "react";
import { baseURL } from "../Util/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${baseURL}/v1/product/deleteP/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCart = async (productId) => {
    try{
      const res = await axios.post(`${baseURL}/v1/cart/${productId}`,{quantity:1},{
        headers : {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.status === 201){
        toast.success("product successfully added to cart")
      }
      else{
        toast.error("nahi ho rha hai bhai")
      }
      }catch (error) {
        console.error("Error deleting product:", error);
    }
  }

  useEffect(() => {

    axios
      .get(`${baseURL}/v1/product/getP`)
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <br />
      <div className="p-4 m-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <li key={product._id} className="bg-white shadow-lg rounded-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 text-base mb-4">{product.desc}</p>
                <p className="text-green-500 text-xl font-semibold">
                  ${product.price}
                </p>
                {product.file && (
                  <img
                  src={`http://localhost:4000/uploads/${product.file}`} // Assuming the file path is relative to your baseURL
                  alt={product.name}
                  className="w-full h-48 object-cover mt-4"
                />
                )}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleCart(product._id)}
                  className="bg-blue-500 ml-2 text-white px-4 py-2 mt-4 rounded"
                >
                  Add 
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
