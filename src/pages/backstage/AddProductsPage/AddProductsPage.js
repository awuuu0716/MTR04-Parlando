import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import Input, { InputSelect, InputTitle, InputContainer, ErrorMessage, HeaderContainer } from '../../../component/Input';
import Editor from '../../../component/Editor';

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
const types = ['edw', 'fewe'];
const productErrorMessageInit = {
  price: { valid: true, message: '' },
  productName: { valid: true, message: '' },
  article: { valid: true, message: '' },
  type: { valid: true, message: '' },
};
export default function AddProductsPage() {
  let isValid = false;
  const [productErrorMessage, setProductErrorMessage] = useState(productErrorMessageInit);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [article, setArticle] = useState('');
  const [type, setType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') {
      updateProductIsValid(value);
      return setProductName(value);
    }
    if (name === 'price') {
      updatePriceIsValid(value);
      return setPrice(value);
    }
    if (name === 'type') {
      console.log(value);
      updateTypeIsValid(value);
      return setType(value);
    }
  };
  const handleContentChange = (data) => {
    updateArticleIsValid(data);
    setArticle(data);
  };
  const updateProductIsValid = (value) => {
    if (!value) {
      return setProductErrorMessage((productErrorMessage) => ({
        ...productErrorMessage,
        productName: { valid: false, message: '此處不得為空' },
      }));
    }
    return setProductErrorMessage((productErrorMessage) => ({
      ...productErrorMessage,
      productName: { valid: true, message: '' },
    }));
  };
  const updateTypeIsValid = (value) => {
    if (!value) {
      return setProductErrorMessage((productErrorMessage) => ({
        ...productErrorMessage,
        type: { valid: false, message: '請選擇類別' },
      }));
    }
    return setProductErrorMessage((productErrorMessage) => ({
      ...productErrorMessage,
      type: { valid: true, message: '' },
    }));
  };
  const updatePriceIsValid = (value) => {
    if (!value) {
      return setProductErrorMessage((productErrorMessage) => ({
        ...productErrorMessage,
        price: { valid: false, message: '此處不得為空' },
      }));
    }
    return setProductErrorMessage((productErrorMessage) => ({
      ...productErrorMessage,
      price: { valid: true, message: '' },
    }));
  };
  const updateArticleIsValid = (value) => {
    if (!value) {
      return setProductErrorMessage((productErrorMessage) => ({
        ...productErrorMessage,
        article: { valid: false, message: '請更改文章內容' },
      }));
    }
    return setProductErrorMessage((productErrorMessage) => ({
      ...productErrorMessage,
      article: { valid: true, message: '' },
    }));
  };
  const checkProductValid = () => {
    updateProductIsValid(productName);
    updatePriceIsValid(price);
    updateTypeIsValid(type);
    updateArticleIsValid(article);
    if (productName && price && type && article) {
      return true;
    }
    return false;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    isValid = checkProductValid();
    if (!isValid) return;
    console.log('hihi  work');
    // addProduct({productName, price, article,type})
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.ok === 0) {
    //       setErrorMessage(data.message.toString())
    //     }
    // setProductId(data.info.productId)
    //   });
  };

  return (
    <Root>
      <Aside />
      <Container>
        <Title>新增商品</Title>
        <Form>
          <HeaderContainer>
            <InputContainer>
              <Input
                inputTitle={'名稱'}
                inputType={'text'}
                size={'90%'}
                name={'productName'}
                value={productName}
                onChange={handleInputChange}
                valid={productErrorMessage['productName'].valid}
                errorMessage={productErrorMessage['productName'].message}
              />
              <Input
                inputTitle={'定價'}
                inputType={'text'}
                size={'90%'}
                name={'price'}
                value={price}
                onChange={handleInputChange}
                valid={productErrorMessage['price'].valid}
                errorMessage={productErrorMessage['price'].message}
              />
            </InputContainer>
          </HeaderContainer>
          <InputSelect
            inputTitle={'類別'}
            types={types}
            size={'90%'}
            name={'type'}
            value={type}
            onChange={handleInputChange}
            valid={productErrorMessage['type'].valid}
            errorMessage={productErrorMessage['type'].message}
          />
          <HeaderContainer>
            <InputTitle>文案</InputTitle>
            {!productErrorMessage['article'].valid && <ErrorMessage>{productErrorMessage['article'].message}</ErrorMessage>}
          </HeaderContainer>
          <Editor onChange={handleContentChange} />
          <SubmitBtn onClick={handleAddProduct}>送出</SubmitBtn>
        </Form>
      </Container>
    </Root>
  );
}
