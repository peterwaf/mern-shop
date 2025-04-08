// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/productsSlice";
import AdminMenu from "../components/AdminMenu";
import UserNav from "../components/UserNav";

function ManageProducts() {
  const userMenu = useSelector((state) => state.userMenu); // true or false
  const products = useSelector((state) => state.products?.data?.data || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="h-full w-full flex">
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
          className="mt-6 w-full p-6 bg-gray-100 border border-gray-300 rounded shadow-md"
        >
          <h2 className="text-center font-bold text-2xl">Manage Products</h2>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full mt-4 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="border px-4 py-2">{product._id}</td>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">KES {product.price}</td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/edit-product/${product._id}`)
                          }
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
