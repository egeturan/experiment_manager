import './App.css';
import PageManager from './PageManager';
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, {useCallback} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FullScreenApp from './FullScreenApp';
import PageManagerController from './PageManagerController';

function App() {
  return (
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
  );
}

export default App;
