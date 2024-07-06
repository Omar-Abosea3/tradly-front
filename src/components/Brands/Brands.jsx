import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import LodingScrean from '../loadingScreen/LodingScrean';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import { Helmet } from 'react-helmet';
import BrandCard from './BrandCard/BrandCard';

export default function Brands() {
  const [favBrand, setfavBrand] = useState(null);
  const myfavBrands = useSelector((state) => state.favBrands.favBrands);
  // https://route-ecommerce.onrender.com/api/v1/brands
  const [Brand, setBrand] = useState(null);
  async function getBrand() {
    try {
      let { data } = await axios.get(`${process.env.REACT_APP_APIBASEURL}/brands`);
      setBrand(data.brands);;
    } catch (error) {
      console.log(error);
    }
  }
  const dispatch = useDispatch();
  useEffect(function () {
    getBrand();
    dispatch(getCartItemsData());
  }, [])
  
  const memo2 = useMemo(() => {
    const brandIds=[];
    if(myfavBrands != null){
        myfavBrands.map((brand) => brandIds.push(brand._id));
        setfavBrand(brandIds);
    }else{
        setfavBrand(brandIds);
    }
},[myfavBrands])

  return <>
    <Helmet>
        <title>Brands</title>
    </Helmet>
    {Brand == null ? <LodingScrean /> : <div className="container-fluid py-5 my-3">
      {console.log(Brand)}
      <div className="row py-5 gy-3">
        <div className="col-12 col-sm-12 col-md-6 col-lg-3">
          <div className="px-2">
            <h2 className='ProTitle'>Our Brands</h2>
            <p>You can see our brands and each brand include products in it.</p>
          </div>
        </div>
        {Brand.map((brand, index) => <div key={index} className="col-6 col-sm-4 producInWideScreen text-center col-md-3">
          <Link className='text-decoration-none px-2 text-primary' to={`/brands/${brand._id}`}>
            <BrandCard brand={brand} favBrand={favBrand}/>
          </Link>
        </div>)}
      </div>
    </div>}

  </>
}
