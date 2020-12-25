import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import logo from '../../img/logo.svg';
import cart from '../../img/cart.svg';
import member from '../../img/member.svg';
import {
  selectIsBackstageMode,
  setIsBackstageMode,
} from '../../redux/reducers/themeSlice';
import {
  selectIsLogin,
  setIsLogin,
  setIsAdmin,
} from '../../redux/reducers/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../../utils';

const HeaderContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background: ${(props) => props.theme.background};
`;

const LinkContainer = styled.div`
  width: ${(props) => props.$width}px;
  display: flex;
  justify-content: space-between;
  margin-left: ${(props) => props.$marginLeft}px;
`;

const IconContainer = styled.div`
  width: ${(props) => (props.$isLogin ? '170' : '120')}px;
  display: flex;
  justify-content: space-between;
`;

const Nav = styled(Link)`
  color: white;
  font-size: 24px;

  &:hover {
    color: rgb(251, 209, 168);
    text-decoration: none;
  }
`;

const Logo = styled(Link)`
  width: 200px;
  height: 55px;
  background: url(${logo}) no-repeat;
  cursor: pointer;
`;

const IconCart = styled(Link)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  mask: url(${cart}) no-repeat;
  transform: translate(0px, 5px);
  background-color: white;

  &:hover {
    background-color: rgb(251, 209, 168);
  }
`;

const IconMember = styled(Link)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  mask: url(${member}) no-repeat;
  background-color: white;

  &:hover {
    background-color: rgb(251, 209, 168);
  }
`;

const HoverContainer = styled.div`
  display: ${({ $isShow }) => ($isShow ? 'flex' : 'none')};
  position: absolute;
  width: 100%;
  top: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  background-color: rgba(7, 39, 60, 0.4);
  z-index: 1;
  transition: top 0.2s ease-in-out;
`;

const BackstageHeader = (props) => {
  return (
    <HeaderContainer>
      <Logo to="/" />
      {props.isLogin ? (
        <LogOut onClick={props.handleLogOut}>登出</LogOut>
      ) : (
        <Nav to="/adminLogin">登入</Nav>
      )}
    </HeaderContainer>
  );
};

const LogOut = styled.div`
  color: white;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: rgb(251, 209, 168);
    text-decoration: none;
  }
`;

export default function Header() {
  const [isShowProducts, setIsShowProducts] = useState(false);
  const isBackstageMode = useSelector(selectIsBackstageMode);
  const isLogin = useSelector(selectIsLogin);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleMouseEnter = () => {
    if (isShowProducts) return;
    setIsShowProducts(true);
  };

  const handleMouseLeave = () => setIsShowProducts(false);

  useEffect(() => {
    if (location.pathname.includes('/backstage')) {
      dispatch(setIsBackstageMode(true));
    } else {
      dispatch(setIsBackstageMode(false));
    }
  }, [location.pathname]);

  const handleLogOut = () => {
    dispatch(setIsLogin(false));
    dispatch(setIsAdmin(false));
    setAuthToken('');
    history.push('/');
  };

  return (
    <>
      {isBackstageMode && (
        <BackstageHeader handleLogOut={handleLogOut} isLogin={isLogin} />
      )}
      {!isBackstageMode && (
        <>
          <HeaderContainer>
            <Logo to="/" />
            <LinkContainer $width={400}>
              <Nav to="/about">關於我們</Nav>
              <Nav to="/news">最新消息</Nav>
              <Nav to="/products/all" onMouseEnter={handleMouseEnter}>
                選購商品
              </Nav>
            </LinkContainer>
            <IconContainer $isLogin={isLogin}>
              <IconCart to={isLogin ? '/shopping-cart' : '/login'} />
              <IconMember to={isLogin ? '/membership/info' : '/login'} />
              {isLogin && <LogOut onClick={handleLogOut}>登出</LogOut>}
            </IconContainer>
          </HeaderContainer>

          <HoverContainer
            $isShow={isShowProducts}
            onMouseLeave={handleMouseLeave}
          >
            <LinkContainer $width={550} $marginLeft={110}>
              <Nav to="/products/1">耳罩式耳機</Nav>
              <Nav to="/products/2">入耳式耳機</Nav>
              <Nav to="/products/3">音響</Nav>
              <Nav to="/products/4">週邊配件</Nav>
            </LinkContainer>
          </HoverContainer>
        </>
      )}
    </>
  );
}
