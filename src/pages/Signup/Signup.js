import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    margin-bottom: 20px;
  }
`;


const InputContainer = styled.div`
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

const SignUpLink = styled(Link)`
  display: flex;
  margin-right: 10px;
  color: #1c79b7;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    transform: scale(1.2);
  }
`;

const LoginButton = styled.button`
  width: 140px;
  height: 40px;
  display: flex;
  border: 1px solid #07273c;
  border-radius: 3px;
  margin-right: 10px;
  color: white;
  background: #07273c;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 5px #07273c85;

  &:hover {
    background: #293e4c;
  }
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 20px;
  font-weight: bold;
  height: 36px;
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

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <InputSection>
        <h5>註冊</h5>
        <InputContainer>
          <Label>使用者帳號：</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label>密碼：</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label>確認密碼：</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label>姓名：</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label>電子信箱：</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label>手機：</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </InputContainer>

        <OptionsContainer>
          <SignupButtin>送出</SignupButtin>
        </OptionsContainer>
      </InputSection>
    </Container>
  );
}
