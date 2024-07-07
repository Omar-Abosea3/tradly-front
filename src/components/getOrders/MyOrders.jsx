import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LodingScrean from './../loadingScreen/LodingScrean';
import $ from 'jquery';
import emptyOrder from '../../assets/EmptyPtoducts.svg';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookies';
import OrderCard from './OrderCard/OrderCard';

export default function MyOrders({curUser}) {

    const [MyOrders, setMyOrders] = useState(null);
    async function getMyOrders(){
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_APIBASEURL}/order` , {
              headers:{
                bearertoken : Cookies.getItem('token'),
              }
            });
            console.log(data);
            setMyOrders(data.orders);
          } catch (error) {
            setMyOrders('empty');
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
    {MyOrders == null ? <LodingScrean /> : MyOrders === 'empty' ? <div className="vh-100 d-flex flex-wrap text-center justify-content-center align-content-center"><img width={'50%'} src={emptyOrder} alt="Empty Order" /></div> : <div className='px-2 py-3'> 
    <div id='orderContainer' className="container-lg container-fluid ">
      <div className="row">
        {MyOrders.map((order, index) => <div key={index} className="col-12">
          <OrderCard order={order}/>
        </div>)}
      </div>
    </div>
      </div>}
  </>
}
