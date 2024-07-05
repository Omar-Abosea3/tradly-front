import './style.css';
import { Helmet } from 'react-helmet';
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
          <div className='container-fluied  px-3 mb-5 pb-5'>
              
              <ProductsOffersSection/>
              
              <CategoriesSection/>

              <PopularProductSection/>
             

              <BrandsSection/>
          </div>
      </div>
  </>
}
