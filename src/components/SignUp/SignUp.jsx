import {  useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { Helmet } from 'react-helmet';



export default function SignUp() {
  let navigate = useNavigate();

  let user = {
    'name': '',
    'email': '',
    'password': '',
    'rePassword': '',
  }

  function loadingImog() {
    $('#subBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
  }

  async function sendNewUser(nUser){
    try {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, nUser);
        $('.sucMsg').fadeIn(500,function(){
            setTimeout(() => {
                $('.sucMsg').fadeOut(500,function(){
                    $('#subBtn').html('Submit');
                    navigate('/login');
                });
            }, 2000);
        })
    } catch (error) {
        console.log(error);
        $('#subBtn').html('Submit');
        $('.errMsg').fadeIn(500,function(){
            setTimeout(() => {
                $('.errMsg').fadeOut(500);
            }, 2000);
        })
    }
  }
  let myFormik = useFormik({
    initialValues: user,
    onSubmit: function(values){
      console.log(values);
      sendNewUser(values);
  },
    validate: function (values) {
      let errors = {};
      if (values.name.length < 3 || values.name.length > 15) {
        errors.name = 'name must be more than 3 and less than 15';
      }
      if (values.email.includes('@') == false || values.email.includes('.com') == false) {
        errors.email = 'email not valid';
      }
      if(! values.phone.match(/^01[0125][0-9]{8}$/) ){
        errors.phone='phone must be Egyption Number';
      }
      if (values.password.length < 3 || values.password.length > 15) {
        errors.password = 'password must be more than 3 and less than 15';
      }
      if (values.password != values.rePassword) {
        errors.rePassword = 'password and rePassword not matched';
      }
      return errors;
    }
  })
  return <>
    <Helmet>
      <title>SignUp</title>
    </Helmet>
    <div className="container my-5 py-5 d-flex justify-content-center align-items-center">
      <div className='w-75 producInWideScreen p-5 signUpForm bg-light shadow-lg'>
      <div className="w-100 mb-3 text-center">
          <img className='w-50' src={require('../../assets/omx-ecommerce-low-resolution-logo-color-on-transparent-background.png')} alt="Our Logo" />
        </div>
        <form onSubmit={myFormik.handleSubmit} className='col-12' >
          <div style={{ display: 'none' }} className="sucMsg text-center alert alert-success py-1">Success</div>
          <div style={{ display: 'none' }} className="errMsg text-center alert alert-danger py-1">Email already in use</div>
          <label className='mb-2' htmlFor="name">name</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='name' placeholder='Name' value={myFormik.values.name} className='form-control mb-3' type="text" />
          {myFormik.errors.name && myFormik.touched.name ? <div className="alert py-1 alert-warning">{myFormik.errors.name}</div> : ''}
          
          <label className='mb-2' htmlFor="email">email</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='email' placeholder='Email' value={myFormik.values.email} className='form-control mb-3' type="email" />
          {myFormik.errors.email && myFormik.touched.email ? <div className="alert py-1 alert-warning">{myFormik.errors.email}</div> : ''}

          <label className='mb-2' htmlFor="phone">phone</label>
          <input id='phone' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} className='form-control mb-3' placeholder='phone' type="text" />
          {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert py-1 alert-warning">{myFormik.errors.phone}</div> : ''}

          <label className='mb-2' htmlFor="password">password</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='password' placeholder='Password' value={myFormik.values.password} className='form-control mb-3' type="password" />
          {myFormik.errors.password && myFormik.touched.password ? <div className="alert py-1 alert-warning">{myFormik.errors.password}</div> : ''}

          <label htmlFor="rePassword">rePassword</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='rePassword' placeholder='RePassword' value={myFormik.values.rePassword} className='form-control mb-3' type="password" />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert py-1 alert-warning">{myFormik.errors.rePassword}</div> : ''}

          <button id='subBtn' onClick={loadingImog} type='submit' className='btn w-100'>Submit</button>
          <hr/>
          <h6 className='text-center'>If you already have account! <Link className="text-decoration-none" to={"/login"}>Login</Link></h6>
        </form>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="MyIcons">
            <i className='fa-brands fa-facebook-f'></i>
          </div>
          <div className="MyIcons">
            <i className='fa-brands fa-instagram'></i>
          </div>
          <div className="MyIcons">
            <i className='fa-brands fa-paypal'></i>
          </div>
          <div className="MyIcons">
            <i className='fa fa-vcard'></i>
          </div>
        </div>
      </div>
    </div>
  </>
}

