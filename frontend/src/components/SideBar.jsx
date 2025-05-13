// eslint-disable-next-line no-unused-vars
import React, { use } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductCategories } from "../features/productCategoriesSlice";
import { setCategoryFilter } from "../features/productsSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SideBar() {
  const categories = useSelector((state) => state.productCategories.data);
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(setCategoryFilter(category));
    }
  }, [category, dispatch]);

  return (
    <div
      id="categories"
      className="md:col-span-3 mt-10 md:mt-0 background-white rounded-md shadow-md p-4 border-amber-600 border-1"
    >
      <ul className="space-y-2">
        <li className="bg-white rounded-md shadow-md font-bold hover:bg-amber-600">
          <Link className="p-4" to="/products/category/all">All</Link>
        </li>
        {categories.map((category) => (
          <li
            key={category._id}
            className="bg-white rounded-md shadow-md font-bold hover:bg-amber-600"
          >
            <Link className="py-4 px-4" to={`/products/category/${category.name}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
