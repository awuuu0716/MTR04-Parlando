import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MemberNav from '../../component/MemberNav';
import {
  getMemberInfo,
  selectUserInfo,
  updateUserData,
  selectErrorMessage,
  setUserInfo,
} from '../../redux/reducers/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isPhoneValid, isEmailValid } from '../../utils';

const Container = styled.div`
  display: flex;
  padding: 7% 10%;
`;

const H3 = styled.h3`
  color: #07273c;
  font-weight: bold;
  margin: 0;
  margin-right: 30px;
`;

const Button = styled.button`
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

const InfoContainer = styled.div``;

const Top = styled.div`
  display: flex;
`;

const Bottom = styled.div`
  display: flex;
  margin-top: 30px;
`;

const BottomContainer = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-around;
`;

const Input = styled.input`
  margin-bottom: 33px;
  border: none;
  border-bottom: 2px solid #bbb;

  &:focus {
    outline: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
`;

const ErrorMessage = styled.div`
  min-height: 30px;
  margin-left: 20px;
  color: red;
  font-weight: bold;
  font-size: 20px;
`;

const Editing = ({ userInfo, setIsEditing }) => {
  const errorMessage = useSelector(selectErrorMessage);
  const [realName, setRealName] = useState(userInfo.realName);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [formErrorData, setFormErrorData] = useState({
    email: { valid: true, message: '' },
    phone: { valid: true, message: '' },
    realName: { valid: true, message: '' },
  });
  const dispatch = useDispatch();
  const isSubmit = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmit.current) return;
    isSubmit.current = true;
    for (let prop in formErrorData) {
      if (!formErrorData[prop].valid) {
        isSubmit.current = false;
        return;
      }
    }
    dispatch(updateUserData({ realName, email, phone })).then((res) => {
      if (!res) return 
      dispatch(setUserInfo({ ...userInfo,realName, email, phone }));
      setIsEditing(false);
    });
  };

  const checkPhoneValid = () => {
    if (!isPhoneValid(phone))
      return setFormErrorData({
        ...formErrorData,
        phone: { valid: false, message: '手機格式錯誤' },
      });
    setFormErrorData({
      ...formErrorData,
      phone: { valid: true, message: '' },
    });
  };

  const checkEmailValid = () => {
    if (!isEmailValid(email))
      return setFormErrorData({
        ...formErrorData,
        email: { valid: false, message: '信箱格式錯誤' },
      });
    setFormErrorData({
      ...formErrorData,
      email: { valid: true, message: '' },
    });
  };

  return (
    <InfoContainer>
      <form onSubmit={handleSubmit}>
        <Top>
          <H3>會員資料</H3>
        </Top>
        <Bottom>
          <TitleContainer>
            <Title>姓名：</Title>
            <Title>電子信箱：</Title>
            <Title>手機：</Title>
          </TitleContainer>
          <TitleContainer>
            <InputContainer>
              <Input
                required
                value={realName}
                placeholder="20 字以內英數字符號"
                onChange={(e) =>
                  setRealName(e.target.value.trim().slice(0, 20))
                }
              />
              <ErrorMessage>{formErrorData.realName.message}</ErrorMessage>
            </InputContainer>
            <InputContainer>
              <Input
                required
                type="email"
                placeholder="請輸入您的電子信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                onBlur={checkEmailValid}
              />
              <ErrorMessage>{formErrorData.email.message}</ErrorMessage>
            </InputContainer>
            <InputContainer>
              <Input
                required
                value={phone}
                placeholder="請輸入您的手機號碼"
                onBlur={checkPhoneValid}
                onChange={(e) => setPhone(e.target.value.trim())}
              />
              <ErrorMessage>{formErrorData.phone.message}</ErrorMessage>
            </InputContainer>
          </TitleContainer>
        </Bottom>
        <BottomContainer>
          <Button type="submit">儲存</Button>
          <Button onClick={() => setIsEditing(false)}>放棄</Button>
        </BottomContainer>
      </form>
    </InfoContainer>
  );
};

const ShowInfo = ({ setIsEditing, userInfo }) => {
  return (
    <InfoContainer>
      <Top>
        <H3>會員資料</H3>
        <Button onClick={() => setIsEditing(true)}>編輯</Button>
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
  );
};

export default function Info() {
  const userInfo = useSelector(selectUserInfo);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberInfo());
  }, [dispatch]);

  return (
    <Container>
      <MemberNav />
      {isEditing ? (
        <Editing setIsEditing={setIsEditing} userInfo={userInfo} />
      ) : (
        <ShowInfo setIsEditing={setIsEditing} userInfo={userInfo} />
      )}
    </Container>
  );
}
