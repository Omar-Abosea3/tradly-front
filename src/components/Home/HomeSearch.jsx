import React from 'react'

export default function HomeSearch({
    handleSearchTextChange,
    toggleDropdown,
    isOpen,
    openTextDetectionInput,
    openImageDetectionInput,
    getProductsByTextDetection,
    getProductsWithImageDetection,
}) {
  return <>
    <div className="container mt-5">
          <div className="w-100 row justify-content-center align-items-center gx-2">
            <div className="col-lg-6 col-12 d-flex align-items-center">
              <div className="searchInputContainer col-10 d-flex align-items-center gap-1 py-1 px-1 rounded-5">
                <div
                  onClick={handleSearchTextChange}
                  title="click to search"
                  className="serchIconContainer"
                >
                  <i className="bi bi-search"></i>
                </div>
                <input
                  type="text"
                  placeholder="search for products"
                  className="h-100 border-0"
                  id="searchTextInput"
                />
              </div>
              <div className="dropdown col-2">
                <button className="dropdown-icon" onClick={toggleDropdown}>
                  <i className="bi fs-1 bi-camera-fill"></i>
                </button>
                {isOpen && (
                  <div className="dropdown-menu">
                    <button onClick={openTextDetectionInput}>
                      <i className="bi bi-file-text"></i> Scan Text{" "}
                      <input
                        type="file"
                        onChange={(e) => {
                          getProductsByTextDetection(e);
                        }}
                        id="scanTextInput"
                        className="d-none"
                      />
                    </button>
                    <button onClick={openImageDetectionInput}>
                      <i className="bi bi-file-earmark-image"></i> Scan Image{" "}
                      <input
                        type="file"
                        onChange={(e) => {
                          getProductsWithImageDetection(e);
                        }}
                        id="scanImageInput"
                        className="d-none"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  </>
}
