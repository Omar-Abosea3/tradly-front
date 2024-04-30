import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StatusPayment() {
    const [paymentStatus, setpaymentStatus] = useState(null);
    const {ordertoken} = useParams();

    const successPayment = async () => {
        try {
            const { data } = await axios.patch(`${process.env.REACT_APP_APIBASEURL}/order/successorder?token=${ordertoken}`);
            console.log(data);
            if(data.message === 'confirmed'){
                setpaymentStatus(true);
            }
        } catch (error) {
            console.log(error);
            if(error.response.data.message === "invalid orderId"){
                setpaymentStatus(false);
            }else{
                setpaymentStatus(null);
            }
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
                <div className="alert alert-warning w-75"> تم تأكيد هذا الطلب من قبل</div>
        </div>}

        {paymentStatus === null && <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-primary w-75">جاري تحميل الصفحة</div>
        </div>}
  </>
}
