import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import emptycart from '../assets/your-cart-is-empty.svg';
import $ from 'jquery';
import Cookies from 'js-cookies';


export const getCartItemsData=createAsyncThunk('getcartitem/getCartItemsData' , async function(){
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_APIBASEURL}/cart`,
          {
            headers: { bearertoken: Cookies.getItem("token") },
          }
        );
       if (data.message === "success") {
        console.log(data);
        localStorage.setItem('cartId',data._id);
        return  data ;
       }
      } catch (error) {
        console.log(error);
        return false ;
    }
})

const getCartItemSlice = createSlice({
    name:'getcartitem',
    initialState:{
        CartProducts:null,
        cartItems:0,
        TotalCartPrice:0,
    },
    extraReducers:function(builder){
        builder.addCase(getCartItemsData.fulfilled ,function(state , action){
            console.log(action.payload);
            if(action.payload === false || action.payload === undefined){
                state.CartProducts = null;
                state.cartItems = 0;
                state.TotalCartPrice = 0;
                $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100');
            }else{
                state.cartItems = action.payload.cartProducts.length;
                state.CartProducts = action.payload.cartProducts; 
                state.TotalCartPrice = action.payload.supTotal;
            } 
        });
        builder.addCase(getCartItemsData.rejected ,function(state , action){
            $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100');
        });
    }
});

export default getCartItemSlice.reducer;
