import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function CancelPayment() {
    const [paymentStatus, setpaymentStatus] = useState(null);
    const {ordertoken} = useParams();

    const successPayment = async () => {
        try {
            const { data } = await axios.patch(`${process.env.REACT_APP_APIBASEURL}/order/cancelorder?token=${ordertoken}`);
            console.log(data);
            if(data.message === 'canceled'){
                setpaymentStatus(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        successPayment();
    },[])
  return <>
        {paymentStatus === true && <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-success w-75"> فشلت عملية الدفع</div>
        </div>}

        {paymentStatus === null && <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-primary w-75">جاري تحميل الصفحة</div>
        </div>}
  </>
}
