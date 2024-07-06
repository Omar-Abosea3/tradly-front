import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Login from './components/login/Login';
import SignUp from './components/SignUp/SignUp';
import jwtDecode from 'jwt-decode';
import { useEffect, useMemo, useState} from 'react';
import BrandProducts from './components/Specefic-Products/BrandProducts';
import ProductDetailes from './components/ProductDetailes/ProductDetailes';
import Payment from './components/Payment/Payment';
import MyOrders from './components/getOrders/MyOrders';
import $ from 'jquery';
import Public from './components/Public/Public';
import WishlistProducts from './components/WishlistProducts/WishlistProducts';
import CategoryProducts from './components/Specefic-Products/CategoryProducts';
import SubCategoryProducts from './components/Specefic-Products/SubCategoryProducts';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyUser from './components/ForgetPassword/VerifyUser';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Profile from './components/Profile/Profile';
import { Online , Offline } from 'react-detect-offline';
import Cookies from 'js-cookies';
import StatusPayment from './components/StatusPayment/SuccessPayment';
import CancelPayment from './components/StatusPayment/CancelPayment';
import { useTranslation } from 'react-i18next';
import ProfileData from './components/Profile/ProfileData/ProfileData';
import { useDispatch } from 'react-redux';
import { getCartItemsData } from './Store/getLoggedCartItemsSlice';

import { getFavBrandData } from './Store/brandSlice';
import { getFavProductsData } from './Store/getLoggedUserWishlist';
import axios from 'axios';


export default function App() {
  const [curUser, setcurUser] = useState(null);
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const setDirection = (direction) => {
    document.documentElement.dir = direction;
  };
  const changeLanguage = () => {
    if(i18n.language === 'ar'){
      i18n.changeLanguage('en');
      setDirection('ltr');
      localStorage.setItem('pageDir' , 'ltr');
    }else{
      i18n.changeLanguage('ar');
      setDirection('rtl');
      localStorage.setItem('pageDir' , 'rtl');
    }
  };
  function getUserData(){
    const userData = jwtDecode(Cookies.getItem('token'));
    setcurUser(userData);
  }
  
  async function clearUserData(){
    try {
      const {data} = await axios(`${process.env.REACT_APP_APIBASEURL}/user/logout` , {
        headers:{
          bearertoken : Cookies.getItem('token')
        }
      });
      Cookies.removeItem('token');
      localStorage.removeItem('userData');
      setcurUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    if (Cookies.getItem("token") != null && curUser == null) {
      getUserData();
    }
  }, []);
  const globalMemo = useMemo(()=>{
    dispatch(getCartItemsData());
    dispatch(getFavProductsData());
    dispatch(getFavBrandData());
  },[curUser])
  useEffect(() => {
    document.body.className = i18n.language;
  },[i18n.language])
  function ProtectedRoutes({children}){

    if(Cookies.getItem("token") == null){
      setTimeout(() => {
        $(".notLogin").slideDown(500, function () {
          setTimeout(() => {
            $(".notLogin").slideUp(500);
          }, 2000);
        });
      }, 500)
      return (
        <>
          <Navigate to="/login" />
        </>
      ); 
    }else{
      return <>
        {children}
      </>;
    }
  }

  function ProtectedRoutes2({children}){


    if(localStorage.getItem('tkn1') != null){
      return <>
        <Navigate to='/'/>
      </> 
    }else{
      return <>
        {children}
      </>;
    }

  }


  const router = createHashRouter([
    {path:'',element:<Layout  changeLanguage={changeLanguage} setDirection={setDirection} curUser={curUser} clearUserData={clearUserData} />,children:[
      {path:'',element:<Public/>},
      {path:'/:id',element:<CategoryProducts/>},
      {path:'home',element:<Home />},
      {path:'brands',element:<Brands/>},
      {path:'subcategories/:id',element:<SubCategoryProducts/>},
      {path:'wishlist' , element:<ProtectedRoutes><WishlistProducts/></ProtectedRoutes>},
      {path:'profile' , element:<ProtectedRoutes><Profile clearUserData={clearUserData} changeLanguage={changeLanguage}/></ProtectedRoutes> , children:[
        {path:'',element:<ProfileData/>},
      ]},
      {path:'brands/:id',element:<BrandProducts/>},
      {path:'product-detailes/:id',element:<ProductDetailes/>},
      {path:'cart',element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:'payment',element:<ProtectedRoutes><Payment/></ProtectedRoutes>},
      {path:'allorders',element:<ProtectedRoutes><MyOrders curUser={curUser} /></ProtectedRoutes>},
      {path:'login',element:<ProtectedRoutes2><Login getUserData={getUserData}/></ProtectedRoutes2>},
      {path:'signup',element:<ProtectedRoutes2><SignUp/></ProtectedRoutes2>},
      {path:'forgetpassword',element:<ProtectedRoutes2><ForgetPassword/></ProtectedRoutes2>},
      {path:'forgetpassword/verifycode',element:<ProtectedRoutes2><VerifyUser/></ProtectedRoutes2>},
      {path:'resetpassword',element:<ProtectedRoutes2><ResetPassword/></ProtectedRoutes2>},
      {path:'payment-success/:ordertoken',element:<StatusPayment/>}, 
      {path:'payment-cancel/:ordertoken',element:<CancelPayment/>}, 
      
      {path:'*',element:<div className='vh-100 d-flex py-5 my-5 justify-content-center align-items-center text-black'><img className='w-75' src={require('./assets/error 404.jpg')} alt='error'/>  </div>},
    ]}
  ])

  return <>
      <Online>
        <div>
          <RouterProvider router={router} />
        </div>
      </Online>

      <Offline>
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <figure className='w-50 text-center'>
               <img className='w-25 mb-3' src={require('./assets/Network-error.png')} alt='offline' loading='lazy'/>
               <h3>your network is not stable</h3>
            </figure>  
        </div>
      </Offline>
      
  </>
}


