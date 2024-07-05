

export default function FiltersAside({
  resetFilters,
  saveFilters,
  getCustomBrand,
  allBrands,
  getCustomCategory,
  allCategories,
  extractPriceAndSetFilters,
  toggleAside,
  closeFilters,
}) {
  return (
    <>
      <div className="position-fixed position-relative top-0 end-100 filtersContainerparent">
        <div className="closeFilterSideBar">
          <i onClick={closeFilters} className="bi bi-x"></i>
        </div>
        <div
          id="toggleAside"
          onClick={toggleAside}
          className="position-absolute start-100 top-50 bg-light px-3 py-1 d-flex justify-content-center align-items-center rounded-3 shadow-lg"
        >
          <i className="bi bi-sliders fs-3"></i>
        </div>
        <aside className="position-absolute start-0 end-0 top-0 border-0 py-5 px-2 shadow-lg filtersContainer">
          <div className="accordion w-100" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  Price
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div
                    id="price"
                    onClick={(e) => {
                      extractPriceAndSetFilters(e);
                    }}
                    className="d-flex w-100 filtersFontSize justify-content-center align-items-center flex-wrap"
                  >
                    <label className="w-100 mb-2" htmlFor="price1">
                      <input
                        type="radio"
                        id="price1"
                        className="form-check-input me-1"
                        value={"between 0 and 1000"}
                        name="price"
                      />
                      between 0 and 1000
                    </label>
                    <label className="w-100 mb-2" htmlFor="price2">
                      <input
                        type="radio"
                        id="price2"
                        className="form-check-input me-1"
                        value={"between 1000 and 4000"}
                        name="price"
                      />
                      between 1000 and 4000
                    </label>
                    <label className="w-100 mb-2" htmlFor="price3">
                      <input
                        type="radio"
                        id="price3"
                        className="form-check-input me-1"
                        value={"between 4000 and 8000"}
                        name="price"
                      />
                      between 4000 and 8000
                    </label>
                    <label className="w-100 mb-2" htmlFor="price4">
                      <input
                        type="radio"
                        id="price4"
                        className="form-check-input me-1"
                        value={"between 8000 and 20000"}
                        name="price"
                      />
                      between 8000 and 20000
                    </label>
                    <label className="w-100 mb-2" htmlFor="price5">
                      <input
                        type="radio"
                        id="price5"
                        className="form-check-input me-1"
                        value={"between 20000 and 30000"}
                        name="price"
                      />
                      between 20000 and 30000
                    </label>
                    <label className="w-100 mb-2" htmlFor="price6">
                      <input
                        type="radio"
                        id="price6"
                        className="form-check-input me-1"
                        value={"between 30000 and 50000"}
                        name="price"
                      />
                      between 30000 and 50000
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Category
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  <div
                    id="categories"
                    className="d-flex filtersFontSize w-100 justify-content-center align-items-center flex-wrap"
                  >
                    {!allCategories ? (
                      ""
                    ) : (
                      <>
                        {allCategories.map((Cat) => (
                          <label
                            onChange={(e) => {
                              getCustomCategory(e, Cat._id);
                            }}
                            key={Cat._id}
                            className="w-100 mb-2"
                            htmlFor={`filterCat${Cat._id}`}
                          >
                            <input
                              type="checkbox"
                              id={`filterCat${Cat._id}`}
                              className="form-check-input me-1"
                              value={Cat._id}
                              name="Category"
                            />
                            {Cat.name}
                          </label>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  brands
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  <div
                    id="brands"
                    className="d-flex filtersFontSize w-100 justify-content-center align-items-center flex-wrap"
                  >
                    {!allBrands ? (
                      ""
                    ) : (
                      <>
                        {allBrands.map((brand) => (
                          <label
                            onChange={(e) => {
                              getCustomBrand(e, brand._id);
                            }}
                            key={brand._id}
                            className="w-100 mb-2"
                            htmlFor={`filterbrand${brand._id}`}
                          >
                            <input
                              type="checkbox"
                              id={`filterbrand${brand._id}`}
                              className="form-check-input me-1"
                              value={brand._id}
                              name="brand"
                            />
                            {brand.name}
                          </label>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              id="saveFilterBtn"
              onClick={saveFilters}
              className="btn btn-primary mx-2"
            >
              save
            </button>
            <button
              id="resetFilterBtn"
              onClick={resetFilters}
              className="btn btn-danger"
            >
              reset
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
