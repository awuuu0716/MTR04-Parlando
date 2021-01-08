import React, { useEffect, useRef, useState } from 'react';
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
import Payments from '../../component/Payments';
import { setAuthToken, getAuthToken } from '../../utils';
import TransactionPage from '../../pages/TransactionPage';
import {
  AddProductPage,
  AddModelPage,
  AllProductsPage,
  OrdersPage,
  SingleOrderPage,
  AddPhotoPage,
  ProductModelsPage,
  EditProductPage,
  EditModelPage,
} from '../../pages/backstage';
import Themes from '../../style/Themes';
import { ThemeProvider } from 'styled-components';
import OrderInfo from '../../pages/OrderInfo';
import Login from '../../pages/Login';
import AdminLogin from '../../pages/AdminLogin';
import Signup from '../../pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsBackstageMode } from '../../redux/reducers/themeSlice';
import {
  selectUserLevel,
  getMemberInfo,
} from '../../redux/reducers/usersSlice';

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
    <Route exact path="/recipient/:id">
      <RecipientPage />
    </Route>
    <Route exact path="/payments/:id">
      {/* <Payments /> */}
    </Route>
    <Route exact path="/transaction/:id">
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
    <Route exact path="/backstage/products">
      <AllProductsPage />
    </Route>
    <Route exact path="/backstage/add-product">
      <AddProductPage />
    </Route>
    <Route exact path="/backstage/add-product/photo/:id">
      <AddPhotoPage />
    </Route>
    <Route exact path="/backstage/edit-product/:id">
      <EditProductPage />
    </Route>
    <Route exact path="/backstage/product-models/:id">
      <ProductModelsPage />
    </Route>
    <Route exact path="/backstage/edit-model/:id">
      <EditModelPage />
    </Route>
    <Route exact path="/backstage/add-model/:id/:action">
      <AddModelPage />
    </Route>
    <Route exact path="/backstage/orders">
      <OrdersPage />
    </Route>
    <Route exact path="/backstage/orders/:uuid">
      <SingleOrderPage />
    </Route>
    <Redirect to="/backstage/products" />
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

const Auth = ({ component: Component, role }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userLevel = useSelector(selectUserLevel);

  useEffect(() => {
    if (getAuthToken()) {
      dispatch(getMemberInfo()).then((res) => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);
  return isLoading ? (
    <></>
  ) : userLevel === role || role === 'guest' ? (
    <Component />
  ) : (
    <Redirect to="/login" />
  );
};

function App() {
  const isBackstageMode = useSelector(selectIsBackstageMode);
  const userLevel = useSelector(selectUserLevel);

  return (
    <ThemeProvider theme={isBackstageMode ? Themes.backstage : Themes.customer}>
      <Router>
        <Header />
        {/* <AuthSwitch userLevel={userLevel} /> */}
        <Switch>
          {/* public */}
          <Route exact path="/">
            <Auth component={HomePage} role="guest" />
          </Route>
          <Route exact path="/products/:type">
            <Auth component={Products} role="guest" />
          </Route>
          <Route exact path="/product/:id">
            <Auth component={Product} role="guest" />
          </Route>
          <Route exact path="/login">
            <Auth component={Login} role="guest" />
          </Route>
          <Route exact path="/signup">
            <Auth component={Signup} role="guest" />
          </Route>
          <Route exact path="/backstage/adminLogin">
            <Auth component={AdminLogin} role="guest" />
          </Route>
          {/* member */}
          <Route exact path="/shopping-cart">
            <Auth component={ShoppingCartPage} role="member" />
          </Route>
          <Route exact path="/recipient/:id">
            <Auth component={RecipientPage} role="member" />
          </Route>
          <Route exact path="/transaction/:id">
            <Auth component={TransactionPage} role="member" />
          </Route>
          <Route exact path="/membership/info">
            <Auth component={Info} role="member" />
          </Route>
          <Route exact path="/membership/order">
            <Auth component={CheckOrder} role="member" />
          </Route>
          <Route exact path="/membership/order/:id">
            <Auth component={OrderInfo} role="member" />
          </Route>
          {/* admin */}
          <Route exact path="/backstage/adminLogin">
            <Auth component={AdminLogin} role="admin" />
          </Route>
          <Route exact path="/backstage/products">
            <Auth component={AllProductsPage} role="admin" />
          </Route>
          <Route exact path="/backstage/add-product">
            <Auth component={AddProductPage} role="admin" />
          </Route>
          <Route exact path="/backstage/add-product/photo/:id">
            <Auth component={AddPhotoPage} role="admin" />
          </Route>
          <Route exact path="/backstage/edit-product/:id">
            <Auth component={EditProductPage} role="admin" />
          </Route>
          <Route exact path="/backstage/product-models/:id">
            <Auth component={ProductModelsPage} role="admin" />
          </Route>
          <Route exact path="/backstage/edit-model/:id">
            <Auth component={EditModelPage} role="admin" />
          </Route>
          <Route exact path="/backstage/add-model/:id/:action">
            <Auth component={AddModelPage} role="admin" />
          </Route>
          <Route exact path="/backstage/orders">
            <Auth component={OrdersPage} role="admin" />
          </Route>
          <Route exact path="/backstage/orders/:uuid">
            <Auth component={SingleOrderPage} role="admin" />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
