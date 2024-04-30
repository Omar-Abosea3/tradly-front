import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import LodingScrean from '../loadingScreen/LodingScrean';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCartItemsData} from '../../Store/getLoggedCartItemsSlice';
import { Helmet } from 'react-helmet';
import { addToCartFunction } from '../../glopalFunctions/addToCartFun';
import { getFavProductsData } from '../../Store/getLoggedUserWishlist';
import AddToWishlistBtn from '../Buttons/AddToWishlistBtn';
import noProducts from '../../assets/EmptyPtoducts.png'
import $ from 'jquery';
import Cookies from 'js-cookies';

export default function Home() {
    const [product, setProduct] = useState(null);
    const [favIds, setfavIds] = useState([]);
    const [filters, setFilters] = useState({});
    const [allCategories, setallCategories] = useState(null);
    const [categoriesId, setcategoriesId] = useState([]);

    const wishlistProducts = useSelector((store) => store.getFavProductsSlice.wishlistProducts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function addingToCart(id){
        if(!Cookies.getItem('token')){
            navigate('/login');
        }else{
            await addToCartFunction(id);
            dispatch(getCartItemsData());
        }
    }
            

    async function getProduct(){
        try {
            let {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/products/filter` , {
                params:filters,
            });
            dispatch(getCartItemsData());
            dispatch(getFavProductsData());
            console.log(data);
            getAllCategories();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllCategories(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/categories`);
            console.log(data);
            setallCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    

    function toggleAside(){
        if($('.filtersContainerparent').hasClass('end-100')){
            console.log(1);
            $('.filtersContainerparent').animate({left:'0%'} , 2000);
            $('.filtersContainerparent').removeClass('end-100');
        }else{
            console.log(2);
            $('.filtersContainerparent').animate({left:'-30%'} , 2000);
            $('.filtersContainerparent').addClass('end-100');
           
        }
    }

    function extractPriceAndSetFilters(e){
        const priceText = e.target.value;
        let minPrice;
        let maxPrice;
        const newFilters = {...filters};
        if(typeof(priceText) == 'string'){
            if(priceText.length <= 18){
                minPrice = parseInt(priceText.slice(priceText.indexOf(' ')+1 , priceText.indexOf(' ' , 9)));
                console.log(minPrice);
                newFilters["price[gte]"]= minPrice;
                maxPrice = parseInt(priceText.slice(priceText.indexOf(' ' , 13)+1));
                console.log(maxPrice);
                newFilters["price[lte]"]= maxPrice;
                setFilters(newFilters);
            }else{
                minPrice = parseInt(priceText.slice(priceText.indexOf(' ')+1 , priceText.indexOf(' ' , 9)));
                console.log(minPrice);
                newFilters["price[gte]"]= minPrice;
                maxPrice = parseInt(priceText.slice(priceText.indexOf(' ' , 16)+1));
                console.log(maxPrice);
                newFilters["price[lte]"]= maxPrice;
                setFilters(newFilters);
            }
        }

    }


    function getCustomCategory(e , id){
        console.log(e.target.checked);
        const catIds = [...categoriesId];
        if(e.target.checked){
            console.log('hello1');
            catIds.push(id);
            console.log(catIds);
        }else{
            console.log('hello2');
            catIds.splice(categoriesId.indexOf(id) , 1);
            console.log(catIds);
        }
        setcategoriesId(catIds);
        const newFilters = { ...filters };
        newFilters['categoryId[in]'] = catIds;
        console.log(newFilters);
        setFilters(newFilters);
    }


    const memo2 = useMemo(function(){
        getProduct();
    },[filters])
    const memo3 = useMemo(()=>{
        if(product != null){
            if(product.message !== "success"){
                $('#noProducts').removeClass('d-none'); 
            }else{
                $('#noProducts').addClass('d-none');
            }
        }
    },[product])
    const memo = useMemo(()=>{
        const wishProductIds = [];
        if(!wishlistProducts){
            dispatch(getFavProductsData());
            setfavIds(wishProductIds);
        }else{
            wishlistProducts.map(pro => wishProductIds.push(pro.id));
            if(wishProductIds.length !== 0){
                setfavIds(wishProductIds);
            }
        }
    },[wishlistProducts]);
        
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="position-fixed position-relative top-0 end-100 filtersContainerparent">
          <div
            id="toggleAside"
            onClick={toggleAside}
            className="position-absolute start-100 top-50 bg-light px-3 py-1 d-flex justify-content-center align-items-center rounded-3 shadow-lg"
          >
            <i className="bi bi-sliders fs-3"></i>
          </div>
          <aside className="position-absolute start-0 end-0 top-0 border-0 py-5 px-2 shadow-lg filtersContainer">
            <div className="accordion w-100" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    Price
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                  <div
                  id="price"
                  onClick={(e) => {
                    extractPriceAndSetFilters(e);
                  }}
                  className="d-flex w-100 filtersFontSize justify-content-center align-items-center flex-wrap"
                >
                  <label className="w-100 mb-2" htmlFor="price1">
                    <input
                      type="radio"
                      id="price1"
                      className="form-check-input me-1"
                      value={"between 0 and 1000"}
                      name="price"
                    />
                    between 0 and 1000
                  </label>
                  <label className="w-100 mb-2" htmlFor="price2">
                    <input
                      type="radio"
                      id="price2"
                      className="form-check-input me-1"
                      value={"between 1000 and 4000"}
                      name="price"
                    />
                    between 1000 and 4000
                  </label>
                  <label className="w-100 mb-2" htmlFor="price3">
                    <input
                      type="radio"
                      id="price3"
                      className="form-check-input me-1"
                      value={"between 4000 and 8000"}
                      name="price"
                    />
                    between 4000 and 8000
                  </label>
                  <label className="w-100 mb-2" htmlFor="price4">
                    <input
                      type="radio"
                      id="price4"
                      className="form-check-input me-1"
                      value={"between 8000 and 20000"}
                      name="price"
                    />
                    between 8000 and 20000
                  </label>
                  <label className="w-100 mb-2" htmlFor="price5">
                    <input
                      type="radio"
                      id="price5"
                      className="form-check-input me-1"
                      value={"between 20000 and 30000"}
                      name="price"
                    />
                    between 20000 and 30000
                  </label>
                  <label className="w-100 mb-2" htmlFor="price6">
                    <input
                      type="radio"
                      id="price6"
                      className="form-check-input me-1"
                      value={"between 30000 and 50000"}
                      name="price"
                    />
                    between 30000 and 50000
                  </label>
                </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    Category
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                  <div
                  id="categories"
                  className="d-flex filtersFontSize w-100 justify-content-center align-items-center flex-wrap"
                >
                  {!allCategories ? (
                    ""
                  ) : (
                    <>
                      {allCategories.map((Cat) => (
                        <label
                          onChange={(e) => {
                            getCustomCategory(e, Cat._id);
                          }}
                          key={Cat._id}
                          className="w-100 mb-2"
                          htmlFor={`filterCat${Cat._id}`}
                        >
                          <input
                            type="checkbox"
                            id={`filterCat${Cat._id}`}
                            className="form-check-input me-1"
                            value={Cat._id}
                            name="Category"
                          />
                          {Cat.name}
                        </label>
                      ))}
                    </>
                  )}
                </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    brands
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
            
          </aside>
        </div>
        {product == null ? (
          <LodingScrean />
        ) : (
          <>
            <div
              id="noProducts"
              className="d-flex vh-100 d-none flex-wrap justify-content-center align-items-center"
            >
              <img className="w-25" src={noProducts} alt="no products" />
            </div>
            <div className="container-fluid my-5 py-5">
              <div className="row mt-3 justify-content-center gy-4">
                <h2>
                  <i className="bi bi-border-all"></i> All Products.
                </h2>
                <div
                  style={{ display: "none", zIndex: "9999", bottom: "2%" }}
                  className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"
                >
                  <i className="fa-solid fa-circle-check"></i> Product Added
                  Successfully .
                </div>
                {product.products.map((pro, index) => (
                  <div
                    id="homeTop"
                    key={index}
                    className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3"
                  >
                    <div className="product position-relative overflow-hidden">
                      <Link
                        to={`/product-detailes/${pro._id}`}
                        className="text-decoration-none shadow-lg text-white"
                      >
                        <figure
                          style={{ height: "250px" }}
                          className="overflow-hidden"
                        >
                          <img
                            className="w-100 proImg"
                            src={pro.images[0].secure_url}
                            alt={pro.title}
                          />
                        </figure>
                        <figcaption className="ps-2 py-2">
                          {/* <img width={'80px'} className='mb-2' src={pro.brandId?.logo.secure_url} alt={pro.brandId?.name} /> */}
                          <h2 className="ProTitle">
                            {pro.title.slice(0, pro.title.indexOf(" ", 10))}
                          </h2>
                          <h4>{pro.subCategoryId.name}</h4>
                          <h4>
                            <i className="bi bi-star-fill text-warning"></i>{" "}
                            {pro.rate ? pro.rate : 4.5}
                          </h4>
                          {pro.appliedDiscount ? (
                            <h6
                              style={{ fontSize: "1rem", marginBottom: "10px" }}
                            >
                              price:{" "}
                              <span className="text-decoration-line-through text-danger">
                                {pro.price}
                              </span>{" "}
                              {pro.priceAfterDiscount}{" "}
                            </h6>
                          ) : (
                            <h6
                              style={{ fontSize: "1rem", marginBottom: "10px" }}
                            >
                              price:{pro.price}
                            </h6>
                          )}
                          <button className="detBtn btn" title="detailes">
                            {" "}
                            View Detailes <i className="fa fa-arrow-right"></i>
                          </button>
                        </figcaption>
                      </Link>
                      {favIds.includes(pro._id) ? (
                        <AddToWishlistBtn
                          id={pro._id}
                          classes={"bi text-danger bi-heart-fill fs-4 px-2"}
                        />
                      ) : (
                        <AddToWishlistBtn
                          id={pro._id}
                          classes={"bi bi-heart fs-4 px-2"}
                        />
                      )}
                      <button
                        onClick={function () {
                          addingToCart(pro._id);
                        }}
                        id={`addBtn${pro._id}`}
                        title="Add To Cart"
                        className="proBtn w-100 rounded-bottom-2"
                      >
                        <i className="fa fa-cart-plus"></i>
                      </button>
                      {pro.priceAfterDiscount ? (
                        <div className="position-absolute sale me-3 text-center">
                          Sale
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
}
