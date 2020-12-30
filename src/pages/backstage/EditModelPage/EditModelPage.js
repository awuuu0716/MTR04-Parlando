import styled from 'styled-components';
import { useState } from 'react';
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
export default function EditModelPage() {
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

  useEffect(() => {
    dispatch(getProduct(id));
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
      console.log(value);
      if (value === '是') {
        return setIsShow(1);
      }
      return setIsShow(0);
    }
  };
  // const handleContentChange = (data) => {
  //   updateArticleIsValid(data);
  //   setArticle(data);
  // };
  // const updateProductIsValid = (value) => {
  //   if (!value) {
  //     return setProductErrorMessage((productErrorMessage) => ({
  //       ...productErrorMessage,
  //       productName: { valid: false, message: '此處不得為空' },
  //     }));
  //   }
  //   return setProductErrorMessage((productErrorMessage) => ({
  //     ...productErrorMessage,
  //     productName: { valid: true, message: '' },
  //   }));
  // };
  // const updateTypeIsValid = (value) => {
  //   if (!value) {
  //     return setProductErrorMessage((productErrorMessage) => ({
  //       ...productErrorMessage,
  //       type: { valid: false, message: '請選擇類別' },
  //     }));
  //   }
  //   return setProductErrorMessage((productErrorMessage) => ({
  //     ...productErrorMessage,
  //     type: { valid: true, message: '' },
  //   }));
  // };
  // const updatePriceIsValid = (value) => {
  //   if (!value) {
  //     return setProductErrorMessage((productErrorMessage) => ({
  //       ...productErrorMessage,
  //       price: { valid: false, message: '此處不得為空' },
  //     }));
  //   }
  //   return setProductErrorMessage((productErrorMessage) => ({
  //     ...productErrorMessage,
  //     price: { valid: true, message: '' },
  //   }));
  // };

  // const checkProductValid = () => {
  //   updateProductIsValid(productName);
  //   updatePriceIsValid(price);
  //   updateTypeIsValid(type);
  //   updateArticleIsValid(article);
  //   if (productName && price && type && article) {
  //     return true;
  //   }
  //   return false;
  // };
  const handleEditProduct = (e) => {
    e.preventDefault();
    isValid = checkProductValid();
    if (!isValid) return;
    let switchValue = type;
    if (!typeHasChange.current) {
      switchValue = types.find((item) => item.name === type).value;
      setType(switchValue.value);
    }
    dispatch(updateProduct({ id, productName, type: switchValue, price, article: JSON.stringify(article), isShow }));
    history.goBack();
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
              ple
            />
          </InputContainer>
          <InputContainer>
            <Input inputTitle={'顏色'} inputType={'text'} size={'90%'} name={'color'} value={color} onChange={handleInputChange} errorMessage={''} 
            placeholder='請輸入色票 例如：aa22cc'/>
          </InputContainer>
          <SubmitBtn onClick={handleAddProductModel}>送出</SubmitBtn>
        </Form>
      </Container>
    </Root>
  );
}
