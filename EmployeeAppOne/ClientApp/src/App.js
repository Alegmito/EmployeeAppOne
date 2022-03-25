import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import { Employee } from './components/employees/Employee';
import { NavLink, Link } from 'react-router-dom';
import { Alert } from './components/Alert';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Alert />
        <Route path='/employee' component={Employee}/>
        <Route exact path='/' component={Home} />
      </Layout>
    );
  }
}
