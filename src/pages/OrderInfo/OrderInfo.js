import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberNav from '../../component/MemberNav';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, selectOrder } from '../../redux/reducers/ordersSlice';
import { handleDateFormat } from '../../utils';

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
  width: 1200px;
  padding: 0;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  list-style: none;
  font-size: 20px;
  border: 1px solid #d4d4d4;

  & + & {
    border-top: 0;
  }
`;

const Header = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #cfdce5;
  flex: 1;
`;

const HeaderFat = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #cfdce5;
  flex: 1;
`;

const Info = styled.div`
  text-align: center;
  flex: ${(props) => props.$flex};
`;

const OrderContent = styled.div`
  margin: 0;
  padding: 10px;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Back = styled(Link)`
  width: 160px;
  height: 60px;
  display: flex;
  border: 2px solid #07273c;
  border-radius: 3px;
  margin-right: 10px;
  color: #07273c;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: 3px 3px 5px #07273c85;

  &:hover {
    color: white;
    background: #07273c;
    text-decoration: none;
  }
`;

export default function OrderInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const order = useSelector(selectOrder);

  useEffect(() => {
    dispatch(getOrder(id)).then(() => setIsLoaded(true));
  }, [dispatch, id]);

  return (
    <Container>
      <MemberNav />

      <section>
        <H5>查詢訂單</H5>

        <Ul>
          <Li>
            <Header>訂單編號</Header>
            <Info $flex={3}> {id}</Info>
            <Header>訂單狀態</Header>
            <Info $flex={2}>{order.status || 'null'}</Info>
          </Li>
          <Li>
            <Header>訂購日期</Header>
            <Info $flex={3}>{isLoaded ? handleDateFormat(order.createdAt) : 'loading...'}</Info>
            <Header>付款方式</Header>
            <Info $flex={2}>信用卡</Info>
          </Li>
          <Li>
            <HeaderFat>訂單內容</HeaderFat>
            <Info $flex={3}>
              <OrderContent>
                {isLoaded
                  ? order.products.map((product) => (
                      <div key={product.modelId}>
                        {product.modelName} * {product.count}
                      </div>
                    ))
                  : 'Loading...'}
              </OrderContent>
            </Info>
            <HeaderFat>訂單金額</HeaderFat>
            <Info $flex={2}>NT$ {order.totalPrice || 'Loading...'}</Info>
          </Li>
          <Li>
            <HeaderFat>收貨地點</HeaderFat>
            <Info $flex={6}>{order.recipient[0].address || 'Loading...'}</Info>
          </Li>
        </Ul>
        <OptionContainer>
          <Back to="/membership/order">回到上頁</Back>

        </OptionContainer>
      </section>
    </Container>
  );
}
