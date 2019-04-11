import React, {Component} from 'react'
import { Form,Button, Container, Col, Row } from 'react-bootstrap';
import Footer from './Footer'
import apiCaller from '../apiCaller';
import sha256 from 'sha256'
class Forgotpassword extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      validated:false
    }
  }
  handleFormChange = (event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  handleSubmit = (event)=>{
    event.preventDefault();
    if(event.target.checkValidity()===false){
      event.stopPropagation();
      this.setState({validated:true})
    }
    else{
      apiCaller("GET",{},"reset_password",{
        "email":this.state.email,
        "p256":sha256(this.state.password)}).then(response=>{
        return response.json();
      }).then(data=>{
        console.log(data.message);
        alert(data.message)
      }).catch(e=>{
        console.log(e);
        alert(e.message);
      })
    }
  }
    render(){
        return (
            <>
            <Container style={{"marginTop":"10px","marginBottom":"10px"}}>
              <Row>
              <Col></Col>
              <Col xs={6}>              
              <Form noValidate validated={this.state.validated} onSubmit={(event)=>{this.handleSubmit(event)}}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={(event)=>{this.handleFormChange(event)}} type="email" name="email" required as="input" autoComplete="email" placeholder="Enter Email" />
                  <Form.Control.Feedback type="invalid">
                        Enter valid E-Mail ID
                  </Form.Control.Feedback>
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
                <Button type="submit" variant="primary">
                  Send Reset link
                </Button>
              </Form>
              </Col>
              <Col></Col>
              </Row>
              </Container>
              <Footer/>
            </>
        )
    }
}

export default Forgotpassword