import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productActions from '../../Store/Actions/product';

import { Card, Icon, Popconfirm } from 'antd';
import {Row, Col, Container} from 'reactstrap';
import Cartbuttons from '../Cart/CartButtons';
import './Search.css';

const { Meta } = Card;

const SearchResult = (props) => {
   
    useEffect(() => {
        props.action.productAction.getAllProducts()
    }, []);

    let searchVal = props.location.search.substring(1);

    const filteredData = props.products.allProducts.filter((product) => {
        return (product.product_name).toLowerCase().includes(searchVal.toLowerCase())
    })

    return (
        <div>
            <p className="search-result">Search Result For: {searchVal}</p>
            <Row className="search-row">
            {
                filteredData.length >0 ?
                filteredData.map((product) => (                    
                    <Col key={product.product_id} className="search-col-wrap col-3">
                    {
                        <Card
                            key={product.product_id}
                            className="card search-card"
                            cover={
                                <center>
                                <img
                                    alt="Fruit"
                                    key={product.product_id}
                                    className="fruit-img"
                                    src={'http://192.168.0.110:5001/thumbimages/'+product.product_img[0]}
                                />
                                </center>
                            }
                                actions={[
                                    <Icon type="edit" onClick={() => this.editProduct(product.product_id)}/>,
                                    <Cartbuttons productId={product} {...props}></Cartbuttons>,
                                    <Popconfirm 
                                        title={"Are you sure to delete " +product.product_name+ " ?"}
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => this.confirm(product.product_id)}
                                    >
                                        <Icon type="delete"/>
                                    </Popconfirm>
                                ]}
                        >
                            <center>
                                <Meta                                    
                                    title={product.product_name}
                                    key={product.product_id}
                                />
                                <p className="search-desc"> 
                                    {product.product_desc}
                                </p>
                                <p className="search-price"> 
                                    ₹{product.product_price}
                                </p>
                            </center>
                        </Card>                                
                    }                            
                    </Col>                    
                )) :
                <Row className="search-row">
                    <Container>
                        <Col style={{padding: 10}}>
                            <p className="search-empty">Sorry, We couldn't find any results for {searchVal}</p>
                            <p className="search-error">Try adjusting your search. Here are some ideas:</p>
                            <ul className="search-error-ul">
                                <li>Make sure all words are spelled correctly.</li>
                                <li>Try different search terms.</li>
                                <li>Try more general search terms.</li>
                            </ul>
                        </Col>
                    </Container>
                    <Col className="icon-font">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Col>
                </Row>
            }
            </Row>
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        products: state.productReducer
    }    
}

const mapDispatchToProps = dispatch => ({
    action: {
        productAction: bindActionCreators(productActions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);