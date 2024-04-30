import React from 'react';

export default function LodingScrean() {
  return <>
    <div className="loadingScreen bg-white vh-100 d-flex justify-content-center align-items-center">
            <img src={require('../../assets/loadingScrean.gif')} alt="loadingScrean" className='w-25'/>
     </div>
  </>
}
