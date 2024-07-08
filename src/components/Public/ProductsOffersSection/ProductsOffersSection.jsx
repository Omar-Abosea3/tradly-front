import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Placeholder } from "rsuite";

export default function ProductsOffersSection() {
  const [allProducts, setallProducts] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToProductPage = (id) => {
    navigate(`/product-detailes/${id}`);
  }
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: localStorage.getItem("pageDir") === "rtl" ? false : true,
    autoplaySpeed: 4000,
    arrows: false,
    rtl: localStorage.getItem("pageDir") === "rtl" ? true : false,
    cssEase: "ease",
    useCSS: true,
    pauseOnHover: true,
  };
  async function getAllProducts() {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_APIBASEURL}/products`
      );
      setallProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="row mb-4 justify-content-center">
        {!allProducts ? (
          <div className="px-3">
            <Placeholder.Graph
              active
              height={"80vh"}
              className="rounded-5"
              width={"100%"}
            />
          </div>
        ) : (
          <Slider {...settings2}>
            {allProducts.map((pro, index) =>
              pro.appliedDiscount !== 0 && (
                <div
                  key={index}
                  className="product product2 position-relative overflow-hidden"
                >

                  <figure
                    style={{ height: "80vh" }}
                    className="overflow-hidden position-relative mb-0"
                  >
                    <img
                      className="w-100 proImg"
                      src={pro.images[0].secure_url}
                      alt={pro.title}
                    />
                    <figcaption className="py-2 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center align-content-center px-5 flex-wrap bg-black bg-opacity-25">
                      <h2 className="ProTitle fs-1 w-100 text-truncate mb-2">
                        This is {pro.title}
                      </h2>
                      <p className="w-100 text-white fs-5  mb-2">
                        {t("public.pastProductPrice")}
                        <span className="text-decoration-line-through text-danger">
                          {pro.price}
                        </span>{" "}
                        {t("public.newProductPrice")}
                        <span className="text-warning">
                          {pro.priceAfterDiscount}
                        </span>
                      </p>
                      <div className="w-100">
                        
                          <button
                            className="btn btn-outline-light"
                            title="detailes"
                            onClick={() => {navigateToProductPage(pro._id)}}
                          >
                            {" "}
                            {t("public.seaProductDetailes")}{" "}
                            <i className="fa fa-arrow-right"></i>
                          </button>
                       
                      </div>
                    </figcaption>
                  </figure>
                </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
