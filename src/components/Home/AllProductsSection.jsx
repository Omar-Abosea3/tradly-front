import ProductCard from "../ProductCard/ProductCard";
import ProductCardLoading from "../ProductCard/ProductCardLoading/ProductCardLoading";


export default function AllProductsSection({
    product,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
    favIds
}) {
  return <>
        <div className="container-fluid mt-5">
          <div className="row justify-content-center gy-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="titleFontSize">
                <i className="bi bi-border-all"></i> All Products.
              </h2>
              <div>
                <button
                  className="paginationBtn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-caret-left-fill"></i>
                </button>
                <span className="mb-0 text-center pageNumber">
                  {currentPage || 1}
                </span>
                <button
                  className="paginationBtn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-caret-right-fill"></i>
                </button>
              </div>
            </div>
            <div
              style={{ display: "none", zIndex: "9999", bottom: "2%" }}
              className="sucMsg p-3 mt-0 alert bg-black text-white position-fixed"
            >
              <i className="fa-solid fa-circle-check"></i> Product Added
              Successfully .
            </div>
            {product ? (
              product.products.map((pro, index) => (
                <div
                  id="homeTop"
                  key={index}
                  className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3"
                >
                  <ProductCard pro={pro} favIds={favIds} />
                </div>
              ))
            ) : (
              <ProductCardLoading />
            )}
          </div>
        </div>
  </>
}
