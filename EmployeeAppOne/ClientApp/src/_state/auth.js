import { atom } from "recoil";

const authAtom = atom({
    key: 'auth',
    // get start state from local storage to enable user to stay logged in
    default: JSON.parse(localStorage.getItem('user'))
});

export {authAtom} ;