import React from 'react';

export default function Footer() {
    return <>
        <footer className='py-5 bg-dark'>
            <div className="container py-5">
                <div className="row gy-5">
                    <div className="col-lg-1 col-md-3 m-auto col-sm-6 d-flex col-6 px-2 align-self-center">
                        <img className='w-100' src={require('../../assets/logo192.png')} alt="Our Logo" />
                    </div>
                    <div className="col-lg-7 col-md-9 col-12 px-3">
                        <div className="d-flex justify-content-center align-items-start">
                            <div className="w-50 ">
                                <ul className='text-light footerUl list-unstyled'>
                                    <h3 className='mb-2'>Brands</h3>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.adidas.com.eg/en" target="_blank" rel="noopener noreferrer">Adidas.</a></li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.nike.com/eg/" target="_blank" rel="noopener noreferrer">Nike.</a></li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://eg.puma.com/" target="_blank" rel="noopener noreferrer">Puma.</a></li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.defacto.com/en-eg" target="_blank" rel="noopener noreferrer">Defacto.</a></li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.toshiba.com/tai/" target="_blank" rel="noopener noreferrer">Toshipa.</a></li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.sony.com/en-eg/homepage" target="_blank" rel="noopener noreferrer">Sony.</a></li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.samsung.com/eg/" target="_blank" rel="noopener noreferrer">Sammsung.</a></li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.lenovo.com/eg/en/" target="_blank" rel="noopener noreferrer">Lenovo.</a> </li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.dell.com/support/home/en-us" target="_blank" rel="noopener noreferrer">Dell.</a></li>
                                    <li><i className="bi bi-caret-right-fill"></i> <a className='text-decoration-none' href="https://www.hp.com/us-en/home.html" target="_blank" rel="noopener noreferrer">HP.</a></li>
                                </ul>
                            </div>
                            <div className="w-50">
                                <ul className='text-light footerUl list-unstyled'>
                                    <h3 className='mb-2'>Categories</h3>
                                    <li><i className="bi bi-caret-right-fill"></i> Men.</li>
                                    <li><i className="bi bi-caret-right-fill"></i> Women.</li>
                                    <li><i className="bi bi-caret-right-fill"></i> Youth.</li>
                                    <li><i className="bi bi-caret-right-fill"></i> Electoronics.</li>
                                    <li><i className="bi bi-caret-right-fill"></i> Games.</li>
                                    <li><i className="bi bi-caret-right-fill"></i> Furnature.</li>
                                    <li><i className="bi bi-caret-right-fill"></i> Accessories.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 footerInfo">
                        <h3 className='mb-3'>Get the latest and newest offers!</h3>
                        <div >
                            <input className='w-100 px-1 py-2 border-0 rounded-0 mb-3' placeholder='Email Address...' type="email" />
                            <button className='w-100 btn rounded-0'>Subscribe</button>
                        </div>
                        <div className="col-12 mt-5 d-flex justify-content-center align-items-center">
                            <div className="MyIcons2">
                                <i className='fa-brands fa-2x fa-facebook-f'></i>
                            </div>
                            <div className="MyIcons2">
                                <i className='fa-brands fa-2x fa-instagram'></i>
                            </div>
                            <div className="MyIcons2">
                                <i className='fa-brands fa-2x fa-paypal'></i>
                            </div>
                            <div className="MyIcons2">
                                <i className='fa fa-2x fa-vcard'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
