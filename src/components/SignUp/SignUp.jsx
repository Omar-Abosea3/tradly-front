import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import StaticAuthComponent from '../StaticAuthComponent/StaticAuthComponent';
import { Message, toaster } from 'rsuite';

export default function SignUp() {
  const navigate = useNavigate();
  const [Gender, setGender] = useState('male');
  const [loading, setLoading] = useState(false);

  const user = {
    firstName: '',
    lastName: '',
    phone: '',
    age: 14,
    email: '',
    password: '',
    repassword: '',
    gender: Gender,
  };

  const generateOTP = async (email) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/auth/generateotp`, {email});
      setTimeout(() => {
        navigate('/confirm-email');
      }, 2000);
      console.log(data);
      localStorage.setItem('userId',data.userId);
    } catch (error) {
      console.log(error);
    }
  }

  const sendNewUser = async (nUser) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/auth/signup`, nUser);
      setLoading(false);
      toaster.push(<Message closable showIcon type='success'>success !</Message> , {placement:'topCenter' , duration:'3000'});
      
      generateOTP(nUser.email);
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
      values.gender = Gender;
      console.log(values);
      sendNewUser(values);
    },
    validate: (values) => {
      const errors = {};
      if (values.firstName.length < 3 || values.firstName.length > 15) {
        errors.firstName = 'firstName must be more than 3 and less than 15';
      }
      if (values.lastName.length < 3 || values.lastName.length > 15) {
        errors.lastName = 'lastName must be more than 3 and less than 15';
      }
      if (!values.email.includes('@') || !values.email.includes('.com')) {
        errors.email = 'email not valid';
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = 'phone must be an Egyptian number';
      }
      if (values.password.length < 3 || values.password.length > 15) {
        errors.password = 'password must be more than 3 and less than 15';
      }
      if (values.password !== values.repassword) {
        errors.repassword = 'password and repassword not matched';
      }
      if (values.age < 14 || values.age > 100) {
        errors.age = 'age must be more than 14 and less than 100';
      }
      return errors;
    },
  });

  return (
    <>
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

              <label className='mb-2' htmlFor="firstName">First Name</label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                id='firstName'
                name='firstName'
                placeholder='First Name'
                value={myFormik.values.firstName}
                className='form-control mb-3'
                type="text"
              />
              {myFormik.errors.firstName && myFormik.touched.firstName ? (
                <div className="alert py-1 alert-warning">{myFormik.errors.firstName}</div>
              ) : null}

              <label className='mb-2' htmlFor="lastName">Last Name</label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                id='lastName'
                name='lastName'
                placeholder='Last Name'
                value={myFormik.values.lastName}
                className='form-control mb-3'
                type="text"
              />
              {myFormik.errors.lastName && myFormik.touched.lastName ? (
                <div className="alert py-1 alert-warning">{myFormik.errors.lastName}</div>
              ) : null}

              <label className='mb-2' htmlFor="signupEmail">Email</label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                id='signupEmail'
                name='email'
                placeholder='Email'
                value={myFormik.values.email}
                className='form-control mb-3'
                type="email"
              />
              {myFormik.errors.email && myFormik.touched.email ? (
                <div className="alert py-1 alert-warning">{myFormik.errors.email}</div>
              ) : null}

              <label className='mb-2' htmlFor="signupPhone">Phone</label>
              <input
                id='signupPhone'
                name='phone'
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                value={myFormik.values.phone}
                className='form-control mb-3'
                placeholder='Phone'
                type="text"
              />
              {myFormik.errors.phone && myFormik.touched.phone ? (
                <div className="alert py-1 alert-warning">{myFormik.errors.phone}</div>
              ) : null}

              <label className='mb-2' htmlFor="age">Age</label>
              <input
                id='age'
                name='age'
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                value={myFormik.values.age}
                className='form-control mb-3'
                placeholder='Age'
                type="number"
                min={14}
                max={100}
              />
              {myFormik.errors.age && myFormik.touched.age ? (
                <div className="alert py-1 alert-warning">{myFormik.errors.age}</div>
              ) : null}

              <label className='mb-2' htmlFor="signupPassword">Password</label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                id='signupPassword'
                name='password'
                placeholder='Password'
                value={myFormik.values.password}
                className='form-control mb-3'
                type="password"
              />
              {myFormik.errors.password && myFormik.touched.password ? (
                <div className="alert py-1 alert-warning">{myFormik.errors.password}</div>
              ) : null}

              <label htmlFor="signUpRepassword">Repassword</label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                id='signUpRepassword'
                name='repassword'
                placeholder='Repassword'
                value={myFormik.values.repassword}
                className='form-control mb-3'
                type="password"
              />
              {myFormik.errors.repassword && myFormik.touched.repassword ? (
                <div className="alert py-1 alert-warning">{myFormik.errors.repassword}</div>
              ) : null}

              <label htmlFor="gender" className='w-100 mb-2'>Gender</label>
              <div id='gender' className='d-flex mb-3'>
                <div className='me-3'>
                  <input
                    type='radio'
                    id='male'
                    checked={Gender === 'male'}
                    className='me-2'
                    onChange={() => setGender('male')}
                    value='male'
                    name='gender'
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className='me-3'>
                  <input
                    type='radio'
                    id='female'
                    checked={Gender === 'female'}
                    className='me-2'
                    onChange={() => setGender('female')}
                    value='female'
                    name='gender'
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>

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
