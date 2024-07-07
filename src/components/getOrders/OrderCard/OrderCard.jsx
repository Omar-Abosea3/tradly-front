import './style.css';

export default function OrderCard({order}) {
  return <>
        <div className="row orderCard">
            <div className="col-lg-2 col-md-2 col-12 orderProducts row justify-content-center">
                {order.products.map((pro , index) => <div key={index} className="col-lg-12 col-md-12 col-4 mb-3"> 
                    <figure className="mb-0 w-100 text-center">
                        <img src={pro.images[0].secure_url} alt={pro.title} loading="lazy"/>
                        <p>x{pro.quantity}</p>
                        <p>{pro.finalPrice} EGP</p>
                    </figure>
                </div>)}
            </div>
            <div className="col-lg-10 col-md-10 col-12 d-flex align-items-center">
                <div className='orderDetails'>
                    <div className='w-100 d-flex justify-content-between align-items-center mb-3'>
                        <h3>Total Price</h3>
                        <p>{order.paidAmount}</p>
                    </div>
                    <div className='w-100 d-flex justify-content-between align-items-center  mb-3'>
                        <h3>Order Status</h3>
                        <p className={order.orderStatus === 'deliverd' || order.orderStatus === 'confirmed'?'text-success':order.orderStatus === 'rejected' || order.orderStatus === 'rejected'?'text-danger':'text-warning'}>{order.orderStatus}</p>
                    </div>
                    <div className='w-100 d-flex justify-content-between align-items-center  mb-3'>
                        <h3>Payment Method</h3>
                        <p>{order.paymentMethod}</p>
                    </div>
                    <div className='w-100 d-flex justify-content-between align-items-center  mb-3'>
                        <h3>Address</h3>
                        <p>{order.address}</p>
                    </div>
                </div>
            </div>
        </div>
  </>
}