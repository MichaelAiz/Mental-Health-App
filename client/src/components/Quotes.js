import React, { Component } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
   } from 'reactstrap';

  class Quotes extends Component {
      constructor(props) {
          super(props);
          this.state = { quotes: [] }
      }
      getQuotes = () => {
        axios 
        .get('')
      }
      componentDidMount() {
          
      }
      render() { 
          return ( <div>
            <h2 className = "ml-3">Your Quotes</h2>
        <div className = "m-2">
            <InputGroup className = "">
                <Input />
                <InputGroupAddon addonType="append"><Button className = "">Add Quote</Button></InputGroupAddon>
            </InputGroup>
        </div>

        </div> 
        );
      }
  }
   
  export default Quotes;