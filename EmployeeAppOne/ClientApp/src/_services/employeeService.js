import { fetchWrapper } from "../_helpers/fetch-wrapper";

const baseUrl = '/employee';

export const employeeService = {
    
}

function getAll() {
    return fetchWrapper.get(baseUrl)
}