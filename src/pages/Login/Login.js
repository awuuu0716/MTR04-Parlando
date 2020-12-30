import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectErrorMessage,
  login,
  setErrorMessage,
} from '../../redux/reducers/usersSlice';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 477px);
`;

const InputSection = styled.section`
  display: flex;
  width: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  padding: 60px;
  box-shadow: 3px 3px 5px #b9e1fb;

  border: 1px solid #1c79b7;

  h5 {
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
  }
`;

const InputContainer = styled.div`
  width: 320px;
  margin: 20px 0;
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
  width: 220px;
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
  min-height: 61px;
  width: 320px;
`;

export default function Login() {
  const errorMessage = useSelector(selectErrorMessage);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const isSubmit = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmit.current) return;
    dispatch(setErrorMessage(''));
    isSubmit.current = true;
    dispatch(login({ username, password })).then((res) => {
      isSubmit.current = false;
      if (res) history.push('/');
    });
  };

  useEffect(() => dispatch(setErrorMessage('')), [dispatch]);

  return (
    <Container>
      <InputSection>
        <h5>登入</h5>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>帳號：</Label>
            <Input
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label>密碼：</Label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </InputContainer>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <OptionsContainer>
            <SignUpLink to="/signup">建立帳戶</SignUpLink>
            <LoginButton>登入</LoginButton>
          </OptionsContainer>
        </form>
      </InputSection>
    </Container>
  );
}
