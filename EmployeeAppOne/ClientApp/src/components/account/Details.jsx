import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUserActions } from '../../_services';
import { authAtom, userAtom } from '../../_state';

export {Details}

function Details()
{
    const auth = useRecoilState(authAtom);
    const userActions = useUserActions();
    const user = useRecoilValue(userAtom)

    useEffect(() => {
        userActions.get(auth?.[0].login);
    },[]);

    return(
        <div>
            <h1>Account Details</h1>
            <h3>Login:</h3>
            <h5>{user?.login}</h5>
            <div>
                <button className='btn btn-danger btn-sm' onClick={() => userActions._delete(auth?.[0].login) }>Delete User</button>
            </div>
        </div>
        
    )
}