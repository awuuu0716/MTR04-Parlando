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
import AllProductsPage from '../../pages/backstage/AllProductsPage';
import AddProductsPage from '../../pages/backstage/AddProductsPage';
import OrdersPage from '../../pages/backstage/OrdersPage';
import SingleOrderPage from '../../pages/backstage/SingleOrderPage';
import AddPhotoPage from '../../pages/backstage/AddPhotoPage';
import AddProductsModelPage from '../../pages/backstage/AddProductsModelPage';
import AllProductsModelPage from '../../pages/backstage/AllProductsModelPage';
import EditProductPage from '../../pages/backstage/EditProductPage';
import Themes from '../../style/Themes';
import { ThemeProvider } from 'styled-components';
import OrderInfo from '../../pages/OrderInfo';
import Login from '../../pages/Login';
import AdminLogin from '../../pages/AdminLogin';
import Signup from '../../pages/Signup';
import { useSelector } from 'react-redux';
import { selectIsBackstageMode } from '../../redux/reducers/themeSlice';
import { selectUserLevel } from '../../redux/reducers/usersSlice';

const Public = () => (
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
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/signup">
      <Signup />
    </Route>
    <Route exact path="/backstage/adminLogin">
      <AdminLogin />
    </Route>
    <Redirect to="/login" />
  </Switch>
);

const Member = () => (
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
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/signup">
      <Signup />
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
);

const Admin = () => (
  <Switch>
    <Route exact path="/backstage/adminLogin">
      <AdminLogin />
    </Route>
    <Route exact path="/backstage/product">
      <AllProductsPage />
    </Route>
    <Route exact path="/backstage/products">
      <AllProductsPage />
    </Route>
    <Route exact path="/backstage/edit-product/:id">
      <EditProductPage />
    </Route>
    <Route exact path="/backstage/products-model">
      <AllProductsModelPage />
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
    <Redirect to="/backstage/product" />
  </Switch>
);

const AuthSwitch = ({ userLevel }) => {
  switch (userLevel) {
    case 'guest':
      return <Public />;
    case 'member':
      return <Member />;
    case 'admin':
      return <Admin />;
  }
};

function App() {
  const isBackstageMode = useSelector(selectIsBackstageMode);
  const userLevel = useSelector(selectUserLevel);

  return (
    <ThemeProvider theme={isBackstageMode ? Themes.backstage : Themes.customer}>
      <Router>
        <Header />
        <AuthSwitch userLevel={userLevel} />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
