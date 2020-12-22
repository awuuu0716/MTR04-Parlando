import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';

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
export default function AllProductsPage() {
  return (
    <Root>
      <Aside />
      <Container>
        <Header>
          <Title>所有商品</Title>
          <Link to="/backstage/add-product">
            <ButtonLight $size={'s'}>新增商品</ButtonLight>
          </Link>
        </Header>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Model</th>
                <th>Name</th>
                <th>Price - NT$</th>
                <th>In stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00001</td>
                <td>SE-01</td>
                <td>product</td>
                <td>1200</td>
                <td>50</td>
                <td>已上架</td>
                <td>
                  <Buttons />
                </td>
              </tr>
              <tr>
                <td>00002</td>
                <td>HD-02</td>
                <td>product</td>
                <td>900</td>
                <td>100</td>
                <td>未上架</td>
                <td>
                  <Buttons />
                </td>
              </tr>
            </tbody>
          </StyledTable>
        </TableWrapper>
      </Container>
    </Root>
  );
}
