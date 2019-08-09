import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {Icon} from 'antd';

import * as cartActions from '../../Store/Actions/cart';
import './Minicart.css'

class Minicart extends Component {

    calculateTotal = () => {
        // Reduce(): Reduces each array elements
        // total will store the return result
        // cartItem will hold cartItems array with single element record 
        return this.props.cartItems.localCart.reduce((total, cartItem) => {
            return total + cartItem.product_price * cartItem.qty;
        }, 0)
    }

    redirectShop = () => {
        this.props.history.push('/list');
    }

    redirectCart = () => {
        this.props.history.push('/cart');
    }

    removeItem = (product_id) => {
        this.props.action.removeItem.removeCartProducts(product_id);
    }

    render () {
        return (
            <div>
                <div className="pop-cart">                   
                    {
                        this.props.cartItems.localCart.length >0 ?                        
                        this.props.cartItems.localCart.map((cartProduct) => (                            
                            <div className="cart-content" key={cartProduct.product_id}>
                                <div className="cart-content-detail">
                                    <img src={'http://192.168.0.110:5001/thumbimages/'+cartProduct.product_img[0]} 
                                        alt={cartProduct.product_name} className="minicart-img" />
                                <div style={{paddingLeft: 10}}>
                                    <div className="minicart-title">
                                        {cartProduct.product_name}
                                    </div>
                                    <div className="minicart-desc">
                                        {cartProduct.product_desc}
                                    </div>
                                    <div>
                                        <span className="minicart-price">
                                            Price: ₹{cartProduct.product_price}
                                        </span>
                                        <p className="minicart-desc">₹{cartProduct.product_price} x {cartProduct.qty}</p>
                                    </div>
                                </div>
                                </div>
                                <div className="minicart-close">
                                    <Icon type="close" onClick={() => this.removeItem(cartProduct.product_id)} style={{color: 'red'}}/>
                                </div>
                            </div>
                        )) :
                        <div>
                            <div className="minicart-title">Cart is empty</div>
                        </div>
                    }
                </div> 
                <div>                        
                    <div>                            
                        <div colSpan="3">
                            <hr/>
                            {
                                this.props.cartItems.localCart.length >0 ? 
                                (
                                    <div>
                                        <div className="minicart-price" style={{color: 'black'}}>Total: ₹{this.calculateTotal()}</div>
                                        <div>
                                            <button className="btn btn-secondary btn-block" style={{backgroundColor: '#007791'}} onClick={this.redirectCart}>
                                                Go To Cart
                                            </button>
                                        </div>
                                    </div>
                                )
                                :
                                <div>
                                    <button className="btn btn-secondary btn-block" style={{backgroundColor: '#007791'}} onClick={this.redirectShop}>
                                        Keep Shopping
                                    </button>
                                </div>
                            }                                
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
  
const mapStateToProps = state => {
    return {
        products: state.productReducer.allProducts,
        cartItems: state.cartReducer
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        removeItem: bindActionCreators(cartActions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);