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
  ${(props) =>
    props.$size === 's' &&
    `
    padding:8px;
    font-weight: normal;
  `}
`;
const ButtonLight = styled(Button)`
  color: ${(props) => props.theme.textColor};
  background-color: white;
  &:hover {
    background-color: ${(props) => props.theme.navbarHover};
    color: ${(props) => props.theme.textHover};
  }
`;

export { Button, ButtonLight };
