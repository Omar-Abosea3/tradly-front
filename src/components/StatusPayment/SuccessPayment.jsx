import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StatusPayment() {
    const [paymentStatus, setpaymentStatus] = useState(null);
    const {ordertoken} = useParams();

    const successPayment = async () => {
        try {
            const { data } = await axios.patch(`${process.env.REACT_APP_APIBASEURL}/order/successorder?token=${ordertoken}`);
            if(data.message === 'confirmed'){
                setpaymentStatus(true);
            }else{
                setpaymentStatus(false);
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
                <div className="alert alert-success w-75"> تمت عملية الدفع بنجاح</div>
        </div>}

        {paymentStatus === false && <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-danger w-75"> فشلت عملية الدفع</div>
        </div>}

        {paymentStatus === null && <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-primary w-75">جاري تحميل الصفحة</div>
        </div>}
  </>
}
