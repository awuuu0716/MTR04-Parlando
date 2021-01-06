import styled from 'styled-components';
import Aside from '../../../component/Aside';
import { Ul, Li, Header, Info, OrderContent, HeaderFat } from '../../../component/Table';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectOrder, getOrder, setOrder } from '../../../redux/reducers/ordersSlice';
import { handleDateFormat } from '../../../utils';

const Root = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  @media ${device.Desktops} {
    display: flex;
  }
`;
const Container = styled.div`
  position: relative;
  top: 40px;
  left: 50%;
  max-width: 80%;
  margin-bottom: 40px;
  font-size: 24px;
  transform: translate(-50%);
`;
const TitleHeader = styled.div``;
const Title = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.titleColor};
  margin: 0 16px 20px 40px;
  display: inline-block;
`;

export default function SingleOrderPage() {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOrder(uuid)).then(() => setIsLoaded(true));
    return () => dispatch(setOrder({}));
  }, [dispatch, uuid]);

  console.log(order);
  return (
    <Root>
      <Aside />
      <Container>
        <TitleHeader>
          <Title>訂單內容</Title>
          <Link to="/backstage/orders">
            <ButtonLight $size={'s'}>Back</ButtonLight>
          </Link>
        </TitleHeader>
        <Ul $width="900px">
          <Li>
            <Header>訂單編號</Header>
            <Info $flex={3}> {uuid}</Info>
            <Header>訂單狀態</Header>
            <Info $flex={2}>{isLoaded ? order.status : 'loading...'}</Info>
          </Li>
          <Li>
            <Header>訂購日期</Header>
            <Info $flex={3}>{isLoaded ? handleDateFormat(order.createdAt) : 'loading...'}</Info>
            <Header>訂購人</Header>
            <Info $flex={2}> {isLoaded ? order.recipient[0].name : 'Loading...'}</Info>
          </Li>
          <Li>
            <HeaderFat>訂單內容</HeaderFat>
            <Info $flex={3}>
              <OrderContent>
                {isLoaded
                  ? order.products.map((product) => (
                      <span key={product.modelId}>
                        {product.modelName} * {product.count}
                        <br />
                      </span>
                    ))
                  : 'Loading...'}
              </OrderContent>
            </Info>
            <HeaderFat>付款方式</HeaderFat>
            <Info $flex={2}>信用卡</Info>
          </Li>
          <Li>
            <HeaderFat>收貨地點</HeaderFat>
            <Info $flex={6}>{isLoaded ? order.recipient[0].address : 'Loading'}</Info>
          </Li>
        </Ul>
      </Container>
    </Root>
  );
}
