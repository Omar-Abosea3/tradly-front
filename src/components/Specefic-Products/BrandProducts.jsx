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
import ProductCard from '../ProductCard/ProductCard';

export default function BrandProducts() {

    const {id} = useParams();
    const [SpecBrand, setSpecBrand] = useState(null);
    const [PageTitle, setPageTitle] = useState('Brand');
    const [favIds, setfavIds] = useState([]);
    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);
    const dispatch = useDispatch();

    async function getOneBrand(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/brands/brand/${id}`);
            console.log(data);
            setPageTitle(data.brand.slug);
            setSpecBrand(data.brand.Products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        getOneBrand();
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
            <title>BrandProducts</title>
        </Helmet>
        {SpecBrand == null ? <LodingScrean /> : SpecBrand.length != 0 ? <div className="w-100 px-3 mt-5">
        <div style={{ display: 'none', zIndex: '9999' , bottom:'2%' }} className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
            <div className="row gy-4">
                {SpecBrand.map((pro, index) => <div id='homeTop' key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3">
                        <ProductCard
                            pro={pro}
                            favIds={favIds}
                        />
                    </div>)}
            </div>
        </div> : <div className="vh-100 d-flex flex-wrap pt-5 text-center justify-content-center align-content-center"><img className='w-25' src={emptyOrder} alt="Empty Order" /> <h2 className='w-100'>This Brand Is Empty !</h2></div>}

    </>
}
