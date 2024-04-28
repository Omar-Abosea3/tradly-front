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


 
  async function updateCounterInCartItem (id , count){
    $(`#loadingIcon${id}`).fadeIn(300);
    try {
        const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          "count": count,
      },{
        headers: { token: localStorage.getItem("tkn1") },
      });
      if (data.status === "success" ) {
        $(`#loadingIcon${id}`).fadeOut(300);
        return true ;
      }

      } catch (error) {
        console.log(error);
        return false;
      }
}


  async function checkQuantity( id , counter ,product2){
      if(product2.count == product2.product.quantity){
        $('.quantityNotEnough').fadeIn(500);
      }else{
        $('.quantityNotEnough').fadeOut(500);
        if(await updateCounterInCartItem(id , counter)==true){
          dispatch(getCartItemsData());
        }
      }

  }
  async function checkQuantity2(id, counter, product2) {
    $(`#loadingIcon${id}`).fadeIn(300);
    if (product2.count == product2.product.quantity && await updateCounterInCartItem(id, counter) == true) {
      $('.quantityNotEnough').fadeOut(500);
    } else if (product2.count == 1) {
      $(`#loadingIcon${id}`).fadeOut(300);
      removeFromCart(id);
    } else if ( await updateCounterInCartItem(id, counter) == true) {
      dispatch(getCartItemsData());
    }

  }

    async function removeFromCart(id){
      $(`#removeBtn${id}`).html(`<i  class='fa fa-spinner fa-spin'></i>`);
      $('#imPortantLayer').removeClass('d-none');
      try {
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers: {
              token: localStorage.getItem('tkn1'),
            }
          });
          if (data.status === "success") {
            dispatch(getCartItemsData(id));
            setTimeout(() => {
              $('#imPortantLayer').addClass('d-none');
            }, 1500);
            if(myCartItems.length == 1 || !myCartItems.length){
              navigate('/home')
            }
            $('.RemoveMsg').slideDown(500,function(){
              setTimeout(() => {
                $('.RemoveMsg').slideUp(500);
              }, 1500);
            })
          }
        } catch (error) {
          $('#imPortantLayer').addClass('d-none');
          $(`#removeBtn${id}`).html(`Remove Product <i class="bi bi-cart-dash-fill"></i>`);
          console.log(error);
        }
          
  }
    async function clearCart(){
      $('#clearBtn').html(`<i  class='fa fa-spinner fa-spin'></i>`);
      try {
        const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
          {
            headers: { token: localStorage.getItem("tkn1") },
          }
        );

        if (data.message === "success") {
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



  return <>
    <Helmet>
        <title>Cart</title>
    </Helmet>
    <div id='emptyCart' className='d-flex flex-wrap justify-content-center align-items-center'>
      {myCartItems == null ? <LodingScrean /> : <>
        <div className="container d-flex productFontSize my-5 justify-content-center py-5">
          <div style={{ display: 'none', zIndex: '9999' }} className="sucMsg mt-0 p-3 alert bg-dark text-white position-fixed top-0"><i className="fa-solid fa-circle-check"></i> Product Removed From Cart Successfully .</div>
          <div className="row cartRow py-5 ">
            <div className=' d-flex justify-content-between align-items-center mb-3'>
              <h3 className='p-1 totalPrice rounded-3 px-3 fw-bold'>Total-Price: <span>{myTotalCartPrice}</span></h3>
              <button id='clearBtn' onClick={function () { clearCart() }} className='btn btn-danger clearBtn ms-auto'><i className="bi bi-cart-x-fill"></i> Clear Cart</button>
            </div>
            <hr />
            {myCartItems.map((Product, index) => <section key={index}><div className="col-12 bg-white">
              <figure className="cart-products shadow-lg d-flex">
                <img className='w-25' src={Product.product.imageCover} alt={Product.product.title} />
                <figcaption className='d-flex ps-3 pb-3 w-75 align-content-start flex-wrap'>
                  <div className='w-100'><img className='w-25' src={Product.product.brand?.image} alt={Product.product.brand?.name} /></div>
                  <h3 className='w-100 mb-3 ProTitle'>{Product.product.title.slice(0, Product.product.title.indexOf(' ', 10))}</h3>
                  <h3 className='w-100 mb-3'>Count: <span className='fw-light'>{Product.count}</span> <button onClick={function () { checkQuantity2(Product.product.id, Product.count - 1, Product) }} className='proBtn3'><i className="bi bi-dash-circle-fill"></i></button> <button onClick={function () { checkQuantity(Product.product.id, Product.count + 1, Product) }} className='proBtn3'><i className="bi bi-plus-circle-fill"></i></button> <i id={`loadingIcon${Product.product.id}`} style={{ display: 'none' }} className='fa fa-spinner fa-spin'></i> </h3>
                  <h3 className='w-100 mb-3'>Price-Per-One: <span className='fw-light'>{Product.price}</span></h3>
                  <h3 className='w-100 mb-3'>Total-Price: <span className='fw-light'>{Product.count * Product.price}</span></h3>
                  <h3 style={{ display: 'none' }} className='quantityNotEnough w-100 text-danger'>This Is All Quantity For This !</h3>
                  <button id={`removeBtn${Product.product._id}`} onClick={function () { removeFromCart(Product.product._id) }} className='btn cartRemoveBtn'>Remove Product <i className="bi bi-cart-dash-fill"></i></button>
                </figcaption>
              </figure>
            </div><hr /></section>)}
            <button onClick={function () { navigate('/payment') }} className=' proBtn5 rounded-0 w-100'>Puy Now <i className="bi bi-credit-card-2-front-fill"></i></button>
          </div>
        </div>
      </>
      }



    </div>
  </>
}

