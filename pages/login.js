import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Head from 'next/head'
import { setCookie } from 'nookies'
import Router from 'next/router'


class login extends Component {
    constructor(){
        super();
       
        this.state = {
         username: '',
         password: '',
         redirectToReferrer: false,
         isError:false
        };
    
        this.logins = this.logins.bind(this);
        this.onChange = this.onChange.bind(this);
    
      }
      onChange(e){
        this.setState({[e.target.name]:e.target.value});
       }
       logins = async () => {
        var url = 'https://strapiloginregistraiton.herokuapp.com/';
        var loginData = {"identifier": this.state.username, "password": this.state.password};
        await fetch(`${url}/auth/local`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
//         const loginResponse = await login.json();
// console.log(loginResponse)
.then(async (result) => result.json())
        .then(result=>{
            console.log(result)
            if (result.jwt) {
            Router.push('/about');
            // this.setState({redirectToReferrer: true});
                    setCookie(null, 'token', result.jwt , {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                })
          } else {
            this.setState({isError: true});
          }
    })}

    render() {
        if (this.state.redirectToReferrer) {
            return (Router.push('/about'))
          }

        return (
        <>
        <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="container">
        <h1>User Login</h1>
        <Form>
      <Row form>
        <Col md={12}>
        <FormGroup>
            <Label for="userName">Username</Label>
            <Input type="text" name="username" id="userName" placeholder="username" onChange={this.onChange} value={this.username}/>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={12}>
        <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="password" name="password" id="Password" placeholder="password " onChange={this.onChange} value={this.password}/>
          </FormGroup>
        </Col>
      </Row>
      <Button onClick={this.logins}>Sign In</Button>
    </Form>
        </div>
        </>
        );
    }
}

export default login;

