import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsData } from "../../Store/getLoggedCartItemsSlice";
import { Helmet } from "react-helmet";
import { getFavProductsData } from "../../Store/getLoggedUserWishlist";
import $ from "jquery";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import LoadingImageAndTextAPI from "./LoadingImageAndTextAPI";
import { Message, toaster } from "rsuite";
import FiltersAside from "./FiltersAside";
import NoProducts from "./NoProducts";
import HomeSearch from "./HomeSearch";
import AllProductsSection from "./AllProductsSection";

export default function Home() {
  const [product, setProduct] = useState(null);
  const [filters, setFilters] = useState({});
  const [myFilters, setmyFilters] = useState({});
  const [allCategories, setallCategories] = useState(null);
  const [allBrands, setallBrands] = useState(null);
  const [categoriesId, setcategoriesId] = useState([]);
  const [brandsId, setbrandsId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favIds, setfavIds] = useState([]);
  const {i18n} = useTranslation();
  const location = useLocation();
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
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllCategoriesAndBrands() {
    try {
      const cateArr = [];
      const brandsArr = [];
      const categoriesData = await axios.get(`${process.env.REACT_APP_APIBASEURL}/categories`);
      categoriesData.data.categories.map((item) => {
          cateArr.push({_id:item._id , name:item.name})
      });
      setallCategories(cateArr); 
      const BrandsData = await axios.get(`${process.env.REACT_APP_APIBASEURL}/brands`);
      BrandsData.data.brands.map((item) => {
          brandsArr.push({_id:item._id , name:item.name})
      });
      setallBrands(brandsArr);
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
      $(".filtersContainerparent").animate({ left: '-'+ $('.filtersContainerparent').css('width').toString() }, 2000);
      $(".filtersContainerparent").addClass("end-100");
    }
  }

  const closeFilters = () => {
    console.log('-'+ $('.filtersContainerparent').css('width'));
    $(".filtersContainerparent").animate({ left: '-'+ $('.filtersContainerparent').css('width') }, 2000);
    $(".filtersContainerparent").addClass("end-100");
  }

  function extractPriceAndSetFilters(e) {
    const priceText = e.target.value;
    let minPrice;
    let maxPrice;
    const newFilters = { ...filters , ...myFilters };
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
        setmyFilters(newFilters);
      } else {
        minPrice = parseInt(
          priceText.slice(priceText.indexOf(" ") + 1, priceText.indexOf(" ", 9))
        );
        console.log(minPrice);
        newFilters["price[gte]"] = minPrice;
        maxPrice = parseInt(priceText.slice(priceText.indexOf(" ", 16) + 1));
        console.log(maxPrice);
        newFilters["price[lte]"] = maxPrice;
        setmyFilters(newFilters);
      }
    }
  }

  function getCustomCategory(e, id) {
    const catIds = [...categoriesId];
    if (e.target.checked) {
      catIds.push(id);
      console.log(catIds);
    } else {
      catIds.splice(categoriesId.indexOf(id), 1);
      console.log(catIds);
    }
    setcategoriesId(catIds);
    const newFilters = { ...filters , ...myFilters };
    newFilters["categoryId[in]"] = catIds;
    console.log(newFilters);
    setmyFilters(newFilters);
  }

  function getCustomBrand(e, id) {
    const brandsIds = [...brandsId];
    if (e.target.checked) {
      brandsIds.push(id);
      console.log(brandsIds);
    } else {
      brandsIds.splice(categoriesId.indexOf(id), 1);
      console.log(brandsIds);
    }
    setbrandsId(brandsIds);
    const newFilters = { ...filters , ...myFilters };
    newFilters["brandId[in]"] = brandsIds;
    setmyFilters(newFilters);
  }

  async function getProductsByTextDetection(event) {
    $('#imageAndTextDetectionLoader').removeClass('d-none');
    const file = event.target.files[0];
    console.log(file);
    settextFile(file);
    const formData = new FormData();
    formData.append('image' , file);
    setIsOpen(!isOpen);
    console.log('hello in text detection function');
    
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_APIBASEURL}/products/search?imageLang=${i18n.language === 'en' ? 'eng' : 'ara'}`, formData , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      $('#imageAndTextDetectionLoader').addClass('d-none');
      console.log(data);
      setProduct(data);
      setTotalPages(1);
      toaster.push(<Message closable showIcon type="success">we find Products of {data.text}</Message> , {placement:'topCenter' , duration:'5000' });
    } catch (error) {
      $('#imageAndTextDetectionLoader').addClass('d-none');
      toaster.push(<Message closable showIcon type="error">{error.response.data.message}</Message> , {placement: 'topCenter', duration: 5000 });
      console.log(error);
    }
    
  }

  const getProductsWithImageDetection = async (event) => {
    $('#imageAndTextDetectionLoader').removeClass('d-none');
    const file = event.target.files[0];
    setimageFile(file);
    const formData = new FormData();
    formData.append('image' , file);
    setIsOpen(!isOpen);
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_APIBASEURL}/products/search-image` , formData);
      $('#imageAndTextDetectionLoader').addClass('d-none');
      console.log(data);
      setTotalPages(data.numOfPages);
      setProduct(data);
      toaster.push(<Message closable showIcon type="success">we find Product of {data.name}</Message> , {placement:'topCenter' , duration:'5000' });
    } catch (error) {
      $('#imageAndTextDetectionLoader').addClass('d-none');
      toaster.push(<Message closable showIcon type="error">{error.response.data.message}</Message> , {placement:'topCenter' , duration:'5000' });
      console.log(error);
    }
  }

  const saveFilters = () => {
    console.log(myFilters);
    setFilters(myFilters);
    closeFilters();
  }
  const resetFilters = async () => {
    const inputs = document.querySelectorAll('.filtersContainerparent input');
    const inputsArray = Array.from(inputs);
    inputsArray.map((ele) => {
      ele.checked = false;
    });
    setbrandsId([]);
    setcategoriesId([]);
    setmyFilters({});
    setCurrentPage(1);
    setFilters({});
    closeFilters();
    // window.location.reload();
  }
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setProduct(null);
      setCurrentPage(currentPage- 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setProduct(null);
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    getAllCategoriesAndBrands();
  },[]);
  const memo2 = useMemo(
    function () {
      getProduct();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlistProducts]);

  const memo4 = useMemo(()=>{
      const newFilters = {...filters};
      newFilters["searchKey"] = new String(textSearch);
      setFilters(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[textSearch]);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <FiltersAside
        allBrands={allBrands}
        allCategories={allCategories}
        closeFilters={closeFilters}
        extractPriceAndSetFilters={extractPriceAndSetFilters}
        getCustomBrand={getCustomBrand}
        getCustomCategory={getCustomCategory}
        saveFilters={saveFilters}
        resetFilters={resetFilters}
        toggleAside={toggleAside}
      />
      <LoadingImageAndTextAPI />
      
        <NoProducts/>
        <HomeSearch
          getProductsByTextDetection={getProductsByTextDetection}
          getProductsWithImageDetection={getProductsWithImageDetection}
          handleSearchTextChange={handleSearchTextChange}
          openImageDetectionInput={openImageDetectionInput}
          openTextDetectionInput={openTextDetectionInput}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
        />
        <AllProductsSection
          product={product}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          favIds={favIds}
        />
      
    </>
  );
}
