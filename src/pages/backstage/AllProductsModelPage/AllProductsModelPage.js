import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectProducts } from '../../../redux/reducers/productsSlice';

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
const Header = styled.div``;
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
      padding: 20px;
      align-items: center;
      font-size: 1.2em;
    }
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Buttons = () => {
  return (
    <ButtonGroup>
      <ButtonLight $size={'s'}>編輯</ButtonLight>
      <ButtonLight $size={'s'}>上架</ButtonLight>
      <ButtonLight $size={'s'}>下架</ButtonLight>
      <ButtonLight $size={'s'}>刪除</ButtonLight>
    </ButtonGroup>
  );
};
export default function AllProductsModelPage() {
  const { type } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [sortFilter, setSortFilter] = useState('price');
  const [order, setOrder] = useState('DESC');

  useEffect(() => dispatch(getProducts({ type, order, sort: sortFilter })), [dispatch, type, sortFilter, order]);

  return (
    <Root>
      <Aside />
      <Container>
        <Header>
          <Title>商品型號</Title>
          <Link to="/backstage/add-product">
            <ButtonLight $size={'s'}>新增商品</ButtonLight>
          </Link>
          <Link to="/backstage/products">
            <ButtonLight $size={'s'}>所有商品</ButtonLight>
          </Link>
        </Header>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price - NT$</th>
                <th>In stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.na}-01</td>
                  <td>product</td>
                  <td>1200</td>
                  <td>50</td>
                  <td>已上架</td>
                  <td>
                    <Buttons />
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </Container>
    </Root>
  );
}
