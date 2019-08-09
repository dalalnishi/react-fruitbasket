const PRODUCT_STATE = {
    products: [],
    error_msg: '',
    allProducts: [],
    productById: [],
    filterRange: []
}

export const PRODUCT_ADDED_SUCCESSFULLY = 'PRODUCT_ADDED_SUCCESSFULLY';
export const PRODUCT_ADD_FAIL = 'PRODUCT_ADD_FAIL';

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED';

export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS';
export const PRODUCT_DELETE_FAIL = 'PRODUCT_DELETE_FAIL';

export const PRODUCT_FETCH_SUCCESS = 'PRODUCT_FETCH_SUCCESS';
export const PRODUCT_FETCH_FAIL = 'PRODUCT_FETCH_FAIL';

export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAIL = 'PRODUCT_FETCH_FAIL';

export const FILTER_GET_SUCCESS = 'FILTER_GET_SUCCESS';
export const FILTER_GET_FAILED = 'FILTER_GET_FAILED';

export default (state = PRODUCT_STATE, action) => {
    switch(action.type) {
        case PRODUCT_ADDED_SUCCESSFULLY :            
            return Object.assign({}, state, {products: action.data});
        case PRODUCT_ADD_FAIL :
            return Object.assign({}, state, {error_msg:action.data.error_msg});
        case GET_PRODUCTS_SUCCESS : 
            return Object.assign({}, state, {allProducts: action.data});
        case GET_PRODUCTS_FAILED :
            return Object.assign({}, state, {error_msg:action.data.error_msg});
        case PRODUCT_DELETE_SUCCESS :
            let pid = action.data;
            let newData = state.allProducts.filter((product) => {
                return product.product_id !== pid;
            })
            return Object.assign({}, state, {allProducts: newData});
        case PRODUCT_DELETE_FAIL :
            return Object.assign({}, state, {error_msg:action.data.error_msg});
        case PRODUCT_FETCH_SUCCESS :                
            return Object.assign({}, state, {productById: action.data});
        case PRODUCT_FETCH_FAIL :
            return Object.assign({}, state, {error_msg:action.data.error_msg});
        case EDIT_PRODUCT_SUCCESS :                
            return state;
        case EDIT_PRODUCT_FAIL :
            return state;
        case FILTER_GET_SUCCESS : 
            return Object.assign({}, state, {filterRange: action.data});
        case FILTER_GET_FAILED : 
            return Object.assign({}, state, {error_msg:action.data.error_msg});
        default :
            return state;
    } 
}