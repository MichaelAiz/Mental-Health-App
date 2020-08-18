import React, { Component } from "react";
import axios from "axios";
import Navbar from './Navbar';
import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  Button,
} from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Form, FormGroup, Label, FormText } from "reactstrap";



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "register",
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      token: "",
      errors: [
      ]
    };
  }

  render() {
    return this.showForm();
  }

  handleInputChange = (event) => {
    this.setState({errors: []});
    const target = event.target;
    const name = target.name;

    this.setState({ [name]: target.value });
  };

  showForm = () => {
    if (this.state.action === "login") {
      return this.login();
    } else {
      console.log("hi");
      return this.register();
    }
  };

  handleRegister = (e) => {

    e.preventDefault();
    axios
      .post("/api/users/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm
      })
      .then((res) => localStorage.setItem('token', res.data.token))
      .then(()=>this.props.history.push("/home"))
      .catch((errors) => {
        console.log(errors.response.data.errors[0])
        this.setState({errors: errors.response.data.errors });
      });
  };

  handleLogin = (e) => {

    e.preventDefault();
    axios
      .post("/api/users/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => localStorage.setItem('token', res.data.token))
      .then(()=>this.props.history.push("/home"))
      .catch((errors) => {
        this.setState({errors: errors.response.data.errors });
        console.log(errors.response)
        console.log(this.state.errors);
      });
  }

  login = () => {
    const {errors} = this.state;
    return (
      <div>
        <Form onSubmit={this.handleLogin} className="login-form m-2">
          <h2 style={{ textAlign: "center" }}>Login </h2>
          <FormGroup style={{ textAlign: "left" }}>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <div class = "mb-2" style={{ textAlign: "left", fontSize: "1rem", color: "red"}}>
            <p>{this.showErrors(errors, 'email')}</p>
          </div>
          <FormGroup style={{ textAlign: "left" }}>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <div class = "mb-2" style={{ textAlign: "left", fontSize: "1rem", color: "red"}}>
            <p>{this.showErrors(errors, 'password')}</p>
          </div>
          <div class = "mb-2" style={{ textAlign: "left", fontSize: "1rem", color: "red"}}>
            <p>{this.showErrors(errors, 'general')}</p>
          </div>
          <Button className="btn-lg btn-dark w-100">Login</Button>
          <h3 class="mt-2">Don't have an account?</h3>
          <Button
            type="button"
            color="dark"
            onClick={() => {
              this.setState({errors: []});
              this.setState({ action: "register" })}
            }
            className="btn-lg"
          >
            Register Now
          </Button>
        </Form>
      </div>
    );
  };

  showErrors = (errors, param) => {
    if(errors) {
      let i; 
    let msg = ""
    for (i = 0; i < errors.length; i++) {
      if(errors[i].param===param){
        msg = errors[i].msg
        break;
      } 
    }
    return msg;
    }
  }

  register = () => {
    const {errors} = this.state;
    return (
      <div>
        <Form onSubmit={this.handleRegister} className="login-form m-2">
          <h2 style={{ textAlign: "center" }}>Register Now </h2>
          <FormGroup style={{ textAlign: "left" }}>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="name"
              id="name"
              placeholder="Name"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <div class = "mb-2" style={{ textAlign: "left", fontSize: "1rem", color: "red"}}>
            <p>{this.showErrors(errors, 'name')}</p>
          </div>
          <FormGroup style={{ textAlign: "left" }}>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <div class = "mb-2" style={{ textAlign: "left", fontSize: "1rem", color: "red"}}>
            <p>{this.showErrors(errors, 'email')}</p>
          </div>
          <FormGroup style={{ textAlign: "left" }}>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <div class = "mb-2" style={{ textAlign: "left", fontSize: "1rem", color: "red"}}>
            <p>{this.showErrors(errors, 'password')}</p>
          </div>
          <FormGroup style={{ textAlign: "left" }}>
            <Label for="passwordConfirm">Confirm Password</Label>
            <Input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="password placeholder"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <div class = "mb-2" style={{ textAlign: "left", fontSize: "1rem", color: "red"}}>
            <p>{this.showErrors(errors, 'passwordConfirm')}</p>
          </div>
          <Button type className="btn-lg btn-dark btn-block">
            Register
          </Button>
          <h3 class="mt-2">Already have an account?</h3>
          <Button
            type="button"
            color="dark"
            onClick={() => {
              this.setState({errors: []});
              this.setState({ action: "login" })}
            }
            className="btn-lg"
          >
            Login
          </Button>
        </Form>
      </div>
    );
  };
}

export default withRouter(Login);
