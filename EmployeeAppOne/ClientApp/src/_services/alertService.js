import {Subject, filter} from 'rxjs';

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
}

export const alertType = {
    success: 'Success',
    error: 'Error',
    Info: 'Info',
    warning: 'Warning'
}

function onAlert(id = defaultId)
{
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}

function error(message, options) {
    alert({...options, type: alertType.error, message});
}

function success(message, options) {
    alert({...options, type: alertType.success, message});
}

function info(message, options) {
    alert({...options, type: alertType.info, message});
}

function warn(message, options) {
    alert({...options, type: alertType.warn, message});
}

function alert(alert) {
    alert.id = alert.id || defaultId;
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    alertSubject.next(alert);
}

function clear(id = defaultId){
    alertSubject.next({id});
}