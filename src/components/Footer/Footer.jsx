import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
export default function Footer() {
    const {t} = useTranslation();
    return <>
        <footer className='py-5'>
            <div className="container py-5">
                <div className="row gy-5">
                    <div className="col-lg-2 col-md-3 m-auto col-sm-6 d-flex col-6 px-2 align-self-center">
                        <img id='footerLogo' className='w-100' src={require('../../assets/logo192.png')} alt="Our Logo" />
                    </div>
                    <div className="col-lg-8 col-md-9 col-12">
                        <div className='text-center px-5 aboutUs'>
                            <h3>{t('footer.About_Us_Title')}</h3>
                            <p>{t('footer.About_Us')}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-12 footerInfo align-self-center">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <div className="MyIcons2">
                                <Link to={'/'} target='_blank'><i className='fa-brands fa-2x fa-facebook-f'></i></Link>
                            </div>
                            <div className="MyIcons2">
                                <Link to={'/'} target='_blank'><i className='fa-brands fa-2x fa-instagram'></i></Link>
                            </div>
                            <div className="MyIcons2">
                                <Link to={'/'} target='_blank'><i className='fa-brands fa-2x fa-paypal'></i></Link>
                            </div>
                            <div className="MyIcons2">
                                <Link to={'/'} target='_blank'><i className='fa fa-2x fa-vcard'></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
