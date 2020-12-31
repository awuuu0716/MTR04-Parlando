import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, updateProductStatus, deleteProduct, selectProducts,  } from '../../../redux/reducers/productsSlice';

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
    width: 800px;
  }
`;
const Header = styled.div`
  position: relative;
`;
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
const FilterSelector = styled.div`
  font-size: 0.8em;
  display: block;
  @media ${device.Tablets} {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Buttons = ({ isShow, handleProductDelete, id, handleProductIsShow }) => {
  return (
    <ButtonGroup>
      <Link to={`/backstage/product-models/${id}`}>
        <ButtonLight $size={'s'}>型號</ButtonLight>
      </Link>
      <Link to={`/backstage/edit-product/${id}`}>
        <ButtonLight $size={'s'}>編輯</ButtonLight>
      </Link>
      <ButtonLight $size={'s'} onClick={() => handleProductIsShow({ id, isShow })}>
        {isShow === 1 ? '下架' : '上架'}
      </ButtonLight>
      <ButtonLight $size={'s'} onClick={() => handleProductDelete(id)}>
        刪除
      </ButtonLight>
    </ButtonGroup>
  );
};
export default function AllProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [sortFilter, setSortFilter] = useState('id');
  const [order, setOrder] = useState('DESC');
  const [type, setType] = useState('all');
  const [update, setUpdate] = useState(false);
  useEffect(() => dispatch(getProducts({ type, order, sort: sortFilter })), [update, dispatch, type, sortFilter, order]);
  const handleProductDelete = (id) => {
    dispatch(deleteProduct(id));
    setUpdate(!update);
  };
  const handleProductIsShow = ({ id, isShow }) => {
    dispatch(updateProductStatus({ id, isShow }));
    setUpdate(!update);
  };
  console.log(products);
  return (
    <Root>
      <Aside />
      <Container>
        <Header>
          <Title>所有商品</Title>
          <Link to="/backstage/add-product">
            <ButtonLight $size={'s'}>新增商品</ButtonLight>
          </Link>
          <FilterSelector>
            <select onChange={(e) => setType(e.target.value)} value={type}>
              <option value={'all'}>全部</option>
              <option value={1}>耳罩式耳機</option>
              <option value={2}>入耳式耳機</option>
              <option value={3}>音響</option>
              <option value={4}>週邊配件</option>
            </select>
          </FilterSelector>
        </Header>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price - NT$</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.type}</td>
                  <td>{product.isShow === 1 ? '已上架' : '未上架'}</td>
                  <td>
                    <Buttons
                      isShow={product.isShow}
                      id={product.id}
                      handleProductDelete={handleProductDelete}
                      handleProductIsShow={handleProductIsShow}
                    />
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
