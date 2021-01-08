import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { Ul, Li, Header, Info, OrderContent, HeaderFat } from '../../../component/Table';
import { device } from '../../../style/breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, selectOrders, updateOrderStatue } from '../../../redux/reducers/ordersSlice';
import { handleDateFormat, handleOrderStatus } from '../../../utils';

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
  @media ${device.Tablets} {
    width: 900px;
  }
`;
const TitleHeader = styled.div``;
const Title = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.titleColor};
  margin: 0 16px 20px 40px;
  display: inline-block;
`;
const TableWrapper = styled.div`
  width: 400px;
  overflow: auto;
  @media ${device.Tablets} {
    width: unset;
  }
`;
const StyledTable = styled.table`
  margin: 0 auto;
  border: none;
  text-align: center;
  font-size: 14px;
  thead {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    border-top: 1px solid ${(props) => props.theme.borderColor};
    tr th {
      font-size: 14px;
      color: ${(props) => props.theme.textColor};
      padding: 26px;
    }
  }

  tbody {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    tr td {
      background-color: white;
      padding: 20px 10px;
      align-items: center;
      font-size: 1.2em;
      a:hover {
        text-decoration: none;
      }
      &:first-child {
        max-width: 50px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
`;
const ProductsContainer = styled.div``;

export default function OrdersPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrders()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, isUpdated]);

  const handleChangeStatus = (id) => {
    dispatch(updateOrderStatue(id)).then(() => setIsUpdated(true));
  };
  return (
    <Root>
      <Aside />
      <Container>
        <TitleHeader>
          <Title>查詢訂單</Title>
        </TitleHeader>

        {!isLoaded ? (
          'Loading'
        ) : (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>UserId</th>
                  <th>Description</th>
                  <th>Price (NT$)</th>
                  <th>Order time</th>
                  <th>Status</th>
                  <th>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link to={`/backstage/orders/${order.UUID}`}>{order.UUID} </Link>
                    </td>
                    <td>{order.userId}</td>
                    <td>
                      {order.Product_models.map((product) => (
                        <ProductsContainer key={product.id}>
                          {product.modelName} * {product.Order_product.count}
                        </ProductsContainer>
                      ))}
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>{handleDateFormat(order.createdAt)}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.status === '處理中' ? (
                        <ButtonLight $size={'s'} onClick={() => handleChangeStatus(order.UUID)}>
                          通知已出貨
                        </ButtonLight>
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        )}
      </Container>
    </Root>
  );
}
