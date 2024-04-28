import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookies';
export default function Login({ getUserData }) {
  const navigate = useNavigate();

  function afterLogin() {
    getUserData();
    navigate('/');
  }
  const loginUser = {
    "email": "",
    "password": "",
  }

  function loadingImog() {
    $('.loginBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
  }

  async function sendNewUser(nUser) {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/auth/signin`, nUser);
      if (data.message === 'success') {
        console.log(data);
        localStorage.setItem('userData' , JSON.stringify({email:data.user.email , name:data.user.name , role:data.user.role}));
        Cookies.setItem('token', data.bearerToken);
        setTimeout(() => {
          $('.loginBtn').html('Login');
          afterLogin();
        }, 2000);
      }

    } catch (error) {
      console.log(error);
      $('.loginBtn').html('Login');
      $('.errMsg').fadeIn(500, function () {
        setTimeout(() => {
          $('.errMsg').fadeOut(500);
        }, 2000);
      })
    }
  }
  const myFormik = useFormik({
    initialValues: loginUser,

    onSubmit: function (values) {
      console.log(values);
      sendNewUser(values);
    },
    validate: function (values) {
      let errors = {};
      if (values.email.includes('@') == false || values.email.includes('.com') == false) {
        errors.email = 'email not valid';
      }
      if (!values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/)) {
        errors.password = 'password must be more than 8 and less than 20 and include one uppercase charachter and one lowercase charachter at least and digit and special charachter';
      }
      return errors;
    }
  })

  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className="container py-5 my-5 d-flex justify-content-center align-items-center">
      <div className="signUpForm bg-light w-75 producInWideScreen mt-5 p-5 shadow-lg">
        <div className="w-100 mb-3 text-center">
          <img className='w-50' src={require('../../assets/omx-ecommerce-low-resolution-logo-color-on-transparent-background.png')} alt="Our Logo" />
        </div>
        <form className='px-1 col-12 ' onSubmit={myFormik.handleSubmit}>
          <div style={{ display: 'none' }} className="errMsg mb-3 text-center alert alert-danger py-1">Email or Password is not correct.</div>
          <div className="w-100">
          <label className='mb-2' htmlFor="email">email</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='email' placeholder='Email' value={myFormik.values.email} className='form-control mb-3' type="email" />
          {myFormik.errors.email && myFormik.touched.email ? <div className="alert py-1 alert-warning">{myFormik.errors.email}</div> : ''}

          <label className='mb-2' htmlFor="password">password</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='password' placeholder='Password' value={myFormik.values.password} className='form-control mb-3' type="password" />
          {myFormik.errors.password && myFormik.touched.password ? <div className="alert py-1 alert-warning">{myFormik.errors.password}</div> : ''}
          </div>

          <button onClick={loadingImog} type='submit' className='btn loginBtn w-100 mt-4'>Login</button>
          <hr/>
          <h6 className='text-center'>Not a member yet? <Link className="text-decoration-none" to={"/signup"}>Create Account</Link></h6>
          <h6 className='text-center'>or rou are? <Link className="text-decoration-none" to={"/forgetpassword"}>forget password</Link></h6>
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

