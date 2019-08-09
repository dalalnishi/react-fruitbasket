import {combineReducers} from 'redux';
import authReducer from '../Reducers/auth';
import productReducer from '../Reducers/product';
import cartReducer from '../Reducers/cart';

const rootReducer = combineReducers({
    authReducer,
    productReducer,
    cartReducer
})

export default rootReducer;