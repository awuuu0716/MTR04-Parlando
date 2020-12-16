import React from 'react';
import Header from '../Header';
import Footer from '../../component/Footer';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from '../../pages/Info';
import CheckOrder from '../../pages/CheckOrder';
import HomePage from '../../pages/Homepage';
import Products from '../../pages/Products';
import Product from '../../pages/Product';
import ShoppingCartPage from '../../pages/ShoppingCartpage';
import RecipientPage from '../../pages/RecipientPage';
import TransactionPage from '../../pages/TransactionPage';
import OrderInfo from '../../pages/OrderInfo';

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
        <Route exact path="/membership/info">
          <Info />
        </Route>
        <Route exact path="/membership/order">
          <CheckOrder />
        </Route>
        <Route exact path="/membership/order/:id">
          <OrderInfo />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
