// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { fetchProductCategories } from "../features/productCategoriesSlice";

function SideBar() {
    const categories = useSelector((state) => state.productCategories.data);
    const dispatch = useDispatch();
    
     useEffect(() => {
        dispatch(fetchProductCategories());
      }, [dispatch]);
      
    
  return (
    <div
          id="categories"
          className="md:col-span-3 mt-10 md:mt-0 background-white rounded-md shadow-md p-4 border-amber-600 border-1"
        >
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category._id} className="bg-white rounded-md shadow-md p-4 font-bold hover:bg-amber-600">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
  )
}

export default SideBar