import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { memo, useState } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import Editor from '../../../component/Editor';

const Root = styled.div`
  max-width: 1280px;
  margin: 40px auto;
  position: relative;
  @media ${device.Tablets} {
    margin: 80px auto;
  }
`;
const Container = styled.div`
  position: relative;
  top: 0;
  left: 20%;
  max-width: 80%;
  margin-bottom: 40px;
  font-size: 24px;
`;
const Title = styled.h3`
  font-size: 1em;
  color: ${(props) => props.theme.titleColor};
  margin: 0 16px 20px 40px;
  display: inline-block;
`;
const Form = styled.form`
  max-width: 100%;
  padding: 24px;
  position: relative;
  padding-bottom: 7em;
  box-shadow: 0px 1px 4px 1px ${(props) => props.theme.shadow};
  @media ${device.Tablets} {
    min-width: 70%;
  }
`;
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
const InputTitle = styled.h3`
  font-size: 0.8em;
  font-weight: bold;
`;
const InputStyle = styled.input`
  font-size: 0.8em;
  padding: 0 8px;
  border: 1px solid #797979;
  width: ${(props) => props.size};
  border-radius: 5px;
`;
const Checkbox = styled(InputStyle).attrs({
  type: 'checkbox',
})`
  font-size: 16px;
  margin: 1em;
  height: 1em;
  width: 1em;
`;

const PhtotContainer =styled.div``
const MemoTitle = memo(({ inputTitle }) => <InputTitle>{inputTitle}</InputTitle>);
const SubmitBtn = styled(ButtonLight)`
  position: absolute;
  right: 50%;
  margin-top: 40px;
  @media ${device.Tablets} {
    right: 0%;
  }
`;

const InputSelect = ({ inputTitle, types, size }) => {
  return (
    <WrapperInput>
      <MemoTitle inputTitle={inputTitle} />
      <select name={inputTitle} size={size}>
        {types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </WrapperInput>
  );
};
const StyledInput = ({ inputTitle, inputType, size }) => {
  return (
    <WrapperInput>
      <MemoTitle inputTitle={inputTitle} />
      <InputStyle name={inputTitle} type={inputType} size={size} />
    </WrapperInput>
  );
};

const types = ['音響', '入耳式耳機', '耳罩式耳機', '周邊配件'];
const colors = ['藍色', '黑色', '白色', '其他'];
export default function AddProductsPage() {
  // const index ='1'
  // const [value, serValue] = useState('');
  // const [model, setModel] = useState('');
  // const [productName, setProductName] = useState('');
  // const [type, setType] = useState('');
  // const [color, setColor] = useState('');
  // const [store, setStore] = useState('');
  // const [description, setDescription] = useState('');

  return (
    <Root>
      <Aside />
      <Container>
        <Title>新增商品</Title>
        <Form>
          <StyledInput inputTitle={'型號'} inputType={'text'} size={'50%'} />
          <StyledInput inputTitle={'名稱'} inputType={'text'} size={'50%'} />
          <InputSelect inputTitle={'類別'} types={types} size={'50%'} />
          <StyledInput inputTitle={'定價'} inputType={'text'} size={'50%'} />
          <StyledInput inputTitle={'顏色'} inputType={'text'} size={'50%'} />
          <StyledInput inputTitle={'數量'} inputType={'text'} size={'50%'} />
          <StyledInput inputTitle={'描述'} inputType={'text'} size={'50%'} />
          <Editor />
          <PhtotContainer>
          </PhtotContainer>
        </Form>
        <SubmitBtn>送出</SubmitBtn>
      </Container>
    </Root>
  );
}
