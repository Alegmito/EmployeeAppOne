import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserActions } from '../../_services';

export {Register} ;

function Register({history})
{
    const userActions = useUserActions();
    // const alert = 

    const validationSchema = Yup.object().shape(
        {
            login: Yup.string()
                .required('Login is required'),
            password: Yup.string()
                .required('Password if required')
                .min(4, 'Password must be at least 4 chars'),
            passwordConfirm: Yup.string()
                .required('Confirm your password')
                .oneOf([Yup.ref('password')], 'Passwords must match')
        }
    );

    const formOptions = {
        mode: "onBlur",
        resolver: yupResolver(validationSchema)};

    // functions to build foorm with useForm() hook
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors, isSubmitting} = formState;

    function onSubmit(data)
    {
        userActions.register(data)
    }

    return (
        <div className="card m-3">
            <h4 className="card-header">Register Page</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Login</label>
                        <input name="login" type="text" {...register('login')} className={`form-control ${errors.login ? 'is-invalid' : ''}`}></input>
                        <div className="invalid-feedback">{errors.login?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="Password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}></input>
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Confirm password</label>
                        <input name="passwordConfirm" type="password" {...register('passwordConfirm')} className={`form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`}></input>
                        <div className="invalid-feedback">{errors.passwordConfirm?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinnter-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="login" className="btn btn-link">Cancel</Link>
                </form>
            </div>
        </div>
    )
}