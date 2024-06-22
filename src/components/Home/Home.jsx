import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import LodingScrean from "../loadingScreen/LodingScrean";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsData } from "../../Store/getLoggedCartItemsSlice";
import { Helmet } from "react-helmet";
import { getFavProductsData } from "../../Store/getLoggedUserWishlist";
import noProducts from "../../assets/EmptyPtoducts.png";
import $ from "jquery";
import ProductCard from "../ProductCard/ProductCard";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [product, setProduct] = useState(null);
  const [filters, setFilters] = useState({});
  const [allCategories, setallCategories] = useState(null);
  const [categoriesId, setcategoriesId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favIds, setfavIds] = useState([]);
  const {i18n} = useTranslation();
  const wishlistProducts = useSelector(
    (store) => store.getFavProductsSlice.wishlistProducts
  );
  const dispatch = useDispatch();
  const [imageFile, setimageFile] = useState(null);
  const [textFile, settextFile] = useState(null);
  const [textSearch, settextSearch] = useState(' ');
  const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const openImageDetectionInput = () => {
        $('#scanImageInput').click();
    }
    const openTextDetectionInput = () => {
        $('#scanTextInput').click();
    }
    const handleTextFileChange = (event) => {
        console.log('file');
        const file = event.target.files[0];
        console.log(file);
        settextFile(file);
        setIsOpen(!isOpen);

    };
    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setimageFile(file);
        setIsOpen(!isOpen);
    };
      
    const handleSearchTextChange = () => {
        const text = $('#searchTextInput').val();
        settextSearch(text);
    }

  async function getProduct() {
    filters.page = currentPage;
    filters.size = 30;
    try {
      let { data } = await axios.get(
        `${process.env.REACT_APP_APIBASEURL}/products/filter`,
        {
          params: filters,
        }
      );
      setTotalPages(data.numOfPages);
      dispatch(getCartItemsData());
      dispatch(getFavProductsData());
      console.log(data);
      getAllCategories();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_APIBASEURL}/categories`
      );
      console.log(data);
      setallCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  function toggleAside() {
    if ($(".filtersContainerparent").hasClass("end-100")) {
      console.log(1);
      $(".filtersContainerparent").animate({ left: "0%" }, 2000);
      $(".filtersContainerparent").removeClass("end-100");
    } else {
      console.log(2);
      $(".filtersContainerparent").animate({ left: "-30%" }, 2000);
      $(".filtersContainerparent").addClass("end-100");
    }
  }

  function extractPriceAndSetFilters(e) {
    const priceText = e.target.value;
    let minPrice;
    let maxPrice;
    const newFilters = { ...filters };
    if (typeof priceText === "string") {
      if (priceText.length <= 18) {
        minPrice = parseInt(
          priceText.slice(priceText.indexOf(" ") + 1, priceText.indexOf(" ", 9))
        );
        console.log(minPrice);
        newFilters["price[gte]"] = minPrice;
        maxPrice = parseInt(priceText.slice(priceText.indexOf(" ", 13) + 1));
        console.log(maxPrice);
        newFilters["price[lte]"] = maxPrice;
        setFilters(newFilters);
      } else {
        minPrice = parseInt(
          priceText.slice(priceText.indexOf(" ") + 1, priceText.indexOf(" ", 9))
        );
        console.log(minPrice);
        newFilters["price[gte]"] = minPrice;
        maxPrice = parseInt(priceText.slice(priceText.indexOf(" ", 16) + 1));
        console.log(maxPrice);
        newFilters["price[lte]"] = maxPrice;
        setFilters(newFilters);
      }
    }
  }

  function getCustomCategory(e, id) {
    console.log(e.target.checked);
    const catIds = [...categoriesId];
    if (e.target.checked) {
      console.log("hello1");
      catIds.push(id);
      console.log(catIds);
    } else {
      console.log("hello2");
      catIds.splice(categoriesId.indexOf(id), 1);
      console.log(catIds);
    }
    setcategoriesId(catIds);
    const newFilters = { ...filters };
    newFilters["categoryId[in]"] = catIds;
    console.log(newFilters);
    setFilters(newFilters);
  }

  async function getProductsByTextDetection() {
    const formData = new FormData();
    formData.append('image' , textFile);
    console.log('hello in text detection function');
    
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_APIBASEURL}/products/search?imageLang=${i18n.language === 'en' ? 'eng' : 'ara'}&size=10&page=${currentPage}`, formData , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(data);
      setTotalPages(data.numOfPages);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
    
  }

  const getProductsWithImageDetection = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image' , file);
    setIsOpen(!isOpen);
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_APIBASEURL}/products/search-image` , formData);
      console.log(data);
      setTotalPages(data.numOfPages);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }
  const memo2 = useMemo(
    function () {
      getProduct();
    },
    [filters , currentPage]
  );
  const memo3 = useMemo(() => {
    if (product != null) {
      if (product.message !== "success") {
        $("#noProducts").removeClass("d-none");
      } else {
        $("#noProducts").addClass("d-none");
      }
    }
  }, [product]);
  const memo = useMemo(() => {
    const wishProductIds = [];
    if (!wishlistProducts) {
      dispatch(getFavProductsData());
      setfavIds(wishProductIds);
    } else {
      wishlistProducts.map((pro) => wishProductIds.push(pro.id));
      if (wishProductIds.length !== 0) {
        setfavIds(wishProductIds);
      }
    }
  }, [wishlistProducts]);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage- 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const memo4 = useMemo(()=>{
      const newFilters = {...filters};
      newFilters["searchKey"] = new String(textSearch);
      setFilters(newFilters);
  },[textSearch]);

  const textDetection = useMemo(()=>{
    getProductsByTextDetection();
  },[textFile])
  // const imageDetection = useMemo(()=>{
  //   getProductsWithImageDetection();
  // },[imageFile])
  // useEffect(() => {
  //   getProduct();
  // },[currentPage]);
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
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
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
          <div className="container my-5 pt-5">
          <div className="w-100 row justify-content-center align-items-center gx-2">
            <div className="col-lg-6 col-12 d-flex align-items-center">
                <div className="searchInputContainer col-10 d-flex align-items-center gap-1 py-1 px-1 rounded-5">
                    <div onClick={handleSearchTextChange} title='click to search' className="serchIconContainer">
                        <i className="bi bi-search"></i>
                    </div>
                    <input
                        type="text"
                        placeholder="search for products"
                        className="h-100 border-0"
                        id='searchTextInput'
                    />
                </div>
                <div className="dropdown col-2">
                <button className="dropdown-icon" onClick={toggleDropdown}>
                    <i className="bi fs-1 bi-camera-fill"></i>
                </button>
                {isOpen && (
                  <div className="dropdown-menu">
                    <button onClick={openTextDetectionInput}><i className="bi bi-file-text"></i> Scan Text <input type="file" onChange={handleTextFileChange} id='scanTextInput' className='d-none'/></button>
                    <button onClick={openImageDetectionInput}><i className="bi bi-file-earmark-image"></i> Scan Image <input type="file" onChange={(e) => {getProductsWithImageDetection(e)}} id='scanImageInput' className='d-none'/></button>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="col-2">
              <div className="dropdown">
                <button className="dropdown-icon" onClick={toggleDropdown}>
                  <i className="bi bi-list"></i>
                </button>
                {isOpen && (
                  <div className="dropdown-menu">
                    <button>Option 1</button>
                    <button>Option 2</button>
                    <button>Option 3</button>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
          <div className="container-fluid">
            <div className="row mt-3 justify-content-center gy-4">
              <div className="d-flex justify-content-between align-items-center">
                <h2>
                  <i className="bi bi-border-all"></i> All Products.
                </h2>
                <div>
                  <button className="paginationBtn" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <i className="bi bi-caret-left-fill"></i>
                  </button>
                  <span className="mb-0 text-center pageNumber">{currentPage || 1}</span>
                  <button
                    className="paginationBtn"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <i className="bi bi-caret-right-fill"></i>
                  </button>
                </div>
              </div>
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
                  <ProductCard pro={pro} favIds={favIds} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
