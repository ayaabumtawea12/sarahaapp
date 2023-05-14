import React from 'react';
import _ from 'lodash';

const Pagination = ({users,changepagenumber, pageNumber, pagesize}) => {
    let pagecount=Math.ceil(users.length/pagesize);
    if(pagecount === 1) return <></>;
    let pages = _.range(0,pagecount);
  return (
   <nav aria-label="Page navigation example">
  <ul className="pagination">
  {pages.map((page)=>{
    return( 
        <li className={page === pageNumber ? "page-item active" : "page-item"} onClick={()=> changepagenumber(page)}>
        <a className="page-link" href="#">
           {page+1} 
        </a>
        </li>

    );

  })}
      
   </ul>
</nav>

  )
}

export default Pagination
