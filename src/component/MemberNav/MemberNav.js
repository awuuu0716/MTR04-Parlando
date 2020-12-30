import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  height: 300px;
  margin-right: 6%;
`;
const H2 = styled.h2`
  color: #07273c;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Option = styled(Link)`
  display: block;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: #333;
  margin: 20px 0;

  &:hover {
    color: #333;
    text-decoration: none;
  }
`;

export default function MemberNav() {
  return (
    <Nav>
      <H2>會員專區</H2>
      <Option to="/membership/info">會員資料</Option>
      <Option to="/membership/order">查詢訂單</Option>
    </Nav>
  );
}
