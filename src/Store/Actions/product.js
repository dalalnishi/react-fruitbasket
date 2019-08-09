import * as productService from '../../Services/auth';
import {PRODUCT_ADDED_SUCCESSFULLY, PRODUCT_ADD_FAIL, GET_PRODUCTS_SUCCESS, 
    GET_PRODUCTS_FAILED, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_FETCH_SUCCESS, PRODUCT_FETCH_FAIL,
    EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, FILTER_GET_SUCCESS, FILTER_GET_FAILED
} from '../Reducers/product';

export const addNewProduct = (productdata, config) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            productService.addProduct(productdata, config)
            .then((response) => {
                if(response.status === 201) {
                    dispatch({
                        type: PRODUCT_ADDED_SUCCESSFULLY,
                        data: response.data
                    })
                    resolve(response)
                }
            })
            .catch((error) => {
                dispatch({
                    type: PRODUCT_ADD_FAIL,
                    data: { error_msg: error.response.data.error }
                })
                reject(error)
            })
        })
    }
}

export const getAllProducts = () => {
    return(dispatch) => {
        return new Promise((resolve,reject) => {
            productService.getAll()
                .then((response) => {
                    if(response.status === 200) {
                        var files = [];
                        response.data.map((item, i) => {
                            files[i] = JSON.parse(item.product_img);
                            response.data[i].product_img = files[i];
                            return item.files;
                        })
                        dispatch({
                            type: GET_PRODUCTS_SUCCESS,
                            data: response.data
                        })
                        resolve(response);
                    }                    
                })
                .catch((error) => {
                    dispatch({
                        type: GET_PRODUCTS_FAILED,
                        data: {error_msg: error.response.data.message}
                    })
                    reject(error);
                })
        })
    }
}

export const deleteProductsByPid = (product_id) => {
    return(dispatch) => {
        return new Promise((resolve, reject) => {
            productService.deleteProduct(product_id)
                .then((response) => {
                    if(response.status === 200) {
                        dispatch({
                            type: PRODUCT_DELETE_SUCCESS,
                            data: product_id
                        })
                        resolve(response)
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: PRODUCT_DELETE_FAIL,
                        data: {error_msg: error.response.data.message}
                    })
                    reject(error)
                })
        })        
    }
}

export const getProductsByPid = (product_id) => {
    return(dispatch) => {
        return new Promise((resolve, reject) => {
            productService.getById(product_id)
                .then((response) => {
                    if(response.status === 200) {
                        dispatch({
                            type: PRODUCT_FETCH_SUCCESS,
                            data: response.data
                        })
                        resolve(response)
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: PRODUCT_FETCH_FAIL,
                        data: {error_msg: error.response.data.message}
                    })
                    reject(error)
                })
        })        
    }
}

export const editProduct = (productdata, config, product_id) => {
    return(dispatch) => {
        return new Promise((resolve, reject) => {
            productService.editProduct(productdata, config, product_id)
                .then((response) => {
                    dispatch({
                        type: EDIT_PRODUCT_SUCCESS
                    })
                    resolve(response);
                })
                .catch((error) => {
                    dispatch({
                        type: EDIT_PRODUCT_FAIL,
                        data: {error_msg: error.response.data.message}
                    })
                    reject(error);
                })
        })
    }
}

export const filterPrice = () => {
    return(dispatch) => {
        return new Promise((resolve, reject) => {
            productService.filterPrice()
                .then((response) => {
                    dispatch({
                        type: FILTER_GET_SUCCESS,
                        data: response.data
                    })
                    resolve(response);
                })
                .catch((error) => {
                    dispatch({
                        type: FILTER_GET_FAILED,
                        data: {error_msg: error.response.data.message}
                    })
                    reject(error);
                })
        })
    }
}