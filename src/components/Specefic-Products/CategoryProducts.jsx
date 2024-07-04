import axios from 'axios';
import React, { useEffect , useMemo, useState } from 'react'
import { Link , useParams } from 'react-router-dom';
import LodingScrean from '../loadingScreen/LodingScrean';
import emptyOrder from '../../assets/EmptyPtoducts.png';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import { Placeholder } from 'rsuite';
import ProductCardLoading from '../ProductCard/ProductCardLoading/ProductCardLoading';

export default function CategoryProducts() {
    const {id} = useParams();
    const [SpecCategory, setSpecCategory] = useState(null);
    const [SubCategories, setSubCategories] = useState(null);
    const [PageTitle, setPageTitle] = useState('Category');
    const [favIds, setfavIds] = useState([]);
    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);
    const dispatch = useDispatch();
    const supCatArr = [1 , 2 , 3 , 4 , 5];
    const settings = {
        dots: true,
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

    
    async function getSpecCategory(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/categories/category/${id}`);
            setPageTitle(data.category.slug);
            setSpecCategory(data.category.Products);
            setSubCategories(data.category.subCategories);
        } catch (error) {
            console.log(error);
            setSpecCategory([]);
            setSubCategories([]);
        }
    }
    useEffect(function(){
        getSpecCategory();
    },[]);
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
            <title>{PageTitle}</title>
        </Helmet>
         
                <div className='w-100 px-5 mt-5 pt-5'>
                    <div className='text-dark w-100 mb-3 mt-5 d-flex justify-content-between align-items-center'>
                        <h3 className='mb-3 titleFontSize'><i className="bi bi-collection"></i> All SubCategories</h3>
                    </div>
                    <Slider {...settings}>
                        {!SubCategories?supCatArr.map((item , index) => <div key={index} ><Placeholder.Graph active height={350} /></div>):SubCategories.map((item) => <div key={item._id} >
                            <Link to={`/subcategories/${item._id}`} className='text-decoration-none link-light'>
                                <figure style={{ height: '300px' }} className='position-relative mb-0 overflow-hidden'>
                                    <img style={{objectFit:'contain'}} src={item.image.secure_url} alt={item.name} loading='lazy' className='w-100 h-100' />
                                    <figcaption className='bg-dark bg-opacity-25 text-light position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                                        <h3>{item.slug}</h3>
                                    </figcaption>
                                </figure>
                            </Link>
                        </div>
                        )}
                    </Slider>
                </div>
        <div className="container-fluid py-5">
            <div style={{ display: 'none', zIndex: '9999' , bottom:'2%' }} className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
            <div className="row py-5 gy-4">
                <h2 className='titleFontSize'><i className="bi bi-border-all"></i> Category Products.</h2>
                {SpecCategory?SpecCategory.map((pro, index) => <div key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3">
                        <ProductCard pro={pro} favIds={favIds}/>
                </div>):<ProductCardLoading/>}
            </div>
            {SpecCategory?.length === 0 && SubCategories?.length === 0 && <div className="vh-100 d-flex flex-wrap pt-5 text-center justify-content-center align-content-center"><img className='w-25' src={emptyOrder} alt="Empty Order" /> <h2 className='w-100'>This Category Is Empty !</h2></div>}
        </div> 
    </>
}