// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function TopMenu() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 px-8">
      
      {/* Search Bar */}
      <div id="search" className="w-full md:w-1/2 mb-2 md:mb-0">
        <div className="flex items-center w-full space-x-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-amber-300"
            placeholder="Search..."
          />
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded md:w-auto">
            Search
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4 ">
        <Link to="/login" className="text-black hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-black hover:underline">
          Register
        </Link>
        <Link to="/cart" className="text-amber-600 hover:underline flex">
          My Cart 
          <span className="flex items-center p-1">
            <ShoppingCart size={20} /> 
            <sup className="ml-1 text-xs">0</sup>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default TopMenu;
