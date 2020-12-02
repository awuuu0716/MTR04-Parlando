import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.svg';
import location from '../../img/location.svg';
import mail from '../../img/mail.svg';

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: block;
  width: 200px;
  height: 55px;
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
  background: #07273c;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const LeftContainer = styled.div`
  display: flex;
  width: 475px;
  justify-content: space-between;
  align-items: center;

`

const Location = styled.div`
  margin: 10px 0;
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


export default function Footer() {
  return (
    <Container>
      <FooterTop>
        <LeftContainer>
          <Logo to="/" />
          <div>
            <Location>
              <img src={location} />
              <span>Lorem ipsum dolor sit</span>
            </Location>
            <Email>
              <img src={mail} />
              <span>aaa.xxxxx@aaa.com</span>
            </Email>
          </div>
        </LeftContainer>

        <div></div>
      </FooterTop>
      <FooterBottom>xxxxxxxx © 2020 All Rights Reserved.</FooterBottom>
    </Container>
  );
}
