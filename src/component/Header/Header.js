import { useState, useEffect,useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/logo.svg';
import cart from '../../img/cart.svg';
import member from '../../img/member.svg';
import { ThemeMode } from '../../context';
const HeaderContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background: #07273c;
`;

const LinkContainer = styled.div`
  width: ${(props) => props.$width}px;
  display: flex;
  justify-content: space-between;
  margin-left: ${(props) => props.$marginLeft}px;
`;

const IconContainer = styled.div`
  width: 120px;
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

const IconMember = styled.div`
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

export default function Header() {
  const { setIsBackstageMode } = useContext(ThemeMode);
  const location = useLocation();
  const [isShowProducts, setIsShowProducts] = useState(false);

  const handleMouseEnter = () => {
    if (isShowProducts) return;
    setIsShowProducts(true);
  };

  const handleMouseLeave = () => setIsShowProducts(false);

  useEffect(() => {
    if (location.pathname.includes('/backstage')) {
      setIsBackstageMode(true);
    } else {
      setIsBackstageMode(false);
    }
  },[]);
  return (
    <>
      <HeaderContainer>
        <Logo to="/" />
        <LinkContainer $width={400}>
          <Nav to="/about">關於我們</Nav>
          <Nav to="/news">最新消息</Nav>
          <Nav to="/products" onMouseEnter={handleMouseEnter}>
            選購商品
          </Nav>
        </LinkContainer>
        <IconContainer>
          <IconCart to="/shopping-cart"></IconCart>
          <IconMember></IconMember>
        </IconContainer>
      </HeaderContainer>

      <HoverContainer $isShow={isShowProducts} onMouseLeave={handleMouseLeave}>
        <LinkContainer $width={550} $marginLeft={110}>
          <Nav to="/products/acoustics">音響</Nav>
          <Nav to="/products/earbuds">入耳式耳機</Nav>
          <Nav to="/products/headphones">耳罩式耳機</Nav>
          <Nav to="/products/accessories">週邊配件</Nav>
        </LinkContainer>
      </HoverContainer>
    </>
  );
}
