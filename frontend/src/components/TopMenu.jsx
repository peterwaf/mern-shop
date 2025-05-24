// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoggedInStatus } from "../features/isUserLoggedInSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TopMenu() {
  const [name, setName] = useState("");
  const cartItemsQty = useSelector((state) => state.cartItems.cartItemsQty);
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(updateLoggedInStatus());
  }, [dispatch]);

  useEffect(() => {
    const storedName = localStorage.getItem("firstName");
    if (storedName && isUserLoggedIn) {
      setName(storedName);
    }
  }, [isUserLoggedIn]);

const handleLogout = () => {
  localStorage.removeItem("firstName");
  localStorage.removeItem("token");
  dispatch(updateLoggedInStatus());                  
  // Delay navigation to let Redux state settle
  setTimeout(() => {
    navigate("/", { replace: true });
  }, 0);
};

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
        {isUserLoggedIn ? (
          <>
            <p className="text-black font-bold">Welcome! {name}</p>
            <Link to="/user-dashboard" className="text-black underline">
              My dashboard
            </Link>

            <Link onClick={() => handleLogout()} className="text-black underline">
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login" className="text-black hover:underline">
            Login
          </Link>
        )}
        <Link to="/cart" className="text-amber-600 hover:underline flex">
          My Cart
          <span className="flex items-center p-1">
            <ShoppingCart size={20} />
            <sup className="ml-1 text-xs">{cartItemsQty}</sup>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default TopMenu;
