import styled from 'styled-components';
import { useState } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import Input, { InputSelect, InputTitle, InputContainer, ErrorMessage, HeaderContainer } from '../../../component/Input';

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

export default function AddPhotoPage() {
  const [values, setValues] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };
  const handleContentChange = (data) => {};
  const handleAddProduct = (e) => {
    e.preventDefault();
  };

  return (
    <Root>
      <Aside />
      <Container>
        <Title>新增商品圖片</Title>
        <Form>
          <Input inputTitle={'新增圖片庫'} inputType={'flie'} size={'90%'} name={'photo'} onChange={handleInputChange} errorMessage={''} />
          <SubmitBtn onClick={handleAddProduct}>送出</SubmitBtn>
        </Form>
      </Container>
    </Root>
  );
}
