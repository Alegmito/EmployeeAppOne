import { fetchWrapper } from "../_helpers/fetch-wrapper";

const baseUrl = '/employees';

export const employeeService = {
    getAll,
    _delete,
    update,
    getById,
    create
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