import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import StaticAuthComponent from '../StaticAuthComponent/StaticAuthComponent';

export default function SignUp() {
  let navigate = useNavigate();
  const [Gender, setGender] = useState('male');

  const user = {
    'firstName': '',
    'lastName': '',
    'phone': '',
    'age': 14,
    'email': '',
    'password': '',
    'rePassword': '',
    'gender': Gender
  };

  function loadingImog() {
    $('#subBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
  }

  async function sendNewUser(nUser) {
    loadingImog();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/auth/signup`, nUser);
      $('.sucMsg').fadeIn(500, function () {
        setTimeout(() => {
          $('.sucMsg').fadeOut(500, function () {
            $('#subBtn').html('Submit');
            navigate('/login');
          });
        }, 2000);
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      $('#subBtn').html('Submit');
      $('.errMsg').fadeIn(500, function () {
        setTimeout(() => {
          $('.errMsg').fadeOut(500);
        }, 2000);
      });
    }
  }

  let myFormik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      values.gender = Gender; // Ensure the gender state value is included
      console.log(values);
      sendNewUser(values);
    },
    validate: function (values) {
      let errors = {};
      if (values.firstName.length < 3 || values.firstName.length > 15) {
        errors.firstName = 'firstName must be more than 3 and less than 15';
      }
      if (values.lastName.length < 3 || values.lastName.length > 15) {
        errors.lastName = 'lastName must be more than 3 and less than 15';
      }
      if (values.email.includes('@') === false || values.email.includes('.com') === false) {
        errors.email = 'email not valid';
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = 'phone must be an Egyptian number';
      }
      if (values.password.length < 3 || values.password.length > 15) {
        errors.password = 'password must be more than 3 and less than 15';
      }
      if (values.password !== values.rePassword) {
        errors.rePassword = 'password and rePassword not matched';
      }
      if (values.age < 14 || values.age > 100) {
        errors.age = 'age must be more than 14 and less than 100';
      }
      return errors;
    }
  });

  return <>
    <Helmet>
      <title>SignUp</title>
    </Helmet>
    <div className='formContainer p-3 bg-white'>
      <div className="row">
        <div className='col-lg-6 col-md-6 col-12 d-flex align-items-center '>
          <form className='px-3 col-12 ' onSubmit={myFormik.handleSubmit}>
            <div className="w-100 mb-3 d-flex justify-content-center">
              <div id='circularLogo'>T</div>
            </div>
            <div style={{ display: 'none' }} className="sucMsg text-center alert alert-success py-1">Success</div>
            <div style={{ display: 'none' }} className="errMsg text-center alert alert-danger py-1">Email already in use</div>
            <label className='mb-2' htmlFor="firstName">firstName</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='firstName' placeholder='First Name' value={myFormik.values.firstName} className='form-control mb-3' type="text" />
            {myFormik.errors.firstName && myFormik.touched.firstName ? <div className="alert py-1 alert-warning">{myFormik.errors.firstName}</div> : ''}

            <label className='mb-2' htmlFor="lastName">lastName</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='lastName' placeholder='Last Name' value={myFormik.values.lastName} className='form-control mb-3' type="text" />
            {myFormik.errors.lastName && myFormik.touched.lastName ? <div className="alert py-1 alert-warning">{myFormik.errors.lastName}</div> : ''}

            <label className='mb-2' htmlFor="signupEmail">email</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='signupEmail' placeholder='Email' value={myFormik.values.email} className='form-control mb-3' type="email" />
            {myFormik.errors.email && myFormik.touched.email ? <div className="alert py-1 alert-warning">{myFormik.errors.email}</div> : ''}

            <label className='mb-2' htmlFor="signupPhone">phone</label>
            <input id='signupPhone' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} className='form-control mb-3' placeholder='Phone' type="text" />
            {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert py-1 alert-warning">{myFormik.errors.phone}</div> : ''}

            <label className='mb-2' htmlFor="age">Age</label>
            <input id='age' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.age} className='form-control mb-3' placeholder='Age' type="number" min={14} max={100} />
            {myFormik.errors.age && myFormik.touched.age ? <div className="alert py-1 alert-warning">{myFormik.errors.age}</div> : ''}

            <label className='mb-2' htmlFor="signupPassword">password</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='signupPassword' placeholder='Password' value={myFormik.values.password} className='form-control mb-3' type="password" />
            {myFormik.errors.password && myFormik.touched.password ? <div className="alert py-1 alert-warning">{myFormik.errors.password}</div> : ''}

            <label htmlFor="signUpRePassword">rePassword</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='signUpRePassword' placeholder='RePassword' value={myFormik.values.rePassword} className='form-control mb-3' type="password" />
            {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert py-1 alert-warning">{myFormik.errors.rePassword}</div> : ''}

            <label htmlFor="gender" className='w-100 mb-2'>gender</label>
            <div id='gender' className='d-flex mb-3'>
              <div className='me-3'>
                <input type='radio' id='male' checked={Gender === 'male'} className='me-2' onChange={() => setGender('male')} value={'male'} name='gender' />
                <label htmlFor="male" >Male</label>
              </div>
              <div className='me-3'>
                <input type='radio' id='female' checked={Gender === 'female'} className='me-2' onChange={() => setGender('female')} value={'female'} name='gender' />
                <label htmlFor="female" >Female</label>
              </div>
            </div>

            <button id='subBtn' type='submit' className='btn loginBtn w-100'>Submit</button>
            <hr />
            <h6 className='text-center'>If you already have an account! <Link className="text-decoration-none text-success" to={"/login"}>Login</Link></h6>
            <h6 className='text-center'>Go To <Link className="text-decoration-none text-success" to={"/"}>Home</Link></h6>

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

        <div className="col-6 d-lg-block d-md-block d-sm-none d-none ">
          <StaticAuthComponent />
        </div>
      </div>
    </div>
  </>
}
