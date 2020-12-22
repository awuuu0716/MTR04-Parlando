import styled from 'styled-components';
import { useState } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
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
  height: 730px;
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
  margin-bottom: unset;
`;
const InputStyle = styled.input`
  font-size: 0.8em;
  padding: 0 8px;
  border: 1px solid #797979;
  width: ${(props) => props.size};
  border-radius: 5px;
`;
const ErrorMessage = styled.span`
  color: ${(props) => props.theme.errorText};
  font-size: 0.7em;
  padding-left: 18px;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 8px;
  @media ${device.Tablets} {
    justify-content: space-between;
    flex-flow: row nowrap;
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

const InputSelect = ({ inputTitle, types, size, name, ErrorMessage }) => {
  return (
    <WrapperInput>
      <HeaderContainer>
        <InputTitle>{inputTitle}</InputTitle>
        {ErrorMessage && <ErrorMessage>{ErrorMessage}</ErrorMessage>}
      </HeaderContainer>
      <select name={name} size={size}>
        {types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </WrapperInput>
  );
};
const Input = ({ inputTitle, inputType, size, name, value, onChange, errorMessage }) => {
  return (
    <WrapperInput>
      <HeaderContainer>
        <InputTitle>{inputTitle}</InputTitle>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </HeaderContainer>
      <InputStyle name={name} type={inputType} size={size} value={value} onChange={onChange} />
    </WrapperInput>
  );
};

const types = ['音響', '入耳式耳機', '耳罩式耳機', '周邊配件'];
const colors = ['藍色', '黑色', '白色', '其他'];
export default function AddProductsPage() {
  const [values, setValues] = useState('');
  const [productId, setProductId] = useState('');

  const [productName, setProductName] = useState('');
  const [productNameError, setProductNameError] = useState('');

  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');

  const [article, setArticle] = useState('');
  const [articleError, setArticleError] = useState('');

  const [model, setModel] = useState('');
  const [modelError, setModelError] = useState('');

  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState('');

  const [color, setColor] = useState('');
  const [colorError, setColorError] = useState('');

  const [store, setStore] = useState('');
  const [storeError, setStoreError] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') {
      setProductNameError('');
      return setProductName(value);
    }
    if (name === 'price') {
      setPriceError('');
      return setPrice(value);
    }
  };
  const handleContentChange = (data) => {
    setArticleError('');
    setArticle(data);
  };
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productName || !price || !article) {
      if (!productName) {
        setProductNameError('此處不得為空');
      }
      if (!price) {
        setPriceError('此處不得為空');
      }
      if (!article) {
        setArticleError('此處不得為空');
      }
      return;
    }
    // addProduct(productName, price, article)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.ok === 0) {
    //       setErrorMessage(data.message.toString())
    //     }
    // setProductId(data.info.productId)
    //   });
  };
  console.log(article);
  return (
    <Root>
      <Aside />
      <Container>
        <Title>新增商品</Title>
        {!productId && (
          <Form>
            <InputContainer>
              <Input
                inputTitle={'名稱'}
                inputType={'text'}
                size={'90%'}
                name={'productName'}
                value={productName}
                onChange={handleInputChange}
                errorMessage={productNameError}
              />
              <Input
                inputTitle={'定價'}
                inputType={'text'}
                size={'90%'}
                name={'price'}
                value={price}
                onChange={handleInputChange}
                errorMessage={priceError}
              />
            </InputContainer>
            <HeaderContainer>
              <InputTitle>文案</InputTitle>
              {articleError && <ErrorMessage>{articleError}</ErrorMessage>}
            </HeaderContainer>
            <Editor onChange={handleContentChange} />
            <SubmitBtn onClick={handleAddProduct}>送出</SubmitBtn>
          </Form>
        )}
        {productId && (
          <Form productId={productId}>
            <Input
              inputTitle={'數量'}
              inputType={'text'}
              size={'50%'}
              name={'store'}
              value={store}
              onChange={handleInputChange}
              errorMessage={storeError}
            />

            <Input
              inputTitle={'顏色'}
              inputType={'text'}
              size={'50%'}
              name={'color'}
              value={color}
              onChange={handleInputChange}
              errorMessage={colorError}
            />

            <InputSelect
              inputTitle={'類別'}
              types={types}
              size={'50%'}
              name={'type'}
              value={type}
              onChange={handleInputChange}
              errorMessage={typeError}
            />

            <Input
              inputTitle={'型號'}
              inputType={'text'}
              size={'50%'}
              name={'model'}
              value={model}
              onChange={handleInputChange}
              errorMessage={modelError}
            />

            <Input
              inputTitle={'描述'}
              inputType={'text'}
              size={'50%'}
              name={'description'}
              value={description}
              onChange={handleInputChange}
              errorMessage={descriptionError}
            />
            <SubmitBtn>送出</SubmitBtn>
          </Form>
        )}
      </Container>
    </Root>
  );
}
