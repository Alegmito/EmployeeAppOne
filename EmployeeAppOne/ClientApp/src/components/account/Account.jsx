import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import {authAtom} from '../../_state/auth'
import { Login, Register } from './';
import { Details } from './Details';

export {Account}

function Account({history, match}) {
    const auth = useRecoilValue(authAtom);
    const {path} = match;

    useEffect(() => {
        // redirect to home if already logged in
      if (auth) history.push('/');
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <Switch>
                        <Route path={`${path}/login`} component={Login}/>
                        <Route path={`${path}/register`} component={Register}/>
                        <Redirect from={`${path}*`} to={`${path}/login`} />
                    </Switch>
                </div>
            </div>
        </div>
    )
    
}