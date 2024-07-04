

export default function CartItemCard({product , index , checkQuantity2 , checkQuantity , removeFromCart}) {
  return <>
  {console.log(product)}
    <section key={index}><div className="container-fluid bg-white rounded-5 shadow-lg cart-products">
              <figure className="row shadow-lg gy-3">
                <div  className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center align-items-center px-3 ">
                    <img className='proImg' width={100} src={product.product.images[0].secure_url} alt={product.product.title} />
                </div>
                <figcaption className='col-lg-8 col-md-8 col-sm-12 d-flex ps-3 pb-3 w-75 align-content-start flex-wrap'>
                  <div className='w-100'><img width={100} src={product.product.brandId?.logo.secure_url} alt={product.product.brandId?.name} /></div>
                  <h3 className='w-100 mb-3 ProTitle'>{product.product.title}</h3>
                  <h3 className='w-100 mb-3'>Count: <button onClick={function () { checkQuantity2(product.product._id, 1, product) }} className='proBtn3'><i className="bi bi-dash-circle-fill"></i></button> <span className='fw-light'>{product.quantity}</span> <button onClick={function () { checkQuantity(product.product._id,1, product) }} className='proBtn3'><i className="bi bi-plus-circle-fill"></i></button> <i id={`loadingIcon${product.product._id}`} style={{ display: 'none' }} className='fa fa-spinner fa-spin'></i> </h3>
                  <h3 className='w-100 mb-3'>Price-Per-One: <span className='fw-light'>{product.product.price}</span></h3>
                  <h3 className='w-100 mb-3'>Total-Price: <span className='fw-light'>{product.totalProductPrice}</span></h3>
                  <h3 style={{ display: 'none' }} className='quantityNotEnough w-100 text-danger'>This Is All Quantity For This !</h3>
                  <button id={`removeBtn${product.product._id}`} onClick={function () { removeFromCart(product.product._id) }} className='btn cartRemoveBtn'>Remove Product <i className="bi bi-cart-dash-fill"></i></button>
                </figcaption>
              </figure>
            </div><hr /></section>
  </>
}
