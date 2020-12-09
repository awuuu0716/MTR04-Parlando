import React from 'react';
import Header from '../Header';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/Homepage';
import ShoppingCartPage from '../../pages/ShoppingCartpage';

import 'bootstrap/dist/css/bootstrap.min.css';
import RecipientPage from '../../pages/RecipientPage';
import TransactionPage from '../../pages/TransactionPage';


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/shopping-cart">
          <ShoppingCartPage />
        </Route>
        <Route exact path="/recipient">
          <RecipientPage />
        </Route>
        <Route exact path="/transaction">
          <TransactionPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
