// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProductCategory } from "../features/productCategoriesSlice";
import { updateProductCategory } from "../features/productCategoriesSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function EditCategoryForm({ id }) {
  const navigate = useNavigate();
  const category = useSelector(
    (state) => state.productCategories.loadedProdCategory
  );

  //errors

  const loadedProdCategoryError = useSelector(
    (state) => state.productCategories.loadedProdCategoryError
  );
  const addProdCategoryError = useSelector(
    (state) => state.productCategories.addProdCategoryError
  );
  const updatedCategoryError = useSelector(
    (state) => state.productCategories.updatedCategoryError
  );

  useEffect(() => {
    if (loadedProdCategoryError) {
      toast.error(loadedProdCategoryError);
    }
    if (addProdCategoryError) {
      toast.error(addProdCategoryError);
    }
    if (updatedCategoryError) {
      toast.error(updatedCategoryError);
    }
  }, [
    loadedProdCategoryError,
    addProdCategoryError,
    updatedCategoryError,
  ]);

  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    dispatch(loadProductCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      setCategoryName(category);
    }
  }, [category]);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductCategory({ category: categoryName, categoryId: id }));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-3/4 mx-auto space-y-3"
    >
      <label className="text-gray-700 font-medium">Category</label>
      <input
        className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
        type="text"
        name="name"
        value={categoryName}
        onChange={handleChange}
      />

      <button className="bg-amber-600 hover:bg-black text-white font-medium p-4 rounded-md transition-all">
        Update Category
      </button>
      <button
        className="bg-black text-white font-medium p-4 rounded-md transition-all"
        onClick={(e) => {
          e.preventDefault();
          navigate("/admin-manage-categories");
        }}
      >
        Back
      </button>
    </form>
  );
}

export default EditCategoryForm;
