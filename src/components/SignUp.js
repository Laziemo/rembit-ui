import React, {Component} from 'react'

import { connect } from "react-redux";
import history from '../history'
import apiCaller from '../apiCaller'

const sha256 = require('sha256')

import {Form, Button,Container,Row,Col, Alert} from 'react-bootstrap';


import {  Redirect  } from 'react-router-dom';
import Footer from "./Footer";



class SignUp extends Component{
    constructor(props){
      super(props);
      this.state = {
        username:'',
        email:'',
        password:'',
        confirm_password:'',
        err_message:'',
        validated:false
      }
    }

    handleSubmit = (event)=>{
      event.preventDefault();
      if (event.target.checkValidity() === false) {
        event.stopPropagation();
        this.setState({validated:true})
      }
      else{
        if(this.state.password===this.state.confirm_password){
          apiCaller("POST",{},"register",{
            "username":this.state.username,
            "email":this.state.email,
            "p256":sha256(this.state.password)})
          .then(response=>{
              return response.json();
            }).then(data=>{
              alert(data.message);
            }).catch(e=>{
              console.log(e);
              alert(e.message)
            })
          }
          else{
            this.setState({err_message:"Passwords do not match"});
            this.setState({password:"", confirm_password:""});
          }
      }
    }

    handleFormChange = (event)=>{
      this.setState({[event.target.name]:event.target.value});
    }
    render(){
      const { classes } = this.props;

      return (
        <div>
          <Container style={{"marginTop":"10px","marginBottom":"10px"}}>
            <Row>
              <Col xs={6}>
                <Form noValidate validated={this.state.validated} onSubmit={(event)=>{this.handleSubmit(event)}}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control  onChange={(event)=>{this.handleFormChange(event)}} type="email" name="email" required as="input" autoComplete="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <Form.Control.Feedback type="valid">
                    GoodJob
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control  onChange={(event)=>{this.handleFormChange(event)}} type="text" name = "username" required as="input" autoComplete="email" placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={this.state.password} onChange={(event)=>{this.handleFormChange(event)}} type="password" name="password" pattern="^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){1,})(?=(?:.*\d){1,})(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,})$" required autoComplete="new-password" placeholder="Password" />
                  <Form.Control.Feedback type="invalid">
                    8chars, 1 Capital, 1 Small, 1 Special, 1 Number
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">
                    GoodJob
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirm_password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control value={this.state.confirm_password} onChange={(event)=>{this.handleFormChange(event)}} type="password" pattern="^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){1,})(?=(?:.*\d){1,})(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,})$" name="confirm_password" required autoComplete="new-password" placeholder="Confirm Password" />
                  <Form.Control.Feedback type="invalid">
                    8chars, 1 Capital, 1 Small, 1 Special, 1 Number
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">
                    GoodJob
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                {this.state.err_message!=""?<Alert variant="danger">{this.state.err_message}</Alert>:""}
                </Form>
              </Col>
              <Col xs={6}></Col>
            </Row>
          </Container>
          <Footer />
        </div>
      );
    }
}



export default SignUp;