import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Container, Row, Col } from 'reactstrap';
import { Card, Icon, Popconfirm, Slider, Select } from 'antd';
import plusimg from './images.png';
import './Dashboard.css';
import * as productActions from '../../Store/Actions/product';
import * as cartActions from '../../Store/Actions/cart';
import Cartbuttons from '../Cart/CartButtons';
var _ = require('lodash');

const { Meta } = Card;
const {Option} = Select;

class Dashboard extends Component {
    state = {
        products: [],
        minPrice: 0,
        maxPrice: 0,
        filterRange: [],
        filter: false,
        sortOrder: ''        
    }
    
    addClickHandler = () => {
        this.props.history.push('/add');
    }

    componentDidMount = () => {
        let arr = [];
        this.props.action.productAction.getAllProducts()
            .then((res) => {
                this.setState({
                    products: this.props.products.allProducts
                })
            })
            .catch((error) => {
                console.log('Getting products error.', error);
            });
        this.props.action.productAction.filterPrice()
            .then((res) => {
                this.setState({
                    minPrice: parseInt(this.props.products.filterRange[0].minPrice),
                    maxPrice: parseInt(this.props.products.filterRange[0].maxPrice)
                }, () => {
                    arr[0] = this.state.minPrice;
                    arr[1] = this.state.maxPrice;
                    this.setState({
                        filterRange: arr
                    })
                })
            })
            .catch((error) => {
                console.log('Getting products price range.', error);
            });
    }

    confirm = (pid) => {
        this.props.action.productAction.deleteProductsByPid(pid)
            .then((res) => {
                this.setState({
                    products: this.props.products.allProducts
                })
            })
            .catch((error) => {
                console.log('Error deleting product.');
            });

        if(this.props.cartProducts.localCart.some(el => el.product_id === pid)) {
            this.props.action.removeItem.removeCartProducts(pid);
        }
    }

    editProduct = (pid) => {
        this.props.history.push('/edit/'+pid);
    }

    onChange  = (value) => {
        this.setState({
            filterRange: value
        })
    }

    onAfterChange  = (value) => {
        this.setState({
            filterRange: value,
            filter: true
        })
    }

    filterPrice = () => {        
        let filtered = [];        
        filtered = this.state.products.filter((product) => {
            return product.product_price >= this.state.filterRange[0] && product.product_price <= this.state.filterRange[1]
        })
        return filtered;
    }

    clearfilter = () => {
        let arr = [];
        arr[0] = this.state.minPrice;
        arr[1] = this.state.maxPrice;

        this.setState({
            filterRange: arr,
            products: this.props.products.allProducts,
            filter: false
        }, () => {
            if(this.state.sortOrder !== '') {
                this.sortOrder(this.state.sortOrder);
            }
        })        
    }

