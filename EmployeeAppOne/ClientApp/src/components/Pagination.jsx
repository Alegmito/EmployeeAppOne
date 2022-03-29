import React from 'react'

export default function Pagination({page, getPage, pageSpan})
{
    function makePagesArray(currPage, span, lastPage)
    {
        const low = currPage - span;
        const high = currPage + span;
        var list = [];
        for (let i = low; i <= high; i++){
            if(i > 1 && i < lastPage)
            {list.push(i);}
        }
        return list;
    }

    return(
    <div>
        {page &&
        <nav aria-label="...">
            <ul className="pagination">
                <li className={page.currentPage === 1 ? "page-item disabled" : "page-item"} onClick={() => getPage(1)}>
                <a className="page-link" >1</a>
                </li>
                {page.currentPage - pageSpan > 2 && <li className="page-item disabled"><a className="page-link">...</a></li>}
                
                {makePagesArray(page.currentPage, pageSpan, page.pageCount).map(x => 
                        <li key={x} className={page.currentPage === x ? "page-item disabled" : "page-item"} onClick={() => getPage(x)}>
                            <a className="page-link">{x}</a>
                        </li>)
                }
                {page.currentPage + pageSpan < page.pageCount - 1 && <li className="page-item disabled"><a className="page-link">...</a></li>}
                {page.pageCount > 1 && <li className={page.currentPage === page.pageCount ? "page-item disabled" : "page-item"}  onClick={() => getPage(page.pageCount)}>
                <a className="page-link">{page.pageCount}</a>
                </li>}
            </ul>
        </nav>
    }
    </div>);   
}