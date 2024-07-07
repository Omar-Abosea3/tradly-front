import { Helmet } from "react-helmet";
import LodingScrean from "../loadingScreen/LodingScrean";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandCard from "../Brands/BrandCard/BrandCard";
import { getFavBrandData } from "../../Store/brandSlice";
import emptyWishlist from '../../assets/emptyWishlist.svg'
import $ from 'jquery';
export default function FavStors() {
    const [favBrand, setfavBrand] = useState(null);
    const myfavBrands = useSelector((state) => state.favBrands.favBrands);
    const dispatch = useDispatch();
    const memo2 = useMemo(() => {
        const brandIds=[];
        if(myfavBrands != null){
            myfavBrands.map((brand) => brandIds.push(brand._id));
            setfavBrand(brandIds);
        }else{
            setfavBrand(brandIds);
        }
    },[myfavBrands]);
    const memo = useMemo(() => {
        if(!myfavBrands){
            dispatch(getFavBrandData());
            $('#emptyBrandWishlist').html(`<div class="emptyWishlist pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Cart" /></div>`).addClass('vh-100'); 
        }
    },[myfavBrands])
  return <>
         <Helmet>
            <title>Wishlist</title>
        </Helmet>
        <div id='emptyBrandWishlist' className='d-flex flex-wrap justify-content-center align-items-center'>
        {!myfavBrands?<LodingScrean/>:<div className="container-fluid ">
                <div className="row mt-3 justify-content-center gy-4">
                    <h2><i className="bi bi-heart-fill text-danger fs-1"></i> Fav-Stores</h2>
                    <div style={{ display: 'none', zIndex: '9999', bottom:'2%' }} className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
                    {myfavBrands.map((brand, index) =><div id={`wishPro${brand.id}`} key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3">
                        <BrandCard brand={brand} page={'wishlist'} favBrand={favBrand}/>
                    </div>)}
                </div>
            </div>}
        </div>
  </>
}
