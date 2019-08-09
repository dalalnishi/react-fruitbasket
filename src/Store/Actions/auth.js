import * as authService from '../../Services/auth';
import * as cartAction from '../Actions/cart';
import { INVALID_USER, LOGIN_SUCCESSFUL, LOGOUT } from '../Reducers/auth';

export const loginUser = (credentials) => {
    return (dispatch) => {       
       return new Promise ((resolve, reject) => {
        authService.login(credentials)
        .then((response) => {               
            if (response.status === 200) {                
                localStorage.setItem("uid", response.data.id)
                localStorage.setItem("name", response.data.fullname)
                localStorage.setItem("token", response.data.token)
                dispatch({
                    type: LOGIN_SUCCESSFUL,
                    data: { token: response.data.token}
                });
                dispatch(cartAction.getCartProducts(response.data.id));
                resolve(response);
            }
        })
        .catch((error) => {
            if (error.response) {
                dispatch({ type: INVALID_USER, data: { error_msg: error.response.data.message } });
                reject(error);
            }
        });
       }) 
    }
};

export  const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });    
        // localStorage.removeItem("token");
        // localStorage.removeItem("uid");
        localStorage.clear();
    }
};

export const registerUser = (data) => {
    return (dispatch) => {
        return new Promise ((resolve, reject) => {
            authService.register(data)
            .then((response) => {
                if(response.status === 201) {                    
                    // dispatch({
                    //     type: 'REGISTER_SUCCESSFUL'
                    // })
                    let cred_data = {
                        "email": data.email,
                        "password": data.password
                    }
                    dispatch(loginUser(cred_data));
                    resolve(response);
                }                
            })
            .catch((error) => {
                if(error.response) {
                    dispatch({
                        type: 'REGISTER_ERROR',
                        data: { error_msg: error.response.data.message }
                    })                    
                    reject(error);
                }                
            })
        })
    }
}


