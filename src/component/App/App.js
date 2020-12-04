import React from 'react';
import Header from '../Header';
import Footer from '../../component/Footer';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/Homepage';
import Products from '../../pages/Products';
import Product from '../../pages/Product';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
