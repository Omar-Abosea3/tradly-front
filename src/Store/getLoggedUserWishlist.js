import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import emptyWishlist from '../assets/emptyWishlist.png';
import $ from 'jquery';
import Cookies from 'js-cookies'




export const getFavProductsData=createAsyncThunk('getwishitem/getWishItemsData' , async function(id = 0){
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_APIBASEURL}/wishlist/products`,
          {
            headers: { bearertoken: Cookies.getItem("token") },
          }
        );
        console.log(data);
       if (data.message === "success") {
        console.log(data);
        if(!data.wishlistProducts.length){
            $('#emptyWishlist').html(`<div class="emptyWishlistMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Wishlist" /></div>`).addClass('vh-100'); 
        }
       }
       return data;
      } catch (error) {
        console.log(error);
        return false ;
    }
})

const getFavProductsSlice = createSlice({
    name:'getwishitem',
    initialState:{
        wishlistProducts:null,
        wishlistItems:0
    },
    extraReducers:function(builder){
        builder.addCase(getFavProductsData.fulfilled ,function(state , action){
            console.log(action);
            if(action.payload === false){
                state.wishlistProducts = null;
                state.wishlistItems = 0;
                $('#emptyWishlist').html(`<div class="emptyWishlistMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Wishlist" /></div>`).addClass('vh-100');
            }else{
                state.wishlistProducts = action.payload.wishlistProducts;
                state.wishlistItems = action.payload.wishlistProducts?.length;
            }   
        })
        builder.addCase(getFavProductsData.rejected ,function(state){
            $('#emptyWishlist').html(`<div class="emptyWishlistMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Wishlist" /></div>`).addClass('vh-100');
        })
    }


    
})

export default getFavProductsSlice.reducer;