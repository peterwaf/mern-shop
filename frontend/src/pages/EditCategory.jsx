// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from "react-redux";
import AdminMenu from "../components/AdminMenu";
import UserNav from "../components/UserNav";
import { useParams } from "react-router-dom";
import EditCategoryForm from "../components/EditCategoryForm";
function EditCategory() {
    const userMenu = useSelector((state) => state.userMenu);
    const { id } = useParams();
 
  return (
    <div className="h-screen flex">
    {/* Sidebar Menu */}
    <AdminMenu />

    {/* Main Content */}
    <div
      className={`flex-1 bg-white p-6 mt-4 flex flex-col items-center justify-start h-auto m-2 transition-all duration-300 ${
        userMenu ? "md:ml-1/4" : "ml-0"
      }`}
    >
      {/* Dashboard Header & Navigation */}
      <h1 className="font-bold text-2xl pb-4">Admin Dashboard</h1>

      {/* Fixed UserNav Alignment */}
      <UserNav />

      {/* Dynamic Content Area */}
      <div
        id="contentArea"
        className="mt-6 w-full h-screen p-6 bg-gray-100 border border-gray-300 rounded shadow-md"
      >
        <h2 className="text-center font-bold text-2xl">Edit Product Category</h2>
        <EditCategoryForm id={id} />
      </div>
    </div>
  </div>

  )
}

export default EditCategory