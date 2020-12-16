import styled from 'styled-components';
import MemberNav from '../../component/MemberNav';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 7% 10%;
  padding-right: 0;
`;

const H5 = styled.h5`
  color: #07273c;
  font-weight: bold;
  margin-bottom: 30px;
`;
const Ul = styled.ul`
  width: 920px;
  padding: 0;
`;

const Li = styled.li`
  display: flex;
  padding: 40px 20px;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #333;
  list-style: none;
`;

const HeaderContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  width: 100%;
  height: 100px;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  background: #cfdce5;
  list-style: none;
`;

const Header = styled.div`
  width: 25%;
  text-shadow: 1px 1px 2px #333;
`;

const OrderNumber = styled(Link)`
  width: 25%;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const OrderInfo = styled.div`
  width: 25%;
  font-size:20px;
`;

export default function CheckOrder() {
  return (
    <Container>
      <MemberNav />

      <section>
        <H5>查詢訂單</H5>

        <Ul>
          <HeaderContainer>
            <Header>ID</Header>
            <Header>description</Header>
            <Header>price (NT$)</Header>
            <Header>time</Header>
          </HeaderContainer>

          <Li>
            <OrderNumber to="/membership/order/1">00001</OrderNumber>
            <OrderInfo>
              product * 1 <br />
              product * 3 <br />
              product * 2
            </OrderInfo>
            <OrderInfo>3000</OrderInfo>
            <OrderInfo>2020-11-15</OrderInfo>
          </Li>
          <Li>
            <OrderNumber>00002</OrderNumber>
            <OrderInfo>
              product * 1 <br />
            </OrderInfo>
            <OrderInfo>1000</OrderInfo>
            <OrderInfo>2020-11-16</OrderInfo>
          </Li>
        </Ul>
      </section>
    </Container>
  );
}
