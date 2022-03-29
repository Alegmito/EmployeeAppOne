import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useEmployeeActions, useTimeConverter} from '../../_services'
import { alertService } from '../../_services/alertService';
import Pagination from '../Pagination';

export {EmployeeList};

function EmployeeList({match}) {
    const currTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeConverter = useTimeConverter();
    // const modifiedFormatter = new Intl.DateTimeFormat(undefined,{
    //     timeZone: timeZone,
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit"
    // })
    const pageSpan = 4;
    const {path} = match;
    const [page, setPage] = useState(null);
    const [isRefresh, setRefresh] = useState(false);
    const [sortState, setSortState] = useState({
        column: 'None',
        direction: true
    })
    const colNames = ['Id','Name', 'Email', 'BirthDate', 'Salary', 'modifiedDate'];
    const employeeActions = useEmployeeActions();
    
    // sets dependecies to setEmployees, to avoid infinite loop
    useEffect(() => {
        employeeActions.getPage(1, sortState.column, sortState.direction).then(x => setPage(x));
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
        employeeActions._delete(id)
            .then(() => {
                setRefresh(true);
                alertService.success("Employee deleted", {keepAfterRouteChange: true})
            })
    }

    function getPage(pageNum)
    {
        employeeActions.getPage(pageNum, sortState.column, sortState.direction).then(x => setPage(x));
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
            <h1>Employees</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Employee</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {colNames.map(colName => colName !== 'Id' &&
                            <th key={colName}>
                                <button  style={{width:"100%"}} className={sortState.column === colName ? "btn btn-outline-primary" : "btn btn-outline-secondary"} 
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
                            <td>{timeConverter.createUtcDateString(employee.birthDate)}</td>
                            <td>{employee.salary}</td>
                            <td>{timeConverter.createUtcDateTime(employee.modifiedDate).toLocaleString()}</td>
                            <td style={{whiteSpace: 'nowrap'}}>
                                <Link to={`${path}/${employee.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                 
                                <button onClick={() => deleteEmployee(employee.id)} 
                                className="btn btn-danger btn-sm btn-delete-user"
                                disabled={employee.isDeleting}>
                                    {employee.isDeleting ?
                                        <span className='spinner-border spinner-border-sm'></span>
                                        : "Delete"   
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination page={page} getPage={getPage} pageSpan={pageSpan}/>
        </div>
    );
}


