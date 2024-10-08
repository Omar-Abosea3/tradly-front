import React, { useLayoutEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg';
import LodingScrean from '../loadingScreen/LodingScrean';
import { useFormik } from 'formik';
import $ from 'jquery';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import ProfileAsideNav from './ProfileAsideNav/ProfileAsideNav';
import './style.css';
import { Outlet } from 'react-router-dom';
export default function Profile({clearUserData , changeLanguage}) {
    const [userData, setuserData] = useState(null);

    useLayoutEffect(() => {
        if(!userData){
            setuserData(JSON.parse(localStorage.getItem('userData')));
        }
    },[])
  return <>
      <Helmet>
          <title>Profile</title>
      </Helmet>
        <div className="row gx-0">
            <div className="col-lg-1 col-md-1 col-12">
                <ProfileAsideNav changeLanguage={changeLanguage} clearUserData={clearUserData}/>
            </div>
            <div className="col-lg-11 col-md-11 col-12">
                <div id='profileContentBox' className='px-2'>
                    <Outlet/>
                </div>
            </div>
        </div>

  </>
}
