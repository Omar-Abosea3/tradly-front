import { Link } from "react-router-dom";


export default function NavBarInLargeScreen({
    curUser,
    numOfFavStors,
    numOfCartItems,
    wishlistProductsItems,

}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg  sticky-top flex-wrap navbarInLargeScreens">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            {" "}
            <img
              src={require("../../assets/omx-ecommerce-low-resolution-logo-color-on-transparent-background.png")}
              alt="logo"
              style={{ width: "150px" }}
            />{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {curUser ? (
              <>
                <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to={"/home"}
                      className="nav-link active Home d-flex flex-wrap justify-content-center align-items-center align-content-center"
                      aria-current="page"
                    >
                      <i className="bi fs-4 w-100 text-center bi-house-door"></i>
                      <span className="text-center w-100"> Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/brands"}
                      className="nav-link active d-flex flex-wrap justify-content-center align-items-center align-content-center"
                      aria-current="page"
                    >
                      <i className="bi text-center w-100 fs-4 bi-shop-window position-relative"></i>
                      <span className="text-center w-100"> Brands</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/cart"}
                      className="nav-link d-flex flex-wrap justify-content-center align-items-center align-content-center"
                    >
                      <i className="bi text-center w-100 fs-4 bi-cart position-relative">
                        {" "}
                        <div className="favBrandCounter position-absolute bottom-50 start-50">
                          <span className="fs-6">{numOfCartItems}</span>
                        </div>{" "}
                      </i>
                      <span className="text-center w-100">Cart</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/profile/wishlist"}
                      className="nav-link d-flex flex-wrap justify-content-center align-items-center align-content-center"
                    >
                      <i className="bi text-center w-100 fs-4 bi-heart position-relative">
                        {" "}
                        <div
                          style={{ left: "50%" }}
                          className="favBrandCounter position-absolute bottom-50"
                        >
                          <span className="fs-6">{wishlistProductsItems}</span>
                        </div>{" "}
                      </i>
                      <span className="text-center w-100">Wishlist</span>
                    </Link>
                  </li>

                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to={"/profile"}
                      className="nav-link d-flex flex-wrap justify-content-center align-items-center align-content-center"
                    >
                      <i className="bi text-center w-100 fs-4 bi-person-circle position-relative">
                        {" "}
                      </i>
                      <span className="text-center w-100">Profile</span>
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to={"/home"}
                      className="nav-link active Home d-flex flex-wrap justify-content-center align-items-center align-content-center"
                      aria-current="page"
                    >
                      <i className="bi fs-4 w-100 text-center bi-house-door"></i>
                      <span className="text-center w-100"> Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/brands"}
                      className="nav-link active d-flex flex-wrap justify-content-center align-items-center align-content-center"
                      aria-current="page"
                    >
                      <i className="bi text-center w-100 fs-4 bi-shop-window position-relative"></i>
                      <span className="text-center w-100"> Brands</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/cart"}
                      className="nav-link d-flex flex-wrap justify-content-center align-items-center align-content-center"
                    >
                      <i className="bi text-center w-100 fs-4 bi-cart position-relative">
                        {" "}
                      </i>
                      <span className="text-center w-100">Cart</span>
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link link-dark" to={"/login"}>
                      <i className="bi bi-person"></i> Login
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
