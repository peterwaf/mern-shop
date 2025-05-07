// eslint-disable-next-line no-unused-vars
import React from "react";
import { X, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProductInfo } from "../features/loadProductInfoSlice";
import { toast } from "react-toastify";
import { fetchProductImages } from "../features/productImagesSlice";
import { deleteProductImage } from "../features/productImagesSlice";
import { addProductImage } from "../features/productImagesSlice";
import { fetchProductCategories } from "../features/productCategoriesSlice";
import axios from "axios";
import API from "../API";
import LoadImg from "/images/loading.gif";
import EditImgModal from "./EditImgModal";
// eslint-disable-next-line react/prop-types
function EditProductForm({ id }) {
  //categories
  const categories = useSelector((state) => state.productCategories.data);
  // track uploading statuses
  const [isUploadingProdImages, setIsUploadingProdImages] = useState(false);
  const [imgUploadStatusMsg, setImgUploadStatusMsg] = useState("");

  // get product info
  const productInfo = useSelector((state) => state.loadProductInfo.data.data);
  const productInfoError = useSelector((state) => state.loadProductInfo.error);
  const productImages = useSelector((state) => state.productImages.data);

  // get product images
  const [addNewImage, setAddNewImage] = useState(false);
  const [productFiles, setProductFiles] = useState([]);

  // edit image

  const [showEditModalImg, setShowEditModalImg] = useState(false);
  const [imgToEdit, setImgToEdit] = useState(null);

  // get product images
  const deleteProdImgError = useSelector(
    (state) => state.productImages.deleteError
  );
  const deleteProdImgStatus = useSelector(
    (state) => state.productImages.deleteStatus
  );
  const addImgStatus = useSelector((state) => state.productImages.addImgStatus);
  const addImgError = useSelector((state) => state.productImages.addImgError);
  const dispatch = useDispatch();

  const [productInfoData, setProductInfoData] = useState({
    name: "",
    featured: false,
    price: 0,
    description: "",
    category: "",
  });

  // load product info

  useEffect(() => {
    dispatch(loadProductInfo(id));
  }, [dispatch, id]);

  // check if productInfo is available

  useEffect(() => {
    if (productInfo) {
      setProductInfoData({
        name: productInfo.name,
        featured: productInfo.featured,
        price: productInfo.price,
        description: productInfo.description,
        category: productInfo.category,
      });
    }
  }, [productInfo]);

  // check if productInfoError is available

  useEffect(() => {
    if (productInfoError) {
      toast.error(productInfoError);
    }
  }, [productInfoError]);

  // handle edit product info change
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setProductInfoData((prevProductInfoData) => ({
      ...prevProductInfoData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // load product images

  useEffect(() => {
    dispatch(fetchProductImages(id));
  }, [dispatch, id]);

  // track delete product image errror

  useEffect(() => {
    if (deleteProdImgStatus === "rejected") {
      toast.error(deleteProdImgError);
    }
  }, [deleteProdImgError, deleteProdImgStatus]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const prodInfoDataToSend = new FormData();
    prodInfoDataToSend.append("name", productInfoData.name);
    prodInfoDataToSend.append("featured", productInfoData.featured);
    prodInfoDataToSend.append("price", productInfoData.price);
    prodInfoDataToSend.append("description", productInfoData.description);
    prodInfoDataToSend.append("category", productInfoData.category);

    // first try catch to update product info

    try {
      const response = await axios.patch(
        `${API}/api/v1/products/update/${id}`,
        prodInfoDataToSend
      );

      // Defer to image upload toast if productFiles exist
      if (response.status === 200 && productFiles.length === 0) {
        toast.success("Product info updated successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }

    // second try catch to update product images

    if (productFiles.length > 0) {
      try {
        setIsUploadingProdImages(true);
        setImgUploadStatusMsg("Uploading product images...");

        await Promise.all(
          productFiles.map(async (file) => {
            let imageData = {
              name: file.name,
              altText: file.name,
              isFeatured: false,
              image: file,
            };
            await dispatch(addProductImage({ id, imageData }));
          })
        );

        toast.success("Product info and images updated successfully");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setProductFiles([]);
        setIsUploadingProdImages(false);
        setImgUploadStatusMsg("");
      }
    }
  };

  // track add image status

  useEffect(() => {
    if (addImgStatus === "rejected") {
      console.log(addImgError);
    }
  }, [addImgError, addImgStatus]);

   useEffect(() => {
      dispatch(fetchProductCategories());
    }, [dispatch]);
    

  return (
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
        value={productInfoData.name}
      />

      <label htmlFor="featured" className="text-gray-700 font-medium">
        Do you want to feature this product?
      </label>
      <input
        className="p-2 size-4 border rounded-md focus:ring-2 focus:ring-amber-500"
        type="checkbox"
        name="featured"
        checked={productInfoData.featured}
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
        value={productInfoData.price}
      />

      <label className="text-gray-700 font-medium">Description</label>
      <textarea
        className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
        name="description"
        placeholder="Enter Product Description"
        onChange={handleChange}
        value={productInfoData.description}
      ></textarea>

      <label className="text-gray-700 font-medium">Category</label>
      <select
        name="category"
        id="category"
        className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
        onChange={handleChange}
      >
        <option value={productInfoData.category}>
          {productInfoData.category}
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <label className="text-gray-700 font-medium">
        Existing Product Images
      </label>

      <div className="flex flex-row gap-4">
        {productImages.length > 0 ? (
          productImages.map((productImage) => (
            <div key={productImage._id} className="relative w-32 h-32">
              <img
                src={productImage.image}
                alt={`Image ${productImage.altText}`}
                className="w-full h-full object-cover rounded-md shadow-md"
              />
              <button
                className="absolute top-1 left-1 bg-black text-white rounded-full p-1 hover:bg-amber-800"
                onClick={(e) => {
                  e.preventDefault();
                  setShowEditModalImg(true);
                  setImgToEdit(productImage);
                }}
              >
                <Pencil size={16} />
              </button>
              <button className="absolute top-1 right-1 bg-amber-600 text-white rounded-full p-1 hover:bg-red-700">
                <X
                  onClick={() => dispatch(deleteProductImage(productImage._id))}
                  size={16}
                />
              </button>
            </div>
          ))
        ) : (
          <p>No images existing for this product available</p>
        )}
        <br />
      </div>
      {showEditModalImg && (
        <EditImgModal
          imgToEdit={imgToEdit}
          canceEditImgModal={() => setShowEditModalImg(false)}
        />
      )}

      <label className="text-gray-700 font-medium">
        Would you like to add new images?
      </label>
      <select
        name="addImages"
        id="addImages"
        className="p-2 border rounded-md focus:ring-2 focus:ring-amber-600"
        onChange={(e) => {
          if (e.target.value === "Yes") {
            setAddNewImage(true);
          }
          if (e.target.value === "No") {
            setAddNewImage(false);
          }
        }}
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      {addNewImage && (
        <div>
          <label className="text-gray-700 font-medium p-2">
            {productFiles.length > 0 ? "Images to add" : "Add New Images"}
          </label>
          <div className="flex flex-row gap-4">
            {productFiles.length > 0 ? (
              productFiles.map((productFile) => (
                <div key={productFile.name} className="relative w-32 h-32 p-2">
                  <img
                    src={URL.createObjectURL(productFile)}
                    alt={`Image ${productFile.name}`}
                    className="w-full h-full object-cover rounded-md shadow-md"
                  />
                  <button className="absolute top-1 right-1 bg-amber-600 text-white rounded-full p-1 hover:bg-red-700">
                    <X
                      onClick={() =>
                        setProductFiles(
                          productFiles.filter(
                            (file) => file.name !== productFile.name
                          )
                        )
                      }
                      size={16}
                    />
                  </button>
                </div>
              ))
            ) : (
              <p className="p-2">No new images selected for this product</p>
            )}
          </div>
          <br />
          <input
            className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
            type="file"
            name="images"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setProductFiles((prevFiles) => {
                  //check if the file already exists
                  const selectedFiles = Array.from(files);
                  const existingFileNames = prevFiles.map((file) => file.name);
                  const newFiles = selectedFiles.filter(
                    (file) => !existingFileNames.includes(file.name)
                  );
                  return [...prevFiles, ...newFiles];
                });
              }
            }}
          />
        </div>
      )}

      <div className="flex flex-col items-center">
        {/* if uploading, show loading image */}
        {isUploadingProdImages && (
          <div>
            <img className="w-[150px] h-[150px]" src={LoadImg} alt="Success" />
            <span className="text-center p-2">{imgUploadStatusMsg}</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-amber-600 hover:bg-black text-white font-medium p-4 rounded-md transition-all"
      >
        Update
      </button>
    </form>
  );
}

export default EditProductForm;
