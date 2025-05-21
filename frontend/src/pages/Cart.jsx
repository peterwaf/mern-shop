// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import API from "../API";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removefromCart,
  decreaseCartItemQty,
  increaseCartItemQty
} from "../features/cartItemsSlice";

function Cart() {
  const [productsImages, setProductsImages] = useState([]);
  const cartItems = useSelector((state) => state.cartItems.data);
  const cartItemsTotal = useSelector((state) => state.cartItems.cartItemsTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const imagesByProduct = {};
        await Promise.all(
          cartItems.map(async (product) => {
            const response = await axios.get(
              `${API}/api/v1/images/product/${product._id}`
            );
            imagesByProduct[product._id] = response.data.productImages || [];
          })
        );
        setProductsImages(imagesByProduct);
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    if (cartItems.length) {
      fetchProductImages();
    }
  }, [cartItems]);

  return (
    <>
      {/* slider was here */}
      <div className="px-8 mt-30 grid md:grid-cols-12 gap-6 py-8 h-auto">
        {/* Cart Items Section */}
        <div
          id="cart-items"
          className="md:col-span-12 w-full bg-white rounded shadow-md p-4"
        >
          <h2 className="text-2xl font-bold text-center">My Cart Items</h2>
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
          ) : (
            <div className="flex flex-col mt-4">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem._id}
                  className="flex items-center bg-gray-100 rounded p-4 mb-4"
                >
                  <img
                    src={
                      productsImages[cartItem._id]?.find(
                        (img) => img.isFeatured
                      )?.image || "https://picsum.photos/200?random=1"
                    }
                    alt={cartItem.name}
                    className="w-40 h-40 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{cartItem.name}</h3>
                      <p className="text-lg font-bold">
                        KSh {cartItem.price * cartItem.quantity}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <button 
                        onClick={() => {
                          dispatch(
                            decreaseCartItemQty(cartItem._id)
                          );
                      }}
                        className="bg-gray-200 px-4 py-2 rounded"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => {
                          dispatch(
                            increaseCartItemQty(cartItem._id)
                          );
                        }}
                        className="bg-gray-200 px-4 py-2 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          dispatch(
                            removefromCart(cartItem._id)
                          );
                        }}
                        className="bg-amber-500 text-black font-bold px-4 py-2 rounded ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-end mt-4">
            <p className="text-lg font-bold mr-4">
              Total: KSh {cartItemsTotal}
            </p>
            <button
              onClick={() => {
                // checkout logic
              }}
              className="bg-amber-500 text-black font-bold px-4 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
