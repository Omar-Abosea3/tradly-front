import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import LodingScrean from '../loadingScreen/LodingScrean';
import emptyOrder from '../../assets/EmptyPtoducts.png';
import { Helmet } from 'react-helmet';
import ProductCard from '../ProductCard/ProductCard';
import { useParams } from 'react-router-dom';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import { useDispatch, useSelector } from 'react-redux';

export default function SubCategoryProducts() {
    const {id} = useParams();
    const [SubCategories, setSubCategories] = useState(null);
    const [PageTitle, setPageTitle] = useState('SubCategory');
    const [favIds, setfavIds] = useState([]);
    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);
    const dispatch = useDispatch();
    async function getOneSubCategory(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/subcategories/subCategory/${id}`);
            console.log(data);
            setPageTitle(data.subCategory.slug);
            setSubCategories(data.subCategory.Products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        getOneSubCategory();
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
        {SubCategories == null? <LodingScrean /> : SubCategories.length !== 0? <div className="container-fluid d-flex justify-content-center py-5">
            <div style={{ display: 'none', zIndex: '9999' , bottom:'2%' }} className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
            <div className="row py-5 mt-5 gy-4">
                {SubCategories.map((pro, index) => <div id='homeTop' key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3">
                        <ProductCard pro={pro} favIds={favIds}/>
                    </div>)}
            </div>
        </div> : <div className="vh-100 d-flex flex-wrap pt-5 text-center justify-content-center align-content-center"><img className='w-25' src={emptyOrder} alt="Empty Order" /> <h2 className='w-100'>This Category Is Empty !</h2></div>}

    </>
}