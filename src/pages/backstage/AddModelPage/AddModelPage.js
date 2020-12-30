import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import Input, { InputSelect, InputContainer } from '../../../component/Input';
import { isColorChipValid, isModelNameValid, isStorageValid } from '../../../utils';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addModel } from '../../../redux/reducers/modelsSlice';
import { getProduct,selectProduct } from '../../../redux/reducers/productsSlice';

const Root = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  @media ${device.Desktops} {
    display: flex;
  }
`;
const Header = styled.div`
  position: relative;
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
  modelName: { valid: true, message: '' },
  colorChip: { valid: true, message: '' },
  storage: { valid: true, message: '' },
  isShow: { valid: true, message: '' },
};
export default function AddModelPage() {
  const { id } = useParams();
  const history = useHistory();
  const isSubmit = useRef(false);
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const [modelErrorMessage, setModelErrorMessage] = useState(modelErrorMessageInit);
  const [modelName, setModelName] = useState('');
  const [colorChip, setColorChip] = useState('');
  const [storage, setStorage] = useState('');
  const [isShow, setIsShow] = useState(0);
  console.log(modelErrorMessage)
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch,id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    if (name === 'modelName') {
      updateModelNameIsValid(value);
      return setModelName(value);
    }
    if (name === 'colorChip') {
      updateColorChipIsValid(value);
      return setColorChip(value);
    }
    if (name === 'storage') {
      updateStorageIsValid(value);
      return setStorage(value);
    }
    if (name === 'isShow') {
      if (value === '是') {
        return setIsShow(1);
      }
      return setIsShow(0);
    }
  };

  const updateModelNameIsValid = (value) => {
    if (!value||value.length>2) {
      return setModelErrorMessage((modelErrorMessage) => ({
        ...modelErrorMessage,
        modelName: { valid: false, message: '請輸入色表兩碼縮寫' },
      }));
    }
    return setModelErrorMessage((modelErrorMessage) => ({
      ...modelErrorMessage,
      modelName: { valid: true, message: '' },
    }));
  };
  const updateColorChipIsValid = (value) => {
    if (!isColorChipValid(value)) {
      return setModelErrorMessage((modelErrorMessage) => ({
        ...modelErrorMessage,
        colorChip: { valid: false, message: '請輸入正確的色票格式' },
      }));
    }
    return setModelErrorMessage((modelErrorMessage) => ({
      ...modelErrorMessage,
      colorChip: { valid: true, message: '' },
    }));
  };
  const updateStorageIsValid = (value) => {
    console.log(isStorageValid(value))
    if (!isStorageValid(value)) {
      return setModelErrorMessage((modelErrorMessage) => ({
        ...modelErrorMessage,
        storage: { valid: false, message: '請輸入數量或最大限制為1000' },
      }));
    }
    return setModelErrorMessage((modelErrorMessage) => ({
      ...modelErrorMessage,
      storage: { valid: true, message: '' },
    }));
  };

  const handleAddModel = (e) => {
    e.preventDefault();
    isSubmit.current = true;
    for (let prop in modelErrorMessage) {
      if (!modelErrorMessage[prop].valid) {
        return (isSubmit.current = false);
      }
    }
    if (isSubmit) {
      dispatch(addModel({ id, modelName, colorChip, storage }));
      history.goBack();
    }
  };

  return (
    <Root>
      <Aside />
      <Container>
        <Header>
          <Title>新增商品型號</Title>
          <ButtonLight $size={'s'} onClick={() => history.goBack()}>
            返回
          </ButtonLight>
        </Header>
        <Form id="addModelForm">
          <InputContainer>
            <Input
              inputTitle={'庫存'}
              inputType={'number'}
              size={'90%'}
              name={'storage'}
              value={storage}
              onChange={handleInputChange}
              errorMessage={modelErrorMessage['storage'].message}
              required
            />
            <Input
              inputTitle={'型號'}
              inputType={'text'}
              size={'90%'}
              name={'modelName'}
              value={modelName}
              onChange={handleInputChange}
              valid={modelErrorMessage['modelName'].valid}
              errorMessage={modelErrorMessage['modelName'].message}
              placeholder=""
              required
            />
          </InputContainer>
          <InputContainer>
            <Input
              inputTitle={'顏色'}
              inputType={'text'}
              size={'90%'}
              name={'colorChip'}
              value={colorChip}
              onChange={handleInputChange}
              valid={modelErrorMessage['colorChip'].valid}
              errorMessage={modelErrorMessage['colorChip'].message}
              placeholder="請輸入色票 例如：aa22cc"
              required
            />
            <InputSelect
              inputTitle="是否已上架"
              types={[
                { name: '是', value: 1 },
                { name: '否', value: 0 },
              ]}
              size="90%"
              name="isShow"
              value={isShow ? '1' : '0'}
              onChange={handleInputChange}
              valid={modelErrorMessage['isShow'].valid}
              errorMessage={modelErrorMessage['isShow'].message}
            />
          </InputContainer>
          <SubmitBtn onClick={handleAddModel} type="submit" form="addModelForm">
            送出
          </SubmitBtn>
        </Form>
      </Container>
    </Root>
  );
}
