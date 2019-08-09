import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as cartActions from '../../Store/Actions/cart';
import { Table, notification } from 'antd';
import './Minicart.css';
import PaypalButton from '../Checkout/PaypalCheckout';

const Cart = (props) => {
    const [localCart, setLocalCart] = useState([]);
    
    const removeItem = (pid) => {
        props.action.cartAction.removeCartProducts(pid);
    }

    const calculateTotal = () => {
        // Reduce(): Reduces each array elements
        // total will store the return result
        // cartItem will hold cartItems array with single element record 

        // return localCart.reduce((total, cartItem) => {
        //     return total + cartItem.product_price*cartItem.qty;
        // }, 0)
        const total = `${localCart.reduce((total, cartItem) => {
            return total + cartItem.product_price*cartItem.qty;
        }, 0)}`;
        return total;
    }

    const redirectShopping = () => {
        props.history.push('/list');
    }

    const changeQty = (event, pid) => {
        event.persist();
        const eventVal = event.target.value;
        let data = {
            qty: eventVal,
            product_id: pid,
            user_id: localStorage.getItem('uid')
        }
        props.action.cartAction.changeCartQty(data)
            .then((res) => {
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        let uid = localStorage.getItem('uid');
        props.action.cartAction.getCartProducts(uid)
            .then((response) => {
                setLocalCart(response.data);
            });
    }, [props.cart.localCart.length])

    const columns = [
        {
          title: 'Image',
          dataIndex: 'product_img',
          key: 'product_id'
        },
        {
          title: 'Product',
          dataIndex: 'product_name'
        },
        {
          title: 'Product Description',
          dataIndex: 'product_desc'
        },
        {
          title: 'Price',
          dataIndex: 'product_price'
        },
        {
          title: 'Quantity',
          dataIndex: 'product_qty'
        },
        {
          title: 'Action',
          dataIndex: 'Remove'
        }
    ];
    
    let data = localCart.map((item) => {
        let tableData =         
            {
                product_id: item.product_id,
                product_img: <img src={'http://192.168.0.110:5001/thumbimages/'+item.product_img[0]} alt={item.product_name}></img>,
                product_name: item.product_name,
                product_desc: item.product_desc,
                product_price: '₹'+item.product_price,
                product_qty: <input type="number" defaultValue={item.qty} min="1" className="form-control" style={{width: '40%'}} onChange={(event) => changeQty(event, item.product_id)}/>,
                Remove: <i className="fa fa-remove cart-remove" onClick={() => removeItem(item.product_id)}></i>
            }
        return tableData;
    })

    const CLIENT = {
        sandbox: 'ATUT3uBIp-7JkTkIcZck2S96W0YToIEiAXycSXpdrDmR4kFPSYkL_WT0bbphD1sBuD-jBqZjlxDjPMWM',
        production: 'ATUT3uBIp-7JkTkIcZck2S96W0YToIEiAXycSXpdrDmR4kFPSYkL_WT0bbphD1sBuD-jBqZjlxDjPMWM',
    };
      
    const ENV = process.env.NODE_ENV === 'production'
        ? 'production'
        : 'sandbox';
      
    const onSuccess = (payment) => {
        console.log('Successful payment!', payment);
        notification['success']({
            message: 'Payment Success!',
            description:
              <span>
                  Your payment was successful. Thank you for shopping with 
                  &nbsp;<i className="fa fa-paypal" aria-hidden="true"></i>
              </span>
        });
    }

    const onError = (error) => {
        console.log('Erroneous payment OR failed to load script!', error);
        notification['error']({
            message: 'Payment Error!',
            description:
              'OOPS! Something went wrong with payment! Please check with your network operator.'
        });
    }
  
    const onCancel = (data) =>
        console.log('Cancelled payment!', data);

    let dollar = calculateTotal() * 0.014;

    return (
        <div className="row table-main">
            <div className="table-div">
                <Table columns={columns} dataSource={data} rowKey="product_id" className="cart-table" pagination={false}/>
            </div>
            {
                data.length >0 ?
                (
                    <div className="table-total">
                        <span className="cart-price">Total: ₹{calculateTotal()}</span><br/>
                        <>
                            <PaypalButton
                                client={CLIENT}
                                env={ENV}
                                commit={true}
                                currency={'USD'}
                                total={dollar}
                                onSuccess={onSuccess}
                                onError={onError}
                                onCancel={onCancel}
                            />
                        </>
                    </div>
                ) : 
                (
                    <div className="table-total">                        
                        <span>
                            <button className="cart-checkout" onClick={redirectShopping}>Continue Shopping</button>
                        </span>
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cartReducer
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        cartAction: bindActionCreators(cartActions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);