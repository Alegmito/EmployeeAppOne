import { useFetchWrapper } from "../_helpers";

export {useEmployeeActions}

function useEmployeeActions() {
    const baseUrl = '/employees';
    const fetchWrapper = useFetchWrapper();

    return {
        getAll,
        _delete,
        update,
        getById,
        create,
        getPage
    }

    function create(params) {
        return fetchWrapper.post(baseUrl, params);
    }
    
    function getAll() {
        return fetchWrapper.get(baseUrl);
    }
    
    function _delete(id){
        return fetchWrapper.delete(`${baseUrl}/${id}`);
    }
    
    function update(id, params){
        return fetchWrapper.put(`${baseUrl}/${id}`, params);
    }
    
    function getById(id){
        return fetchWrapper.get(`${baseUrl}/${id}`);
    }
    
    function getPage(_page, _sortState, _direction){
        return fetchWrapper.get(`${baseUrl}/pages?page=${_page}&sortState=${_sortState}&ascending=${_direction}`);
    }
}

