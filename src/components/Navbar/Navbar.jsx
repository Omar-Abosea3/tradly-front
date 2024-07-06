import { useSelector } from 'react-redux';
import './style.css';
import NavBarInLargeScreen from './NavBarInLargeScreen';
import NavBarInSmallScreens from './NavBarInSmallScreens';

export default function Navbar({clearUserData,curUser,changeLanguage,setDirection}) {
    const numOfCartItems = useSelector((state) => state.getCartItemSlice.cartItems);
    const wishlistProductsItems = useSelector((store)=>store.getFavProductsSlice.wishlistItems);
    const numOfFavStors = useSelector((state) => state.favBrands.favBrandItems);
  return (
    <>
      <NavBarInLargeScreen
        curUser={curUser}
        numOfCartItems={numOfCartItems}
        numOfFavStors={numOfFavStors}
        wishlistProductsItems={wishlistProductsItems}
      />
      <NavBarInSmallScreens
        curUser={curUser}
        numOfCartItems={numOfCartItems}
        numOfFavStors={numOfFavStors}
        wishlistProductsItems={wishlistProductsItems}
      />
    </>
  );
}
