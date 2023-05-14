 
import _ from 'lodash';
const pagination = (pageSize,pageNumber,users) => {
    let startIndex=pageNumber * pageSize;
    return _(users).slice(startIndex).take(pageSize).value();
  
}

export default pagination;
