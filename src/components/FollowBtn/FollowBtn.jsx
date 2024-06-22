import axios from 'axios';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookies/src/cookies';
import { getFavBrandData } from '../../Store/brandSlice';
export default function FollowBtn(props) {
    const dispatch = useDispatch();
    const myfavBrands = useSelector((state) => state.favBrands.favBrands);
    const { id } = props; 
    async function followStore(brandId){
        console.log(myfavBrands)
        const decodedToken = Cookies.getItem('token');
        $(`#${id}`).html('<i class="fa-solid fa-beat fa-ellipsis"></i>');
        try {
            console.log(decodedToken);
            const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/wishlist?brandId=${brandId}`, {}, {
                headers:{
                    "bearertoken": decodedToken,
                }
            });
            
            console.log(data);
            $(`#${id}`).html('Following <i class="bi bi-check-lg"></i>');
            dispatch(getFavBrandData());
        } catch (error) {
            $(`#${id}`).html('Follow');
            console.log(error);
            $('#errMsg11').slideDown(500 , function(){
                setTimeout(() => {
                    $('#errMsg11').slideUp(500)
                }, 1500);
            })
        }
    }

  return <>
  
    <button id={id} onClick={(e)=>{followStore(id)}} >Follow</button>
  </>
}
