import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {employeeService} from '../../_services/employeeService'

export function EmployeeList({match}) {
    const {path} = match;
    const [employees, setEmployees] = useState(null);
    const [isRefresh, setRefresh] = useState(false);
    
    // sets dependecies to setEmployees, to avoid infinite loop
    useEffect(() => {
        employeeService.getAll().then(x => setEmployees(x));
        setRefresh(false);
    },[setEmployees, isRefresh]);

    function deleteEmployee(id){
        employeeService._delete(id);
        setRefresh(true);
    }

    return(
        <div>
            <h1>Users</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Employee</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>BirthDate</th>
                        <th>Salary</th>
                        <th>Modidified</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.birthDate}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.modifiedDate}</td>
                            <td style={{whiteSpace: 'nowrap'}}>
                                <Link to={`${path}/${employee.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger btn-delete-user">
                                    {/* {employee.isDeliting ?
                                        <span className='spinner-border spinner-border-sm'></span>
                                        : <span>Delete</span>    
                                    } */}
                                    <span>Delete</span>
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;