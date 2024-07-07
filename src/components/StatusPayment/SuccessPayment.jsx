import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import success_Payment from '../../assets/success_payment.svg';
import lastTransaction from '../../assets/last_Transaction.svg';
import { Placeholder } from "rsuite";
export default function StatusPayment() {
    const [paymentStatus, setpaymentStatus] = useState(null);
    const {ordertoken} = useParams();
    const navigate = useNavigate();
    const successPayment = async () => {
        try {
            const { data } = await axios.patch(`${process.env.REACT_APP_APIBASEURL}/order/successorder?token=${ordertoken}`);
            console.log(data);
            if(data.message === 'confirmed'){
                setpaymentStatus(true);
            }
            setTimeout(()=>{
                navigate('/profile/orders');
            },8000);
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
        {paymentStatus === true && <div className="d-flex justify-content-center align-items-center py-5 my-5 flex-wrap">
               <div className="w-100">
                    <img src={success_Payment} alt="success payment" className="w-70 m-auto mb-3" />
               </div>
               <div className="redirecting">redirecting ....</div>

        </div>}

        {paymentStatus === false && <div className="d-flex justify-content-center align-items-center py-5 my-5 flex-wrap">
                <img src={lastTransaction} alt="success payment" className="w-70" />
        </div>}

        {paymentStatus === null && <div className="d-flex justify-content-center align-items-center py-5 my-5 flex-wrap">
                <div className="w-100 d-flex justify-content-center align-items-center">
                    <Placeholder.Graph active height={300} width={300} className="rounded-4 shadow-lg">
                        <div className="p-3">
                            <Placeholder.Paragraph active color="black"/>
                            <Placeholder.Paragraph active color="black"/>
                            <Placeholder.Paragraph active color="black"/>
                            <Placeholder.Paragraph active color="black"/>
                        </div>
                    </Placeholder.Graph>
                </div>
        </div>}
  </>
}
