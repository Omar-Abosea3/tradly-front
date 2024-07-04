import axios from 'axios';
import Cookies from 'js-cookies';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Message, toaster } from 'rsuite';
import './style.css';
import LoadingImageAndTextAPI from '../Home/LoadingImageAndTextAPI';
export default function PaymentMethods() {
    const [payMethod, setpayMethod] = useState('cash');
    const navigate = useNavigate();
    const changePaymentMethod = (method) => {
        setpayMethod(method)
    };

    const payNow = async () => {
        document.getElementById('imageAndTextDetectionLoader').classList.remove('d-none');
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
            document.getElementById('imageAndTextDetectionLoader').classList.add('d-none');
            console.log(data);
            window.open(data.checkOutLink)
            navigate('/');
        } catch (error) {
            document.getElementById('imageAndTextDetectionLoader').classList.add('d-none');
            console.log(error);
            toaster.push(<Message closable showIcon type='error'>order not completed try again</Message> , {placement:'topCenter' , duration:'5000'})
        }
    }
  return (
    <>
    <LoadingImageAndTextAPI/>
      <div id="PaymentMethodsLayer">
        <div id="PaymentForm">
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
                <button onClick={payNow} className='btn proBtn w-100'><i className="bi bi-cash-coin"></i> Puy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
