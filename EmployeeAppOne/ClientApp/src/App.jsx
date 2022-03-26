import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import { Employee } from './components/employees/Employee';
import { NavLink, Link } from 'react-router-dom';
import { Alert } from './components/Alert';
import { useRecoilValue } from 'recoil';
import { authAtom } from './_state';

export {App}

function App(){
  // static displayName = App.name;
  const auth = useRecoilValue(authAtom);

    return (
      <div className = {'app-container' + (auth ? ' bg-light' :'')}>
        <Layout>
        <Alert />
        <Route path='/employee' component={Employee}/>
        <Route exact path='/' component={Home} />
        </Layout>
      </div>
      
    );
}
