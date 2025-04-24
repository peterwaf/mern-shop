// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { User, Package, X, PlusIcon,FolderKanban } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleUserMenu } from "../features/userMenuSlice";
import { useNavigate } from "react-router-dom";

function AdminMenu() {
  const userMenu = useSelector((state) => state.userMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      id="adminMenu"
      className={`bg-white border-r border-amber-600 text-amber-600 h-screen w-2/3 md:w-1/4 fixed top-0 left-0 z-30 shadow-lg transition-transform duration-300 ${
        userMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-amber-600 hover:text-red-500 transition-all"
        onClick={() => dispatch(toggleUserMenu())}
      >
        <X size={24} />
      </button>

      {/* Sidebar Content */}
      <nav className="flex flex-col mt-12 space-y-4 px-6">
        <button className="flex items-center gap-3 text-lg font-semibold hover:text-amber-800 transition-all"
        onClick={() => {
          dispatch(toggleUserMenu());
          navigate("/profile");
        }}
        >
          <User size={20} /> Profile
        </button>
        <button
          className="flex items-center gap-3 text-lg font-semibold hover:text-amber-800 transition-all"
          onClick={() => {
            dispatch(toggleUserMenu());
            navigate("/admin-add-product");
          }}
        >
          <PlusIcon size={20} /> Add New Product
        </button>
        <button
          className="flex items-center gap-3 text-lg font-semibold hover:text-amber-800 transition-all"
          onClick={() => {
            dispatch(toggleUserMenu());
            navigate("/admin-manage-products");
          }}
        >
          <Package size={20} /> Manage Products
        </button>
        <button
          className="flex items-center gap-3 text-lg font-semibold hover:text-amber-800 transition-all"
          onClick={() => {
            dispatch(toggleUserMenu());
            navigate("/admin-manage-categories");
          }}
        >
          <FolderKanban size={20} /> Manage Categories
        </button>
      </nav>
    </div>
  );
}

export default AdminMenu;
