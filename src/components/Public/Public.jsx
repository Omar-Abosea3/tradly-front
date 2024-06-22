import axios from 'axios';
import React, { useMemo, useState } from 'react';
import LodingScrean from '../loadingScreen/LodingScrean';
import './style.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import { Helmet } from 'react-helmet';
import ProductCard from '../ProductCard/ProductCard';
import BrandCard from '../Brands/BrandCard/BrandCard';
import { useTranslation } from 'react-i18next';
export default function Public() {
    const [allCategories, setallCategories] = useState(null);
    const [allProducts, setallProducts] = useState(null);
    const [allBrands, setallBrands] = useState(null);
    const [favBrand, setfavBrand] = useState(null);
    const [favIds, setfavIds] = useState([]);
    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);
    const myfavBrands = useSelector((state) => state.favBrands.favBrands);
    const dispatch = useDispatch();
    const {t} = useTranslation();
       
        console.log(localStorage.getItem('pageDir'));
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows : false,
        cssEase: 'ease',
        useCSS:true,
        pauseOnHover: true,
        rtl: localStorage.getItem('pageDir') === 'rtl' ?true:false,
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
        slidesToShow: allCategories?.length<5?3:5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows : true,
        rtl: localStorage.getItem('pageDir') === 'rtl' ?true:false,
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
        fade:localStorage.getItem('pageDir') === 'rtl' ?false:true,
        autoplaySpeed: 4000,
        arrows : false,
        rtl: localStorage.getItem('pageDir') === 'rtl' ?true:false,
        cssEase: 'ease',
        useCSS:true,
        pauseOnHover: true,
    };
    const brandSetting = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows : false,
        rtl: localStorage.getItem('pageDir') === 'rtl' ?true:false,
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
    const memo2 = useMemo(() => {
        const brandIds=[];
        if(myfavBrands != null){
            myfavBrands.map((brand) => brandIds.push(brand._id));
            setfavBrand(brandIds);
        }else{
            setfavBrand(brandIds);
        }
    },[myfavBrands])
    const memo3 = useMemo(()=>{
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
        <Helmet>
            <title>Puplic</title>
        </Helmet>
      <div className="my-5 publicPage">
          {!allCategories || !allProducts  || !allBrands? <LodingScrean /> : <div className='container-fluied px-3 my-5 py-5'>
              <div className="row mt-3 mb-4">
                <Slider {...settings2}>
                    {allProducts.map((pro, index) => pro.priceAfterDiscount !== pro.price? 
                        <div key={index} className="product position-relative overflow-hidden">
                                <figure style={{height:'80vh'}} className='overflow-hidden position-relative mb-0'>
                                    <img className='w-100 proImg' src={pro.images[0].secure_url} alt={pro.title} />
                                    <figcaption className='py-2 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center align-content-center px-5 flex-wrap bg-black bg-opacity-25'>
                                        <h2 className='ProTitle fs-1 w-100 text-truncate'>This is {pro.title}</h2>
                                        <p className='w-100 text-white fs-5'>{t('public.pastProductPrice')}<span className='text-decoration-line-through text-danger'>{pro.price}</span> {t('public.newProductPrice')}<span className='text-warning'>{pro.priceAfterDiscount}</span></p>
                                        <div className='w-100'><Link to={`/product-detailes/${pro._id}`} className='text-decoration-none'><button className='btn btn-outline-light' title='detailes'> {t('public.seaProductDetailes')} <i className='fa fa-arrow-right'></i></button></Link></div>
                                    </figcaption>
                                </figure>
                        </div>
                    : '')}
                </Slider>
              </div>
              
              <div className='row px-3 gx-1 gy-1'>
                  <h3 className='mb-3 titleFontSize'><i className="bi bi-collection"></i> {t('public.allCategories')}</h3>
                  <Slider {...categorySetting}>
                      {allCategories.map((item) => <div key={item._id} className='col-lg-3 col-md-4 col-6'>
                          <Link to={`/${item._id}`} className='text-decoration-none link-light'>
                              <figure style={{ height: '300px' }} className='position-relative mb-0 overflow-hidden'>
                                  <img style={{objectFit:'contain'}} src={item.image.secure_url} alt={item.name} className='w-100 h-100' />
                                  <figcaption className='bg-dark bg-opacity-25 text-light position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
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
                    <h3 className='titleFontSize'><i className="bi bi-star"></i> {t('public.PopularProducts')}</h3>
                    
                </div>
                <Slider {...settings}>
                    {allProducts.map((pro, index) => pro.rate >= 4 ? <div id='homeTop' key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3 px-2">
                        <ProductCard pro={pro} favIds={favIds?favIds:[]}/>
                    </div> : '')}
                </Slider>
              </div>

              <div className='row px-3 gx-1 gy-1'>
                <div className='text-dark mb-3 d-flex justify-content-between align-items-center'>
                        <h3 className='titleFontSize'><i className="bi text-center w-100 bi-shop-window position-relative"></i>  {t('public.Stores')}</h3>
                        <Link to={'/brands'} className='text-decoration-none link-light'><button style={{backgroundColor:'#40C9B4'}} className='btn'>{t('public.seeAll')} <i className={localStorage.getItem('pageDir') === 'rtl'?'bi bi-arrow-left':'bi bi-arrow-right'}></i></button></Link>
                    </div>
                  <Slider {...brandSetting}>
                      {allBrands.map((item) => <div key={item._id} className='col-lg-3 col-md-4 col-6 px-2'>
                          <BrandCard brand={item} favBrand={favBrand} home={true}/>
                      </div>
                      )}
                  </Slider>
              </div>
          </div>
          }
      </div>
  </>
}
