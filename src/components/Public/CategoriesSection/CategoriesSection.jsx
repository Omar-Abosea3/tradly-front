import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Placeholder } from "rsuite";


export default function CategoriesSection() {
    const [allCategories, setallCategories] = useState(null);
    const {t} = useTranslation();
    const allCatArr = [1,2,3,4];
    async function getAllCategories(){
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/categories`);
            setallCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllCategories();
    },[])
  return (
    <>
      <div className="row px-lg-3 px-md-1 px-0 gx-1 gy-1">
        <h3 className='mb-3 titleFontSize'><i className="bi bi-collection"></i> {t('public.allCategories')}</h3>
        {!allCategories
        ? allCatArr.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-6">
              <Placeholder.Graph active />
            </div>
          ))
        : allCategories.map((item) => (
            <div key={item._id} className="col-lg-3 col-md-4 col-6">
              <Link
                to={`category/${item._id}`}
                className="text-decoration-none link-light"
              >
                <figure
                  className="position-relative mb-0 overflow-hidden"
                >
                  <img
                    style={{ objectFit: "contain" , aspectRatio:'2/1'}}
                    src={item.image.secure_url}
                    alt={item.name}
                    className="w-100 h-100"
                  />
                  <figcaption className="bg-dark bg-opacity-25 text-light position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
                    <h3>{item.slug}</h3>
                  </figcaption>
                </figure>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
