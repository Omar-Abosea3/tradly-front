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
import { Placeholder } from 'rsuite';
import CategoriesSection from './CategoriesSection/CategoriesSection';
import PopularProductSection from './PopularProductSection/PopularProductSection';
import BrandsSection from './BrandsSection/BrandsSection';
import ProductsOffersSection from './ProductsOffersSection/ProductsOffersSection';
export default function Public() {
   
   
  return <>
        <Helmet>
            <title>Puplic</title>
        </Helmet>
      <div className="mb-5 publicPage">
          <div className='container-fluied px-3 mb-5 pb-5'>
              
              <ProductsOffersSection/>
              
              <CategoriesSection/>

              <PopularProductSection/>
             

              <BrandsSection/>
          </div>
      </div>
  </>
}
