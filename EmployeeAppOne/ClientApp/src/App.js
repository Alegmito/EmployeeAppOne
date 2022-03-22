import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import {Counter} from './components/Counter'
import './custom.css'
import { Employee } from './components/employees/Employee';
import { NavLink, Link } from 'react-router-dom';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/employee' component={Employee}>
        </Route>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
