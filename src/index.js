import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import PageManager from './PageManager';
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageManagerController from './PageManagerController';
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';
import './style/App.css';

ReactDOM.render(
  <React.StrictMode>
    <div>
    <Router>
    <Switch>
      <Route exact path="/" component={PageManagerController} />
      <Route path="/page" component={PageManager} />
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
