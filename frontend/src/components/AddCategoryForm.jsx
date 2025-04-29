// eslint-disable-next-line no-unused-vars
import React, { use } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductCategory } from "../features/productCategoriesSlice";
import { toast } from "react-toastify";

function AddCategoryForm() {
  const dispatch = useDispatch();
  const addProdCategoryError = useSelector(
    (state) => state.productCategories.addProdCategoryError
  );
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductCategory(newCategory));
    setNewCategory("");
  };

  useEffect(() => {
    if (addProdCategoryError) {
      toast.error(addProdCategoryError);
    }
  }, [addProdCategoryError]);

  return (
    <div className="flex flex-col items-center h-auto bg-black m-2">
      <form
        onSubmit={handleSubmit}
        id="addCategoryForm"
        className="w-full md:w-1/2 flex flex-col items-center p-2 "
      >
        <label
          htmlFor="category"
          className="block mb-2 text-sm text-center font-medium text-white"
        >
          Add Category
        </label>
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          id="category"
          className="w-full md:w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
        <button className="bg-amber-600 m-2 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
