import { employeeService } from "../../_services/employeeService";
import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function AddEdit({history, match}){
    const {id} = match.params;
    const isAddMode = !id;

    const {register, handleSubmit, reset, setValue, errors, formState} = useForm({reValidateMode: 'onChange'})

    const [employee, setEmployee] = useState(null);

    const formOptions = {
        name:{ required: "Name is required"},
        email:{required: true},
    }
    function onSubmit(data) {
        return isAddMode ?
            createEmployee(data)
            : updateEmployee(id, data);
    }

    function createEmployee(data){
        return employeeService.create(data)
            .then(() => {
                console.log("User created");
            })
            .catch(console.log("Error"));
    }

    function updateEmployee(id, data){
        return employeeService.update(id, data)
            .then(() => {
                console.log('User updated');
            })
            .catch((ex) => console.log(ex));
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


     // <form onSubmit={handleSubmit(handleRegistration)}>
        //     <label>Name</label>
        //     <input type="text" name="name" {...register('name', {required: true})} />
        //     <label>Birth Date</label>
        //     <input type="date" name="birthDate" {...register('birthDate', {required: true})} />
        //     <label>email</label>
        //     <input type="text" name="Employee Name" {...register('name', {required: true})} />
        //     <label>salary</label>
        //     <input type="text" name="Employee Name" {...register('name', {required: true})} />
        // </form>

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode? 'Add User' : 'Update User'}</h1>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Name</label>
                    <input name="name" type="text" className="form-control" {...register("name", {required: "Required"})}/>
                    <div className="invalid-feedback">
                        {errors?.name && errors.name.message}
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-3">
                    <label>Birth Date</label>
                    <input name="birthDate" type="date" className="form-control" {...register("birthDate", {required: true})}/>
                    <div className="invalid-feedback">
                        {errors?.name && errors.name.message}
                    </div>
                </div>
                <div className="form-group col-5">
                    <label>E-mail</label>
                    <input name="email" type="text" className="form-control" {...register("email", {required: true})}/>
                    <div className="invalid-feedback">
                        {errors?.name && errors.name.message}
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Salary</label>
                    <input name="salary" type="text" className="form-control" {...register("salary", {required: true})}/>
                    <div className="invalid-feedback">
                        {errors?.name && errors.name.message}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '.'} className="btn btn-link">Cancel</Link>
            </div>
            
        </form>
    )
}

export {AddEdit};