// eslint-disable-next-line no-unused-vars
import React from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImagesMenu } from "../features/imagesMenuSlice";
import { resetProductImages } from "../features/productImagesSlice";

function ImagesViewer() {
  const productImages = useSelector((state) => state.productImages?.data || []);
  const dispatch = useDispatch();

  return (
    <div
      id="imageViewer"
      className="w-3/4 rounded-lg p-4 bg-black text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg"

    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Image Viewer</p>
        <button className="text-white hover:text-gray-400">
          <X onClick={() => {
            dispatch(toggleImagesMenu());
            dispatch(resetProductImages());
          }} size={24} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {productImages.length > 0 ? (
          productImages.map((productImage) => (
            <img
              key={productImage._id}
              src={productImage.image}
              alt={`Image ${productImage.altText}`}
              className="w-full h-full object-cover"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}

export default ImagesViewer;
