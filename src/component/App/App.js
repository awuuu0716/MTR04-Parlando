import React from 'react';
import Header from '../Header';
import Footer from '../../component/Footer';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import HomePage from '../../pages/Homepage';
import Products from '../../pages/Products';
import Product from '../../pages/Product';
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
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:id">
          <Product />
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
        <Redirect to="/" />
      </Switch>
    <Footer />
    </Router>
  );
}

export default App;
