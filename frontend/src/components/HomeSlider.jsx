/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

function HomeSlider({homePageProducts,productsImages}) {
  const [count, setCount] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const increment = useCallback(() => {
    setCount(count + 1);
    if (count >= homePageProducts.length - 1) {
      setCount(0);
    }
  });
  const decrement = () => {
    setCount(count - 1);
    if (count <= 0) {
      setCount(homePageProducts.length - 1);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      increment();
    }, 4000);
  
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [increment]); // Add `increment` as a dependency

  
  return (
    <div
      id="homeSlider"
      className="px-8 w-full mt-40 md:mt-32 min-h-[300px] relative overflow-hidden"
    >
      <div id="sliderHolder" className="flex h-full">
        <div className="icon absolute top-[40%] left-10 bg-amber-600 text-white rounded-2xl p-1 z-8">
          <MoveLeft onClick={decrement} />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          {homePageProducts.map((product, index) => (
            <img
              key={index}
              className={`w-full h-[400px] object-cover ${count === index ? "block" : "hidden"}`}
              src={
                productsImages[homePageProducts.indexOf(product)]?.find(img => img.isFeatured)?.image
                || "https://picsum.photos/200?random=1"
              }
              alt={product.name}
            />
          ))}
        </div>
        <div className="w-1/2 flex flex-col justify-center p-4">
          {homePageProducts.map((product, index) => (
            <div key={index} className={`${count === index ? "block" : "hidden"}`}>
              <h1 className="font-bold text-2xl mb-4">{product.name}</h1>
              <p className="mb-4">{product.description}</p>
              <p className="font-bold text-xl mb-4">KSh {product.price}</p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded w-fit">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="icon absolute top-[40%] right-10 bg-amber-600 text-white rounded-2xl p-1 z-8">
          <MoveRight onClick={increment} />
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;