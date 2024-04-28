import axios from 'axios';
import React from 'react';
import $ from 'jquery';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export default function VerifyUser() {
    const navigate = useNavigate();
    let user = {
        resetCode:'',
    }
    function loadingImog() {
        $('#verifyBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
    }
    async function verifyEmail(userData){
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , userData);

            console.log(data);
            $('.sucMsg').fadeIn(500,function(){
                setTimeout(() => {
                    $('.sucMsg').fadeOut(500,function(){
                        $('#verifyBtn').html('Verify');
                        navigate('/resetpassword');
                    });
                }, 2000);
            })
        } catch (error) {
            console.log(error);
            $('#verifyBtn').html('Verify');
            if(error.response){
                $('.errMsg').html(error.response.data.message).fadeIn(500,function(){
                    setTimeout(() => {
                        $('.errMsg').fadeOut(500);
                    }, 2000);
                })
            }else{
                $('.errMsg').fadeIn(500,function(){
                    setTimeout(() => {
                        $('.errMsg').fadeOut(500);
                    }, 2000);
                })
            }
        }
    }

    let myFormik = useFormik({
        initialValues: user,
        onSubmit: function(values){
          console.log(values);
          verifyEmail(values);
      },
        validate: function (values) {
          let errors = {};
          if (values.resetCode.length > 8) {
            errors.resetCode = 'verifyResetCode length must be less than 8';
          }
          return errors;
        }
      })
  return <>
  <Helmet>
    <title>Verify User</title>
  </Helmet>
  <div className="container my-5 py-5 d-flex justify-content-center align-items-center">
    <div className='w-75 producInWideScreen p-5 signUpForm bg-light shadow-lg'>
    <div className="w-100 mb-3 text-center">
        <img className='w-50' src={require('../../assets/omx-ecommerce-low-resolution-logo-color-on-transparent-background.png')} alt="Our Logo" />
      </div>
      <form onSubmit={myFormik.handleSubmit} className='col-12' >
        <div style={{ display: 'none' }} className="sucMsg text-center alert alert-success py-1">virification success</div>
        <div style={{ display: 'none' }} className="errMsg text-center alert alert-danger py-1">Network Error!</div>
        <label htmlFor="resetCode" className='mb-2'>Reset Code</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='resetCode' placeholder='Verify Code' value={myFormik.values.resetCode} className='form-control mb-3' type="text" />
        {myFormik.errors.resetCode && myFormik.touched.resetCode ? <div className="alert py-1 alert-warning">{myFormik.errors.resetCode}</div> : ''}
        <button id='verifyBtn' onClick={loadingImog} type='submit' className='btn w-100'>Verify</button>
        <hr/>
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
