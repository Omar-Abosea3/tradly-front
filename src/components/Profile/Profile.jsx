import React, { useLayoutEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg';
import LodingScrean from '../loadingScreen/LodingScrean';
import { useFormik } from 'formik';
import $ from 'jquery';
import axios from 'axios';
import { Helmet } from 'react-helmet';
export default function Profile({clearUserData}) {
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
  </>
}
