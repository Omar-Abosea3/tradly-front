import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import emptycart from '../assets/your-cart-is-empty.png';
import $ from 'jquery';





export const getCartItemsData=createAsyncThunk('getcartitem/getCartItemsData' , async function(id = 0){
    try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
          {
            headers: { token: localStorage.getItem("tkn1") },
          }
        );
       if (data.status === "success") {
        $(`#removeBtn${id}`).html(`Remove Product <i class="bi bi-cart-dash-fill"></i>`);
        console.log(data);
        if(!data.data.products.length){
            $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100'); 
        }
        localStorage.setItem('cartId',data.data._id);
        return true , data ;
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
            if(action.payload == false){
                state.CartProducts = null;
                state.cartItems = 0;
                state.TotalCartPrice = 0;
                $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100');
            }else if( action.payload.data.products.length==0){
                console.log('iam here');
                state.cartItems = 0;
                state.TotalCartPrice = 0;
                state.CartProducts = null;
            }else{
                state.CartProducts = action.payload.data.products;
                state.cartItems = action.payload.numOfCartItems;
                state.TotalCartPrice = action.payload.data.totalCartPrice;
                
            }

            
        })
        builder.addCase(getCartItemsData.rejected ,function(state){
            $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100');
        })
    }


    
})

export default getCartItemSlice.reducer;
