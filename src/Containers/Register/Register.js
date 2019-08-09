import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Col, Button, Form, FormGroup, Label, NavLink, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import './Register.css';
import * as authService from '../../Store/Actions/auth'

class Register extends Component {
  state = {
    fullname: '',
    email: '',
    password: '',
    confirmpassword: '',
    city: '',
    address: '',
    gender: '',    
    fieldRegValidate: {
      fullname: false,
      email: false,
      password: false,
      confirmpassword: false,
      city: false,
      address: false,
      gender: false
    },
    fieldRegErrors: {
        fullname: "",
        email: "",
        password: "",
        confirmpassword: '',
        city: '',
        address: '',
        gender: ''
    },
    RegformValid: false
  }

  handleInput = (e) => {
      let fieldName = e.target.name;
      let fieldValue = e.target.value;
      this.setState({
        [e.target.name] : e.target.value
      }, () => {
        this.validateInputFields(fieldName, fieldValue)
      });
  }
  validateInputFields = (fieldName, fieldValue) => {        
    let fieldRegValidate = this.state.fieldRegValidate;
    let fieldRegErrors = this.state.fieldRegErrors;
    switch (fieldName) {
        case "fullname": {
          let namePattern = /^[a-zA-Z0-9 ]+$/;            
          fieldRegValidate.fullname = namePattern.test(fieldValue);
          if(fieldValue === '') {
              fieldRegErrors.fullname = 'Name required.';
          }
          else if(!fieldRegValidate.fullname) {
              fieldRegErrors.fullname = 'Enter valid Name.';
          }                
          else {
              fieldRegErrors.fullname = '';
          }
          break;
      }
      case "email": {
          let emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;            
          fieldRegValidate.email = emailPattern.test(fieldValue);
          if(fieldValue === '') {
              fieldRegErrors.email = 'Email-id required.';
          }
          else if(!fieldRegValidate.email) {
              fieldRegErrors.email = 'Enter valid Email-id.';
          }                
          else {
              fieldRegErrors.email = '';
          }
          break;
      }
      case "password": {
          let passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
          fieldRegValidate.password = passPattern.test(fieldValue);
          if(fieldValue === '') {
              fieldRegErrors.password = 'Password required.';
          }
          else if(!fieldRegValidate.password) {
              fieldRegErrors.password = 'Password must contain atleast 8 characters with one uppercase letter and one number.';
          }
          else {
              fieldRegErrors.password = '';
          }
          break;
      }
      case "confirmpassword": {
          if(fieldValue !== this.state.password){
              fieldRegValidate.confirmpassword = false;
              fieldRegErrors.confirmpassword = 'Confirm Password does not match with Password field.';  
          }
          else {
              fieldRegValidate.confirmpassword = true;
              fieldRegErrors.confirmpassword = '';
          }
          break;
      }
      case "city": {
          if(fieldValue === '') {
              fieldRegValidate.city = false;
              fieldRegErrors.city = 'Select city.';
          }
          else {
              fieldRegErrors.city = '';
              fieldRegValidate.city = true;
          }
          break;
      }
      case "address": {
          if(fieldValue === '') {
              fieldRegValidate.address = false;
              fieldRegErrors.address = 'Please provide address.';
          }
          else {
              fieldRegValidate.address = true;
              fieldRegErrors.address = '';
          }
          break;
      }
      case "gender": {
          if(fieldValue === '') {
              fieldRegValidate.gender = false;
              fieldRegErrors.gender = 'Please select gender.';
          }
          else {
              fieldRegValidate.gender = true;
              fieldRegErrors.gender = '';
          }
          break;
        }
      default:                
          break;
    }
    this.setState({
      fieldRegValidate: { ...this.state.fieldRegValidate, fieldRegValidate},
      fieldRegErrors: { ...this.state.fieldRegErrors, fieldRegErrors}
    }, this.checkRegValidate());        
  }

  checkRegValidate = () => {
      this.setState({
          RegformValid: 
            this.state.fieldRegValidate.fullname && 
            this.state.fieldRegValidate.email && 
            this.state.fieldRegValidate.password &&
            this.state.fieldRegValidate.confirmpassword &&
            this.state.fieldRegValidate.city &&
            this.state.fieldRegValidate.address &&
            this.state.fieldRegValidate.gender 
      })
  }

