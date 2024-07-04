import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import BrandCard from '../../Brands/BrandCard/BrandCard';
import { Placeholder } from 'rsuite';
import { getFavBrandData } from '../../../Store/brandSlice';

export default function BrandsSection() {
    const [allBrands, setallBrands] = useState(null);
    const [favBrand, setfavBrand] = useState(null);
    const myfavBrands = useSelector((state) => state.favBrands.favBrands);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const allBrandsArr = [1 , 2 , 3 , 4 , 5];
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
    async function getSomeBrands(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/brands`);
            dispatch(getFavBrandData());
            setallBrands(data.brands);
            const brandsData = [];
            data.brands.map((item) => {
                brandsData.push({_id:item._id , name:item.name});
            });
            localStorage.setItem('brands' , JSON.stringify(brandsData));
        } catch (error) {
            console.log(error);
        }
    } 
    useEffect(() => {
        getSomeBrands();
    },[])
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
    <div className='row px-3 gx-1 gy-1'>
                <div className='text-dark mb-3 d-flex justify-content-between align-items-center'>
                        <h3 className='titleFontSize'><i className="bi text-center w-100 bi-shop-window position-relative"></i>  {t('public.Stores')}</h3>
                        <Link to={'/brands'} className='text-decoration-none link-light'><button style={{backgroundColor:'#40C9B4'}} className='btn'>{t('public.seeAll')} <i className={localStorage.getItem('pageDir') === 'rtl'?'bi bi-arrow-left':'bi bi-arrow-right'}></i></button></Link>
                    </div>
                  <Slider {...brandSetting}>
                      {!allBrands?allBrandsArr.map((item) => <div key={item._id} className='col-lg-3 col-md-4 col-6 px-2'>
                          <Placeholder.Graph  active height={250} className='rounded-3'>
                            <div className='p-3 text-center'>
                                <Placeholder.Graph  active height={30} width={30} style={{borderRadius:'50%'}} className='m-auto' />
                                <Placeholder.Paragraph  active  className='m-auto' />
                            </div>
                          </Placeholder.Graph>
                      </div>):allBrands.map((item) => <div key={item._id} className='col-lg-3 col-md-4 col-6 px-2'>
                          <BrandCard brand={item} favBrand={favBrand} home={true}/>
                      </div>
                      )}
                  </Slider>
              </div>
  </>
}
