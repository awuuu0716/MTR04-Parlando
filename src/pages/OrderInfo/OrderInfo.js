import styled from 'styled-components';
import MemberNav from '../../component/MemberNav';
import { Link } from 'react-router-dom';

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

const OrderContent = styled.p`
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

const ReturnButton = styled.button`
  width: 160px;
  height: 60px;
  display: flex;
  border: 1px solid #07273c;
  border-radius: 3px;
  margin-right: 10px;
  color: white;
  background: #07273c;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 5px #07273c85;

  &:hover {
    background: #293e4c;
  }
`;

export default function OrderInfo() {
  return (
    <Container>
      <MemberNav />

      <section>
        <H5>查詢訂單</H5>

        <Ul>
          <Li>
            <Header>訂單編號</Header>
            <Info $flex={3}> xxxxx-12345</Info>
            <Header>訂單狀態</Header>
            <Info $flex={2}>XXX</Info>
          </Li>
          <Li>
            <Header>訂購日期</Header>
            <Info $flex={3}>2020.10.10 19</Info>
            <Header>付款方式</Header>
            <Info $flex={2}>信用卡</Info>
          </Li>
          <Li>
            <HeaderFat>訂單內容</HeaderFat>
            <Info $flex={3}>
              <OrderContent>
                product - 1 (經典白) $ 500 * 1 <br />
                product - 2 (石曜黑) $ 500 * 3 <br />
                product - 3 (玫瑰金) $ 500 * 2
              </OrderContent>
            </Info>
            <HeaderFat>訂單金額</HeaderFat>
            <Info $flex={2}>NT$ 3000</Info>
          </Li>
          <Li>
            <HeaderFat>收貨地點</HeaderFat>
            <Info $flex={6}>台中市潭子區三三路 121 巷 97 號 7 樓</Info>
          </Li>
        </Ul>
        <OptionContainer>
          <Back to="/membership/order">回到上頁</Back>
          <ReturnButton>我要退貨</ReturnButton>
        </OptionContainer>
      </section>
    </Container>
  );
}
