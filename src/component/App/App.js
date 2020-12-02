import React from 'react';
import Header from '../Header';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
