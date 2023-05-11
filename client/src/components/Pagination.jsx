import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';


function Items({ currentItems }) {
  return (
    <>
       {currentItems &&
        currentItems.map((hangout, idx) => (
          <div idx={idx}>
            <h2>
              Title:{hangout.title}- Description:{hangout.description}- City:{hangout.city}
          
            </h2>
            {/* <img src={user.image} alt="dog" width="250" height="250"></img> */}
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, hangoutList }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
  
    setCurrentItems(hangoutList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(hangoutList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hangoutList.length;
 
    setItemOffset(newOffset);
  };

  return (
    <>
       <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;