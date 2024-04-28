import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LodingScrean from '../loadingScreen/LodingScrean';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function SubCategories() {
    const [Subcategories, setSubcategories] = useState(null);
    async function getSubcategories() {
      try {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories');
        console.log(data);
        setSubcategories(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(function () {
      getSubcategories();
    },[])
  
    return <>
      <Helmet>
          <title>Subcategories</title>
      </Helmet>
      {Subcategories == null ? <LodingScrean /> : <div className="container-fluid px-5 py-5 my-5">
        {console.log(Subcategories)}
        <div className="row py-5 gx-1 gy-1">
          {Subcategories.map((item) => <div key={item._id} className='col-lg-3 col-md-4 col-6'>
                          <Link to={`/subcategories/${item._id}`} className='text-decoration-none link-light'>
                              <figure style={{ height: '300px' }} className='position-relative mb-0 overflow-hidden'>
                                  <figcaption className='bg-dark bg-opacity-75 text-light position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                                      <h3>{item.slug}</h3>
                                  </figcaption>
                              </figure>
                          </Link>
                      </div>)}
                </div>
            </div>}
  
    </>
}
