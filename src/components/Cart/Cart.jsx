import React, { useEffect, useLayoutEffect, useMemo, useState} from 'react';
import LodingScrean from '../loadingScreen/LodingScrean';
import emptycart from '../../assets/your-cart-is-empty.png';

import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import Cookies from 'js-cookies';
import CartItemCard from './CartItemCard';
import PaymentMethods from './PaymentMethods';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myCartItems = useSelector(function(store){
    return store.getCartItemSlice.CartProducts;
  })

  const myNumCartItems = useSelector(function(store){
    return store.getCartItemSlice.cartItems;
  })

  const myTotalCartPrice = useSelector(function(store){
    return store.getCartItemSlice.TotalCartPrice;
  })


 
  async function increamentCounter (id , count){
    $(`#loadingIcon${id}`).fadeIn(300);
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_APIBASEURL}/cart/increamentquantity`,{
          "productId" : id ,
          "quantity" : count
      },{
        headers: { bearertoken: Cookies.getItem("token") },
      });
      if (data.message === "done" ) {
        $(`#loadingIcon${id}`).fadeOut(300);
        dispatch(getCartItemsData());
        return true ;
      }
      } catch (error) {
        console.log(error);
        return false;
      }
  }
  async function decreamentCounter (id , count){
    $(`#loadingIcon${id}`).fadeIn(300);
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_APIBASEURL}/cart/dicreamentquantity`,{
          "productId" : id ,
          "quantity" : count
      },{
        headers: { bearertoken: Cookies.getItem("token") },
      });
      if (data.message === "done" ) {
        $(`#loadingIcon${id}`).fadeOut(300);
        dispatch(getCartItemsData());
        return true ;
      }
      } catch (error) {
        console.log(error);
        return false;
      }
  }


  async function checkQuantity( id , counter ,product2){
      if(product2.stok === product2.quantity){
        $('.quantityNotEnough').fadeIn(500);
      }else{
        $('.quantityNotEnough').fadeOut(500);
        if(await increamentCounter(id , counter) === true){
          dispatch(getCartItemsData());
        }
      }

  }
  async function checkQuantity2(id, counter, product2) {
    $(`#loadingIcon${id}`).fadeIn(300);
    if (product2.stok === product2.quantity && await decreamentCounter(id, counter) === true) {
      $('.quantityNotEnough').fadeOut(500);
    } else if (product2.stok === 1) {
      $(`#loadingIcon${id}`).fadeOut(300);
      removeFromCart(id);
    } else if ( await decreamentCounter(id, counter) === true) {
      dispatch(getCartItemsData());
    }

  }

    async function removeFromCart(id){
      $(`#removeBtn${id}`).html(`<i  class='fa fa-spinner fa-spin'></i>`);
      $('#imPortantLayer').removeClass('d-none');
      try {
          const {data} = await axios.delete(`${process.env.REACT_APP_APIBASEURL}/cart`,{
            data:{
              "productId" : id
            },
            headers: { bearertoken: Cookies.getItem("token") },
          });
          
            dispatch(getCartItemsData(id));
            setTimeout(() => {
              $('#imPortantLayer').addClass('d-none');
            }, 1500);
            if(myCartItems.length === 1 || !myCartItems.length){
              navigate('/home')
            }
            $('.RemoveMsg').slideDown(500,function(){
              setTimeout(() => {
                $('.RemoveMsg').slideUp(500);
              }, 1500);
            })
        
        } catch (error) {
          $('#imPortantLayer').addClass('d-none');
          $(`#removeBtn${id}`).html(`Remove Product <i class="bi bi-cart-dash-fill"></i>`);
          console.log(error);
        }
          
  }
    async function clearCart(){
      $('#clearBtn').html(`<i  class='fa fa-spinner fa-spin'></i>`);
      try {
        const { data } = await axios.delete(`${process.env.REACT_APP_APIBASEURL}/cart/deletecart`,
          {
            headers: { bearertoken: Cookies.getItem("token") },
          }
        );

        if (data.message === "cart deleted success") {
          navigate('/home');
          $('.emptyCart').slideDown(500 , function(){
            setTimeout(() => {
              $('.emptyCart').slideUp(500)
            }, 1500);
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  

  const memo = useMemo(function(){
    dispatch(getFavProductsData());
    if(!myCartItems){
      dispatch(getCartItemsData());
      $('#emptyCart').html(`<div class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100'); 
    }
    console.log(myCartItems);
},[myCartItems])



  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div
        id="emptyCart"
        className="d-flex flex-wrap justify-content-center align-items-center"
      >
        {myCartItems == null ? (
          <LodingScrean />
        ) : (
          <>
            <div className="w-100 d-flex productFontSize my-3 justify-content-center ">
              <div
                style={{ display: "none", zIndex: "9999" }}
                className="sucMsg mt-0 p-3 alert bg-dark text-white position-fixed top-0"
              >
                <i className="fa-solid fa-circle-check"></i> Product Removed
                From Cart Successfully .
              </div>
              <div className="my-5 px-5">
                <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                  <h3 className="p-1 totalPrice rounded-3 px-3 fw-bold">
                    Total-Price: <span>{myTotalCartPrice}</span>
                  </h3>
                  <button
                    id="clearBtn"
                    onClick={function () {
                      clearCart();
                    }}
                    className="btn btn-danger clearBtn ms-auto"
                  >
                    <i className="bi bi-cart-x-fill"></i> Clear Cart
                  </button>
                </div>
                <hr />
                {myCartItems.map((Product, index) => (
                  <CartItemCard
                    index={index}
                    product={Product}
                    checkQuantity={checkQuantity}
                    checkQuantity2={checkQuantity2}
                    removeFromCart={removeFromCart}
                  />
                ))}
                <button
                  onClick={function () {
                    $('#PaymentMethodsLayer').css('display' , 'flex');
                  }}
                  className=" proBtn5 rounded-0 w-100"
                >
                  Puy Now <i className="bi bi-credit-card-2-front-fill"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <PaymentMethods/>
    </>
  );
}

