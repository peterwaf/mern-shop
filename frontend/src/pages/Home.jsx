// eslint-disable-next-line no-unused-vars
import React from "react";
import HomeSlider from "../components/HomeSlider";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts } from "../features/productsSlice";

function Home() {
  const products = useSelector((state) => state.products.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  console.log(products);
  
  return (
    <>
    <HomeSlider />
      <div className="h-full px-8 grid md:grid-cols-12 gap-6 py-8">
        {/* Categories Section */}
        <SideBar />

        {/* Products Section */}
        <div id="products" className="md:col-span-9 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Product Card */}
            {(products).map((product) => (
              <div
                key={product._id}
                className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    className="w-full"
                    src={product.image}
                    alt="Product Image"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">KES: {product.price}</span>
                    <button className="bg-amber-600 hover:bg-black text-white font-bold py-2 px-4 rounded">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
