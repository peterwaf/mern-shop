// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Menu} from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleUserMenu } from "../features/userMenuSlice";

function UserNav() {
    const dispatch = useDispatch();

  return (
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
  )
}

export default UserNav