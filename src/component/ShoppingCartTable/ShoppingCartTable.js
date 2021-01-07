import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Trash } from '../../img/trash.svg';
import { device } from '../../style/breakpoints';
import { Button } from '../../component/Button';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../redux/reducers/productsSlice';
import { getCartToken, setCartToken } from '../../utils';
import { updateCart, addOrder } from '../../redux/reducers/ordersSlice';
import { Ul, Li } from '../../component/Table';
const Container = styled.div`
  max-width: 1280px;
  margin: 80px auto;
  margin-bottom: 40px;
  position: relative;
`;
const H3 = styled.h3`
  font-size: 2rem;
  color: #07273c;
  margin: 0 0 40px 40px;
`;
const StyledTable = styled.table`
  margin: 0 auto;
  border: none;
  text-align: right;
  thead {
    background-color: rgba(14, 78, 123, 0.4);
    tr th {
      font-size: 18px;
      color: #333;
      padding: 0.5rem 2rem;

      &:first-child {
        text-align: left;
        width: 700px;
      }
      &:last-child {
        text-align: center;
      }
    }
  }

  tbody tr td {
    background-color: white;
    padding: 20px;
    align-items: right;

    &:first-child {
      text-align: left;
      display: flex;
      align-items: center;
    }
    &:last-child {
      text-align: center;
    }
  }
`;
const Table = styled(Ul)`
  @media ${device.Tablets} {
    width: 70vw;
  }
`;
const ProductColumn = styled.div`
  font-size: 18px;
  color: #333;
  padding: 0.5rem 2rem;
  text-align: left;
  width: 600px;
`;
const ProductInfo = styled.div``;
const TableFootColumn = styled.div`
  background-color: #07273c;
  color: white;
  padding: 12px;
  font-size: 18px;
`;

const TableFoot = styled(Li)`
  background-color: #07273c;
  justify-content: flex-end;
`;
const TableHeader = styled(Li)`
  background-color: rgba(14, 78, 123, 0.4);
  justify-content: space-around;
`;
const TableBody = styled(Li)`
  justify-content: space-around;
  height: 120px;
`;
const DeleteBtn = styled(Trash)`
  fill: rgba(7, 39, 60, 0.7);
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    fill: red;
  }
`;
const ProductInfoContainer = styled(Link)`
  width: 600px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: none;
  }
`;
const ProductImg = styled.div`
  background: center no-repeat url(${(props) => props.$url});
  background-size: 70%;
  width: 200px;
  height: 100px;
`;
const NextBtn = styled(Button)`
  position: absolute;
  bottom: -15%;
  right: 0;
  margin-top: 40px;
  display: inline-block;
  cursor: pointer;
`;

export default function ShoppingCartTable() {
  const cart = getCartToken();
  const history = useHistory();
  const dispatch = useDispatch();
  const [cartInfoList, setCartInfoList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart.length === 0) {
      alert('目前購物車是空的，請先去購物唷！');
      return history.push('/products/all');
    }
    let cartInfo = [];
    const productIds = cart.map((item) => item.productId);
    const getOrderInfo = productIds.map((id) => {
      return dispatch(getProduct(id))
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    Promise.all(getOrderInfo).then((data) => {
      cartInfo = cart.map((cart, index) => Object.assign({}, cart, data[index]));
      setCartInfoList(cartInfo);

      const priceList = cartInfo.map((cart) => cart.price * cart.count);
      const amount = priceList.reduce((a, b) => a + b);
      setTotal(amount);
    });
  }, [update]);

  const handelDeleteOrder = (modelId) => {
    setCartToken(cart.filter((order) => order.modelId !== modelId));
    setCartInfoList(cartInfoList.filter((order) => order.modelId !== modelId));
    dispatch(updateCart());
    setUpdate(!update);
  };

  const handelAddOrder = () => {
    if (total >= 30000) {
      return alert('單筆訂單不得大於30000，請刪除部分訂單');
    }
    // console.log(cart);
    const products = cart.map(({ productId, ...data }) => data);
    dispatch(addOrder(products)).then((res) => {
      // console.log(res);
      if (!res.success) {
        return alert('結帳失敗，請聯絡客服，');
      }
      history.push(`/recipient/${res.data.UUID}`);
    });
  };
  // console.log(cartInfoList);
  return (
    <>
      <Container>
        <H3>購物車內容</H3>
        <Table>
          <TableHeader>
            <ProductColumn>產品名稱</ProductColumn>
            <ProductInfo>單價</ProductInfo>
            <ProductInfo>訂購數量</ProductInfo>
            <ProductInfo>總價</ProductInfo>
            <ProductInfo>刪除</ProductInfo>
          </TableHeader>
          {cartInfoList
            ? cartInfoList.map((order) => (
                <TableBody key={order.modelId}>
                  <ProductInfoContainer to={`/product/${order.productId}`}>
                    <ProductImg $url={order.photos[0]} />
                    {order.productName + order.modelId}
                  </ProductInfoContainer>
                  <ProductInfo>NT${order.price}</ProductInfo>
                  <ProductInfo>{order.count}</ProductInfo>
                  <ProductInfo>NT${order.price * order.count}</ProductInfo>
                  <ProductInfo>
                    <DeleteBtn onClick={() => handelDeleteOrder(order.modelId)} />
                  </ProductInfo>
                </TableBody>
              ))
            : ''}
          <TableFoot>
            <TableFootColumn>總計</TableFootColumn>
            <TableFootColumn>NT ${total}</TableFootColumn>
          </TableFoot>
        </Table>
        <NextBtn $size={'s'} onClick={handelAddOrder}>
          我要結帳
        </NextBtn>
      </Container>
    </>
  );
}
