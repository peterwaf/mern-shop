// eslint-disable-next-line no-unused-vars
import React from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

function HomeSlider() {
  const [count, setCount] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const increment = useCallback(() => {
    setCount(count + 1);
    if (count >= productsData.length - 1) {
      setCount(0);
    }
  });
  const decrement = () => {
    setCount(count - 1);
    if (count <= 0) {
      setCount(productsData.length - 1);
    }
  };
  const productsData = [
    {
      _id: "asdwdedwe",
      name: "Lorem Ipsum 1",
      image: "https://picsum.photos/200?random=1",
      price: 200,
      description: "Lipsum Blablabla bala",
    },
    {
      _id: "qwerty123",
      name: "Lorem Ipsum 2",
      image: "https://picsum.photos/200?random=2",
      price: 150,
      description: "Another dummy description",
    },
    {
      _id: "zxcvb456",
      name: "Lorem Ipsum 3",
      image: "https://picsum.photos/200?random=3",
      price: 300,
      description: "This is a third product description",
    },
    {
      _id: "lkjhgf789",
      name: "Lorem Ipsum 4",
      image: "https://picsum.photos/200?random=4",
      price: 250,
      description: "Yet another dummy product description",
    },
    {
      _id: "mnbvcx987",
      name: "Lorem Ipsum 5",
      image: "https://picsum.photos/200?random=5",
      price: 180,
      description: "A different product with a unique description",
    },
  ];
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
          <img
            className="w-full h-full object-cover"
            src={productsData[count].image}
            alt=""
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center p-4">
          <h1 className="font-bold text-2xl mb-4">{productsData[count].name}</h1>
          <p className="mb-4">{productsData[count].description}</p>
          <p className="font-bold text-xl mb-4">KES {productsData[count].price}</p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded w-fit">
            Add to Cart
          </button>
        </div>
        <div className="icon absolute top-[40%] right-10 bg-amber-600 text-white rounded-2xl p-1 z-8">
          <MoveRight onClick={increment} />
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;