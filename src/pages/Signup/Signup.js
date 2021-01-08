import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../redux/reducers/usersSlice';
import {
  replaceInvalidWord,
  isPhoneValid,
  initFormErrorData,
  isEmailValid,
} from '../../utils';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 477px);
`;

const InputSection = styled.section`
  display: flex;
  width: 700px;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  padding: 60px;
  box-shadow: 3px 3px 5px #b9e1fb;

  border: 1px solid #1c79b7;

  h5 {
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 500px;
  margin: 20px 0;
  text-align: end;
`;

const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 22px;
`;
const Input = styled.input`
  width: 300px;
  border: 0;
  border-bottom: 1px solid #333;
  &:focus {
    outline: none;
  }
`;

const SignupButtin = styled.button`
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

const ErrorMessage = styled.div`
  position: relative;
  min-height: 30px;
  color: red;
  font-weight: bold;
  font-size: 20px;
`;

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmpassword, setComfirmpassword] = useState('');
  const [realName, setRealName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formErrorData, setFormErrorData] = useState(() => initFormErrorData());
  const history = useHistory();
  // const ErrorMessage = useSelector(selectErrorMessage);
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
    dispatch(signUp({ username, password, realName, email, phone })).then(
      (res) => {
        if (!res.success) {
          setFormErrorData({
            ...formErrorData,
            username: { valid: false, message: res.message },
          });
          isSubmit.current = false;
          return;
        }
        isSubmit.current = false;
        history.push('/');
      }
    );
  };

  const handleInputUsername = (e) => {
    setUsername(replaceInvalidWord(e.target.value));
    setFormErrorData({
      ...formErrorData,
      username: { valid: true, message: '' },
    });
  };

  const checkPasswordConsistent = () => {
    if (password !== comfirmpassword)
      return setFormErrorData({
        ...formErrorData,
        comfirmpassword: { valid: false, message: '密碼不一致' },
      });
    setFormErrorData({
      ...formErrorData,
      comfirmpassword: { valid: true, message: '' },
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
    <Container>
      <InputSection>
        <form onSubmit={handleSubmit}>
          <h5>註冊</h5>
          <InputContainer>
            <Label>使用者帳號：</Label>
            <Input
              required
              value={username}
              placeholder="20 字以內英數字"
              onChange={handleInputUsername}
            ></Input>
            <ErrorMessage>{formErrorData.username.message}</ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>密碼：</Label>
            <Input
              required
              type="password"
              placeholder="20 字以內英數字符號"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim().slice(0, 20))}
              onBlur={checkPasswordConsistent}
            ></Input>
            <ErrorMessage></ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>確認密碼：</Label>
            <Input
              type="password"
              placeholder="請再輸入一次密碼"
              value={comfirmpassword}
              onChange={(e) =>
                setComfirmpassword(e.target.value.trim().slice(0, 20))
              }
              onBlur={checkPasswordConsistent}
            ></Input>
            <ErrorMessage>{formErrorData.comfirmpassword.message}</ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>姓名：</Label>
            <Input
              required
              value={realName}
              placeholder="20 字以內中英數字符號"
              onChange={(e) => setRealName(e.target.value.trim().slice(0, 20))}
            ></Input>
            <ErrorMessage>{formErrorData.realName.message}</ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>電子信箱：</Label>
            <Input
              required
              type="email"
              placeholder="請輸入您的電子信箱"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              onBlur={checkEmailValid}
            ></Input>
            <ErrorMessage>{formErrorData.email.message}</ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>手機：</Label>
            <Input
              required
              value={phone}
              placeholder="請輸入您的手機號碼"
              onBlur={checkPhoneValid}
              onChange={(e) => setPhone(e.target.value.trim())}
            ></Input>
            <ErrorMessage>{formErrorData.phone.message}</ErrorMessage>
          </InputContainer>

          <OptionsContainer>
            <SignupButtin>送出</SignupButtin>
          </OptionsContainer>
        </form>
      </InputSection>
    </Container>
  );
}
