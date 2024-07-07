import React, { useEffect} from 'react';
import LodingScrean from '../loadingScreen/LodingScrean';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookies';
import CartItemCard from './CartItemCard';
import PaymentMethods from './PaymentMethods';
import { Message, toaster } from 'rsuite';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myCartItems = useSelector(function(store){
    return store.getCartItemSlice.CartProducts;
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
      if(product2.stok < product2.quantity){
        $('.quantityNotEnough').fadeIn(500);
      }else{
        $('.quantityNotEnough').fadeOut(500);
        if(await increamentCounter(id , counter) === true){
          console.log('incremented');
        }
      }

  }
  async function checkQuantity2(id, counter, product2) {
    $(`#loadingIcon${id}`).fadeIn(300);
    if (product2.quantity === 1) {
      $(`#loadingIcon${id}`).fadeOut(300);
      removeFromCart(id);
    } else if ( await decreamentCounter(id, counter) === true) {
      console.log('decremented');
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
          $(`#removeBtn${id}`).html(`Remove Product <i class="bi bi-cart-dash-fill"></i>`);
            dispatch(getCartItemsData());
            setTimeout(() => {
              $('#imPortantLayer').addClass('d-none');
            }, 1500);
            console.log(myCartItems);
            if(myCartItems.length === 1 || !myCartItems.length){
              navigate('/home')
            }
            toaster.push(<Message closable showIcon type='info'>product has been removed from cart successfully !</Message> , {placement:'bottomCenter' , duration:'1500'});
        
        } catch (error) {
          $('#imPortantLayer').addClass('d-none');
          $(`#removeBtn${id}`).html(`Remove Product <i class="bi bi-cart-dash-fill"></i>`);
          toaster.push(<Message closable showIcon type='error'>faild in removing product</Message> , {placement:'bottomCenter' , duration:'1500'});
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
          localStorage.removeItem('cartId');
          dispatch(getCartItemsData());
          toaster.push(<Message showIcon closable type='info'>Your cart is empty now </Message> , {placement:'bottomCenter' , duration:'5000'});
        }
      } catch (error) {
        console.log(error);
      }
    }
  

    useEffect(() => {
      dispatch(getCartItemsData());
    },[]);



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
                    $(`#PaymentMethodsLayer${localStorage.getItem('cartId')}`).css('display' , 'flex');
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
      <PaymentMethods productId={localStorage.getItem('cartId')}/>
    </>
  );
}

