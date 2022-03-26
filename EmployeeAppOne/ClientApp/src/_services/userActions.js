import { useFetchWrapper } from "../_helpers";
import { authAtom, userAtom } from "../_state";
import {useRecoilState, useSetRecoilState} from 'recoil'
import {history} from '../_helpers'
import { alertService } from "./alertService";

export {useUserActions};

function useUserActions(){
    const baseUrl = '/users';
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setUser = useSetRecoilState(userAtom);

    return {
        login,
        register,
        logout,
        _delete,
        get
    }

    function login({login, password})
    {
        fetchWrapper.post(`${baseUrl}/login`, {login, password})
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);

                // get return url from location state or to homepage
                const {from} = history.location.state || {from: {pathname: '/'} };
                history.push(from);
                alertService.success('Login Successful', {keepAfterRouteChange: true})
            });
    }

    function get(login)
    {
        return fetchWrapper.get(`${baseUrl}/${login}`).then(u => {
            setUser(u);
        });
    }

    function register(params)
    {
        fetchWrapper.post(`${baseUrl}`, params).then(() => 
        {
            history.push('/account/login');
            alertService.info('User Added', {keepAfterRouteChange: true});
        })
    }

    function logout()
    {
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/account/login');
    }

    function _delete(login) 
    {
        return fetchWrapper.delete(`${baseUrl}/${login}`)
            .then(() => {
                if(login == auth?.login)
                {
                    logout();
                    setUser(null);
                }
                alertService.info('Account has been deleted', {keepAfterRouteChange: true})
            })
    }
}

