import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authService from '../../Store/Actions/auth'
import * as cartService from '../../Store/Actions/cart'

import { Collapse, NavbarToggler, Navbar, NavbarBrand, NavItem, NavLink, Nav } from 'reactstrap'
import { Link, withRouter } from "react-router-dom";
import { Badge, Popover, Avatar } from 'antd';

import Logo from '../Header/fb.jpg';
import Minicart from '../Cart/Minicart';
import Search from '../SearchProduct/SearchProduct';
import "./Header.css";

class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    logoutUser = () => {
        this.props.action.loguser.logoutUser();
    }

    goToCart = () => {
        this.props.history.push('/cart');
    }

    componentDidMount() {        
        // this.props.action.cartAction.getCartProducts(localStorage.getItem('uid'));
        if(localStorage.getItem('uid')) {
            this.props.action.cartAction.getCartProducts(localStorage.getItem('uid'));
        }        
    }
    
    render () {        
        const content = (
            <div>
              <Minicart {...this.props}></Minicart>
            </div>
        );
    
        return (
            <Navbar color="light" light expand="md" className={this.props.auth.authReducer.token!=='' ? '' : 'nav-auth'}>
                <NavbarBrand tag={Link} to="/"><img src={Logo} alt="Fruit Basket" className="nav-logo"/>
                     Fruit Basket
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    { this.props.auth.authReducer.token!=='' ? 
                    <Nav className="ml-auto navbar" navbar>
                        <NavItem>
                            <Search {...this.props}></Search>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/list">
                                {/* Dashboard */}
                                <i className="fa fa-home header-icon-font" aria-hidden="true"></i>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/add">
                                {/* Add record */}
                                <i className="fa fa-plus-circle header-icon-font" aria-hidden="true"></i>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Popover placement="bottomRight" content={content} title="Mini Cart">
                                    <Badge count={this.props.cartCount.localCart.length} showZero>
                                        <i className="fa fa-shopping-basket fa-5" aria-hidden="true" style={{fontSize: '16px'}} onClick={this.goToCart}></i>                        
                                    </Badge>
                                </Popover>
                            </NavLink>
                        </NavItem>
                        <NavItem style={{padding: '2px'}}>
                            <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle' }} size="medium">
                                { localStorage.getItem('name').substr(0,1) }
                            </Avatar>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/" onClick={this.logoutUser.bind(this)}>
                                {/* Logout */}
                                <i className="fa fa-power-off header-icon-font" aria-hidden="true"></i>
                            </NavLink>
                        </NavItem>                    
                    </Nav> : null}
                </Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state,
        cartCount: state.cartReducer
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        loguser: bindActionCreators(authService,dispatch),
        cartAction: bindActionCreators(cartService,dispatch)
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));