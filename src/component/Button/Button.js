import React from 'react';
import styled from 'styled-components';

 const Button = styled.button`
  padding: 8px 18px;
  color: white;
  background-color: ${(props) => props.theme.background};
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 2px 2px 2px ${(props) => props.theme.shadow};
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme.background}77;
  }
`;
const ButtonLight = styled(Button)`
  background-color: ${(props) => props.theme.background}aa;
  &:hover {
    background-color: ${(props) => props.theme.background};
  }
`;

export  { Button, ButtonLight }