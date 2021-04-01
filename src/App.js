import PageManager from './PageManager';
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import RemoveUser from "./Auth/RemoveUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, {useCallback} from 'react';
import PageManagerController from './PageManagerController';
//CSS
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
