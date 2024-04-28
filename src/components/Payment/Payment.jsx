import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import LodingScrean from '../loadingScreen/LodingScrean';
import { Helmet } from 'react-helmet';


export default function Payment() {

  const myCartItems = useSelector(function (store) {
    return store.getCartItemSlice.CartProducts;
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderInfo = {
    shippingAddress: {
      details: $('#details').val(),
      phone: $('#phone').val(),
      city: $('#city').val()
    }
  }

  const cartId = localStorage.getItem('cartId');


  async function puyProducts(info) {
    $('.infoBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, { info }, {
        headers: {
          "token": localStorage.getItem('tkn1'),
        },
        params: {
          "url": 'https://omar-abosea3.github.io/omx-e-commerce#',
        }
      });
      console.log(data);
      if (data.status == 'success') {
        window.open(data.session.url);

        console.log(data);
        setTimeout(() => {
          $('.infoBtn').html('Confirm Payment <i class="bi bi-credit-card-fill"></i>');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      console.log(cartId);
      $('.infoBtn').html('Confirm Payment <i class="bi bi-credit-card-fill"></i>');
      $('.errMsg').fadeIn(500, function () {
        setTimeout(() => {
          $('.errMsg').fadeOut(500);
        }, 2000);
      })
    }
  }

  async function puyProductsCash(info) {
    $('.infoBtn2').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { info }, {
        headers: {
          "token": localStorage.getItem('tkn1'),
        },
      });
      if (data.status == 'success') {
        navigate('/allorders');
        console.log(data);
        setTimeout(() => {
          $('.infoBtn2').html('Order now  <i class="bi bi-bag-check"></i>');
        }, 2000);
      }

    } catch (error) {
      console.log(error);
      $('.infoBtn2').html('Order now  <i class="bi bi-bag-check"></i>');
      $('.errMsg').fadeIn(500, function () {
        setTimeout(() => {
          $('.errMsg').fadeOut(500);
        }, 2000);
      })
    }
  }

  async function checkData() {

    if ((/^\D+$/).test(orderInfo.shippingAddress.details) != true && (/^01[0125][0-9]{8}$/).test(orderInfo.shippingAddress.phone) != true && (/^\D+$/).test(orderInfo.shippingAddress.city) != true) {
      $('.errMsg').fadeIn(1000, function () {
        $('.infoBtn').html('Confirm Payment <i class="bi bi-credit-card-fill"></i>');
        setTimeout(() => {
          $('.errMsg').fadeOut(500);
        }, 2000);
      })
    } else {
      $('.infoBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
      dispatch(getCartItemsData());
      await puyProducts(orderInfo);
    }
  }

  async function checkData2() {
    if ((/^\D+$/).test(orderInfo.shippingAddress.details) != true && (/^01[0125][0-9]{8}$/).test(orderInfo.shippingAddress.phone) != true && (/^\D+$/).test(orderInfo.shippingAddress.city) != true) {
      $('.errMsg').fadeIn(1000, function () {
        $('.infoBtn2').html('Order now  <i class="bi bi-bag-check"></i>');
        setTimeout(() => {
          $('.errMsg').fadeOut(500);
        }, 2000);
      })
    } else {
      $('.infoBtn2').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
      dispatch(getCartItemsData());
      await puyProductsCash(orderInfo);
    }
  }
  const memo = useMemo(function () {
    if(!myCartItems){
      dispatch(getCartItemsData());
    }
  }, [myCartItems])

  return <>
    <Helmet>
      <title>Payment</title>
    </Helmet>

    {cartId != 0 ? <div className="w-100 d-flex py-5 my-5 justify-content-center align-items-center">
      <div className="signUpForm producInWideScreen bg-light w-75 mt-5 p-5 shadow-lg">
        <div className="w-100 mb-3 text-center">
          <img className='w-50' src={require('../../assets/omx-ecommerce-low-resolution-logo-color-on-transparent-background.png')} alt="Our Logo" />
        </div>
        <form className='px-1 col-12 '>
          <div style={{ display: 'none' }} className="errMsg mb-3 text-center alert alert-danger py-1">Plese Check your order !</div>


          <label htmlFor="details">details</label>
          <input id='details' placeholder='details' className='form-control mb-3' type="details" />

          <label htmlFor="phone">phone</label>
          <input id='phone' className='form-control mb-3' placeholder='phone' type="text" />

          <label htmlFor="city">city</label>
          <input id='city' placeholder='city' className='form-control mb-3' type="text" />

          <div className="d-flex flex-wrap mt-4 justify-content-center">
            <div className='col-lg-6 col-md-6 col-sm-12 mb-2 col-12 px-1'><button onClick={function () { checkData2() }} type='button' className='btn infoBtn2 w-100 btn-secondary'>Order now <i className="bi bi-bag-check"></i></button></div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12 px-1'><button onClick={function () { checkData() }} type='button' className='btn infoBtn w-100 btn-dark'>Confirm Payment <i className="bi bi-credit-card-fill"></i></button></div>
          </div>
        </form>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="MyIcons">
            <i className='fa-brands fa-facebook-f'></i>
          </div>
          <div className="MyIcons">
            <i className='fa-brands fa-instagram'></i>
          </div>
          <div className="MyIcons">
            <i className='fa-brands fa-paypal'></i>
          </div>
          <div className="MyIcons">
            <i className='fa fa-vcard'></i>
          </div>
        </div>
      </div>
    </div> : <LodingScrean />}

  </>
}
