import React, { useLayoutEffect, useState } from 'react'
import profileImg from '../../assets/profileImg.jpg';
import LodingScrean from '../loadingScreen/LodingScrean';
import { useFormik } from 'formik';
import $ from 'jquery';
import axios from 'axios';
import { Helmet } from 'react-helmet';
export default function Profile({clearUserData}) {
    const [userData, setuserData] = useState(null);
    const updateUser = {
        "name": "",
        "email": "",
        "phone": ""
    };

    const passwordData = {
        "currentPassword":"",
        "password":"",
        "rePassword":""
    }
      
    function loadingImog() {
        $('#updateDataBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
    }

    function loadingImog2() {
        $('#updatePasswordBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
    }

    function openUpdateUserLayer(){
        $('.updateLayer').fadeIn(500).css('display','flex');
    }
    function openUpdateUserLayer2(){
        $('.updateLayer2').fadeIn(500).css('display','flex');
    }
    function closeUpdateUserLayer(){
        $('.updateLayer').fadeOut(500);
    }

    function closeUpdateUserLayer2(){
        $('.updateLayer2').fadeOut(500);
    }
    async function updateUserData(myData){
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe`,myData,{
            headers: {
              token: localStorage.getItem('tkn1'),
            }
          });
          console.log(data);
          $('#updateDataBtn').html(`Update Now`);
            closeUpdateUserLayer();
            localStorage.setItem('userData' , JSON.stringify({name:myData.name , email:myData.email , role:userData.role}));
            setuserData(JSON.parse(localStorage.getItem('userData')));
        
        } catch (error) {
          $('#updateDataBtn').html(`Update Now`);
            console.log(error);
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

    async function updateUserPassword(myData){
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,myData,{
            headers: {
              token: localStorage.getItem('tkn1'),
            }
          });
          console.log(data);
          $('#updatePasswordBtn').html(`Change Now`);
          $('#sucMsg2').fadeIn(500,function(){
            setTimeout(() => {
                $('#sucMsg2').fadeOut(500,function(){
                  closeUpdateUserLayer2();
                  clearUserData();
                });
                
            }, 1500);
          });
            setuserData(JSON.parse(localStorage.getItem('userData')));
        } catch (error) {
          $('#updatePasswordBtn').html(`Change Now`);
            console.log(error);
            if(error.response){
                $('#errMsg2').html(error.response.data.message).fadeIn(500,function(){
                    setTimeout(() => {
                        $('#errMsg2').fadeOut(500);
                    }, 2000);
                })
            }else{
                $('#errMsg2').fadeIn(500,function(){
                    setTimeout(() => {
                        $('#errMsg2').fadeOut(500);
                    }, 2000);
                })
            }
        }
    }
    const myFormik = useFormik({
        initialValues: updateUser,
    
        onSubmit: function (values) {
          console.log(values);
          updateUserData(values);
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
          return errors;
        }
    })

    const myFormik2 = useFormik({
        initialValues: passwordData,
    
        onSubmit: function (values) {
          console.log(values);
          updateUserPassword(values);
        },
        validate: function (values) {
          let errors = {};
          if (values.currentPassword.length < 3 || values.currentPassword.length > 15) {
            errors.currentPassword = 'password must be more than 3 and less than 15';
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
    useLayoutEffect(() => {
        if(!userData){
            setuserData(JSON.parse(localStorage.getItem('userData')));
        }
    },[])
  return <>
        {userData?<div className="container my-5 py-5">
            <div className="row my-5 py-5 justify-content-center align-items-center">
                <div className="w-50 text-black text-center py-5 d-flex justify-content-center align-items-center my-5 flex-wrap">
                    <figure style={{width:'100px' , height:'100px', borderRadius:'50%'}} className='overflow-hidden mb-5'> 
                        <img src={profileImg} className='w-100' alt="profile-image" />
                    </figure>
                    <h2 className='mb-2 w-100'>{userData.name}</h2>
                    <h3 className='mb-2 w-100'>{userData.email}</h3>
                    <h2 className='mb-4 w-100 text-success'>{userData.role}</h2>
                    <button type='button' onClick={openUpdateUserLayer} className='btn btn-primary me-2 mb-3'>Update Profile</button>
                    <button type='button' onClick={openUpdateUserLayer2} className='btn btn-primary mb-3'>Change Password</button>
                </div>
            </div>
        </div>:<LodingScrean/>}

        <div style={{zIndex:'999' , display:'none'}} className='updateLayer bg-black bg-opacity-75 position-fixed py-5 top-0 bottom-0 start-0 end-0 justify-content-center align-items-center position-relative'>
            <div className="w-75 py-5 bg-white px-5 rounded-3 position-relative">
            <div style={{ display: 'none' , zIndex:'99999'}} className="sucMsg text-center m-auto alert alert-success py-1">Success</div>
            <div style={{ display: 'none', zIndex:'99999' }} className="errMsg text-center m-auto alert alert-danger py-1">Network Error !</div>
                <div className='position-absolute top-0 end-0 px-1 py-1'><i style={{cursor:'pointer'}} onClick={closeUpdateUserLayer} className='bi fs-3 bi-x'></i></div>
              <form className='px-1 col-12 ' onSubmit={myFormik.handleSubmit}>
                  <div className="w-100">
                    <label className='mb-2' htmlFor="name">name</label>
                    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='name' placeholder='Name' value={myFormik.values.name} className='form-control mb-3' type="text" />
                    {myFormik.errors.name && myFormik.touched.name ? <div className="alert py-1 alert-warning">{myFormik.errors.name}</div> : ''}
                    
                    <label className='mb-2' htmlFor="email">email</label>
                    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='email' placeholder='Email' value={myFormik.values.email} className='form-control mb-3' type="email" />
                    {myFormik.errors.email && myFormik.touched.email ? <div className="alert py-1 alert-warning">{myFormik.errors.email}</div> : ''}

                    <label className='mb-2' htmlFor="phone">phone</label>
                    <input id='phone' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} className='form-control mb-3' placeholder='phone' type="text" />
                    {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert py-1 alert-warning">{myFormik.errors.phone}</div> : ''}
                  </div>

                  <button id='updateDataBtn' onClick={loadingImog} type='submit' className='btn btn-dark w-100 mt-4'>Update Now</button>
                  <hr/>
              </form>
            </div>
        </div>

        <div style={{zIndex:'999' , display:'none'}} className='updateLayer2 bg-black bg-opacity-75 position-fixed py-5 top-0 bottom-0 start-0 end-0 justify-content-center align-items-center position-relative'>
            <div className="w-75 py-5 bg-white px-5 rounded-3 position-relative">
            <div id='sucMsg2' style={{ display: 'none' , zIndex:'99999'}} className="text-center m-auto alert alert-dark py-1">Success</div>
            <div id='errMsg2' style={{ display: 'none', zIndex:'99999' }} className="text-center m-auto alert alert-danger py-1">Network Error !</div>
            <div className='position-absolute top-0 end-0 px-1 py-1'><i style={{cursor:'pointer'}} onClick={closeUpdateUserLayer2} className='bi fs-3 bi-x'></i></div>
              <form className='px-1 col-12 ' onSubmit={myFormik2.handleSubmit}>
                  <div className="w-100">
                      <label className='mb-2' htmlFor="currentPassword">Current Password</label>
                      <input onBlur={myFormik2.handleBlur} onChange={myFormik2.handleChange} id='currentPassword' placeholder='Current Password' value={myFormik2.values.currentPassword} className='form-control mb-3' type="password" />
                      {myFormik2.errors.currentPassword && myFormik2.touched.currentPassword ? <div className="alert py-1 alert-warning">{myFormik2.errors.currentPassword}</div> : ''}

                      <label className='mb-2' htmlFor="password">password</label>
                      <input onBlur={myFormik2.handleBlur} onChange={myFormik2.handleChange} id='password' placeholder='Password' value={myFormik2.values.password} className='form-control mb-3' type="password" />
                      {myFormik2.errors.password && myFormik2.touched.password ? <div className="alert py-1 alert-warning">{myFormik2.errors.password}</div> : ''}

                      <label htmlFor="rePassword">rePassword</label>
                      <input onBlur={myFormik2.handleBlur} onChange={myFormik2.handleChange} id='rePassword' placeholder='RePassword' value={myFormik2.values.rePassword} className='form-control mb-3' type="password" />
                      {myFormik2.errors.rePassword && myFormik2.touched.rePassword ? <div className="alert py-1 alert-warning">{myFormik2.errors.rePassword}</div> : ''}
                  </div>

                  <button id='updatePasswordBtn' onClick={loadingImog2} type='submit' className='btn btn-dark w-100 mt-4'>Change Now</button>
                  <hr/>
              </form>
            </div>
        </div>
  </>
}
