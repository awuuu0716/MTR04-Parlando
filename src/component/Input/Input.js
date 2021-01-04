import React from 'react';
import styled from 'styled-components';
import { device } from '../../style/breakpoints';

const WrapperInput = styled.label`
  margin-top: 20px;
  display: block;
  width: 100%;
  select {
    width: ${(props) => props.size};
    font-size: 0.8em;
    border: 1px solid #797979;
    padding: 4px 8px;
    border-radius: 5px;
  }
`;
const InputStyle = styled.input`
  font-size: 0.8em;
  padding: 0 8px;
  border: 1px solid #797979;
  width: ${(props) => props.size};
  border-radius: 5px;
`;
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
export const InputTitle = styled.h3`
  font-size: 0.8em;
  font-weight: bold;
  margin-bottom: unset;
`;
export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.errorText};
  font-size: 0.65em;
  padding-left: 18px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 8px;
  @media ${device.Tablets} {
    justify-content: space-between;
    flex-flow: row nowrap;
  }
`;
export const InputSelect = ({ inputTitle, types, value, size, name, errorMessage, valid, onChange }) => {
  return (
    <WrapperInput>
      <HeaderContainer>
        <InputTitle>{inputTitle}</InputTitle>
        {!valid && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </HeaderContainer>
      <select name={name} size={size} onChange={onChange} value={value}>
        {types.map((type, index) => (
          <option key={index} value={type.value}>
            {type.name}
          </option>
        ))}
      </select>
    </WrapperInput>
  );
};
export default function Input({ inputTitle, inputType, size, name, value, onChange, valid, errorMessage, placeholder }) {
  return (
    <WrapperInput>
      <HeaderContainer>
        <InputTitle>{inputTitle}</InputTitle>
        {!valid && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </HeaderContainer>
      <InputStyle name={name} type={inputType} size={size} value={value} onChange={onChange} placeholder={placeholder} />
    </WrapperInput>
  );
}