    sortOrder = (value) => {
        this.setState({
            sortOrder: value
        });
        let newArr = [];
        newArr = this.state.products.reverse();

        if(value === 'price-asc') {
            this.setState({
                products: newArr.sort((a,b) => a.product_price - b.product_price)
            })
        }
        else if(value === 'price-desc'){
            this.setState({
                products: newArr.sort((a,b) => b.product_price - a.product_price)
            })
        }
        else if(value === 'name-asc') {
            this.setState({
                // products: newArr.sort((a,b) => {
                //     if(a.product_name < b.product_name) {
                //         return -1;
                //     }
                //     return 0;
                // })
                products:  _.orderBy(this.state.products, ['product_name'], ['asc'])
            })
        }
        else if(value === 'name-desc') {
            this.setState({
                // products: newArr.sort((a,b) => {
                //     if(a.product_name > b.product_name) {
                //         return 1;
                //     }
                //     return 0;
                // })
                products: _.orderBy(this.state.products, ['product_name'], ['desc'])
            })
        }
        else {
            this.setState({
                products: this.props.products.allProducts,
                sortOrder: ''
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Container className="slider-filter px-md-5" fluid>
                        <Row>
                            <Col lg={3} md={6}>
                                <div className="slider-filter-price">
                                    {
                                        this.state.filterRange.length >0 ? 
                                            <p>Price: ₹{this.state.filterRange[0]} - ₹{this.state.filterRange[1]}</p> :
                                            <p>Price: ₹{this.state.minPrice} - ₹{this.state.maxPrice}</p>
                                    }
                                </div>
                                <Slider
                                    range={true}
                                    defaultValue={[this.state.filterRange[0], this.state.filterRange[1]]}
                                    value={[this.state.filterRange[0], this.state.filterRange[1]]}
                                    min={this.state.minPrice}
                                    max={this.state.maxPrice}
                                    style={{width: "100%"}}                                    
                                    onAfterChange={(value) => this.onAfterChange(value)}
                                    onChange={this.onChange}
                                />     
                            </Col>
                            <Col md={6}>
                                <div className="slider-filter-wrapper"> 
                                    <p>&nbsp;</p>
                                    {
                                        this.state.filter ?
                                            <button className="btn btn-primary" onClick={this.clearfilter}>Clear</button> : null
                                    }
                                    <Select placeholder="Select sorting" style={{ width: '200px', marginLeft: 16 }} onChange={this.sortOrder} >
                                        <Option value="null">
                                            Select filter
                                        </Option>
                                        <Option value="price-asc">
                                            <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;Price Lowest to Highest
                                        </Option>
                                        <Option value="price-desc">
                                            <i className="fa fa-arrow-down" aria-hidden="true"></i>&nbsp;Price Highest to Lowest
                                        </Option>
                                        <Option value="name-asc">
                                            <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i>&nbsp;Product Name Ascending
                                        </Option>
                                        <Option value="name-desc">
                                            <i className="fa fa-sort-alpha-desc" aria-hidden="true"></i>&nbsp;Product Name Descending
                                        </Option>
                                    </Select>                            
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div className="slider-filter-img">
                        <img src={plusimg} alt="Plus" className="plusImage" title="Add Fruits" onClick={this.addClickHandler.bind(this)}/>
                    </div>
                </div>
                <hr/>
                <Container fluid className="px-md-5">
                    <Row>                    
                    {
                        this.filterPrice().length >0 ? this.filterPrice().map((fruit, index) => (                            
                            <Col lg={3} md={6} key={index} style={{padding: 10}}>
                            {
                                <Card
                                    key={fruit.product_id}
                                    className="card"
                                    cover={
                                        <center>
                                        <img
                                            alt="Fruit"
                                            key={fruit.product_id}
                                            className="fruit-img"
                                            src={'http://192.168.0.110:5001/thumbimages/'+fruit.product_img[0]}
                                        />
                                        </center>
                                    }
                                        actions={[
                                            <Icon type="edit" onClick={() => this.editProduct(fruit.product_id)}/>,
                                            <Cartbuttons productId={fruit} {...this.props}></Cartbuttons>,
                                            <Popconfirm                                             
                                                title=
                                                    {
                                                        this.props.cartProducts.localCart.some(el => el.product_id === fruit.product_id) ? 
                                                        fruit.product_name+ " is already in cart. Do you still want to delete ?" :
                                                        "Are you sure to delete " +fruit.product_name+ " ?"
                                                    }
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => this.confirm(fruit.product_id)}
                                            >
                                                <Icon type="delete"/>
                                            </Popconfirm>
                                        ]}
                                >
                                    <center>
                                        <Meta                                    
                                            title={fruit.product_name}
                                            key={fruit.product_id}
                                        />
                                        <p className="fruit-desc"> 
                                        {fruit.product_desc}
                                        </p>
                                        <p className="fruit-price"> 
                                            ₹{fruit.product_price}
                                        </p>
                                    </center>
                                </Card>
                            }                            
                            </Col>
                        ))
                         : 
                        <Row className="filter-row">
                            <Container>
                                <Col style={{padding: 10}}>
                                    <p className="filter-empty">Sorry, No result found!!!</p>
                                    <p className="filter-error">Try adjusting your filter.</p>                                    
                                </Col>
                            </Container>
                            <Col className="icon-font">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </Col>
                        </Row>
                    }
                    </Row>
                </Container>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        products: state.productReducer,
        cartProducts: state.cartReducer
    }    
}

const mapDispatchToProps = dispatch => ({
    action: {
        productAction: bindActionCreators(productActions, dispatch),
        removeItem: bindActionCreators(cartActions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);