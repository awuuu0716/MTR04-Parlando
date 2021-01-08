import React, { useEffect, useState } from 'react';
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
import { getAuthToken } from '../../utils';
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

  switch (role) {
    case 'guest':
      if (isLoading) return <></>;
      return <Component />;
    case 'member':
      if (isLoading) return <></>;
      return userLevel === role ? <Component /> : <Redirect to="/login" />;
    case 'admin':
      if (isLoading) return <></>;
      return userLevel === role ? (
        <Component />
      ) : (
        <Redirect to="/backstage/adminLogin" />
      );
    default:
      break;
  }
};

function App() {
  const isBackstageMode = useSelector(selectIsBackstageMode);

  return (
    <ThemeProvider theme={isBackstageMode ? Themes.backstage : Themes.customer}>
      <Router>
        <Header />
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
