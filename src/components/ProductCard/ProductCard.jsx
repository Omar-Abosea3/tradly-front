import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddToWishlistBtn from '../Buttons/AddToWishlistBtn';
import Cookies from 'js-cookies';
import { addToCartFunction } from '../../glopalFunctions/addToCartFun';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import { useDispatch } from 'react-redux';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';

export default function ProductCard({pro , page , favIds}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function addingToCart(id){
        if(!Cookies.getItem('token')){
            navigate('/login');
        }else{
            await addToCartFunction(id);
            dispatch(getCartItemsData());
        }
    }
 
  return (
    <>
      <div className="product position-relative overflow-hidden">
        <Link
          to={`/product-detailes/${pro._id}`}
          className="text-decoration-none shadow-lg text-white"
        >
          <figure style={{ height: "250px" }} className="overflow-hidden">
            <img
              className="w-100  proImg"
              src={pro.images[0].secure_url}
              alt={pro.title}
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
              {pro.title}
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
                className="proBtn w-100 rounded-bottom-2 mb-2"
                >
                <i className="fa fa-cart-plus"></i> Cart
            </button>
            <button
                onClick={function () {
                    addingToCart(pro._id);
                }}
                id={`orderBtn${pro._id}`}
                title="Order Now"
                className="orderPtn w-100 rounded-bottom-2"
                >
               <i className="bi bi-credit-card-fill"></i> Order 
            </button>
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
