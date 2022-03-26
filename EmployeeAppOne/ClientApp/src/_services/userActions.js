import { fetchWrapper } from "../_helpers/fetch-wrapper";

function useUserActions(){
    const baseUrl = '/users';

    return {
        login,
        register,
        logout,
    }

    function login()
    {
        fetchWrapper.post(`${baseUrl}/login`, params);
    }

    function register()
    {
        fetchWrapper.post(`${baseUrl}`, params)
    }

    function post()
    {
        fetchWrapper.put(``)
    }
}

