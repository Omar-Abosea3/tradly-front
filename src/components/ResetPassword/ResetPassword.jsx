import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import StaticAuthComponent from '../StaticAuthComponent/StaticAuthComponent';
import { Message, toaster } from 'rsuite';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = {
    password: '',
    repassword: '',
    OTP:localStorage.getItem('OTP')
  };

  const resetPassword = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem('userId');
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/auth/forgetpassword/${userId}`, values);
      setLoading(false);
      console.log(data); // Assuming data contains success information
      toaster.push(<Message closable showIcon type='success'>success !</Message> , {placement:'topCenter' , duration:'3000'});
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toaster.push(<Message closable showIcon type='error'>{error.response.data.message}</Message> , {placement:'topCenter' , duration:'3000'});
      console.log(error);
      setLoading(false);
    }
  };

  const myFormik = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      resetPassword(values);
    },
    validate: (values) => {
      const errors = {};
      if (values.password.length < 3 || values.password.length > 15) {
        errors.password = 'Password must be between 3 and 15 characters.';
      }
      if (values.password !== values.repassword) {
        errors.repassword = 'Passwords do not match.';
      }
      return errors;
    },
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className='formContainer p-3 bg-white'>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-12 d-flex align-items-center vh-100'>
            <form className='px-3 col-12 ' onSubmit={myFormik.handleSubmit}>
              <div className='w-100 mb-3 d-flex justify-content-center'>
                <div id='circularLogo'>T</div>
              </div>
              <label className='mb-2' htmlFor='resetpassword'>
                New Password
              </label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                id='resetpassword'
                name='password'
                placeholder='New Password'
                value={myFormik.values.password}
                className='form-control mb-3'
                type='password'
              />
              {myFormik.errors.password && myFormik.touched.password && (
                <div className='alert py-1 alert-warning'>{myFormik.errors.password}</div>
              )}

              <label className='mb-2' htmlFor='resetrepassword'>
                Re-enter Password
              </label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                id='resetrepassword'
                name='repassword'
                placeholder='Re-enter Password'
                value={myFormik.values.repassword}
                className='form-control mb-3'
                type='password'
              />
              {myFormik.errors.repassword && myFormik.touched.repassword && (
                <div className='alert py-1 alert-warning'>{myFormik.errors.repassword}</div>
              )}

              <button id='subBtn' type='submit' className='btn loginBtn w-100'>
                {loading ? <i className='fa fa-spinner fa-spin text-white'></i> : 'Submit'}
              </button>
              <hr />
              <h6 className='text-center'>
                If you already have an account!{' '}
                <Link className='text-decoration-none text-success' to='/login'>
                  Login
                </Link>
              </h6>
              <h6 className='text-center'>
                Go To{' '}
                <Link className='text-decoration-none text-success' to='/'>
                  Home
                </Link>
              </h6>

              <div className='col-12 d-flex justify-content-center align-items-center'>
                <div className='MyIcons'>
                  <i className='fa-brands fa-facebook-f'></i>
                </div>
                <div className='MyIcons'>
                  <i className='fa-brands fa-instagram'></i>
                </div>
                <div className='MyIcons'>
                  <i className='fa-brands fa-paypal'></i>
                </div>
                <div className='MyIcons'>
                  <i className='fa fa-vcard'></i>
                </div>
              </div>
            </form>
          </div>

          <div className='col-6 d-lg-block d-md-block d-sm-none d-none'>
            <StaticAuthComponent />
          </div>
        </div>
      </div>
    </>
  );
}
