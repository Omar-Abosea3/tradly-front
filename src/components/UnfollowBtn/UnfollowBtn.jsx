import axios from 'axios';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getFavBrandData } from '../../Store/brandSlice';
import Cookies from 'js-cookies';
import { useNavigate } from 'react-router-dom';

export default function UnfollowBtn(props) {
    const dispatch = useDispatch();
    const myfavBrands = useSelector((state) => state.favBrands.favBrands);
    const { id , page } = props; 
    const navigate = useNavigate();
    async function unFollowStore(brandId){
        const decodedToken = Cookies.getItem('token');
        $(`#brand${id}`).html('<i class="fa-solid fa-beat fa-ellipsis"></i>');
        if(page === 'wishlist'){
            $(`#brandCard${id}`).slideUp(2000);
            $('#imPortantLayer').removeClass('d-none');
        }
        try {
            console.log(decodedToken);
            const { data } = await axios.patch(`${process.env.REACT_APP_APIBASEURL}/wishlist/removebrand/${brandId}`, {}, {
                headers:{
                    "bearertoken": decodedToken,
                }
            });
            console.log(data);
            if(page === 'wishlist'){
                setTimeout(() => {
                    $('#imPortantLayer').addClass('d-none');
                }, 1500);
                if(myfavBrands.length === 1 || myfavBrands.length === 0){
                    navigate('/')
                }
            }
            $(`#brand${id}`).html('Follow');
            dispatch(getFavBrandData());
        } catch (error) {
            if(page === 'wishlist'){
                $(`#brandCard${id}`).slideDown(2000);
                $('#imPortantLayer').addClass('d-none');
            }
            $(`#brand${id}`).html('Following <i class="bi bi-check-lg"></i>');
            console.log(error);
        }
    }
  return <>
    <button id={`brand${id}`} onClick={()=>{unFollowStore(id)}}>Following <i className="bi bi-check-lg"></i></button>
  </>
}
