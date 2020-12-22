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
    width: 720px;
  }
`;
const StyledTable = styled.div`
  margin: 0 auto;
  border: none;
  text-align: center;
  font-size: 14px;
  width: 100%;
`;

const TableRow = styled.div`
  display: flex;
  width: 90%;
  text-align: center;
  flex-direction: column;
  @media ${device.Tablets} {
    flex-direction: row;
    width: 100%;
  }
`;
const ColumnName = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.background}77;
  border: 1px solid ${(props) => props.theme.borderColor};
  font-size: 1.4em;
  padding: 20px;
  @media ${device.Tablets} {
    box-sizing: border-box;
  }
`;
const ColumnValue = styled.div`
  background-color: white;
  padding: 20px;
  align-items: center;
  font-size: 1.2em;
  border: 1px solid ${(props) => props.theme.borderColor};
  flex-grow: 3;
`;

export default function SingleOrderPage() {
  return (
    <Root>
      <Aside />
      <Container>
        <Header>
          <Title>訂單內容</Title>
          <Link to="/backstage/orders">
            <ButtonLight $size={'s'}>Back</ButtonLight>
          </Link>
        </Header>
        <TableWrapper>
          <StyledTable>
            <TableRow>
              <ColumnName>訂單編號</ColumnName>
              <ColumnValue>xxxxx-12345</ColumnValue>
              <ColumnName>訂購人</ColumnName>
              <ColumnValue>Andy</ColumnValue>
            </TableRow>
            <TableRow>
              <ColumnName>訂購日期</ColumnName>
              <ColumnValue>2020.10.19</ColumnValue>
              <ColumnName>付款方式</ColumnName>
              <ColumnValue>信用卡</ColumnValue>
            </TableRow>
            <TableRow>
              <ColumnName>訂單狀態</ColumnName>
              <ColumnValue>未出貨</ColumnValue>
              <ColumnName>訂購內容</ColumnName>
              <ColumnValue>
                product - 1 (經典白) * 1<br />
                product - 2 (石曜黑) * 3 <br />
                product - 3 (玫瑰金) * 2{' '}
              </ColumnValue>
            </TableRow>
            <TableRow>
              <ColumnName>收貨地點</ColumnName>
              <ColumnValue>台中市潭子區三三路 121 巷 97 號 7 樓</ColumnValue>
            </TableRow>
          </StyledTable>
        </TableWrapper>
      </Container>
    </Root>
  );
}
