import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../../component/Footer';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from '../../pages/Info';
import CheckOrder from '../../pages/CheckOrder';
import HomePage from '../../pages/Homepage';
import Products from '../../pages/Products';
import Product from '../../pages/Product';
import ShoppingCartPage from '../../pages/ShoppingCartpage';
import RecipientPage from '../../pages/RecipientPage';
import TransactionPage from '../../pages/TransactionPage';
import AllProductsPage from '../../pages/backstage/AllProductsPage';
import AddProductsPage from '../../pages/backstage/AddProductsPage';
import OrdersPage from '../../pages/backstage/OrdersPage';
import SingleOrderPage from '../../pages/backstage/SingleOrderPage';
import AddPhotoPage from '../../pages/backstage/AddPhotoPage';
import AddProductsModelPage from '../../pages/backstage/AddProductsModelPage';
import ProductModelsPage from '../../pages/backstage/ProductModelsPage';
import EditProductPage from '../../pages/backstage/EditProductPage';

import Themes from '../../style/Themes';
import { ThemeProvider } from 'styled-components';
import OrderInfo from '../../pages/OrderInfo';
import Login from '../../pages/Login';
import AdminLogin from '../../pages/AdminLogin';
import Signup from '../../pages/Signup';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsBackstageMode } from '../../redux/reducers/themeSlice';
import { selectIsAdmin, getMe } from '../../redux/reducers/usersSlice';
import { getAuthToken } from '../../utils';

function App() {
  const isBackstageMode = useSelector(selectIsBackstageMode);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (getAuthToken()) dispatch(getMe());
  // }, [dispatch]);

  return (
    <ThemeProvider theme={isBackstageMode ? Themes.backstage : Themes.customer}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/products/:type">
            <Products />
          </Route>
          <Route exact path="/product/:id">
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          {/* 以下為後台  */}
          <Route exact path="/adminLogin">
            <AdminLogin />
          </Route>
          <Route exact path="/backstage/products">
            {/* {isAdmin ? <AllProductsPage /> : <Redirect to="/adminLogin" />} */}
            <AllProductsPage /> 
          </Route>
          <Route exact path="/backstage/edit-product/:id">
            <EditProductPage /> 
          </Route>
          <Route exact path="/backstage/product-models/:id">
            <ProductModelsPage /> 
          </Route>
          <Route exact path="/backstage/add-product">
            <AddProductsPage />
          </Route>
          <Route exact path="/backstage/add-product/model">
            <AddProductsModelPage />
          </Route>
          <Route exact path="/backstage/add-product/add-photo">
            <AddPhotoPage />
          </Route>
          <Route exact path="/backstage/orders">
            <OrdersPage />
          </Route>
          <Route exact path="/backstage/orders/00001">
            <SingleOrderPage />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
