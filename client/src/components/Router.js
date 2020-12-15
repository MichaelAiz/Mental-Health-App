import React, { Component } from 'react';
import Navbar from './Navbar';
import Landing from './Landing';
import Quotes from './Quotes'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = { page: "Start" }
    }

    updateData = (data) => {
        this.setState(data)
    }

    render() { 
            switch(this.state.page) {
                case "Start": 
                    return(
                        <div className = "App">
                            <Landing callback = {this.updateData}></Landing>
                        </div>
                )
                case "home":
                    return(
                        <div className = "App">
                            <Navbar></Navbar>
                            <Quotes token = {this.state.token}></Quotes>
                        </div>
                    )
                    case "components":
                        return(
                            <div className = "App">
                                <h1>Hello</h1>
                            </div>
                        )
            }
    }
}
 
export default Router;