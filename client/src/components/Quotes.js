import React, { Component } from "react";
import axios from "axios";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup, 
  ListGroupItem 
} from "reactstrap";

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuote: "",
      quotes: [],
    };
  }
  getQuotes = () => {
    axios
      .get("/api/protected/quotes/get-all", {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => this.setState({ quotes: res.data }));
  };
  componentDidMount() {
    this.getQuotes();
  }
  addQuote = () => {
    axios
      .post(
        "api/protected/quotes/add",
        {
          quote: this.state.newQuote,
        },
        {
          headers: { Authorization: `Bearer ${this.props.token}` },
        }
      )
      .then((res) => this.setState({ quotes: res.data }));
  };
  updateQuote = (event) => {
    this.setState({ newQuote: event.target.value });
  };

  showQuotes = () => {
      let i =0;
      for(i = 0; i < this.state.quotes.length; i++){

      }
  }
  render() {
    return (
      <div>
        <h2 className="ml-3">Your Quotes</h2>
        <div className="m-2">
          <InputGroup className="">
            <Input name="newQuote" onChange={this.updateQuote} />
            <InputGroupAddon addonType="append">
              <Button type="submit" onClick={this.addQuote} className="">
                Add Quote
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <ListGroup>
            {this.state.quotes.map(({id, text}) => (
              <ListGroupItem>
                {text}
                <Button close className = "delete-btn" color = "danger" size="sm"></Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Quotes;
