// eslint-disable-next-line no-unused-vars
import React from "react";
import HomeSlider from "../components/HomeSlider";

function Home() {
  return (
    <>
    <HomeSlider />
      <div className="h-full px-8 grid md:grid-cols-12 gap-6 py-8">
        {/* Categories Section */}
        <div
          id="categories"
          className="md:col-span-3 background-white rounded-md shadow-md p-4 border-amber-600 border-1"
        >
          <ul className="space-y-2">
            <li className="bg-white rounded-md shadow-md p-4 font-bold">
              <a className="hover:text-amber-600" href="#">
                Category 1
              </a>
            </li>
          </ul>
        </div>

        {/* Products Section */}
        <div id="products" className="md:col-span-9 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Product Card */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    alt="Product Image"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">Product Title</h3>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">$19.99</span>
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
