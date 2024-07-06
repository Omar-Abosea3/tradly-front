import React from 'react'
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'rsuite'

export default function NavBarInSmallScreens({
  curUser,
  numOfCartItems,
  numOfFavStors,
  wishlistProductsItems,
}) {
  return (
    <>
      <div className="navbarInSmailScreans">
        <Navbar className="d-flex justify-content-center align-items-center">
          <Nav>
            <Nav.Item eventKey="1" title="home">
              <Link  to={'/home'} className='nav-link'>
                <i className="bi fs-4 w-100 text-center bi-house-door"></i>
              </Link>
            </Nav.Item>
            <Nav.Item eventKey="2" title="brands">
              <Link  to={'/brands'} className='nav-link'>
                <i className="bi text-center w-100 fs-4 bi-shop-window position-relative"></i>
              </Link>
            </Nav.Item>
            <Nav.Item eventKey="3" title="Logo">
                <Link to={'/'} className='text-decoration-none'>
                    <div className='navBarLogoInSmallScreen'>T</div>
                </Link>
            </Nav.Item>
            <Nav.Item eventKey="3" title="cart">
                <Link  to={'/cart'} className='nav-link'>
                    <i className="bi text-center w-100 fs-4 bi-cart position-relative">
                        {curUser && <div className="favBrandCounter position-absolute bottom-50 start-50">
                            <span className="fs-6">{numOfCartItems}</span>
                        </div>}
                    </i>   
                </Link>
            </Nav.Item>
            <Nav.Item eventKey="3" title="wishlist">
                <Link  to={'/wishlist'} className='nav-link'>
                    <i className="bi text-center w-100 fs-4 bi-heart position-relative">
                        <div
                          style={{ left: "50%" }}
                          className="favBrandCounter position-absolute bottom-50"
                        >
                          <span className="fs-6">{wishlistProductsItems}</span>
                        </div>       
                    </i>
                </Link>
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              title={curUser ? "profile" : "login"}
            >
              <Link  to={curUser?'/profile':'/login'} className='nav-link'><i className="bi bi-person fs-4"></i></Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    </>
  );
}