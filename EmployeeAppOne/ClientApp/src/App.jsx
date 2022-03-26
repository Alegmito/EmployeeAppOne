import React from 'react';
import { Route, Redirect } from 'react-router';
import { history } from './_helpers'
import { Router } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import { Employee } from './components/employees/Employee';
import { Alert } from './components/Alert';
import { useRecoilValue } from 'recoil';
import { authAtom } from './_state';
import { Switch } from 'react-router-dom';
import { AuthorisedRoute } from './components/AuthorisedRoute';
import { Account, Details } from './components/account';

export {App}

function App(){
  // static displayName = App.name;
  const auth = useRecoilValue(authAtom);
  // const {pathname} = useLocation();

    return (
      <div className = {'app-container' + (auth ? ' bg-light' :'')}>
        <Router history={history}>
          <Layout>
            <Alert />
            <Switch>
              <AuthorisedRoute exact path="/" component={Home} />
              <AuthorisedRoute path="/employee" component={Employee} />
              <Route path={`/details`} component={Details}/>
              <Route path="/account" component={Account} />
              <Redirect from="*" to="/" />
            </Switch>
          </Layout>
        </Router>
      </div>
      
    );
}
