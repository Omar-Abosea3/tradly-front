import axios from 'axios';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { getFavBrandData } from '../../Store/brandSlice';
import Cookies from 'js-cookies';

export default function UnfollowBtn(props) {
    const dispatch = useDispatch();
    const { id } = props; 
    async function unFollowStore(brandId){
        const decodedToken = Cookies.getItem('token');
        $(`#${id}`).html('<i class="fa-solid fa-beat fa-ellipsis"></i>');
        try {
            console.log(decodedToken);
            const { data } = await axios.patch(`https://ecommerce-rby0.onrender.com/wishlist/removebrand/${brandId}`, {}, {
                headers:{
                    "bearertoken": decodedToken,
                }
            });
            console.log(data);
            $(`#${id}`).html('Follow');
            dispatch(getFavBrandData());
        } catch (error) {
            $(`#${id}`).html('Following <i class="bi bi-check-lg"></i>');
            console.log(error);
        }
    }
  return <>
    <button id={id} onClick={()=>{unFollowStore(id)}}>Following <i className="bi bi-check-lg"></i></button>
  </>
}
