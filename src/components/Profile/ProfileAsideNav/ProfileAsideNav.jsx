
import { Link } from 'react-router-dom';
import './style.css';
import { useTranslation } from 'react-i18next';
export default function ProfileAsideNav({changeLanguage , clearUserData}) {
  const {i18n} = useTranslation();
  return (
    <>
      <div
        id="profileAsideNav"
        className="position-sticky top-0 bottom-0"
      >
        <div id="profileLinksContainer">
          <ul className="list-unstyled">
            <li className="nav-item mb-3">
              <Link className="nav-link d-flex flex-wrap justify-content-center align-items-center" to={"/profile"} title='profile'>
                {" "}
                <span className="w-100 text-center">
                  <i className="bi bi-person"></i>
                </span>{" "}
                <span className="text-center navProfileText">profile</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link d-flex flex-wrap justify-content-center align-items-center" to={"/profile/wishlist"} title='Wishlist Products'>
                {" "}
                <span className="w-100 text-center">
                  <i className="bi bi-heart"></i>
                </span>{" "}
                <span className="text-center navProfileText">Wishlist Products</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link d-flex flex-wrap justify-content-center align-items-center" to={"/profile/orders"} title='Orders History'>
                {" "}
                <span className="w-100 text-center">
                  <i className="bi bi-clock-history"></i>
                </span>{" "}
                <span className="text-center navProfileText">Orders History</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link d-flex flex-wrap justify-content-center align-items-center" to={"/profile/fav-stors"} title='Wishlist Stors'>
                {" "}
                <span className="w-100 text-center">
                    <i className="bi bi-shop"></i>
                </span>{" "}
                <span className="text-center navProfileText">Wishlist Stors</span>
              </Link>
            </li>
            {/* <li className="nav-item mb-3 d-flex flex-wrap justify-content-center align-items-center">
              <i className="bi bi-translate" title='language'></i> <p onClick={changeLanguage} className='m-0 langSwitsher'><span className='text-success'>({i18n.language})</span></p>
            </li> */}
            <li className="nav-item mb-3">
              <button onClick={clearUserData} className="nav-link d-flex flex-wrap justify-content-center align-items-center" title='Log Out'>
                {" "}
                <span className="w-100 text-center">
                    <i className="bi bi-power"></i>
                </span>{" "}
                <span className="text-center navProfileText">Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
