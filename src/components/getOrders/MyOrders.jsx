import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LodingScrean from './../loadingScreen/LodingScrean';
import $ from 'jquery';
import emptyOrder from '../../assets/EmptyPtoducts.png';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import { Helmet } from 'react-helmet';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';

export default function MyOrders({curUser}) {

    const [MyOrders, setMyOrders] = useState(null);
    const dispatch = useDispatch()
    async function getMyOrders(){
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${curUser.id}`);
            dispatch(getFavProductsData());
            dispatch(getCartItemsData());
            setMyOrders(data);
            console.log(data);
           
          } catch (error) {
            console.log(error);
        }
    }


    useEffect(function(){
        getMyOrders();
    },[]);
  return <>
    <Helmet>
      <title>Orders</title>
    </Helmet>
    {MyOrders == null ? <LodingScrean /> : MyOrders.length == 0 ? <div className="vh-100 d-flex flex-wrap pt-5 text-center justify-content-center align-content-center"><img className='w-25' src={emptyOrder} alt="Empty Order" /> <h2 className='w-100'>You Don’t Make Any Order!</h2></div> : <div className="container allOrders my-5 py-5">
      <div className="row gy-5 py-5">
        {MyOrders.map((order, index) => <div key={index} className="col-12 p-0 producInWideScreen2 myOrder bg-light shadow-lg">
          <div className='d-flex justify-content-start align-items-start flex-wrap' >
            {order.cartItems.map((pro, idx) => <div key={idx} className="col-lg-3 col-md-4 col-sm-6 col-6 px-2 ">
              <figure className='bg-light'>
                <img className='w-100' src={pro.product.imageCover} alt={pro.product.title} />
                <figcaption className='p-3 producInWideScreen2'>
                  <h4 className='ProTitle'>{pro.product.title.slice(0, pro.product.title.indexOf(' ', 10))}</h4>
                  <h4>count:{pro.count}</h4>
                  <h4>price:{pro.price * pro.count}</h4>
                </figcaption>
              </figure>
            </div>)}
          </div>
          <div className="w-100 allOrdDetailes producInWideScreen2 text-center d-flex flex-wrap">
            <h3 className='w-100 p-2 rounded-2'>totalOrderPrice: <span>{order.totalOrderPrice}</span></h3>
            <h3 className='p-2  w-100 rounded-2'>paymentMethodType: <span>{order.paymentMethodType}</span></h3>
            <h3 className='p-2 w-100 rounded-2'>Name: <span>{order.user.name}</span></h3>
            <h3 className='p-2 w-100 rounded-2'>Phone: <span>{order.user.phone}</span></h3>
            {order.isPaid == true ? <h3 className=' w-100 p-2 rounded-2'>isPaid: <span style={{ color: 'black' }} >{String(order.isPaid)}</span></h3> : <h3 className='w-100 p-2 rounded-2'>isPaid: <span style={{ color: '#EB6440' }} >{String(order.isPaid)}</span></h3>}
          </div>
        </div>)}
      </div>
    </div>}
  </>
}
