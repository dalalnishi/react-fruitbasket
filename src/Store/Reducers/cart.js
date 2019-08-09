const INITIAL_STATE = {
    localCart: [],
    error_msg: ''
}

export const ADD_CART = 'ADD_CART' ;
export const REMOVE_CART = 'REMOVE_CART';
export const ADD_FAILED = 'ADD_FAILED';

export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAILED = 'GET_CART_FAILED';

export const CHANGE_QTY = 'CHANGE_QTY';

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_CART : {
            let cart = state.localCart.concat(action.data);
            return Object.assign({}, state, {localCart: cart});
        }
        case ADD_FAILED : {            
            return Object.assign({}, state, {error_msg:action.data.error_msg});
        }
        case REMOVE_CART : {
            let pid = action.data.Product_id;
            let allcart = [...state.localCart];
            allcart = allcart.filter((item) => {
                return item.product_id !== pid
            })
            return Object.assign({}, state, {localCart: allcart});
        }
        case GET_CART_SUCCESS : {
            return Object.assign({}, state, {localCart: action.data});
        }
        case GET_CART_FAILED : {
            return state;
        }
        case CHANGE_QTY : {
            let local = state.localCart;
            local.map((cartItem) => {
                if(cartItem.product_id === action.data.product_id) {
                    cartItem.qty = parseInt(action.data.qty);
                }
                return cartItem;
            })
            return Object.assign({}, state, {localCart: local});
        }
        default : {
            return state
        }
    }
}