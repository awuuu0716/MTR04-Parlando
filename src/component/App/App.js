import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../../component/Footer';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../../pages/Homepage';
import Products from '../../pages/Products';
import Product from '../../pages/Product';
import ShoppingCartPage from '../../pages/ShoppingCartpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipientPage from '../../pages/RecipientPage';
import TransactionPage from '../../pages/TransactionPage';
import AllProductsPage from '../../pages/backstage/AllProductsPage';
import Themes from '../../style/Themes';
import { ThemeProvider } from 'styled-components';
import { ThemeMode } from '../../context';


function App() {
  const [isBackstageMode, setIsBackstageMode] = useState(false);
  return (
    <ThemeMode.Provider value={{ setIsBackstageMode }}>
      <ThemeProvider theme={isBackstageMode ? Themes.backstage : Themes.customer}>
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
            {/* 以下為後台  */}
            <Route exact path="/backstage/product">
              <AllProductsPage />
            </Route>
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </ThemeMode.Provider>
  );
}

export default App;
