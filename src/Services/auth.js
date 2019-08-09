import baseService from './baseservice'

export function login(credentails){
    return baseService.post('/user/login',credentails);
}

export function register(data){
    return baseService.post('/user/signUp', data);
}

export function addProduct(product_data, config) {
    return baseService.post('/products/', product_data, config);
}

export function getAll() {
    return baseService.get('/products/getAll');
}

export function deleteProduct(product_id) {
    return baseService.put('/products/deleteByPid/'+product_id);
}

export function getById(product_id) {
    return baseService.get('/products/getById/'+product_id);
}

export function editProduct(product_data, config, product_id) {
    return baseService.put('/products/updateById/'+product_id, product_data, config)
}

export function filterPrice() {
    return baseService.get('/products/filter');
}

export function addToCart(cartData) {
    return baseService.post('/cart/addCart', cartData);
}

export function getCartProduct(uid) {
    return baseService.get('/cart/getCart/'+uid);
}

export function deleteCartProduct(pid) {
    return baseService.delete('/cart/deleteItem/'+pid);
}

export function changeQty(cartData) {
    return baseService.put('/cart/changeQty', cartData);
}