// import React, { Component } from 'react';
import React from 'react';

const Pagination = ({pages, currentPage, handleClick}) => {
  console.log('pages:', pages);
  return (
    <ul className="pagination text-center" role="navigation" aria-label="Pagination">
      <li className="pagination-previous"><a href="#" aria-label="Previous page">Previous</a></li>
      {pages.map((page) => {
        return (
          <li key={page}>
            <a href="#"
              className={(page + 1) == currentPage ? 'current' : ''}
              onClick={handleClick.bind(this, parseInt(page) + 1)}
              aria-label={'Page ' + (parseInt(page) + 1)}
            >
              {page + 1}
            </a>
          </li>
        )
      })}
      <li className="pagination-next"><a href="#" aria-label="Next page">Next</a></li>
    </ul>
  )
};


export default Pagination;


// export default class Pagination extends Component {
//   constructor(props) {
//     super(props);
//     console.log('Pagination props:', props);
//   }
//
//   render() {
//     return (
//       <ul className="pagination text-center" role="navigation" aria-label="Pagination">
//         <li className="pagination-previous"><a href="#" aria-label="Previous page">Previous</a></li>
//         {this.props.pages.map((page) => {
//           return (
//             <li key={page}>
//               <a href="#"
//                 className={(page + 1) == this.props.currentPage ? 'current' : ''}
//                 onClick={this.props.handleClick.bind(this)}
//                 aria-label={'Page ' + (parseInt(page) + 1)}
//               >
//                 {page + 1}
//               </a>
//             </li>
//           )
//         })}
//         <li className="pagination-next"><a href="#" aria-label="Next page">Next</a></li>
//       </ul>
//     )
//   }
// }
