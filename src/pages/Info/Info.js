import { useState } from 'react';
import styled from 'styled-components';
import MemberNav from '../../component/MemberNav';

const Container = styled.div`
  display: flex;
  padding: 7% 10%;
`;

const UserDataContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const H5 = styled.h5`
  color: #07273c;
  font-weight: bold;
  margin: 0;
  margin-right: 30px;
`;

const EditButton = styled.button`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #07273c;
  color: #07273c;
  background: white;
  box-shadow: 2px 2px 3px #07273ca6;

  &:hover {
    color: white;
    background: #07273c;
  }
`;

const Title = styled.label`
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  color: #333;
`;

const UserData = styled.div`
  font-size: 18px;
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 240px;
    border-bottom: 2px solid #333;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  right: -279px;
  color: red;
  font-size: 16px;
`;

const Infomation = styled.section`
  position: relative;
  display: flex;
  width: 50%;
  align-items: baseline;
  flex-direction: column;
`;

export default function Info() {
  const [memberData, setMemberData] = useState({});

  return (
    <Container>
      <MemberNav />

      <Infomation>
        <div>
          <UserDataContainer>
            <H5>會員資料</H5>
            <EditButton>Edit</EditButton>
          </UserDataContainer>

          <UserDataContainer>
            <Title>使用者帳號：</Title>
            <UserData>content</UserData>
            <ErrorMessage>欄位不得為空</ErrorMessage>
          </UserDataContainer>

          <UserDataContainer>
            <Title>姓名：</Title>
            <UserData>content</UserData>
            <ErrorMessage>欄位不得為空</ErrorMessage>
          </UserDataContainer>

          <UserDataContainer>
            <Title>電子信箱：</Title>
            <UserData>content</UserData>
            <ErrorMessage>欄位不得為空</ErrorMessage>
          </UserDataContainer>

          <UserDataContainer>
            <Title>手機：</Title>
            <UserData>content</UserData>
            <ErrorMessage>欄位不得為空</ErrorMessage>
          </UserDataContainer>
        </div>
      </Infomation>
    </Container>
  );
}
