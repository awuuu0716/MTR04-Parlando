import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MemberNav from '../../component/MemberNav';
import { getMe, selectUserInfo } from '../../redux/reducers/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  padding: 7% 10%;
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.label`
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  color: #333;
  margin-bottom: 30px;
`;

const UserData = styled.div`
  font-size: 20px;
  height: 30px;
  margin-bottom: 30px;
  /* &::after {
    content: '';
    position: absolute;
    display: block;
    width: 240px;
    border-bottom: 2px solid #333;
  } */
`;

const ErrorMessage = styled.div`
  position: absolute;
  right: -279px;
  color: red;
  font-size: 16px;
`;

const InfoContainer = styled.div``;

const Top = styled.div`
  display: flex;
`;

const Bottom = styled.div`
  display: flex;
  margin-top: 30px;
`;

export default function Info() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
    <Container>
      <MemberNav />
      <InfoContainer>
        <Top>
          <H5>會員資料</H5>
          <EditButton>Edit</EditButton>
        </Top>
        <Bottom>
          <TitleContainer>
            <Title>使用者帳號：</Title>
            <Title>姓名：</Title>
            <Title>電子信箱：</Title>
            <Title>手機：</Title>
          </TitleContainer>
          <TitleContainer>
            <UserData>{userInfo.username}</UserData>
            <UserData>{userInfo.realName}</UserData>
            <UserData>{userInfo.email}</UserData>
            <UserData>{userInfo.phone}</UserData>
          </TitleContainer>
        </Bottom>
      </InfoContainer>
    </Container>
  );
}
