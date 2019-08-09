import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../Store/Actions/cart';

class Cartbuttons extends Component {

    state = {
        items: this.props.cartProducts.localCart
    }

    addToCart = (product_id) => {
        // let x = this.state.items ? this.state.items : [];
        let cartData = {
            "user_id": localStorage.getItem('uid'),
            "product_id": product_id.product_id
        };
        
        // product_id['user_id'] = localStorage.getItem('uid');
        // x.push({ CartItems: product_id });
        // this.props.action.cartActions.addCart(x);
        this.props.action.cartActions.addCart(cartData);
    }

    goCart = (e) => {
        this.props.history.push('/cart');
    }

    render() {
        return (
            <div>
                { 
                  this.props.cartProducts.localCart.some(el => el.product_id === this.props.productId.product_id) ? 
                  <button className="btn btn-danger" key={this.props.productId} onClick={this.goCart.bind(this)}>Go To Cart</button>:
                  <button className="btn btn-danger" style={{ fontSize: 18 }} key={this.props.productId} onClick={() => this.addToCart(this.props.productId)}>
                      Add Cart
                  </button>                  
                }
               
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartProducts: state.cartReducer
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        cartActions: bindActionCreators(cartActions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cartbuttons);