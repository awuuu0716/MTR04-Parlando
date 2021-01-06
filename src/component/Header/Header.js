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
  selectUserLevel,
  setUserLevel,
  getMemberInfo,
} from '../../redux/reducers/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, getAuthToken } from '../../utils';
import { device } from '../../style/breakpoints';

const HeaderContainer = styled.div`
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 50px;
  background: ${(props) => props.theme.background};

  @media ${device.Mobiles} {
  }
  @media ${device.Tablets} {
    padding: 20px;
  }
  @media ${device.Desktops} {
  }
`;
const LinkContainer = styled.div`
  width: ${(props) => props.$width}px;
  display: flex;
  justify-content: space-between;
  margin-left: ${(props) => (props.$marginLeft ? props.$marginLeft : 0)}px;
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

const BackstageHeader = ({ isLogin, handleLogOut }) => {
  return (
    <HeaderContainer>
      <Logo to="/" />
      {isLogin ? (
        <LogOut onClick={handleLogOut}>登出</LogOut>
      ) : (
        <Nav to="/backstage/adminLogin">登入</Nav>
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

const FullHeaderContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media ${device.Mobiles} {
    display: none;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Laptop} {
    display: flex;
  }
`;

const HamburgerContainer = styled.div`
  @media ${device.Mobiles} {
    display: block;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Laptop} {
    display: none;
  }
`;

const MenuModal = styled.div`
  position: absolute;
  display: ${(props) => (props.$isShow ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 10px;
  top: 80px;
  right: 0px;
  width: 200px;
  background: #07273c;
  z-index: 5;
  transition: all 0.4s ease-in-out;
`;

const Hamburger = () => (
  <svg viewBox="0 0 100 80" width="40" height="40" style={{ fill: 'white' }}>
    <rect width="100" height="15" rx="8"></rect>
    <rect y="30" width="100" height="15" rx="8"></rect>
    <rect y="60" width="100" height="15" rx="8"></rect>
  </svg>
);

export default function Header() {
  const [isShowProducts, setIsShowProducts] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const isBackstageMode = useSelector(selectIsBackstageMode);
  const userLevel = useSelector(selectUserLevel);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleMouseEnter = () => {
    if (isShowProducts) return;
    setIsShowProducts(true);
  };

  const handleMouseLeave = () => setIsShowProducts(false);

  const handleLogOut = () => {
    dispatch(setUserLevel('guest'));
    setAuthToken('');
    history.push('/');
  };

  useEffect(() => {
    if (location.pathname.includes('/backstage')) {
      dispatch(setIsBackstageMode(true));
    } else {
      dispatch(setIsBackstageMode(false));
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (getAuthToken())
      dispatch(getMemberInfo()).then((res) => {
        if (res.success) history.push('/');
      });
  }, [dispatch, history]);

  return (
    <>
      {isBackstageMode && (
        <BackstageHeader
          handleLogOut={handleLogOut}
          isLogin={userLevel === 'admin'}
        />
      )}
      {!isBackstageMode && (
        <>
          <HeaderContainer>
            <FullHeaderContainer>
              <Logo to="/" />
              <LinkContainer $width={400}>
                <Nav to="/about">關於我們</Nav>
                <Nav to="/news">最新消息</Nav>
                <Nav to="/products/all" onMouseEnter={handleMouseEnter}>
                  選購商品
                </Nav>
              </LinkContainer>
              <IconContainer $isLogin={userLevel === 'member'}>
                <IconCart to="/shopping-cart" />
                <IconMember to="/membership/info" />
                {userLevel === 'member' && (
                  <LogOut onClick={handleLogOut}>登出</LogOut>
                )}
              </IconContainer>
            </FullHeaderContainer>
            <HamburgerContainer onClick={() => setIsShowModal(!isShowModal)}>
              <Hamburger />
            </HamburgerContainer>
            <MenuModal $isShow={isShowModal}>
              <Nav to="/about" onClick={() => setIsShowModal(!isShowModal)}>
                關於我們
              </Nav>
              <Nav to="/news" onClick={() => setIsShowModal(!isShowModal)}>
                最新消息
              </Nav>
              <Nav
                to="/products/all"
                onClick={() => setIsShowModal(!isShowModal)}
              >
                選購商品
              </Nav>
              <Nav
                to="/shopping-cart"
                onClick={() => setIsShowModal(!isShowModal)}
              >
                購物車
              </Nav>
              <Nav
                to="/membership/info"
                onClick={() => setIsShowModal(!isShowModal)}
              >
                會員專區
              </Nav>
              {userLevel === 'member' && (
                <LogOut
                  onClick={() => {
                    handleLogOut();
                    setIsShowModal(!isShowModal);
                  }}
                >
                  登出
                </LogOut>
              )}
            </MenuModal>
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
