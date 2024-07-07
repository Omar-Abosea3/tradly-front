
import noProducts from "../../assets/EmptyPtoducts.svg";

export default function NoProducts() {
  return <>
    <div
          id="noProducts"
          className="d-flex vh-100 d-none flex-wrap justify-content-center align-items-center"
        >
          <img className="w-25" src={noProducts} alt="no products" />
        </div>
  </>
}
