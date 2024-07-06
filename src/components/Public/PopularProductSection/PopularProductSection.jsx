import React, { useEffect, useMemo, useState } from 'react'
import { getFavProductsData } from '../../../Store/getLoggedUserWishlist';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProductCard from '../../ProductCard/ProductCard';
import { Placeholder } from 'rsuite';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

export default function PopularProductSection() {
    const [allProducts, setallProducts] = useState(null);
    const [favIds, setfavIds] = useState([]);
    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const allProductsArr = [1 , 2 , 3 , 4 , 5];
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
    async function getAllProducts(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/products`);
            dispatch(getFavProductsData());
            setallProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllProducts();
    },[]);
    const checkFavProducts = useMemo(()=>{
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
    },[wishlistProducts]);
  return (
    <>
      <div className='row gx-2  px-lg-3 px-md-1 px-0 my-5 gy-2'>
      <div className='text-dark mb-3 d-flex justify-content-between align-items-center'>
                    <h3 className='titleFontSize'><i className="bi bi-star"></i> {t('public.PopularProducts')}</h3>
                    
                </div>
                {!allProducts?<Slider {...settings}>
        {allProductsArr.map((item , index) =><div
            id="homeTop"
            key={index}
            className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3 px-2"
          >
            <Placeholder.Graph active height={400} className="rounded-4" width={'100%'} >
              <Placeholder.Graph className="rounded-4" active height={'40%'} width={'100%'} />
              <div className="p-1">
                <Placeholder.Paragraph active color="black"/>
                <Placeholder.Paragraph active color="black"/>
                <Placeholder.Paragraph active color="black"/>
                <Placeholder.Paragraph active color="black"/>
              </div>
            </Placeholder.Graph>
          </div> )}
      </Slider>:<Slider {...settings}>
            {allProducts.map((pro, index) =>
        pro.rate >= 4 ? (
          <div
            id="homeTop"
            key={index}
            className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3 px-2"
          >
            <ProductCard pro={pro} favIds={favIds ? favIds : []} />
          </div>
        ) : (
          ""
        )
      )}
        </Slider>}
      </div>
    </>
  );
}
