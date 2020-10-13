import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Head from 'next/head';
import _ from 'lodash';

class register extends Component {
  constructor(){
    super();
    this.state = {
     email: '',
     username: '',
     password: '',
     fname:'',
     lname:'',
     gender:'',
     country:'',
     redirectToReferrer: false,
     isError:false
    };

    this.register = this.register.bind(this);
    this.onChange = this.onChange.bind(this);
    this.change = this.change.bind(this);
  }

  change(event){
    this.setState({country: event.target.value});
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  register = async () => {
  var url = 'https://strapiloginregistraiton.herokuapp.com/';
  var registerData = {"email":this.state.email,"username": this.state.username, "password": this.state.password, "fname":this.state.fname, "lname":this.state.lname, "gender":this.state.gender, "country":this.state.country};
  console.log(registerData, url)
  const response = await fetch(`${url}/auth/local/register`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify(registerData)
  })
// .then(async (result) => {
  const responseJson = await response.json();
  if (response.status !== 200) {
    alert(_.get(responseJson, ['message', '0', 'messages','0', 'message']))
    console.log(_.get(responseJson, ['message', '0', 'messages','0', 'message']))

} else {
  alert('Your email is successfully register.')
}
      
}
    render() {
        return (
            <>
            <Head>
           <title>Registration Page</title>
           <link rel="icon" href="/favicon.ico" />
         </Head>
           <div className="container">
             <h1>User Registration</h1>
           <Form>
         <Row form>
           <Col md={6}>
             <FormGroup>
               <Label for="Email">Email</Label>
               <Input type="email" name="email" id="Email" placeholder="email" onChange={this.onChange} value={this.email}/>
             </FormGroup>
           </Col>
           <Col md={6}>
           <FormGroup>
               <Label for="userName">Username</Label>
               <Input type="text" name="username" id="userName" placeholder="username" onChange={this.onChange} value={this.username}/>
             </FormGroup>
           </Col>
         </Row>
         <Row form>
           <Col md={6}>
           <FormGroup>
               <Label for="Password">Password</Label>
               <Input type="password" name="password" id="Password" placeholder="password " onChange={this.onChange} value={this.password}/>
             </FormGroup>
           </Col>
           <Col md={6}>
             <FormGroup>
               <Label for="firstName">First Name</Label>
               <Input type="text" name="fname" id="firstName" onChange={this.onChange} value={this.fname}/>
             </FormGroup>
           </Col>
         </Row>
         <Row form>
           <Col md={6}>
             <FormGroup>
               <Label for="lastName">Last Name</Label>
               <Input type="text" name="lname" id="lastName" onChange={this.onChange} value={this.lname}/>
             </FormGroup>  
           </Col>
           <Col md={6}>
           <FormGroup tag="fieldset" row>
           <legend className="col-form-label col-sm-12">Gender</legend>
           <Row className="m-0" >
             <FormGroup check className="col-sm-6">
               <Label check>
                 <Input type="radio" name="gender" value="male" onChange={this.onChange}/>
                 Male
               </Label>
             </FormGroup>
             <FormGroup check className="col-sm-6">
               <Label check>
                 <Input type="radio" name="gender" value="female" onChange={this.onChange}/>
                 Female
               </Label>
             </FormGroup>
           </Row>
         </FormGroup>
           </Col>
         </Row>
         <Row form>
         <Col md={6}>
         <FormGroup>
           <Label for="Country">Country</Label>
           <Input type="select" name="country" id="Country"  onChange={this.change} value={this.country}>
             <option>India</option>
             <option>Ameria</option>
             <option>Canada</option>
             <option>Japan</option>
             <option>Austrailia</option>
           </Input>
         </FormGroup>
           </Col>
           </Row>
         <Button onClick={this.register}>Sign Up</Button>
       </Form>
           </div>
           </>
        );
    }
}

export default register;

