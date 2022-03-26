import React, {userEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {userRecoilValue} from 'recoil';

import {authAtom} from '../../_state/auth'

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
                        {/* add paths to login and register */}
                    </Switch>
                </div>
            </div>
        </div>
    )
    
}