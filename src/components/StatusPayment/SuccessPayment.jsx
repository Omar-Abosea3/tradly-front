import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import success_Payment from '../../assets/success_payment.svg';
import lastTransaction from '../../assets/last_Transaction.svg';
import { Placeholder } from "rsuite";
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
                <img src={success_Payment} alt="success payment" className="w-70 mb-3" />
                <h3 className="fw-medium text-black">Completed Successfully !</h3>

        </div>}

        {paymentStatus === false && <div className="d-flex justify-content-center align-items-center vh-100">
                <img src={lastTransaction} alt="success payment" className="w-70 mb-3" />
                <h3 className="fw-medium text-warning">This Transaction Already ended !</h3>
        </div>}

        {paymentStatus === null && <div className="d-flex justify-content-center align-items-center vh-100">
                <Placeholder.Graph active height={300} width={300} className="rounded-4 shadow-lg">
                    <div className="p-3">
                        <Placeholder.Paragraph active color="black"/>
                        <Placeholder.Paragraph active color="black"/>
                        <Placeholder.Paragraph active color="black"/>
                        <Placeholder.Paragraph active color="black"/>
                    </div>
                </Placeholder.Graph>
        </div>}
  </>
}
