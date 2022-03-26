import { employeeService } from "../../_services/employeeService";
import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {alertService} from '../../_services/alertService'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

export {AddEdit};

function AddEdit({history, match}){
    const {id} = match.params;
    const isAddMode = !id;

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        birthDate: yup.string().required('Birthday is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        email: yup.string().required('Email is required').email('Email is invalid'),
        salary: yup.number().positive('Salary must be a positive number')
    })
    const {register, handleSubmit, reset, setValue, formState:{errors, isSubmitting}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const [employee, setEmployee] = useState(null);

    function onSubmit(data) {
        return isAddMode ?
            createEmployee(data)
            : updateEmployee(id, data);
    }

    function createEmployee(data){
        return employeeService.create(data)
            .then(() => {
                alertService.success('Employee added', {keepAfterRouteChange: true});
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateEmployee(id, data){
        return employeeService.update(id, data)
            .then(() => {
                alertService.success('Employee Updated', {keepAfterRouteChange: true});
                history.push('.');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if(!isAddMode) {
            employeeService.getById(id).then(employee => 
                {
                    const fields = ['id', 'name', 'email', 'birthDate', 'salary', 'modifiedDate'];
                    fields.forEach(field => setValue(field, employee[field]));
                }
            )   
        }
    }, []);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode? 'Add User' : 'Update User'}</h1>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Name</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.emplName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">
                        {errors?.emplName && errors.emplName.message}
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-3">
                    <label>Birth Date</label>
                    <input name="birthDate" type="date" {...register('birthDate')} className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">
                        {errors?.birthDate && errors.birthDate.message}
                    </div>
                </div>
                <div className="form-group col-5">
                    <label>E-mail</label>
                    <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">
                        {errors?.email && errors.email.message}
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Salary</label>
                    <input name="salary" type="text" {...register('salary')} className={`form-control ${errors.salary ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">
                        {errors?.salary && errors.salary.message}
                    </div>
                </div>
            </div>
            <div className="form-group submittion-buttons">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '.'} className="btn btn-link">Cancel</Link>
            </div>
            
        </form>
    )
}
