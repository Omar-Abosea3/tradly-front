import axios from 'axios';
import React, { useMemo, useState } from 'react';
import LodingScrean from '../loadingScreen/LodingScrean';
import './style.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import AddToWishlistBtn from '../Buttons/AddToWishlistBtn';
import { useDispatch, useSelector } from 'react-redux';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import { Helmet } from 'react-helmet';

export default function Public() {
    const [allCategories, setallCategories] = useState(null);
    const [allProducts, setallProducts] = useState(null);
    const [allBrands, setallBrands] = useState(null);
    const [favIds, setfavIds] = useState([]);
    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);
    const dispatch = useDispatch();
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
    const categorySetting = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
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
    const settings2 = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows : false,
        cssEase: 'ease',
        useCSS:true,
        pauseOnHover: true,
    };
    async function getAllCategories(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/categories`);
            console.log(data);
            getAllProducts();
            getSomeBrands();
            setallCategories(data.categories);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllProducts(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/products`);
            console.log(data);
            dispatch(getFavProductsData());
            setallProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    }

    async function getSomeBrands(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/brands` , {
                params:{
                    limit:10,
                }
            });
            console.log(data);
            setallBrands(data.brands);
        } catch (error) {
            console.log(error);
        }
    }

    const memo = useMemo(()=>{
        if(!allCategories){
            getAllCategories();
        }
    },[allCategories])

    const memo2 = useMemo(()=>{
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
            <title>Puplic</title>
        </Helmet>
      <div className="my-5 publicPage">
          {!allCategories || !allProducts  || !allBrands? <LodingScrean /> : <div className='container-fluied px-3 my-5 py-5'>
              <div className="row mt-3">
                <Slider {...settings2}>
                    {allProducts.map((pro, index) => pro.appliedDiscount !== 0 ? 
                        <div key={index} className="product position-relative overflow-hidden">
                                <figure style={{height:'80vh'}} className='overflow-hidden position-relative'>
                                    <img className='w-100 proImg' src={pro.images[0].secure_url} alt={pro.title} />
                                    <figcaption className='py-2 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center align-content-center px-5 flex-wrap bg-black bg-opacity-75'>
                                        <h2 className='ProTitle fs-1 w-100'>This is {pro.title.slice(0, pro.title.indexOf(' ', 10))}</h2>
                                        <p className='w-100 text-white'>This Product is on sale and it’s price was <span className='text-decoration-line-through text-danger'>{pro.price}</span> but after discount became <span className='text-success'>{pro.priceAfterDiscount}</span></p>
                                        <div className='w-100'><Link to={`/product-detailes/${pro._id}`} className='text-decoration-none'><button className='btn btn-outline-light' title='detailes'> View more about this product <i className='fa fa-arrow-right'></i></button></Link></div>
                                    </figcaption>
                                </figure>
                        </div>
                    : '')}
                </Slider>
              </div>
              
              <div className='row px-3 gx-1 gy-1'>
                  <h3 className='mb-3 titleFontSize'><i className="bi bi-collection"></i> All Categories</h3>
                  <Slider {...categorySetting}>
                      {allCategories.map((item) => <div key={item._id} className='col-lg-3 col-md-4 col-6'>
                          <Link to={`/${item._id}`} className='text-decoration-none link-light'>
                              <figure style={{ height: '300px' }} className='position-relative mb-0 overflow-hidden'>
                                  <img src={item.image.secure_url} alt={item.name} className='w-100' />
                                  <figcaption className='bg-dark bg-opacity-75 text-light position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                                      <h3>{item.slug}</h3>
                                  </figcaption>
                              </figure>
                          </Link>
                      </div>
                      )}
                  </Slider>
              </div>

              <div className="row gx-2 px-5 my-5 gy-2">
                <div className='text-dark mb-3 d-flex justify-content-between align-items-center'>
                    <h3 className='titleFontSize'><i className="bi bi-star"></i> Popular Products</h3>
                    <Link to={'/home'} className='text-decoration-none link-light'><button style={{backgroundColor:'#40C9B4'}} className='btn'>See All <i className='bi bi-arrow-right'></i></button></Link>
                </div>
                <Slider {...settings}>
                    {allProducts.map((pro, index) => pro.rate >= 4 ? <div id='homeTop' key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3 px-2">
                        <div className="product position-relative overflow-hidden">
                            <Link to={`/product-detailes/${pro._id}`} className='text-decoration-none shadow-lg text-white'>
                                <figure className='overflow-hidden'><img className='w-100 proImg' src={pro.images[0].secure_url} alt={pro.title} /></figure>
                                <figcaption className='ps-2 py-2'>
                                    <img width={'80px'} className='mb-2' src={pro.brandId?.logo.secure_url} alt={pro.brandId?.name} />
                                    <h2 className='ProTitle'>{pro.title.slice(0, pro.title.indexOf(' ', 10))}</h2>
                                    <h4>{pro.subCategoryId.name}</h4>
                                    <h4><i className="bi bi-star-fill text-warning"></i> {pro.rate?pro.rate : 4.5}</h4>
                                    {pro.appliedDiscount ? <h6 style={{ fontSize: '1rem', marginBottom: '10px' }}>price: <span className='text-decoration-line-through text-danger'>{pro.price}</span> {pro.priceAfterDiscount} </h6> : <h6 style={{ fontSize: '1rem', marginBottom: '10px' }}>price:{pro.price}</h6>}
                                    <button className='detBtn btn' title='detailes'> View Detailes <i className='fa fa-arrow-right'></i></button>
                                </figcaption>
                            </Link>
                            {favIds.includes(pro._id)?<AddToWishlistBtn id={pro._id} classes={'bi text-danger bi-heart-fill fs-4 px-2'}/>:<AddToWishlistBtn id={pro._id} classes={'bi bi-heart fs-4 px-2'}/>}
                            {pro.appliedDiscount ? <div className='position-absolute sale me-3 text-center' >Sale</div> : ''}
                        </div>
                    </div> : '')}
                </Slider>
              </div>

              <div className='row px-3 gx-1 gy-1'>
                <div className='text-dark mb-3 d-flex justify-content-between align-items-center'>
                        <h3 className='titleFontSize'><i className="bi text-center w-100 bi-shop-window position-relative"></i>  Brands</h3>
                        <Link to={'/brands'} className='text-decoration-none link-light'><button style={{backgroundColor:'#40C9B4'}} className='btn'>See All <i className='bi bi-arrow-right'></i></button></Link>
                    </div>
                  <Slider {...settings}>
                      {allBrands.map((item) => <div key={item._id} className='col-lg-3 col-md-4 col-6'>
                          <Link to={`/brands/${item._id}`} className='text-decoration-none link-light'>
                              <figure  style={{ height: '300px' }} className='position-relative mb-0 overflow-hidden'>
                                  <img src={item.logo.secure_url} alt={item.name} className='w-100 brandImg' />
                              </figure>
                          </Link>
                      </div>
                      )}
                  </Slider>
              </div>
          </div>
          }
      </div>
  </>
}
