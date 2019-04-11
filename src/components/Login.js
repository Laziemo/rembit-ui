import React, {Component} from 'react'

import { connect } from "react-redux";


import apiCaller from '../apiCaller'
import history from '../history'
const sha256 = require('sha256')

import {
    Button,
    Form,
    Container,
    Row,
    Col } from 'react-bootstrap';


import {  Redirect  } from 'react-router-dom';
import Footer from "./Footer";



class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            loginStatus:false,
            username:'',
            password:'',
            forgotPassword:false,
            signUp:false,
            validated:false
        }
    }

    handleFormChange = (event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleLoginSubmit = (event)=>{
      event.preventDefault();
      console.log("Event");
      if (event.target.checkValidity() === false) {
        event.stopPropagation();
        this.setState({validated:true});
      }
      else{
        apiCaller("POST",{},"login",{
          "username":this.state.username,
          "p256":sha256(this.state.password)})
          .then(response=>{
          return response.json()
        }).then(data=>{
          
            if(data.status===true){
              window.jwt = data.message.jwt;
              this.props.loginSuccess();
              history.push('/dashboard');
            }
            else{
              alert(data.message);
            }            
        }).catch(e=>{
              console.log(e);
              alert('Full Error. Fetch fail. Check if the server is Running');

          })
      }
    }

    render(){
        return (
            <>
              <Container style={{"marginTop":"10px","marginBottom":"10px"}} style={{"textAlign":"center"}}>
                <Row>
                  <Col></Col>
                  <Col xs={6}>
                  <Form noValidate validated={this.state.validated} onSubmit={(event)=>{this.handleLoginSubmit(event)}} style={{"marginTop":"10px","marginBottom":"10px"}}>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control onChange={(event)=>{this.handleFormChange(event)}} type="text" name="username" required as="input" autoComplete="username" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control onChange={(event)=>{this.handleFormChange(event)}} type="password" name="password" required as="input" pattern="^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){1,})(?=(?:.*\d){1,})(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,})$" autoComplete="password" placeholder="Enter password" />
                      <Form.Control.Feedback type="invalid">
                        8chars, 1 Capital, 1 Small, 1 Special, 1 Number
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                  </Form>
                  <Button style={{"marginBottom":"10px"}} variant="flat" onClick={()=>{history.push('/forgotpassword')}}>
                    Forgot Password
                    </Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Container>
              <Footer />
            </>
            )
    }
}

const mapStateToProps = (state)=>{
    return {loginStatus:state.loginreducer.loginStatus}
}


const mapDispatchToProps = (dispatch)=>{
    return {
        loginSuccess: ()=>{dispatch({type:"LOGIN"})},
        updateField :(fieldName,value)=>{dispatch({type:"FIELD_UPDATE",fieldName,value})}
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Login)