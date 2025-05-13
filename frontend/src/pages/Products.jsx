// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import axios from "axios";
import API from "../API";

function Products() {
  const products = useSelector((state) => state.products.data);
  const [productsImages, setProductsImages] = useState([]);
  const categoryFilter = useSelector((state) => state.products.categoryFilter);
  const filteredProducts =
    categoryFilter === "all"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //fetch images of each product's images and then concatenate them into
  //a single array
  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        await Promise.all(
          products.map(async (product) => {
            const response = await axios.get(
              `${API}/api/v1/images/product/${product._id}`
            );
            const singleProductImages = response.data.productImages;
            setProductsImages((prevProductImages) => [
              ...prevProductImages,
              singleProductImages,
            ]);
          })
        );
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchProductImages();
  }, [products]);

  return (
    <>
      {/* slider was here */}
      <div className="h-full px-8 mt-30 grid md:grid-cols-12 gap-6 py-8">
        {/* Categories Section */}
        <SideBar />
        {/* Products Section */}
        <div
          id="products"
          className={
            products
              ? "md:col-span-9 w-full"
              : "md:col-span-9 flex items-center justify-center"
          }
        >
          <div
            className={
              products
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                : "col-span-12"
            }
          >
            {/* Sample Product Card */}
            {products ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="max-w-[320px] h-[420px] mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg"
                >
                  <div className="relative">
                    <img
                      className="w-[320px] h-50 object-cover"
                      src={
                        productsImages[products.indexOf(product)]?.find(
                          (img) =>
                            img.isFeatured && img.productId === product._id
                        )?.image || "https://picsum.photos/200?random=1"
                      }
                      alt="Product Image"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>

                    <div className="flex flex-col gap-2 justify-between">
                      <span className="font-bold text-lg">
                        KSh {product.price}
                      </span>

                      <button className="bg-amber-600 hover:bg-black text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-2xl my-auto">
                  No products found, please check back later
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
