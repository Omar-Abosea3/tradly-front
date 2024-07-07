import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddToWishlistBtn from '../Buttons/AddToWishlistBtn';
import Cookies from 'js-cookies';
import { addToCartFunction } from '../../glopalFunctions/addToCartFun';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Message, toaster } from 'rsuite';
import $ from 'jquery';
import PaymentMethods from '../Cart/PaymentMethods';

export default function ProductCard({pro , page , favIds}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {i18n} = useTranslation()
    async function addingToCart(id){
        if(!Cookies.getItem('token')){
            toaster.push(<Message closable showIcon type="error">you must login first .</Message> , {placement:'topCenter' , duration:'1500'});
            setTimeout(() => {
              navigate('/login');
            },1500)
        }else{
            await addToCartFunction(id);
            dispatch(getCartItemsData());
        }
    }

    // const openPaymentLayer = () => {
    //   $(`#PaymentMethodsLayer${pro._id}`).css('display' , 'flex');
      
    // }
 
  return (
    <>
      {/* <PaymentMethods order={'one'} productId={pro._id}/> */}
      <div id={`product${pro._id}`} className="product position-relative overflow-hidden">
        <Link
          to={`/product-detailes/${pro._id}`}
          className="text-decoration-none shadow-lg text-white"
        >
          <figure className="overflow-hidden">
            <img
              className="w-100  proImg"
              src={pro.images[0].secure_url}
              alt={i18n.language === 'ar' ? pro.arTitle : pro.title}
            />
          </figure>
          <figcaption className="ps-2 py-2">
            {/* <img
              width={"80px"}
              className="mb-2"
              src={pro.brandId?.logo.secure_url}
              alt={pro.brandId?.name}
            /> */}
            <h2 className="ProTitle text-truncate">
              {i18n.language === 'ar' ? pro.arTitle : pro.title}
            </h2>
            <h4>{pro.subCategoryId.name}</h4>
            <h4>
              <i className="bi bi-star-fill text-warning"></i>{" "}
              {pro.rate ? pro.rate : 4.5}
            </h4>
            {pro.priceAfterDiscount!==pro.price ? (
              <h6 style={{ fontSize: "1rem", marginBottom: "10px" }}>
                price:{" "}
                <span className="text-decoration-line-through text-danger">
                  {pro.price}
                </span>{" "}
                {pro.priceAfterDiscount}{" "}
              </h6>
            ) : (
              <h6 style={{ fontSize: "1rem", marginBottom: "10px" }}>
                price:{pro.price}
              </h6>
            )}
            {/* <button className="detBtn btn" title="detailes">
              {" "}
              View Detailes <i className="fa fa-arrow-right"></i>
            </button> */}
          </figcaption>
        </Link>
        {favIds.includes(pro._id) ? (
          <AddToWishlistBtn
            id={pro._id}
            classes={"bi text-danger bi-heart-fill fs-4 px-2"}
            page={page?page:null}
          />
        ) : (
          <AddToWishlistBtn id={pro._id} classes={"bi bi-heart fs-4 px-2"} />
        )}
        <div className='p-2'>
            <button
                onClick={function () {
                    addingToCart(pro._id);
                }}
                id={`addBtn${pro._id}`}
                title="Add To Cart"
                className="proBtn w-100  mb-2"
                >
                <i className="fa fa-cart-plus"></i> Cart
            </button>
            {/* <button
                onClick={openPaymentLayer}
                id={`orderBtn${pro._id}`}
                title="Order Now"
                className="orderPtn w-100"
                >
               <i className="bi bi-credit-card-fill"></i> Order 
            </button> */}
        </div>
        {pro.priceAfterDiscount !== pro.price ? (
          <div className="position-absolute sale me-3 text-center rounded-2">Sale</div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
