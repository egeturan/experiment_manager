import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Button from 'react-bootstrap/Button';
import './App.css';
import PageManager from './PageManager';
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageManagerController from './PageManagerController';

ReactDOM.render(
  <React.StrictMode>
    <div>
    <Router>
    <Switch>
      <Route exact path="/" component={PageManagerController} />
      <Route exact path="/page" component={PageManager} />
      <Route path="/registerUAD58097614" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
  </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
