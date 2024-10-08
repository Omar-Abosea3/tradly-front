import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LodingScrean from '../loadingScreen/LodingScrean';
import Slider from "react-slick";

import $ from 'jquery';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { addToCartFunction } from '../../glopalFunctions/addToCartFun';
import AddToWishlistBtn from '../Buttons/AddToWishlistBtn';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';

export default function ProductDetailes() {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Specproduct, setSpecProduct] = useState(null);
    const [favIds, setfavIds] = useState([]);
    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows : false,
      };

    async function addingToCart(id){
        if(!localStorage.getItem('tkn1')){
            navigate('/login');
        }else{
            await addToCartFunction(id);
            dispatch(getCartItemsData());
        }
    } 
   
    async function getSpecProduct(){
        try {
            let {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/products/product/${id}`);
            dispatch(getFavProductsData());
            setSpecProduct(data.product);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

   useEffect(()=> {
    getSpecProduct();
   },[])

    const memo2 = useMemo(()=>{
        const wishProductIds = [];
        if(!wishlistProducts){
            dispatch(getFavProductsData());
            setfavIds(wishProductIds);
        }else{
            wishlistProducts.map(pro => wishProductIds.push(pro.id));
            if(wishProductIds.length !== 0){
                setfavIds(wishProductIds);
            }
        }
    },[wishlistProducts])

    return <>
        {Specproduct == null ? <LodingScrean /> : <>
            <Helmet>
                <title>{Specproduct.slug}</title>
            </Helmet>
            <div className="container productFontSize2">
                <div className="row mt-4 justify-content-center align-items-start gy-5">
                    <div style={{ display: 'none', zIndex: '9999' , bottom:'2%' }} className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                        <Slider className='p-2 '  {...settings}>
                            {Specproduct.images.map((photo, index) => <div key={index} style={{height:'300px'}} className='rounded-2 overflow-hidden'>
                                <img className='w-100 ' src={photo.secure_url} alt={Specproduct.slug} style={{objectFit:'contain'}} />
                            </div>)}
                        </Slider>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <h2 className='ProTitle' >{Specproduct.title}</h2>
                        <p className='fs-3 fw-light'>"{Specproduct.desc}"</p>

                        <div className='d-flex justify-content-between align-items-start'>
                            <div className='w-75'>
                                <h3 className='mb-4'>Brand: <span className='fw-light'>{Specproduct.brandId?.name}</span></h3>
                                <h3 className='mb-4'>category: <span className='fw-light'>{Specproduct.categoryId?.name}</span></h3>
                                <h3 className='mb-4'>Rate: <span className='fw-light'>{Specproduct.rate}</span> </h3>
                                {/* <h3 className='mb-4'>Sold: <span className='fw-light'>{Specproduct.stok}</span> </h3> */}
                                <h3 className='mb-4'>Available-Quantity: <span className='fw-light'>{Specproduct.stok}</span> </h3>
                                {Specproduct.appliedDiscount ? <h3 className='mb-4'>price: <span className='fw-light text-decoration-line-through text-danger'>{Specproduct.price}</span>  <span className='fw-light'>{Specproduct.priceAfterDiscount}</span> </h3> : <h3 className='mb-4'>price: <span className='fw-light'>{Specproduct.price}</span> </h3>}
                                {favIds.includes(Specproduct._id)?<AddToWishlistBtn id={Specproduct._id} classes={'bi text-danger bi-heart-fill fs-4 px-2'}/>:<AddToWishlistBtn id={Specproduct._id} classes={'bi bi-heart fs-4 px-2'}/>}
                            </div>

                        </div>
                    </div>
                    <div className="px-2"><button onClick={function () { addingToCart(Specproduct._id) }} id={`addBtn1${Specproduct._id}`} className='btn proBtn2 col-12'>Add To Cart <i className="bi bi-bag-plus-fill"></i></button></div>
                </div>
            </div>
        </>}
    </>
}
