import axios from 'axios';
import Cookies from 'js-cookies';
import { useState } from 'react'
import { Message, toaster } from 'rsuite';
import './style.css';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import { useDispatch } from 'react-redux';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
export default function PaymentMethods({page , productId}) {
    const [payMethod, setpayMethod] = useState('cash');
    const changePaymentMethod = (method) => {
        setpayMethod(method)
    };
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const payNow = async () => {
        const cartId = localStorage.getItem('cartId');
        const orderData = {
            "address":document.getElementById('address').value,
            "phoneNumbers":[
                document.getElementById('phoneNumber1').value,
                document.getElementById('phoneNumber2').value
            ],
            "paymentMethod":payMethod,
            "city":document.getElementById('city').value,
            "state":document.getElementById('State').value
        }
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_APIBASEURL}/order/orderallcartproducts/${cartId}` , orderData , {
                headers:{
                    bearertoken:Cookies.getItem('token')
                }
            });
            console.log(data);
            dispatch(getCartItemsData());
            if(data.checkOutLink){
              window.open(data.checkOutLink , '_self');
            }else{
              navigate('/profile/orders');
            }
            
        } catch (error) {
            console.log(error);
            toaster.push(<Message closable showIcon type='error'>order not completed try again</Message> , {placement:'topCenter' , duration:'5000'});
        }
    }

    const orderProduct = async (id) => {
      const orderData = {
        "address":document.getElementById('address').value,
        "phoneNumbers":[
            document.getElementById('phoneNumber1').value,
            document.getElementById('phoneNumber2').value
        ],
        "paymentMethod":payMethod,
        "city":document.getElementById('city').value,
        "state":document.getElementById('State').value
      }
      try {
        const {data} = await axios.post(`${process.env.REACT_APP_APIBASEURL}/order${id}` , orderData , {
          headers:{
            bearertoken:Cookies.getItem('token')
          }
        });
        if(data.checkOutLink){
          window.open(data.checkOutLink , '_self');
        }
        console.log(data);
      } catch (error) {
        console.log(error);
        toaster.push(<Message closable showIcon type='error'>order not completed try again</Message> , {placement:'topCenter' , duration:'5000'});
      }
    }
    const handlePay = async () => {
      document.getElementById('payBtn').innerHTML = '<i class="fa-solid fa-beat fa-ellipsis"></i>';
      if(!page){
        await payNow();
      }else{
        await orderProduct(productId);
      }
      document.getElementById('payBtn').innerHTML = '<i className="bi bi-cash-coin"></i> Puy Now';
    }
    const closeLayer = () => {
      $(`#PaymentMethodsLayer${productId}`).fadeOut(500);
    }
  return (
    <>
      <div id={`PaymentMethodsLayer${productId}`}  className="PaymentMethodsLayer">
        <div className='position-relative PaymentForm'>
          <div className='position-absolute top-0 end-0 p-3'>
            <i style={{cursor:'pointer'}} onClick={closeLayer} className='bi bi-x fs-3'></i>
          </div>
          <figure className="mb-3 text-center">
            <img
              className="w-50"
              src={require("../../assets/logo192.png")}
              alt="logo"
            />
          </figure>
          <div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="name@example.com"
              />
              <label htmlFor="address"><i className="bi bi-geo-alt-fill"></i> Your Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="phoneNumber1"
                placeholder="Password"
              />
              <label htmlFor="phoneNumber1"><i classNames="bi bi-phone"></i> Phone Number1</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="phoneNumber2"
                placeholder="Password"
              />
              <label htmlFor="phoneNumber2"><i classNames="bi bi-phone"></i> Phone Number2</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="State"
                placeholder="Password"
              />
              <label htmlFor="State"><i class="bi bi-buildings"></i> State</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Password"
              />
              <label htmlFor="city"><i class="bi bi-building"></i> city</label>
            </div>
            <div className="d-flex align-items-center mb-3">
                <div className='d-flex me-3'>
                    <input type="radio" onClick={() => {changePaymentMethod('cash')}} className='me-1' name='paymentMethod' id='cash' value={'cash'} checked />
                    <label htmlFor="cash">Cash</label>
                </div>
                <div className='d-flex'>
                    <input type="radio" onClick={() => {changePaymentMethod('card')}} className='me-1' name='paymentMethod' id='card' value={'card'}/>
                    <label htmlFor="card">Card</label>
                </div>
            </div>

            <div>
                <button id='payBtn' onClick={handlePay} className='btn proBtn w-100'><i className="bi bi-cash-coin"></i> Puy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
