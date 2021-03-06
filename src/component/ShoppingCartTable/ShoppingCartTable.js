import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Trash } from '../../img/trash.svg';
import { device } from '../../style/breakpoints';
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
const DeleteBtnContainer = styled.div`
  position: relative;
  &:hover {
    .deleteTips {
      visibility: visible;
      opacity: 1;
    }
  }
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
const DeleteTip = styled.span`
  visibility: hidden;
  width: 140px;
  background-color: lightcoral;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  font-size: 14px;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: lightcoral transparent transparent transparent;
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
const NextBtn = styled.button`
  position: absolute;
  right: 0;
  margin-top: 40px;
  display: inline-block;
  cursor: pointer;
  color: #07273c;
  font-size: 22px;
  box-shadow: 5px 5px 5px #0e4e7c;
  border-radius: 5px;
  border: 2px solid #07273c;
  padding: 0.5em 1.3em;
  text-decoration: none;
  background-color: white;
  &:hover {
    color: white;
    background-color: #07273c;
    text-decoration: none;
  }
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
          return res;
        })
        .catch((err) => {
          console.log('err: ', err);
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
    const products = cart.map(({ productId, ...data }) => data);

    dispatch(addOrder(products)).then((res) => {
      if (!res.success) {
        return alert('結帳失敗，請聯絡客服，');
      }
      history.push(`/recipient/${res.data.UUID}`);
    });
  };

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
                    <DeleteBtnContainer>
                      <DeleteBtn onClick={() => handelDeleteOrder(order.modelId)} />
                      <DeleteTip className={'deleteTips'}>
                        嗚嗚嗚～
                        <br />
                        不要帶我走拉
                      </DeleteTip>
                    </DeleteBtnContainer>
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
