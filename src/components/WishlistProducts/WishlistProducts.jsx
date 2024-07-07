import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import LodingScrean from '../loadingScreen/LodingScrean';
import { useNavigate } from 'react-router-dom';
import emptyWishlist from '../../assets/emptyWishlist.svg';
import $ from 'jquery';
import { Helmet } from 'react-helmet';
import ProductCard from '../ProductCard/ProductCard';

export default function WishlistProducts() {
    const wishListProducts = useSelector((store)=>store.getFavProductsSlice.wishlistProducts);
    const [favIds, setfavIds] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const memo3 = useMemo(() => {
        if (!wishListProducts) {
          dispatch(getFavProductsData());
          return [];
        }
      
        const wishProductIds = wishListProducts.map(pro => pro.id);
        return wishProductIds;
      }, [wishListProducts]);
      
      useEffect(() => {
        if (memo3.length !== 0) {
          setfavIds(memo3);
        }
      }, [memo3]);
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
        {!wishListProducts?<LodingScrean/>:<div className="container-fluid ">
                <div className="row mt-3 justify-content-center gy-4">
                    <h2><i className="bi bi-heart-fill text-danger fs-1"></i> WishList Products</h2>
                    <div style={{ display: 'none', zIndex: '9999', bottom:'2%' }} className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
                    {wishListProducts.map((pro, index) =><div id={`wishPro${pro.id}`} key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3">
                        <ProductCard pro={pro} page={'wishlist'} favIds={favIds}/>
                    </div>)}
                </div>
            </div>}
        </div>
  </>
}
