import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import emptycart from '../assets/your-cart-is-empty.png';
import $ from 'jquery';
import Cookies from 'js-cookies';


export const getCartItemsData=createAsyncThunk('getcartitem/getCartItemsData' , async function(id = 0){
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_APIBASEURL}/cart`,
          {
            headers: { bearertoken: Cookies.getItem("token") },
          }
        );
       if (data.message === "success") {
        $(`#removeBtn${id}`).html(`Remove Product <i class="bi bi-cart-dash-fill"></i>`);
        console.log(data);
        // if(!data.cartProducts.length){
        //     $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100'); 
        // }
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
        cartId:0,
    },
    extraReducers:function(builder){
        
        builder.addCase(getCartItemsData.fulfilled ,function(state , action){
            if(action.payload === false){
                state.CartProducts = null;
                state.cartItems = 0;
                state.TotalCartPrice = 0;
                $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100');
            }else if( action.payload?.cartProducts?.length===0){
                console.log('iam here');
                state.cartItems = 0;
                state.TotalCartPrice = 0;
                state.CartProducts = null;
            }else{
                state.CartProducts = action.payload.cartProducts;
                state.cartItems = action.payload.cartProducts.length;
                state.TotalCartPrice = action.payload.supTotal;
            }

            
        })
        builder.addCase(getCartItemsData.rejected ,function(state){
            $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100');
        })
    }


    
})

export default getCartItemSlice.reducer;
