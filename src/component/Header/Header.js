import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.svg';
import cart from '../../img/cart.svg';
import member from '../../img/member.svg';

const HeaderContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background: #07273c;
`;

const LinkContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
`;

const Nav = styled(Link)`
  color: white;
  text-decoration: none;
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

const IconCart = styled.div`
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

export default function Header() {
  return (
    <HeaderContainer>
      <Logo to="/" />
      <LinkContainer>
        <Nav to="/about">關於我們</Nav>
        <Nav to="/news">最新消息</Nav>
        <Nav to="products">選購商品</Nav>
      </LinkContainer>
      <IconContainer>
        <IconCart></IconCart>
        <IconMember></IconMember>
      </IconContainer>
    </HeaderContainer>
  );
}
