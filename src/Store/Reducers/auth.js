const INITIAL_STATE = {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : '',
    error_msg: ""
}

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const INVALID_USER = 'INVALID_USER';
export const LOGOUT = 'LOGOUT';

export const REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN_SUCCESSFUL :
            return Object.assign({}, state, {token: localStorage.getItem("token")});
        case INVALID_USER :
            return Object.assign({}, state,{error_msg:action.data.error_msg});
        case LOGOUT :
            return Object.assign({}, state,{token:""});
        case REGISTER_SUCCESSFUL :
            return
            //return Object.assign({}, state,{token: localStorage.getItem("token")});
        case REGISTER_ERROR :
            //return
            return Object.assign({}, state,{error_msg:action.data.error_msg});
        default :
            return state;
    } 
}