import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.svg';
import location from '../../img/location.svg';
import mail from '../../img/mail.svg';
import fb from '../../img/fb.svg';
import ig from '../../img/ig.svg';
import github from '../../img/github.svg';
import { device } from '../../style/breakpoints';

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.Mobiles} {
    flex-direction: column;
  }
  @media ${device.Tablets} {
    height: 160px;
    flex-direction: column;
  }
  @media ${device.Laptop} {
    height: auto;
    flex-direction: row;
  }
  @media ${device.Desktops} {
  }
`;

const Logo = styled(Link)`
  display: block;
  width: 292px;
  height: 80px;
  background: url(${logo}) no-repeat;
  cursor: pointer;
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 20px;
`;

const Container = styled.footer`
  width: 100%;
  margin-top: 200px;
  background: ${(props) => props.theme.background};
  color: white;
  font-size: 18px;
  font-weight: bold;
  @media ${device.Mobiles} {
  }
  @media ${device.Tablets} {
    padding: 30px;
    padding-bottom: 0;
  }
  @media ${device.Laptop} {
  }
  @media ${device.Desktops} {
    padding: 30px 50px;
    padding-bottom: 0;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media ${device.Mobiles} {
    height: 220px;
    justify-content: center;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Laptop} {
    height: auto;
  }
  @media ${device.Desktops} {
  }
`;

const Contacts = styled.div`
  margin-left: 20px;
`;

const Location = styled.div`
  margin-bottom: 10px;

  span {
    margin-left: 20px;
    white-space: nowrap;
  }
`;

const Email = styled.div`
  img {
    transform: translate(-3px, 0px);
  }

  span {
    margin-left: 12px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled(Link)`
  width: 50px;
  height: 50px;
  mask: url(${(props) => props.$icon}) no-repeat;
  background-color: white;

  &:hover {
    background-color: rgb(251, 209, 168);
  }
`;
const IconGithub = styled.a`
  display: block;
  width: 50px;
  height: 50px;
  mask: url(${(props) => props.$icon}) no-repeat;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: rgb(251, 209, 168);
  }
`;

export default function Footer() {
  return (
    <Container>
      <FooterTop>
        <LeftContainer>
          <Logo to="/" />
          <Contacts>
            <Location>
              <img src={location} alt="Address" />
              <span>天上地下天堂路三分之一里六段 520 號</span>
            </Location>
            <Email>
              <img src={mail} alt="Email" />
              <span>service@mail.com</span>
            </Email>
          </Contacts>
        </LeftContainer>

        <RightContainer>
          <Icon $icon={fb} to="/" />
          <Icon $icon={ig} to="/" />
          <IconGithub $icon={github} target="_blank"  href="https://github.com/awuuu0716/MTR04-Parlando" />
        </RightContainer>
      </FooterTop>
      <FooterBottom>Made by MTR04 Team Parlando</FooterBottom>
    </Container>
  );
}
