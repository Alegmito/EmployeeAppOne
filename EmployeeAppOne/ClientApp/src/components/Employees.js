import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

export function Employees() {
    // this.displayName = "Employees";

    const {register, handleSubmit} = useForm(
        // {
        // name: "",
        // birthDate: "", // add date
        // email: "",
        // salary: 0,
        // }
        );
    
    const handleRegistration = (data) => console.log(data);

    return(
        <form onSubmit={handleSubmit(handleRegistration)}>
            <label>Name</label>
            <input type="text" name="name" {...register('name', {required: true})} />
            <label>Birth Date</label>
            <input type="date" name="birthDate" {...register('birthDate', {required: true})} />
            <label>email</label>
            <input type="text" name="Employee Name" {...register('name', {required: true})} />
            <label>salary</label>
            <input type="text" name="Employee Name" {...register('name', {required: true})} />
        </form>
    );
    
}

export default Employees;