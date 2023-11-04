import React, { useState } from "react";
import { baseURL } from "../Util/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddP = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const AddP = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("desc", desc);
      formData.append("file", file); // Append file to FormData

      const response = await axios.post(`${baseURL}/v1/product/AddP`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });

      const { message, Token } = response.data;

      if (response.status === 201) {
        // navigate('/home');
        toast.success("Product successful!");
        localStorage.setItem("token", Token);
      } else {
        toast.error("Product add failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };
  return (
    <div className="">
      <h1 className="text-2xl text-center mt-8 ">Add Products here</h1>

      <div>
        <div className="max-w-lg lg:ms-auto mx-auto text-center ">
          <div className="py-16 px-7 rounded-md bg-white p-2 border-2 mt-9">
            <form onSubmit={AddP}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="number"
                    value={price}
                    id="price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="price"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                </div>

                <div className="md:col-span-2">
                <input
            type="file"
            id="file"
            name="file"
            placeholder="Charger votre fichier"
            className="peer block w-full appearance-none border-none   bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            onChange={(e) => setFile(e.target.files[0])} // Handle file change
          />
                </div>
                <div className="md:col-span-2">
                  <textarea
                    name="desc"
                    rows={2}
                    cols
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Desc"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    defaultValue={""}
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    style={{backgroundColor:"blue"}}
                  >
                    ADD PRODUCT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddP;
