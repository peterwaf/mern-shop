// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import API from "../API";
import axios from "axios";
import LoadImg from "/images/loading.gif";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { fetchProductCategories } from "../features/productCategoriesSlice";

function AddProductForm() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    featured: false,
    price: 0,
    description: "",
    category: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { type, name, value, checked, files } = e.target;

    setProduct((prevProduct) => {
      if (type === "file" && files) {
        if (files.length === 0) {
          toast.error("No image selected");
          return prevProduct;
        }
        return {
          ...prevProduct,
          images: [...prevProduct.images, ...Array.from(files)], // Convert FileList to Array
        };
      }

      if (type === "checkbox") {
        return { ...prevProduct, [name]: checked };
      }

      if (type === "number") {
        return { ...prevProduct, [name]: Number(value) };
      }

      return { ...prevProduct, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.images.length === 0) {
      toast.error("No image uploaded");
      return;
    }

    const productData = new FormData();
    productData.append("name", product.name);
    productData.append("featured", product.featured);
    productData.append("price", product.price);
    productData.append("description", product.description);
    productData.append("category", product.category);

    let productId; // Declare productId outside of the try block

    // First Try-Catch: Create Product
    try {
      setUploading(true);
      const response = await axios.post(
        `${API}/api/v1/products/add`,
        productData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        productId = response.data.savedProduct._id;
      } else {
        setUploading(false);
        throw new Error("Failed to create product");
      }
    } catch (error) {
      setUploading(false);
      console.error("Product creation error:", error);
      toast.error(error.response?.data?.error || "Product creation failed");
      return; // Stop execution if product creation fails
    }

    //Prevent image upload if product creation failed
    if (!productId) {
      setUploading(false);
      console.error("Product ID is undefined. Aborting image upload.");
      return;
    }

    // Second Try-Catch: Upload Images
    try {
      await Promise.all(
        product.images.map(async (file, index) => {
          const imagesData = new FormData();
          imagesData.append("name", file.name);
          imagesData.append("altText", file.name);
          imagesData.append("isFeatured", index === 0); // First image as featured
          imagesData.append("image", file);
          await axios.post(
            `${API}/api/v1/images/add/${productId}`,
            imagesData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        })
      );
    } catch (error) {
      setUploading(false);
      console.error("Image upload error:", error);
      toast.error(error.response?.data?.error || "Image upload failed");
    }
    toast.success("Product added successfully");
    setUploading(false);
  };

  const removeImage = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index),
    }));
  };

  const categories = useSelector((state) => state.productCategories.data);

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto space-y-3"
      >
        <label className="text-gray-700 font-medium">Product Name</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="text"
          name="name"
          placeholder="Enter Product Name"
          onChange={handleChange}
        />

        <label htmlFor="featured" className="text-gray-700 font-medium">
          Do you want to feature this product?
        </label>
        <input
          className="p-2 size-4 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="checkbox"
          name="featured"
          id="featured"
          onChange={handleChange}
        />

        <label className="text-gray-700 font-medium">Price</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="number"
          name="price"
          placeholder="Enter Product Price"
          onChange={handleChange}
        />

        <label className="text-gray-700 font-medium">Description</label>
        <textarea
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          name="description"
          placeholder="Enter Product Description"
          onChange={handleChange}
        ></textarea>

        <label className="text-gray-700 font-medium">Select Category</label>
        <select
          name="category"
          id="category"
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
         </select>
        

        <label htmlFor="images">Select Product Images</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="file"
          name="images"
          id="images"
          multiple
          onChange={handleChange}
        />

        {product.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {product.images.map((img, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md "
                />
                <div>
                  {" "}
                  <X
                    className="text-red-500 bg-white m-2 relative top-[-72px] left-[36px] cursor-pointer"
                    size={20}
                    onClick={() => removeImage(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center">
          {/* if uploading, show loading image */}
          {uploading && <img className="w-[150px] h-[150px]" src={LoadImg} alt="Success" />}
        </div>

        <button
          type="submit"
          className="bg-amber-600 hover:bg-black text-white font-medium p-4 rounded-md transition-all"
        >
          Add
        </button>

        <button onClick={(e) =>{
        e.preventDefault();
          navigate("/admin-manage-products")}} className="bg-black text-white font-medium p-4 rounded-md transition-all">
          Go back to Manage Products
        </button>
      </form>
    </>
  );
}

export default AddProductForm;
