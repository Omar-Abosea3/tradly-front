import axios from "axios";
import $ from 'jquery';
import Cookies from "js-cookies";
import { Message, toaster } from "rsuite";
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
        toaster.push(<Message closable showIcon type="success">product added to cart successfully .</Message> , {placement:'topCenter' , duration:'1500'});
        return true;
      } catch (error) {
        console.log(error);
        toaster.push(<Message closable showIcon type="error">you must login first .</Message> , {placement:'topCenter' , duration:'1500'});
        return false;
      }
}
