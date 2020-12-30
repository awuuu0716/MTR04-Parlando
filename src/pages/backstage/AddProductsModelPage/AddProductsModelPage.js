import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import Input, { InputSelect, InputTitle, InputContainer, ErrorMessage, HeaderContainer } from '../../../component/Input';
import { useParams } from 'react-router';

const Root = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  @media ${device.Desktops} {
    display: flex;
  }
`;
const Container = styled.div`
  position: relative;
  top: 40px;
  left: 50%;
  max-width: 80%;
  margin-bottom: 40px;
  font-size: 24px;
  transform: translate(-50%);
  width: 80%;
  @media ${device.Tablets} {
    width: 60%;
  }
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
  /* height: 730px; */
  padding-bottom: 7em;
  box-shadow: 0px 1px 4px 1px ${(props) => props.theme.shadow};
  @media ${device.Tablets} {
    min-width: 70%;
  }
`;
const SubmitBtn = styled(ButtonLight)`
  position: absolute;
  right: 50%;
  bottom: 20px;
  transform: translate(50%);
  @media ${device.Tablets} {
    right: 30px;
    bottom: 30px;
    transform: unset;
  }
`;
const modelErrorMessageInit = {
  model: { valid: true, message: '' },
  color: { valid: true, message: '' },
  store: { valid: true, message: '' },
};
export default function AddProductsModelPage() {
  const { id } = useParams()
  const [productErrorMessage, setProductErrorMessage] = useState(modelErrorMessageInit);
  const [model, setModel] = useState('');
  const [productId, setProductId]= useState('')
  const [color, setColor] = useState('');
  const [store, setStore] = useState('');

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'model') {
      return setModel(value);
    }
    if (name === 'color') {
      return setColor(value);
    }
    if (name === 'store') {
      return setStore(value);
    }
  };
  const checkProductIsValid = (value, name) => {};
  const updateErrorMessage = (errorType, name, message) => {};

  const handleAddProductModel = (e) => {
    e.preventDefault();
    if (!model || !color || !store) {
    }
  };

  return (
    <Root>
      <Aside />
      <Container>
        <Title>新增商品型號</Title>
        <Form productId={productId}>
          <InputContainer>
            <Input inputTitle={'數量'} inputType={'text'} size={'90%'} name={'store'} value={store} onChange={handleInputChange} errorMessage={''} />
            <Input
              inputTitle={'型號'}
              inputType={'text'}
              size={'90%'}
              name={'model'}
              value={model}
              onChange={handleInputChange}
              errorMessage={''}
            />
          </InputContainer>
          <InputContainer>
            <Input inputTitle={'顏色'} inputType={'text'} size={'90%'} name={'color'} value={color} onChange={handleInputChange} errorMessage={''} placeholder='請輸入色票 例如：aa11bb'/>
          </InputContainer>
          <SubmitBtn onClick={handleAddProductModel}>送出</SubmitBtn>
        </Form>
      </Container>
    </Root>
  );
}
