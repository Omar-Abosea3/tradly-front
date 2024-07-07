import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookies';
import emptyWishlist from '../assets/emptyWishlist.svg';
import $ from 'jquery';

export const getFavBrandData=createAsyncThunk('getfavbrands/getFavBrandData' , async function(){
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_APIBASEURL}/wishlist/brands` ,{
            headers:{
                bearertoken:Cookies.getItem('token'),
            }
        });
        console.log(data);
        return  data ;
      } catch (error) {
        return false ;
    }
})

const getFavBrandsSlice = createSlice({
    name:'getfavbrands',
    initialState:{
        favBrands:null,
        favBrandItems:0,
    },
    extraReducers:function(builder){
        
        builder.addCase(getFavBrandData.fulfilled ,function(state , action){
            if(action.payload === false){
                state.favBrands = null;
                state.favBrandItems = 0;
                $('#emptyBrandWishlist').html(`<div class="emptyWishlist pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Cart" /></div>`).addClass('vh-100'); 
            }else if( action.payload.wishlistBrands.length===0){
                state.favBrandItems = 0;
                state.favBrands = [];
                $('#emptyBrandWishlist').html(`<div class="emptyWishlist pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Cart" /></div>`).addClass('vh-100'); 
            }else{
                state.favBrandItems = action.payload.wishlistBrands.length;
                state.favBrands = action.payload.wishlistBrands;
                // console.log(action.payload.data.totalCartPrice);
                // console.log(action.payload.numOfCartItems); 
            }

            
        })
        builder.addCase(getFavBrandData.pending ,function(state){
            console.log('waiting');
        })
    }


    
})

export default getFavBrandsSlice.reducer;