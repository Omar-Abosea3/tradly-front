import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import LodingScrean from '../loadingScreen/LodingScrean';
import AddToWishlistBtn from '../Buttons/AddToWishlistBtn';
import { Link, useNavigate } from 'react-router-dom';
import emptyWishlist from '../../assets/emptyWishlist.png'
import { addToCartFunction } from '../../glopalFunctions/addToCartFun';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import $ from 'jquery';
import { Helmet } from 'react-helmet';

export default function WishlistProducts() {
    const wishListProducts = useSelector((store)=>store.getFavProductsSlice.wishlistProducts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function addingToCart(id){
        if(!localStorage.getItem('tkn1')){
            navigate('/login');
        }else{
            await addToCartFunction(id);
            dispatch(getCartItemsData());
        }
    } 
    const memo = useMemo(() => {
        if(!wishListProducts){
            dispatch(getFavProductsData());
            $('#emptyWishlist').html(`<div class="emptyWishlist pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Cart" /></div>`).addClass('vh-100'); 
        }
    },[wishListProducts])
  return <>
        <Helmet>
            <title>Wishlist</title>
        </Helmet>
        <div id='emptyWishlist' className='d-flex flex-wrap justify-content-center align-items-center'>
        {!wishListProducts?<LodingScrean/>:<div className="container-fluid my-5 py-5">
                <div className="row mt-3 justify-content-center gy-4">
                    <h2><i className="bi bi-heart-fill text-danger fs-1"></i> WishList Products</h2>
                    <div style={{ display: 'none', zIndex: '9999', bottom:'2%' }} className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
                    {wishListProducts.map((pro, index) =><div id={`wishPro${pro.id}`} key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3">
                        <div className="product position-relative overflow-hidden">
                            <Link to={`/product-detailes/${pro.id}`} className='text-decoration-none shadow-lg text-white'>
                                <figure className='overflow-hidden'><img className='w-100 proImg' src={pro.imageCover} alt={pro.title} /></figure>
                                <figcaption className='ps-2 py-2'>
                                    <img width={'80px'} className='mb-2' src={pro.brand?.image} alt={pro.brand?.image} />
                                    <h2 className='ProTitle'>{pro.title.slice(0, pro.title.indexOf(' ', 10))}</h2>
                                    <h4>{pro.subcategory[0].name}</h4>
                                    <h4><i className="bi bi-star-fill text-warning"></i> {pro.ratingsAverage}</h4>
                                    {pro.priceAfterDiscount ? <h6 style={{ fontSize: '1rem', marginBottom: '10px' }}>price: <span className='text-decoration-line-through text-danger'>{pro.price}</span> {pro.priceAfterDiscount} </h6> : <h6 style={{ fontSize: '1rem', marginBottom: '10px' }}>price:{pro.price}</h6>}
                                    <button className='detBtn btn' title='detailes'> View Detailes <i className='fa fa-arrow-right'></i></button>
                                </figcaption>
                            </Link>
                            <AddToWishlistBtn id={pro.id} classes={'bi text-danger bi-heart-fill fs-4 px-2'} removeKey={'remoKey'}/>
                            <button onClick={function () { addingToCart(pro.id) }} id={`addBtn${pro.id}`} title='Add To Cart' className='proBtn w-100 rounded-bottom-2'><i className='fa fa-cart-plus'></i></button>
                            {pro.priceAfterDiscount ? <div className='position-absolute sale me-3 text-center' >Sale</div> : ''}
                        </div>
                    </div>)}
                </div>
            </div>}
        </div>
  </>
}
