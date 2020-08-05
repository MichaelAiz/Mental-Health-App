import React from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path = "/">
          <Landing></Landing>
        </Route>
        <Route path = "/auth">
          <Navbar></Navbar>
        </Route>
      </Router>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
