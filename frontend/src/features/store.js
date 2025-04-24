import { configureStore } from "@reduxjs/toolkit";
import userMenuReducer from "./userMenuSlice";
import productsReducer from "./productsSlice";
import productImagesReducer from "./productImagesSlice";
import imagesMenuReducer from "./imagesMenuSlice";
import loadProductInfoReducer from "./loadProductInfoSlice";
import productCategoriesReducer from "./productCategoriesSlice";

export const store = configureStore({
    reducer: {
        userMenu: userMenuReducer,
        products: productsReducer,
        productImages: productImagesReducer,
        imagesMenu: imagesMenuReducer,
        loadProductInfo: loadProductInfoReducer,
        productCategories: productCategoriesReducer

    },
});

export default store;