import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import Input, { InputSelect, InputTitle, InputContainer, ErrorMessage, HeaderContainer } from '../../../component/Input';
import Editor from '../../../component/Editor';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, updateProduct, selectProduct, selectArticle } from '../../../redux/reducers/productsSlice';

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

const productErrorMessageInit = {
  price: { valid: true, message: '' },
  productName: { valid: true, message: '' },
  article: { valid: true, message: '' },
  type: { valid: true, message: '' },
};
const types = [
  { name: '耳罩式耳機', value: '耳罩式耳機' },
  { name: '入耳式耳機', value:'入耳式耳機' },
  { name: '音響', value: '音響' },
  { name: '週邊配件', value: '週邊配件' },
];
export default function EditProductPage() {
  let isValid = false;
  let { id } = useParams();
  let typeHasChange = useRef(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const articleInit = useSelector(selectArticle);

  const [productErrorMessage, setProductErrorMessage] = useState(productErrorMessageInit);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [article, setArticle] = useState(articleInit);
  const [type, setType] = useState('');
  const [isShow, setIsShow] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getProduct(id)).then((product) =>{
      setPrice(product.price)
      setProductName(product.productName)
      setArticle(product.article)
      setType(product.type)
      setIsShow(product.isShow)
      setIsLoaded(true)
      });
  }, [dispatch, id]);
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
      updateTypeIsValid(value);
      typeHasChange.current = true;
      return setType(value);
    }
    if (name === 'isShow') {
      if (value === '是') {
        return setIsShow(1);
      }
      return setIsShow(0);
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
  const handleEditProduct = (e) => {
    e.preventDefault();
    isValid = checkProductValid();
    if (!isValid) return;
    
    dispatch(updateProduct({ id, productName, type, price, article: JSON.stringify(article), isShow }));
    history.goBack();
  };

  return (
    <Root>
      <Aside />
      <Container>
        <Title>編輯商品</Title>
        {isLoaded ? (
          <Form>
            <InputContainer>
              <Input
                inputTitle="名稱"
                inputType="text"
                size="90%"
                name="productName"
                value={productName}
                onChange={handleInputChange}
                valid={productErrorMessage['productName'].valid}
                errorMessage={productErrorMessage['productName'].message}
              />
              <Input
                inputTitle={'定價'}
                inputType={'text'}
                size="90%"
                name="price"
                value={price}
                onChange={handleInputChange}
                valid={productErrorMessage['price'].valid}
                errorMessage={productErrorMessage['price'].message}
              />
            </InputContainer>
            <InputContainer>
              <InputSelect
                inputTitle={'類別'}
                types={types}
                size="90%"
                name="type"
                value={type}
                onChange={handleInputChange}
                valid={productErrorMessage['type'].valid}
                errorMessage={productErrorMessage['type'].message}
              />
              <InputSelect
                inputTitle="是否已上架"
                types={[
                  { name: '是', value: 1 },
                  { name: '否', value: 0 },
                ]}
                size="90%"
                name="isShow"
                value={isShow}
                onChange={handleInputChange}
              />
            </InputContainer>
            <HeaderContainer>
              <InputTitle>文案</InputTitle>
              {!productErrorMessage['article'].valid && <ErrorMessage>{productErrorMessage['article'].message}</ErrorMessage>}
            </HeaderContainer>
            <Editor onChange={handleContentChange} content={article} />
            <SubmitBtn onClick={handleEditProduct}>送出</SubmitBtn>
          </Form>
        ) : (
          'Loading...'
        )}
      </Container>
    </Root>
  );
}
