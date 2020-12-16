import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { device } from '../../style/breakpoints';
const AsideWrapper = styled.div`
  width: 250px;
  position: relative;
`;
const Container = styled.div`
  height: auto;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  flex-direction: column;
  position: absolute;
  z-index:3;
  top: 30%;
  left: -300%;
  transition: left 0.4s ease-in;
  background-color: ${(props) => props.theme.background};
  text-align: center;
  ${(props) =>
    props.$active &&
    `
    left:0;
  `};
  @media ${device.Tablets} {
    background-color: white;
    left: 0;
    width: unset;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-direction: column;
`;

const Nav = styled(Link)`
  color: ${(props) => props.theme.titleColor};
  font-size: 18px;
  padding: 8px 0;

  &:hover {
    color: ${(props) => props.theme.textHover};
    text-decoration: none;
  }
`;

const AsideTitle = styled.h3`
  color: ${(props) => props.theme.titleColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  font-size: 24px;
  padding: 10px 20px;
`;

const AsideBtn = styled.div`
  border-radius: 5px;
  writing-mode: vertical-lr;
  padding: 8px;
  background-color: ${(props) => props.theme.background};
  color: white;
  position: absolute;
  top: 30%;
  left: -5px;
  cursor: pointer;
  transition: all 0.8s ease-in;

  &:hover {
    background-color: ${(props) => props.theme.navbarHover};
    color: ${(props) => props.theme.textHover};
  }

  ${(props) =>
    !props.$active &&
    `
    left:-100%;
  `};

  @media ${device.Tablets} {
    display: none;
  }
`;

export default function Aside() {
  const [isShowAside, setIsShowAside] = useState(false);
  const [isShowAsideBtn, setIsShowAsideBtn] = useState(true);

  const handleMouseEnter = () => {
    if (isShowAside) return;
    setIsShowAside(true);
    setIsShowAsideBtn(false);
  };
  const handleMouseLeave = () => {
    setIsShowAside(false);
    setIsShowAsideBtn(true);
  };
  return (
    <AsideWrapper>
      <AsideBtn onClick={handleMouseEnter} $active={isShowAsideBtn}>
        menu
      </AsideBtn>
      <Container onMouseLeave={handleMouseLeave} $active={isShowAside}>
        <AsideTitle>後台管理</AsideTitle>
        <LinkContainer>
          <Nav to="/backstage/orders">訂單管理</Nav>
          <Nav to="/backstage/product">商品管理</Nav>
        </LinkContainer>
      </Container>
    </AsideWrapper>
  );
}
