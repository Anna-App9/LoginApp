import React from 'react';


const Pagination =({perPage, totalNews})=>{

    const pageNumbers=[];

    for (let i=1; i <= Math.ceil(totalNews / perPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
            {pageNumbers.map(number=>(
                <li key={number} className='page-item'>
                    <a href='!#' className='page-link'>{number}</a>

                </li>
            ))}
        </nav>
    )

}


export default Pagination;