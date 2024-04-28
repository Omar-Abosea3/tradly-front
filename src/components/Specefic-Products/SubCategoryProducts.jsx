import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import LodingScrean from '../loadingScreen/LodingScrean';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import emptyOrder from '../../assets/EmptyPtoducts.png';
import { Helmet } from 'react-helmet';
import { addToCartFunction } from '../../glopalFunctions/addToCartFun';
import AddToWishlistBtn from '../Buttons/AddToWishlistBtn';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import Slider from 'react-slick';

export default function SubCategoryProducts() {

    const {id} = useParams();
    const [SubCategories, setSubCategories] = useState(null);
    const [PageTitle, setPageTitle] = useState('SubCategory');
    const [favIds, setfavIds] = useState([]);
    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows : true,
        cssEase: 'ease',
        useCSS:true,
        pauseOnHover: true,
        responsive:[{
 
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              infinite: true
            }
       
          }, {
       
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              infinite: true
            }
       
          }],
    };

    async function addingToCart(id){
        if(!localStorage.getItem('tkn1')){
            navigate('/login');
        }else{
            await addToCartFunction(id);
            dispatch(getCartItemsData());
        }
    } 
    async function getOneSubCategory(){
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
            console.log(data);
            setPageTitle(data.data.slug);
        } catch (error) {
            console.log(error);
        }
    }
    async function getSpecSubCategory(){
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`,{
                params:{
                   "subcategory[in]":id,
                }
            });
            dispatch(getFavProductsData());
            console.log(data);
            getOneSubCategory()
            setSubCategories(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        getSpecSubCategory();
    },[]);

    const memo = useMemo(()=>{
        const wishProductIds = [];
        if(!wishlistProducts){
            dispatch(getFavProductsData());
            setfavIds(wishProductIds);
        }else{
            wishlistProducts.map(pro => wishProductIds.push(pro.id));
            if(wishProductIds.length != 0){
                setfavIds(wishProductIds);
            }
        }
    },[wishlistProducts])
    return <>
        <Helmet>
            <title>{PageTitle}</title>
        </Helmet>
        {SubCategories == null? <LodingScrean /> : SubCategories.length != 0? <div className="container-fluid d-flex justify-content-center py-5">
            <div style={{ display: 'none', zIndex: '9999' , bottom:'2%' }} className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
            <div className="row py-5 mt-5 gy-4">
                {SubCategories.map((pro, index) => <div id='homeTop' key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3">
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
                            {favIds.includes(pro.id)?<AddToWishlistBtn id={pro.id} classes={'bi text-danger bi-heart-fill fs-4 px-2'}/>:<AddToWishlistBtn id={pro.id} classes={'bi bi-heart fs-4 px-2'}/>}
                            <button onClick={function () { addingToCart(pro.id) }} id={`addBtn${pro.id}`} title='Add To Cart' className='proBtn w-100 rounded-bottom-2'><i className='fa fa-cart-plus'></i></button>
                            {pro.priceAfterDiscount ? <div className='position-absolute sale me-3 text-center' >Sale</div> : ''}
                        </div>
                    </div>)}
            </div>
        </div> : <div className="vh-100 d-flex flex-wrap pt-5 text-center justify-content-center align-content-center"><img className='w-25' src={emptyOrder} alt="Empty Order" /> <h2 className='w-100'>This Category Is Empty !</h2></div>}

    </>
}