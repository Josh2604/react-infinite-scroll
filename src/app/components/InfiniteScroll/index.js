import React, { useState } from 'react';
import useScroll from './../../hooks/useScroll';
import './styles.css';

function ScrollImplementation() {
  const [pageNumber, setPageNumber] = useState(1)
  const { loading, error, data, hasMore, details } = useScroll({ pageNo: pageNumber, limit: 10, apiPath: 'http://localhost:8080/posts' });

  function HandlerScroll(evt) {
    const { scrollTop, clientHeight, scrollHeight } = evt.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && loading === false && hasMore === true) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }
  return (
    <div className="container">
      <h1 className="display-6">Posts</h1>
      <span class="badge rounded-pill bg-primary"> No. paginas: {details.pages}</span>
      <span class="badge rounded-pill bg-info text-dark">Items: {details.total}</span>
      <div className="container-fluid posts-container"
        onScroll={HandlerScroll}
      >
        {
          data.map((element, key) => {
            return (
              <div key={key} className="card card-container">
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">{element.body}</p>
                </div>
              </div>
            )
          })
        }
        <div>{error && 'Error...'}</div>
      </div>
    </div>
  )
}
export default ScrollImplementation;