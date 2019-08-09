import {ADD_CART, ADD_FAILED, REMOVE_CART, GET_CART_SUCCESS, CHANGE_QTY} from '../Reducers/cart';
import * as CartServices from '../../Services/auth';

export const addCart = (cartProducts) => {
    return(dispatch) => {
        return new Promise ((resolve, reject) => {
            CartServices.addToCart(cartProducts)
            .then((response) => {
                if(response.status === 201) {
                    CartServices.getById(response.data.product_id).then((res) => {
                        let img = [];
                        img = JSON.parse(res.data[0].product_img);
                        res.data[0].product_img = img;
                        let cartData = res.data;
                        cartData[0]['qty'] = 1;
                        dispatch({
                            type: ADD_CART,
                            data: cartData
                        })
                    })
                    resolve(response);
                }
            })
            .catch((error) => {
                dispatch({
                    type: ADD_FAILED,
                    data: { error_msg: error.response.data.error }
                })
                reject(error);
            })
        })
    }
}

export const removeCartProducts = (Product_id) => {
    return(dispatch) => {
        return new Promise ((resolve, reject) => {
            CartServices.deleteCartProduct(Product_id)
                .then((response) => {
                    dispatch({
                        type: REMOVE_CART,
                        data: {Product_id}
                    })
                    resolve(response);
                })
                .catch((err) => {
                    console.log('Error removing product from cart.')
                    reject(err);
                })
        })        
    }
}

export const getCartProducts = (user) => {
    return(dispatch) => {
        return new Promise ((resolve, reject) => {
            CartServices.getCartProduct(user)
                .then((response) => {
                    response.data.map((res) => {
                        let img = [];
                        img = JSON.parse(res.product_img);
                        return res.product_img = img;
                    })
                    dispatch({
                        type: GET_CART_SUCCESS,
                        data: response.data
                    })
                    resolve(response);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}

export const changeCartQty = (data) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            CartServices.changeQty(data)
                .then((response) => {
                    resolve(response);
                    dispatch({
                        type: CHANGE_QTY,
                        data: data
                    })
                })
                .catch((err) => {
                    console.log('change Qty error', err);
                    reject(err);
                })
        })
    }
}