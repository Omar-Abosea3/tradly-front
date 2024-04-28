import axios from "axios";
import $ from 'jquery';
export async function addToCartFunction(id){
    try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
          {
            productId: id,
          },
          {
            headers: {
              token: localStorage.getItem("tkn1"),
            },
          }
        );
        if (data.status === "success") {
            
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
