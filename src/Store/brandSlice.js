import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookies';

export const getFavBrandData=createAsyncThunk('getfavbrands/getFavBrandData' , async function(){
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_APIBASEURL}/wishlist/brands` ,{
            headers:{
                bearertoken:Cookies.get('token'),
            }
        });
       if (data.message === "success") {
        console.log(data);
        return true , data ;
       }
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
            }else if( action.payload.wishlistBrands.length===0){
                state.favBrandItems = 0;
                state.favBrands = [];
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