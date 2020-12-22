import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.svg';
import location from '../../img/location.svg';
import mail from '../../img/mail.svg';
import fb from '../../img/fb.svg';
import ig from '../../img/ig.svg';
import github from '../../img/github.svg';

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 50px 180px;
  padding-bottom: 0;
  margin-top: 200px;
  background: ${props=>props.theme.background};
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const LeftContainer = styled.div`
  display: flex;
  width: 575px;
  justify-content: space-between;
  align-items: center;
`

const Location = styled.div`
  margin-bottom: 10px;

  span {
    margin-left: 20px;
  }
`

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
  mask: url(${props=>props.$icon}) no-repeat;
  background-color: white;

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
          <div>
            <Location>
              <img src={location} alt="Address" />
              <span>Lorem ipsum dolor sit</span>
            </Location>
            <Email>
              <img src={mail} alt="Email" />
              <span>aaa.xxxxx@aaa.com</span>
            </Email>
          </div>
        </LeftContainer>

        <RightContainer>
          <Icon $icon={fb} to="/"/>
          <Icon $icon={ig} to="/" />
          <Icon $icon={github} to="/" />
        </RightContainer>
      </FooterTop>
      <FooterBottom>Made by MTR04 Team Parlando</FooterBottom>
    </Container>
  );
}
