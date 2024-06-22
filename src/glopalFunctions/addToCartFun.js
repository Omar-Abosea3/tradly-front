import axios from "axios";
import $ from 'jquery';
import Cookies from "js-cookies";
export async function addToCartFunction(id , quantity = 1){
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_APIBASEURL}/cart`,
          {
            productId: id,
            quantity
          },
          {
            headers: {
              bearertoken: Cookies.getItem("token"),
            },
          }
        );
        if (data.message === "success") {
            console.log('success');
            $('.sucMsg').slideDown(500, function () {
                setTimeout(() => {
                    $('.sucMsg').slideUp(500);
                }, 2000);
            })
            return true;
        }
      } catch (error) {
        console.log(error);
          $(".notLogin").slideDown(500, function () {
            setTimeout(() => {
              $(".notLogin").slideUp(500);
            }, 2000);
          });
        return false;
      }
}
