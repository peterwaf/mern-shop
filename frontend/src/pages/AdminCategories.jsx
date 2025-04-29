// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminMenu from "../components/AdminMenu";
import AddCategoryForm from "../components/AddCategoryForm";
import UserNav from "../components/UserNav";
import { toast } from "react-toastify";
import { fetchProductCategories } from "../features/productCategoriesSlice";
import { useNavigate } from "react-router-dom";
import { deleteProductCategory } from "../features/productCategoriesSlice";

function AdminCategories() {
  const userMenu = useSelector((state) => state.userMenu);
  const productCategories = useSelector(
    (state) => state.productCategories.data
  );

  const deletedProdCategoryError = useSelector(
    (state) => state.productCategories.deletedProdCategoryError
  );
 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (deletedProdCategoryError) {
      toast.error(deletedProdCategoryError);
    }
  }, [deletedProdCategoryError]);

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  return (
    <div className="h-full flex">
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
          className="mt-6 w-full h-full p-6 bg-gray-100 border border-gray-300 rounded shadow-md"
        >
          <h2 className="text-center font-bold text-2xl">
            Manage Product Categories
          </h2>

          <AddCategoryForm />

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 text-center">
                  Category
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productCategories.map((category) => (
                <tr
                  key={category._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 text-center px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.name}
                  </th>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin-edit-category/${category._id}`)
                      }
                      className="bg-amber-500  text-black font-bold py-2 px-4 mx-2 rounded"
                    >
                      Edit
                    </button>
                    <button onClick={() => {
                      dispatch(deleteProductCategory(category._id));
                    }} className="bg-red-500 text-black font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCategories;
