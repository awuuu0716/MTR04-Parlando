import { useEffect } from 'react';
import styled from 'styled-components';
import MemberNav from '../../component/MemberNav';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, selectOrders } from '../../redux/reducers/ordersSlice';
import { handleDateFormat } from '../../utils';

const Container = styled.div`
  display: flex;
  padding: 7% 10%;
  padding-right: 0;
`;

const H3 = styled.h3`
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
  font-size: 20px;
`;



export default function CheckOrder() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrders());
    console.log(orders)
  }, [dispatch]);

  return (
    <Container>
      <MemberNav />

      <section>
        <H3>查詢訂單</H3>

        <Ul>
          <HeaderContainer>
            <Header>ID</Header>
            <Header>description</Header>
            <Header>price (NT$)</Header>
            <Header>time</Header>
          </HeaderContainer>
          {orders.map((order) => (
            <Li key={order.UUID.slice(0, 8)}>
              <OrderNumber to={`/membership/order/${order.UUID}`}>
                {order.UUID.slice(0, 8)}
              </OrderNumber>
              <OrderInfo>
                {order.products.map((data) => (
                  <div key={data.modelId}>{data.modelName}</div>
                ))}
              </OrderInfo>
              <OrderInfo>{order.totalPrice}</OrderInfo>
              <OrderInfo>{handleDateFormat(order.createdAt)}</OrderInfo>
            </Li>
          ))}
        </Ul>
      </section>
    </Container>
  );
}
