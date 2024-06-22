import { configureStore } from '@reduxjs/toolkit';
import getCartItemSlice from './getLoggedCartItemsSlice.js';
import getFavProductsSlice from './getLoggedUserWishlist.js';
import getFavBrandsReducer from './brandSlice.js';
export const myStore = configureStore({
    reducer:{
        getCartItemSlice,
        getFavProductsSlice,
        favBrands:getFavBrandsReducer,
    },
});
