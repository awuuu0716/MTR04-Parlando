import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';

const Root = styled.div`
  max-width: 1280px;
  margin: 40px auto;
  display: flex;
  position: relative;
  justify-content: right;
  align-items: flex-start;
  @media ${device.Tablets} {
    margin: 80px auto;
  }
`;
const Container = styled.div`
  max-width: 80%;
  margin-bottom: 40px;
`;
const Title = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.titleColor};
  margin: 0 16px 20px 40px;
  display: inline-block;
`;


const ReceiverInfoForm = styled.form`
  max-width: 100%;
  background-color: rgba(14, 78, 124, 0.4);
  padding: 3em;
  position: relative;
  padding-bottom: 7em;
`;
const WrapperInput = styled.label`
  margin-top: 20px;
  display: block;
  width: 100%;
  select {
    width: 90%;
    font-size: 1.5em;
    border: 1px solid #797979;
    padding: 0.5em;
    border-radius: 5px;
  }
`;
const RadioInputContent = styled.span`
  font-size: 1.5em;
`;
const InputTitle = styled.h3`
  font-size: 32px;
  padding-top: 1em;
  font-weight: bold;
`;
const InputStyle = styled.input`
  font-size: 1.5em;
  border: 1px solid #797979;
  padding: 0.5em;
  width: ${(props) => props.size};
  border-radius: 5px;
`;
const Radio = styled(InputStyle).attrs({
  type: 'radio',
})`
  font-size: 18px;
  margin: 1em;
  height: 1em;
  width: 1em;
`;
const Required = styled.span`
  color: #e74149;
  margin-left: 0.5em;
  font-size: 1rem;
`;
const SameReceiver = styled.div`
  display: inline-block;
  margin-left: 80px;
`;
const MemoRequired = memo(({ content }) => <Required>{content}</Required>);
const MemoTitle = memo(({ inputTitle, required }) => (
  <InputTitle>
    {inputTitle}
    {required ? <MemoRequired content={'*'} /> : ''}
  </InputTitle>
));
const NextBtn = styled(Link)`
  position: absolute;
  right: 0;
  margin-top: 40px;
  display: inline-block;
  cursor: pointer;
  color: #07273c;
  font-size: 26px;
  box-shadow: 5px 5px 5px #0e4e7c;
  border-radius: 5px;
  border: 2px solid #07273c;
  padding: 0.5em 1.3em;
  text-decoration: none;
  background-color: white;
  &:hover {
    color: white;
    background-color: #07273c;
    text-decoration: none;
  }
`;
const CountryInputs = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InputSelect = ({ inputTitle, required, cities, size }) => {
  return (
    <WrapperInput>
      <MemoTitle inputTitle={inputTitle} required={required} />
      <select name={inputTitle}>
        {cities.map((city) => (
          <option value={city}>{city}</option>
        ))}
      </select>
    </WrapperInput>
  );
};
const SameReceiverBtn = () => {
  return (
    <SameReceiver>
      <WrapperInput htmlFor="SameReceiver">
        <Radio type="radio" id="SameReceiver" />
        <RadioInputContent>收件人資訊與會員資料相同</RadioInputContent>
      </WrapperInput>
    </SameReceiver>
  );
};
const InputRadio = ({ inputTitle, content, required }) => {
  return (
    <div>
      <WrapperInput htmlFor={inputTitle}>
        <MemoTitle inputTitle={inputTitle} required={required} />
        <Radio type="radio" id={inputTitle} value={content} />
        <RadioInputContent>{content}</RadioInputContent>
      </WrapperInput>
    </div>
  );
};
const StyledInput = ({ inputTitle, inputType, required, size }) => {
  return (
    <WrapperInput>
      <MemoTitle inputTitle={inputTitle} required={required} />
      <InputStyle name={inputTitle} type={inputType} size={size} />
    </WrapperInput>
  );
};

export default function AddProductsPage() {
  return (
    'qw'
    // <Root>
    //   <Aside />
    //   <Container>
    //     <Title>新增商品</Title>
    //     <ReceiverInfoForm>
    //       <FormHeader>
    //         <FormTitle>收件人資訊</FormTitle>
    //         <SameReceiverBtn />
    //       </FormHeader>
    //       <StyledInput
    //         inputTitle={'姓名'}
    //         inputType={'text'}
    //         required={true}
    //         size={'45%'}
    //       />
    //       <StyledInput
    //         inputTitle={'電子郵件'}
    //         inputType={'email'}
    //         required={true}
    //         size={'95%'}
    //       />
    //       <StyledInput
    //         inputTitle={'手機'}
    //         inputType={'phone'}
    //         required={true}
    //         size={'45%'}
    //       />
    //       <CountryInputs>
    //         <InputSelect inputTitle={'縣市'} required={true} cities={cities} />
    //         <InputSelect
    //           inputTitle={'城市/鄉鎮'}
    //           required={true}
    //           cities={towns}
    //         />
    //       </CountryInputs>
    //       <StyledInput
    //         inputTitle={'地址'}
    //         inputType={'text'}
    //         required={true}
    //         size={'95%'}
    //       />
    //       <InputRadio
    //         inputTitle={'配送選項'}
    //         content={'僅限宅配'}
    //         required={true}
    //       />
    //       <InputRadio
    //         inputTitle={'付款方式'}
    //         content={'僅限信用卡支付'}
    //         required={true}
    //       />
    //     </ReceiverInfoForm>
    //     <NextBtn to="/transaction">下一步</NextBtn>
        
      
    //   </Container>
    // </Root>
  );
}