  registerUser = (event) => {
    event.preventDefault();
    
    if(this.state.gender === '') {    
      this.setState({
          fieldRegErrors: {
              ...this.state.fieldRegErrors,
              gender: 'Select gender.'
          }
      })
    }
    if(this.state.address === '') {    
      this.setState({
          fieldRegErrors: {
              ...this.state.fieldRegErrors,
              address: 'Address required.'
          }
      })
    }
    if(this.state.city === '') {    
      this.setState({
          fieldRegErrors: {
              ...this.state.fieldRegErrors,
              city: 'Select city.'
          }
      })
    }
    if(this.state.confirmpassword === '') {    
      this.setState({
          fieldRegErrors: {
              ...this.state.fieldRegErrors,
              confirmpassword: 'Confirm Password required.'
          }
      })
    }
    if(this.state.password === '') {    
      this.setState({
          fieldRegErrors: {
              ...this.state.fieldRegErrors,
              password: 'Password required.'
          }
      })
    }
    if(this.state.email === '') {    
      this.setState({
          fieldRegErrors: {
              ...this.state.fieldRegErrors,
              email: 'Email required.'
          }
      })
    }
    if(this.state.fullname === '') {    
      this.setState({
          fieldRegErrors: {
              ...this.state.fieldRegErrors,
              fullname: 'Name required.'
          }
      })
    }
    if(this.state.RegformValid) {
      let userdata = {
        "fullname" : this.state.fullname,
        "email": this.state.email,
        "password": this.state.password,
        "city": this.state.city,
        "address": this.state.address,
        "gender": this.state.gender
      }
      this.props.action.auth.registerUser(userdata).then((resonse) => {
        if(resonse) {
          this.props.history.push('/list');
        }
      })
    }
    
  }

  render() {
    return (               
        <div className="col-lg-7 col-sm-12">
        <div className="register-partition" id="partition-register">
        <div className="register-partition-title">Register</div>
        <div className="span-error">{ this.props.regauth.error_msg }</div>            
        <div className="register-partition-form">
            <Form className="container">
              <FormGroup row>
                <Label for="exampleName" sm={2}>Name</Label>
                <Col sm={10}>
                  <Input type="text" name="fullname" id="exampleName" placeholder="Enter name here" onChange={this.handleInput.bind(this)} value={this.state.fullname}/>
                  <span className="span-error">{this.state.fieldRegErrors.fullname}</span>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input type="email" name="email" id="exampleEmail" placeholder="Enter email here" onChange={this.handleInput.bind(this)} value={this.state.email}/>
                  <span className="span-error">{this.state.fieldRegErrors.email}</span>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input type="password" name="password" id="examplePassword" placeholder="Enter password here" onChange={this.handleInput.bind(this)} value={this.state.password}/>
                  <span className="span-error">{this.state.fieldRegErrors.password}</span>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleconfirmPassword" sm={2}>Confirm Password</Label>
                <Col sm={10}>
                  <Input type="password" name="confirmpassword" id="exampleconfirmPassword" placeholder="Confirm password here" onChange={this.handleInput.bind(this)} value={this.state.confirmpassword}/>
                  <span className="span-error">{this.state.fieldRegErrors.confirmpassword}</span>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={2}>City</Label>
                <Col sm={10}>
                  <Input type="select" name="city" id="exampleSelect" onChange={this.handleInput.bind(this)} value={this.state.city}>
                    <option value="" disabled>Select City</option>
                    <option value="Surat">Surat</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Bardoli">Bardoli</option>
                    <option value="Navsari">Navsari</option>
                    <option value="Vapi">Vapi</option>
                    <option value="Billimora">Billimora</option>
                  </Input>
                  <span className="span-error">{this.state.fieldRegErrors.city}</span>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={2}>Address</Label>
                <Col sm={10}>
                  <Input type="textarea" name="address" id="exampleText" onChange={this.handleInput.bind(this)} value={this.state.address}/>
                  <span className="span-error">{this.state.fieldRegErrors.address}</span>
                </Col>
              </FormGroup>
              <FormGroup row>
                <legend className="col-form-label col-sm-2">Gender</legend>
                <Col sm={1}>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="gender" value="Male" onChange={this.handleInput.bind(this)}/>{' '}
                      Male
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="gender" value="Female" onChange={this.handleInput.bind(this)}/>{' '}
                      Female
                    </Label>                    
                  </FormGroup>                  
                </Col>
              </FormGroup>              
              <p><span className="span-error">{this.state.fieldRegErrors.gender}</span></p>
              <FormGroup>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button className="register-btn btn-danger" onClick={this.registerUser.bind(this)}>Register</Button>
                  <NavLink tag={Link} to="/" style={{textAlign: 'right'}}><font style={{color: 'black'}}>Already have an account?</font> <u className="register-redirect-link">Log In</u></NavLink>
                </Col>
              </FormGroup>                
            </Form>
        </div>
        </div>
      </div>    
    )
  }
}

const mapStateToProps = state => {    
  return {        
      regauth: state.authReducer
  }
}

const mapDispatchToProps = dispatch => ({
  action: {
    auth: bindActionCreators(authService, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);