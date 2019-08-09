import React, {Component}  from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Add.css'
import ImageUploader from 'react-images-upload';
import * as productServies from '../../Store/Actions/product';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Add extends Component {
    state = {
        pictures: [],
        imgArr : ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg'],
        randomNumber: Math.floor(Math.random() * 10),
        product_name: '',
        product_price: '',
        product_desc: '',
        fieldValidate: {
            product_name: false,
            product_price: false,
            product_desc: false,
            product_img: false
        },
        fieldErrors: {
            product_name: "",
            product_price: "",
            product_desc: "",
            product_img: ""
        },
        formValid: false,
        title: 'Add Fruits',
        editFruitId: ''
    }

    componentDidMount() {
      if(this.props.location.pathname === `/edit/${this.props.match.params.id}`) {
          this.setState({
            title: 'Edit Fruit',
            editFruitId: this.props.match.params.id
          })
          this.props.action.products.getProductsByPid(this.props.match.params.id)
            .then((response) => {
                var files = [];
                let img = [];
                files = JSON.parse(response.data[0].product_img);
                files.map((images) => {
                  return img.push(new File([""], 'http://192.168.0.110:5001/thumbimages/'+images, {type: "image/jpeg"}));                  
                })
                this.setState({
                  pictures: img
                })

                this.setState({
                  product_name: response.data[0].product_name,
                  product_price: response.data[0].product_price,
                  product_desc: response.data[0].product_desc
                }, () => {
                  console.log('state',this.state)
                })
            })
      }
    }
    
    componentDidUpdate(prevProps) {
      if(this.props.location.pathname !== prevProps.location.pathname) {
        this.setState({
          product_name: '',
          product_price: '',
          product_desc: '',
          title: 'Add Fruits',
          editFruitId: '',
          pictures: []
        })
      }
    }

    handleChange = (e) => {
      let fieldName = e.target.name;
      let fieldValue = e.target.value;
      this.setState({
          [e.target.name]: e.target.value           
      }, () => {
        this.validateFields(fieldName, fieldValue);
      });
    }

    validateFields = (fieldName, fieldValue) => {        
      let fieldValid = this.state.fieldValidate;
      let fieldErrors = this.state.fieldErrors;

      switch (fieldName) {
          case "product_name": {
              if(fieldValue === '') {
                  fieldErrors.product_name = 'Product name required.';
                  fieldValid.product_name = false;
              }
              else {
                  fieldErrors.product_name = '';
                  fieldValid.product_name = true;
              }
              break;
          }
          case "product_price": {
              let pricePattern = /(0.|[1-9]\d*.)d{2}/;
              if(fieldValue === '') {
                  fieldErrors.product_price = 'Product price required.';
                  fieldValid.product_price = false;
              }
              else if(pricePattern.test(fieldValue) || isNaN(fieldValue)) {
                  fieldErrors.product_price = 'Enter valid price.';
                  fieldValid.product_price = false;
              }
              else {
                  fieldErrors.product_price = '';
                  fieldValid.product_price = true;
              }
              break;
          }
          case "product_desc": {
              if(fieldValue === '') {
                  fieldErrors.product_desc = 'Product description required.';
                  fieldValid.product_desc = false;
              }
              else {
                  fieldErrors.product_desc = '';
                  fieldValid.product_desc = true;
              }
              break;
          }
          case "product_img": {
            if(fieldValue.length <=0) {
                fieldErrors.product_img = 'Select Product image.';
                fieldValid.product_img = false;
            }
            else {
                fieldErrors.product_img = '';
                fieldValid.product_img = true;
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
          formValid: 
            this.state.fieldValidate.product_name && 
            this.state.fieldValidate.product_price && 
            this.state.fieldValidate.product_desc && 
            this.state.fieldValidate.product_img
      })
    }

    addProducts = (e) => {  
      e.preventDefault();
      if(this.state.pictures.length <= 0) {
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                product_img: 'Select Product image.'
            }
        })
      }      
      
      if(this.state.product_desc === '') {    
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                product_desc: 'Product Description required.'
            }
        })
      }
      if(this.state.product_price === '') {    
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                product_price: 'Product Price required.'
            }
        })
      }
      if(this.state.product_name === '') {    
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                product_name: 'Product name required.'
            }
        })
      }

      if(this.state.formValid) {
        let { pictures } = this.state;
        let formData = new FormData();
        for (var i=0; i<pictures.length; i++){
            formData.append('product_img',pictures[i]);
        }

        formData.append('product_name', this.state.product_name);
        formData.append('product_desc', this.state.product_desc);
        formData.append('product_price', this.state.product_price);
        const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
        };
        this.props.action.products.addNewProduct(formData, config)
          .then((response) => {
            this.props.history.push('/list');
          });
      }                
    }

    setImage(e){
      let img = [];

      if(this.props.history.location.pathname !== '/add') {
        img=[...this.state.pictures];
        for(let i=0;i<e.length;i++){
          img.push(e[i]);
        }
      }
      else {
        for(let i=0;i<e.length;i++){
          img.push(e[i]);
       }
      }

      this.setState({
        pictures: img
      }, () => {
        console.log(this.state.pictures)
        this.validateFields('product_img', this.state.pictures)
      });
    }

    editProducts = (e) => {
      e.preventDefault();
      if(this.state.pictures.length <= 0) {
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                product_img: 'Select Product image.'
            }
        })
      }
      
      if(this.state.product_desc === '') {    
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                product_desc: 'Product Description required.'
            }
        })
      }

      if(this.state.product_price === '') {    
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                product_price: 'Product Price required.'
            }
        })
      }
    
      if(this.state.product_name === '') {    
        this.setState({
            fieldErrors: {
                ...this.state.fieldErrors,
                product_name: 'Product name required.'
            }
        })
      }
    
      if(this.state.product_name && this.state.product_desc && this.state.product_price) {
        console.log("state",this.state);
        let { pictures } = this.state;
        console.log("pictures",pictures);

        let formData = new FormData();
        // let x = [];
        // let y = [];
        pictures.map((pic, id) => {
            //x.push((pic).split("-")); //Split the name 'apple-1-1564032714709.jpg' after '-'
            //y.push(new File([""], x[id][x[id].length - 1], {type: "image/jpeg"})); //Converted into file object and retrieve last value after '-'
            formData.append('product_img', pic);
            return pic;
        });

        // y.map((img) => {
        //   console.log(img);
        // })

        formData.append('product_id', this.state.editFruitId);
        formData.append('product_name', this.state.product_name);
        formData.append('product_desc', this.state.product_desc);
        formData.append('product_price', this.state.product_price);

        const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
        };
        this.props.action.products.editProduct(formData, config, this.state.editFruitId);
      }
    }

    render () {
        return (
        <div className="container-fluid">                  
          <div className="row">
          <div className="col-lg-6 col-sm-12" style={{width:'60%'}}>
          <div className="partition" id="partition-register">
          <div className="partition-title">{this.state.title}</div>            
          <div className="partition-form">
              <Form className="container">
                <FormGroup row>
                  <Label for="exampleName" sm={2}> Product Name</Label>
                  <Col sm={10}>
                    <Input type="text" name="product_name" id="exampleName" placeholder="Type product name here" 
                      value={this.state.product_name}
                      onChange={this.handleChange.bind(this)}/>
                    <span className="span-error">{this.state.fieldErrors.product_name}</span>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleDesc" sm={2}>Description</Label>
                  <Col sm={10}>
                    <Input type="text" name="product_desc" id="exampleDesc" placeholder="Type product description here" maxLength="100" 
                      value={this.state.product_desc}
                      onChange={this.handleChange.bind(this)}/>
                    <span className="span-error">{this.state.fieldErrors.product_desc}</span>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePrice" sm={2}>Price (in KG)</Label>
                  <Col sm={10}>
                    <Input type="text" name="product_price" id="examplePrice" placeholder="Type product price here" maxLength="5"
                      value={this.state.product_price}
                      onChange={this.handleChange.bind(this)}/>
                    <span className="span-error">{this.state.fieldErrors.product_price}</span>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleImage" sm={2}>Image</Label>
                  <Col sm={8}>
                      <ImageUploader
                          withIcon={true}
                          buttonText='Choose images'
                          onChange={this.setImage.bind(this)}
                          imgExtension={['.jpg', '.gif', '.png', '.gif']}
                          maxFileSize={5242880}
                          withPreview={true}
                          value={this.state}
                      />                      
                      <span className="span-error">{this.state.fieldErrors.product_img}</span>
                  </Col>
                </FormGroup>                      
                <FormGroup>
                  <Col sm={{ size: 8, offset: 2 }}>
                    {
                      this.state.editFruitId === '' ? 
                      <center><Button className="btn btn-danger" onClick={this.addProducts.bind(this)}>Add</Button></center> :
                      <center><Button className="btn btn-danger" onClick={(event) => this.editProducts(event)}>Edit</Button></center>
                    }
                  </Col>
                </FormGroup>
              </Form>
          </div>
          </div>
          </div>
          <div className="col-lg-6 col-sm-12 pr-0" style={{width:'40%'}}>
              <div className="box-messages">
                  <img alt="image1" className="img-fluid img1" 
                    src={require('../fruits/'+this.state.imgArr[this.state.randomNumber])}/>
              </div>
          </div>
          </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    product: state.productReducer
  }
}

const mapDispatchToProps = dispatch => ({
  action: {
    products: bindActionCreators(productServies, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Add);