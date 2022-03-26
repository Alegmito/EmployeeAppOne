import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useUserActions} from '../../_services'

// import { useUserActions } from '../_actions';

export { Login };

function Login()
{
    const userActions = useUserActions()

    // validation rules
    const validationSchema = Yup.object().shape({
        login: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = {mode: "onBlur", resolver: yupResolver(validationSchema)};

    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors, isSubmitting} = formState;

    return (
        <div className="card m-3">
            <h4 className="card-header">Login Page</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(userActions.login)}>
                    <div className="form-group">
                        <label>Login</label>
                        <input name="login" type="text" {...register('login')} className={`form-control ${errors.login ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.login?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="passowrd" type="password" {...register('password')} className={`form-control ${errors.passowrd ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.passowrd?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <Link to="register" className="btn btn-link">Register</Link>
                </form>
            </div>
        </div>
    )
}