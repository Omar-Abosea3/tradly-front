import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import StaticAuthComponent from '../../../StaticAuthComponent/StaticAuthComponent';
import { Message, toaster } from 'rsuite';
export default function ConfirmEmail() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const user = {
      OTP: '',
      id:localStorage.getItem('userId')
    };
  
    const generateMyEmail = async (nUser) => {
      setLoading(true);
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/auth/confirmemail`, nUser);
        setLoading(false);
        toaster.push(<Message closable showIcon type='success'>success</Message> , {placement:'topCenter' , duration:'3000'});

        setTimeout(() => {
          navigate('/login');
        }, 2000);
        console.log(data);
      } catch (error) {
        toaster.push(<Message closable showIcon type='error'>{error.response.data.message}</Message> , {placement:'topCenter' , duration:'3000'});
        console.log(error);
        setLoading(false);
      }
    };
  
    const myFormik = useFormik({
      initialValues: user,
      onSubmit: (values) => {
        console.log(values);
        generateMyEmail(values);
      },
      validate: (values) => {
        const errors = {};
        if (!values.OTP) {
          errors.OTP = 'OTP is required';
        }
        return errors;
      },
    });
  
    return (
      <>
        <Helmet>
          <title>Confirm Email</title>
        </Helmet>
        <div className='formContainer p-3 bg-white'>
          <div className="row">
            <div className='col-lg-6 col-md-6 col-12 d-flex align-items-center vh-100'>
              <form className='px-3 col-12 ' onSubmit={myFormik.handleSubmit}>
                <div className="w-100 mb-3 d-flex justify-content-center">
                  <div id='circularLogo'>T</div>
                </div>
  
                <label className='mb-2' htmlFor="generateOTP">OTP</label>
                <input
                  onBlur={myFormik.handleBlur}
                  onChange={myFormik.handleChange}
                  id='generateOTP'
                  name='OTP'
                  placeholder='OTP'
                  value={myFormik.values.OTP}
                  className='form-control mb-3'
                  type="OTP"
                />
                {myFormik.errors.OTP && myFormik.touched.OTP ? (
                  <div className="alert py-1 alert-warning">{myFormik.errors.OTP}</div>
                ) : null}
  
                <button id='subBtn' type='submit' className='btn loginBtn w-100'>
                  {loading ? <i className='fa fa-spinner fa-spin text-white'></i> : 'Submit'}
                </button>
                <hr />
                <h6 className='text-center'>
                  If you already have an account!{' '}
                  <Link className="text-decoration-none text-success" to="/login">
                    Login
                  </Link>
                </h6>
                <h6 className='text-center'>
                  Go To{' '}
                  <Link className="text-decoration-none text-success" to="/">
                    Home
                  </Link>
                </h6>
  
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
              </form>
            </div>
  
            <div className="col-6 d-lg-block d-md-block d-sm-none d-none">
              <StaticAuthComponent />
            </div>
          </div>
        </div>
      </>
    );
}
