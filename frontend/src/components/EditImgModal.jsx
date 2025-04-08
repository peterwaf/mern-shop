/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../API";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchProductImages } from "../features/productImagesSlice";
import LoadImg from "/images/loading.gif";

function EditImgModal({ imgToEdit, canceEditImgModal }) {
  const [imgFormData, setImgFormData] = useState({
    altText: imgToEdit?.altText,
    name: imgToEdit?.name,
    isFeatured: imgToEdit?.isFeatured,
    image: imgToEdit?.image,
    productId: imgToEdit?.productId,
  });
  const [replaceImg, setReplaceImg] = useState(false);
  const [replaceFile, setReplaceFile] = useState(null);
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const dispatch = useDispatch();

  //   router.patch("/api/v1/images/update/:id", updateImage);

  const updateImgData = async () => {
    const formData = new FormData();
    formData.append("altText", imgFormData.altText);
    formData.append("name", imgFormData.name);
    formData.append("isFeatured", imgFormData.isFeatured);
    formData.append("productId", imgFormData.productId);
    if (replaceFile) {
      formData.append("image", replaceFile);
      setIsUploadingImg(true);
    }
    try {
      const response = await axios.patch(
        `${API}/api/v1/images/update/${imgToEdit._id}`,
        formData
      );
      dispatch(fetchProductImages(imgToEdit.productId));
      toast.success(response.data.message);
      canceEditImgModal();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
    finally {
      setIsUploadingImg(false);
    }
  };

  console.log("Image Id", imgToEdit._id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative max-h-screen overflow-y-auto">
        <img
          src={imgToEdit.image}
          alt="Selected"
          className="w-full h-40 object-cover rounded-md mb-4"
        />

        <label className="block text-gray-700 mb-2">Alt Text</label>
        <input
          type="text"
          value={imgFormData.altText}
          onChange={(e) =>
            setImgFormData((prevData) => ({
              ...prevData,
              altText: e.target.value,
            }))
          }
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 mb-4"
        />
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={imgFormData.name}
          onChange={(e) =>
            setImgFormData((prevData) => ({
              ...prevData,
              name: e.target.value,
            }))
          }
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 mb-4"
        />
        <label className="block text-gray-700 mb-2">
          Featured (Check below to make it featured)
        </label>
        <input
          type="checkbox"
          value={imgFormData.isFeatured}
          checked={imgFormData.isFeatured}
          onChange={(e) => {
            if (e.target.checked) {
              setImgFormData((prevData) => ({
                ...prevData,
                isFeatured: true,
              }));
            } else {
              setImgFormData((prevData) => ({
                ...prevData,
                isFeatured: false,
              }));
            }
          }}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 mb-4"
        />

        <label className="block text-gray-700 mb-2">
          Do you want to replace this image?
        </label>
        <select
          value={replaceImg}
          onChange={(e) => {
            e.target.value === "true"
              ? setReplaceImg(true)
              : setReplaceImg(false);
          }}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 mb-4"
        >
          <option value="true"> Yes</option>
          <option value="false"> No</option>
        </select>

        {replaceImg && (
          <div>
            <label className="block text-gray-700 mb-2">Image</label>
            <input
              onChange={(e) => setReplaceFile(e.target.files[0])}
              type="file"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 mb-4"
            />
          </div>
        )}
        <div className="flex flex-col items-center">
          {/* if uploading, show loading image */}
          {isUploadingImg && (
            <div>
              <img
                className="w-[100px] h-[100px]"
                src={LoadImg}
                alt="Success"
              />
            </div>
          )}
        </div>

        <div className="flex row justify-center gap-2 p-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              canceEditImgModal();
            }}
            className="px-4 py-2 mt-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              updateImgData();
            }}
            className="px-4 py-2 mt-2 bg-amber-600 text-white rounded-md hover:bg-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditImgModal;
