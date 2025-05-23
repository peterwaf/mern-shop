// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Menu} from "lucide-react";
import UserMenu from "../components/UserMenu";
import { useSelector,useDispatch } from "react-redux";
import { toggleUserMenu } from "../features/userMenuSlice";
import {updateLoggedInStatus} from "../features/isUserLoggedInSlice";
import { useEffect } from "react";

function UserDashboard() {
  const userMenu = useSelector((state) => state.userMenu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLoggedInStatus());
  }, [dispatch]);

  // Function to handle menu clicks and update content
 
  return (
    <div className="mt-40 md:mt-32 px-8 py-8 h-auto">
      {/* Sidebar Menu */}
      <UserMenu />

      {/* Main Content */}
      <div
        className={`flex-1 bg-white p-6 mt-4 flex flex-col items-center justify-start h-auto m-2 transition-all duration-300 ${
          userMenu ? "md:ml-1/4" : "ml-0"
        }`}
      >
        {/* Dashboard Header & Navigation */}
        <h1 className="font-bold text-2xl pb-4">My Dashboard</h1>

        {/* Fixed UserNav Alignment */}
        <ul
          id="userNav"
          className="flex flex-col md:flex-row justify-center items-center gap-2"
        >
          <li>
            <button
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-all"
              onClick={() => dispatch(toggleUserMenu())}
            >
              <Menu size={18} /> Menu
            </button>
          </li>
          <li>
            <a
              className="flex items-center justify-center bg-black hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-all"
              href="/"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="flex items-center justify-center bg-black hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-all"
              href="#"
            >
              Log Out
            </a>
          </li>
        </ul>

        {/* Dynamic Content Area */}
        <div
          id="contentArea"
          className="mt-6 w-full p-6 bg-gray-100 border border-gray-300 rounded shadow-md"
        >
          <p className="text-lg text-gray-700">Lorem Ipsum</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
