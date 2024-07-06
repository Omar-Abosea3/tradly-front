import axios from "axios";
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { getFavProductsData } from "../../Store/getLoggedUserWishlist";
import { useNavigate } from "react-router-dom";
import Cookies from "../../../node_modules/js-cookies/src/cookies";
import { Message, toaster } from "rsuite";

export default function AddToWishlistBtn(props) {
    const {id , classes ,removeKey , page} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const wishlistProducts = useSelector((store)=>store.getFavProductsSlice.wishlistProducts);
    async function addToWishlist(productId){
        $(`#addWishList${productId}`).removeClass('bi-heart').addClass('text-danger bi-heart-fill');
        try {
           const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/wishlist?productId=${productId}` , {} ,{
            headers:  { bearertoken: Cookies.getItem("token") },
           });
           
           console.log(data);
           dispatch(getFavProductsData());
        //    $(`#addWishList${productId}`).removeClass('bi-heart').addClass('text-danger bi-heart-fill');
        } catch (error) {
            $(`#addWishList${productId}`).addClass('bi-heart').removeClass('text-danger bi-heart-fill');
            toaster.push(<Message closable showIcon type="error">you must login first .</Message> , {placement:'topCenter' , duration:'1500'});
            console.log(error);
        }
    }

    async function removeFromWishlist(productId){
        $(`#addWishList${productId}`).removeClass('text-danger bi-heart-fill').addClass('bi-heart');
        if(page === 'wishlist'){
            $(`#${productId}`).slideUp(2000);
            $('#imPortantLayer').removeClass('d-none');
        }
        try {
           const { data } = await axios.patch(`${process.env.REACT_APP_APIBASEURL}/wishlist/removeproduct/${productId}` , {} ,{
                headers: {bearertoken:Cookies.getItem("token")},
            });
           console.log(data);
            dispatch(getFavProductsData());
            if(page === 'wishlist'){
                setTimeout(() => {
                    $('#imPortantLayer').addClass('d-none');
                }, 1500);
                if(wishlistProducts.length === 1 || wishlistProducts.length === 0){
                    navigate('/')
                }
            }
           $(`#addWishList${id}`).removeClass('text-danger bi-heart-fill').addClass('bi-heart');
        } catch (error) {
            $('#imPortantLayer').addClass('d-none');
            $(`#addWishList${productId}`).addClass('text-danger bi-heart-fill').removeClass('bi-heart');
            if(page === 'wishlist'){
                $(`#${productId}`).slideDown(3000);
            }
            $('.UnAuthMsg').slideDown(500 , function(){
                setTimeout(() => {
                    $('.UnAuthMsg').slideUp(500);
                }, 2000);
            })
            console.log(error);
        }
    }
    function toggleWishlist(){
        if(classes === 'bi bi-heart fs-4 px-2'){
            addToWishlist(id);
        }else if(classes === 'bi text-danger bi-heart-fill fs-4 px-2'){
            removeFromWishlist(id);
        }
    }
  return <>
        <h4 style={{cursor:'pointer'}} className="mb-0ps-2 my-2"><i id={`addWishList${id}`} onClick={() => {toggleWishlist()}} className={classes}></i></h4>
  </>
}