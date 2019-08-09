import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authAction from '../../Store/Actions/auth'

// import bgimg from './web-design-development.jpeg'
import Register from '../Register/Register';
import './Login.css'

class Login extends Component {
    state = {
        email: '',
        password: '',
        fieldValidate: {
            email: false,
            password: false
        },
        fieldErrors: {
            email: "",
            password: ""
        },
        formValid: false,
        imgArr : ['f1.jpg','f3.jpg','f4.jpg','f5.jpg','f6.jpg', 'apple_1_main.jpg', 'main_2.jpg', 'main_3.jpg', 'main_4.jpg', 'main_5.jpg', 'main_6.jpg'],
        randomNumber: Math.floor(Math.random() * 11)
    }

    handleChange = (e) => {        
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.validateFields(fieldName, fieldValue);
        })
    }

    validateFields = (fieldName, fieldValue) => {        
        let fieldValid = this.state.fieldValidate;
        let fieldErrors = this.state.fieldErrors;
        switch (fieldName) {
            case "email": {
                let emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;            
                fieldValid.email = emailPattern.test(fieldValue);
                if(fieldValue === '') {
                    fieldErrors.email = 'Email-id required.';
                }
                else if(!fieldValid.email) {
                    fieldErrors.email = 'Enter valid Email-id.';
                }                
                else {
                    fieldErrors.email = '';
                }
                break;
            }
            case "password": {
                let passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
                fieldValid.password = passPattern.test(fieldValue);
                if(fieldValue === '') {
                    fieldErrors.password = 'Password required.';
                }
                else if(!fieldValid.password) {
                    fieldErrors.password = 'Password must contain atleast 8 characters with one uppercase letter and one number.';
                }
                else {
                    fieldErrors.password = '';
                }
                break;
            }
            default:                
                break;
        }
        this.setState({
            fieldValidate: { ...this.state.fieldValidate, fieldValid},
            fieldErrors: { ...this.state.fieldErrors, fieldErrors}
        }, this.checkValidate());        
    }

    checkValidate = () => {
        this.setState({
            formValid: this.state.fieldValidate.email && this.state.fieldValidate.password
        })
    }

    signInUser = (e) => {
        e.preventDefault();

        if(this.state.email === '') {
            this.setState({
                fieldErrors: {
                    ...this.state.fieldErrors,
                    email: 'Email required.'
                }
            }, () => {
                if(this.state.password === '') {
                    this.setState({
                        fieldErrors: {
                            ...this.state.fieldErrors,
                            password: 'Password required.'
                        }
                    })
                }
            })
        }
        if(this.state.formValid) {
            let credentials = {
                "email": this.state.email,
                "password": this.state.password
            }
            this.props.action.auth.loginUser(credentials).then((res) => {
                if(localStorage.getItem("token")) {
                    this.props.history.push('/list');
                }
            })
        }                
    }

    render() {
        return (           
        <div className="container-fluid">
        <div className="row">
            { this.props.location.pathname === '/' ? (
            <div className="col-lg-7 col-sm-6">
            <div className="partition" id="partition-register">
            <div className="partition-title">Sign In</div>
            <div className="span-error">{ this.props.auth.error_msg }</div>
            <div className="partition-form">
                <Form className="container login-form">                
                    <FormGroup>
                        <Label for="Email">Email</Label>
                        <Input type="email" name="email" placeholder="Email" onChange={this.handleChange.bind(this)} value={this.state.email} style={{ width: '70%', margin:'auto'}}/>
                        <span className="span-error">{this.state.fieldErrors.email}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.password} style={{ width: '70%', margin:'auto'}}/>
                        <span className="span-error">{this.state.fieldErrors.password}</span>
                    </FormGroup>
                    <button className="btn btn-danger" onClick={this.signInUser.bind(this)}>Login</button>                    
                    <NavLink tag={Link} to="/register" style={{textAlign: 'right'}}>
                        <font style={{color: 'black'}}>New user?&nbsp;</font> 
                        <u className="redirect-link">Sign Up</u>
                    </NavLink>
                </Form>
            </div>
            </div>
            </div> ) : (
                <Register {...this.props}></Register>
            ) }
            <div className="col-lg-5 col-sm-6 p-0">
            <div className="box-messages">
               <img src={require('../main_img/'+this.state.imgArr[this.state.randomNumber])} alt="imgRight" className="img-fluid imgMain"/>
            </div>
          </div>
        </div>
    </div>
        )
    }
}

const mapStateToProps = state => {    
    return {        
        auth: state.authReducer
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);