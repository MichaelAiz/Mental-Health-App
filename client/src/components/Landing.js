import React, { Component } from "react";
import Login from './Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Form, FormGroup, Label, FormText } from "reactstrap";

export default function Landing() {
  return (
    <div class="landing-page">
      <div class="landing-body">
        <Row className="justify-content-center">
          <Col sm="6" lg="4">
            <h2 class = "landing-header">
              Welcome to my mental health app
            </h2>
          </Col>
          <Col sm="12" md="8" lg="6" xl = "5">
            <Login></Login>
          </Col>
        </Row>
      </div>
    </div>
  );
}
