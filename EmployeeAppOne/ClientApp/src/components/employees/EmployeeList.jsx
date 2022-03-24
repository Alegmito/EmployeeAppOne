import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {employeeService} from '../../_services/employeeService'

export function EmployeeList({match}) {
    const pageSpan = 4;
    const {path} = match;
    const [page, setPage] = useState(null);
    const [isRefresh, setRefresh] = useState(false);
    const [sortState, setSortState] = useState({
        column: 'None',
        direction: true
    })
    const colNames = ['Name', 'Email', 'BirthDate', 'Salary'];
    
    // sets dependecies to setEmployees, to avoid infinite loop
    useEffect(() => {
        employeeService.getPage(1, sortState.column, sortState.direction).then(x => setPage(x));
        setRefresh(false);
    },[isRefresh, sortState, setPage]);

    function deleteEmployee(id){
        setPage({
            ...page,
            results: page.results.map(x => {
                if (x.id === id)
                {
                    x.isDeleting = true;
                }
                return x;
            })}
        );
        employeeService._delete(id)
            .then(() => setRefresh(true))
    }

    function getPage(pageNum)
    {
        employeeService.getPage(pageNum, sortState.column, sortState.direction).then(x => setPage(x));
    }

    function makePages(currPage, span, lastPage)
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

    function sortColumn(colName)
    {
        // pressed on column once
        if (sortState.column !== colName)
        {    
            setSortState({
                column: colName,
                direction: true
            });
            return;
        }

        // pressed twice
        if (sortState.direction)
        {
            setSortState({
                column: colName,
                direction: false
            })
            return;
        }
        // pressed three times: disables direction
        setSortState({
            column: 'None',
            direction: true
        })
    }

    return(
        <div>
            <h1>Users</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Employee</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {colNames.map(colName =>
                            <th>
                                <button style={{width:"100%"}} className={sortState.column === colName ? "btn btn-outline-primary" : "btn btn-outline-secondary"} 
                            onClick={() => sortColumn(colName)}>{colName}{sortState.column === colName
                                ? sortState.direction ? "\u2191" : "\u2193" : ""}</button> 
                            </th>
                        )}
                        
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {page && page.results && page.results.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.birthDate}</td>
                            <td>{employee.salary}</td>
                            {/* <td>{employee.modifiedDate}</td> */}
                            <td style={{whiteSpace: 'nowrap'}}>
                                <Link to={`${path}/${employee.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteEmployee(employee.id)} 
                                className="btn btn-danger btn-delete-user"
                                disabled={employee.isDeleting}>
                                    {employee.isDeleting ?
                                        <span className='spinner-border spinner-border-sm'></span>
                                        : <span>Delete</span>    
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {page &&
            <nav aria-label="...">
            <ul className="pagination">
                <li className={page.currentPage === 1 ? "page-item disabled" : "page-item"} onClick={() => getPage(1)}>
                <a className="page-link" >1</a>
                </li>
                {page.currentPage - pageSpan > 1 && <li className="page-item disabled"><a className="page-link">...</a></li>}
                
                {makePages(page.currentPage, pageSpan, page.pageCount).map(x => 
                        <li className={page.currentPage === x ? "page-item disabled" : "page-item"} onClick={() => getPage(x)}>
                            <a className="page-link">{x}</a>
                        </li>)
                }
                {page.currentPage + pageSpan < page.pageCount && <li className="page-item disabled"><a className="page-link">...</a></li>}
                {page.pageCount > 1 && <li className={page.currentPage === page.pageCount ? "page-item disabled" : "page-item"}  onClick={() => getPage(page.pageCount)}>
                <a className="page-link">{page.pageCount}</a>
                </li>}
            </ul>
            </nav>
            }   
        </div>
    );
}

export default EmployeeList;