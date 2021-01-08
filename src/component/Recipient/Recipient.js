import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { memo, useState, useEffect, useRef } from 'react';
import { getCities, getDistricts, addRecipient } from '../../WebAPI';
import { isEmailValid, isPhoneValid, initRecipientFormErrorData } from '../../utils';
import { HeaderContainer, ErrorMessage } from '../../component/Input';
import { selectUserInfo } from '../../redux/reducers/usersSlice';
import { updateCart } from '../../redux/reducers/ordersSlice';
import { setCartToken } from '../../utils';
import { useSelector,useDispatch } from 'react-redux';
const Root = styled.div`
  margin: 0 auto;
`;
const Container = styled.div`
  max-width: 80vw;
  margin: 80px auto;
  margin-bottom: 40px;
  position: relative;
`;
const H3 = styled.h3`
  font-size: 2rem;
  color: #07273c;
  margin: 0 0 40px 20px;
`;
const FormHeader = styled.div``;
const FormTitle = styled.h4`
  font-size: 1.5rem;
  color: #07273c;
  margin: 0 0 40px 40px;
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
const InputTitle = styled.h5`
  font-size: 1.3rem;
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
const Header = styled(HeaderContainer)`
  align-items: baseline;
`;
const Error = styled(ErrorMessage)`
  font-size: 1em;
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
const NextBtn = styled.button`
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
const InputSelect = ({ inputTitle, name, required, options, valid, value, errorMessage, onChange }) => {
  return (
    <WrapperInput>
      <HeaderContainer>
        <MemoTitle inputTitle={inputTitle} required={required} />
        {!valid && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </HeaderContainer>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.cityName ? option.cityName : option.districtName}
          </option>
        ))}
      </select>
    </WrapperInput>
  );
};
const SameReceiverBtn = ({ onChange, value }) => {
  return (
    <SameReceiver>
      <WrapperInput htmlFor="SameReceiver">
        {value ? (
          <Radio name="sameRecipient" type="radio" id="SameReceiver" onChange={onChange} value={value} />
        ) : (
          <Radio name="sameRecipient" type="radio" id="SameReceiver" onChange={onChange} />
        )}
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
        <Radio type="radio" id={inputTitle} value={content} defaultChecked={inputTitle} />
        <RadioInputContent>{content}</RadioInputContent>
      </WrapperInput>
    </div>
  );
};
const StyledInput = ({ inputTitle, name, inputType, required, size, onChange, valid, errorMessage, placeholder, value }) => {
  return (
    <WrapperInput>
      <Header>
        <MemoTitle inputTitle={inputTitle} required={required} />
        {!valid && <Error>{errorMessage}</Error>}
      </Header>
      <InputStyle name={name} type={inputType} size={size} value={value} required="required" onChange={onChange} placeholder={placeholder} />
    </WrapperInput>
  );
};
export default function Recipient() {
  const isSubmit = useRef(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [sameRecipient, setSameRecipient] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(initRecipientFormErrorData);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    setCartToken([])
    dispatch(updateCart())
    getCities()
      .then((res) => {
        setCities(res.data.cities);
        setSelectedCity(res.data.cities[0].id);
        return getDistricts(res.data.cities[0].id);
      })
      .then((res) => {
        setSelectedDistrict(res.data.districts[0].id);
        setDistricts(res.data.districts);
        return setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!selectedCity) return;
    getDistricts(selectedCity).then((res) => {
      setDistricts(res.data.districts);
      setSelectedDistrict(res.data.districts[0].id);
      return;
    });
  }, [selectedCity]);

  const checkPhoneValid = (value) => {
    if (!isPhoneValid(value)) {
      return setErrorMessage({
        ...errorMessage,
        phone: { valid: false, message: '手機格式錯誤' },
      });
    }
    setErrorMessage({
      ...errorMessage,
      phone: { valid: true, message: '' },
    });
  };
  const checkEmailValid = (value) => {
    if (!isEmailValid(value)) {
      return setErrorMessage({
        ...errorMessage,
        email: { valid: false, message: '信箱格式錯誤' },
      });
    }
    setErrorMessage({
      ...errorMessage,
      email: { valid: true, message: '' },
    });
  };
  const checkNameValid = (value) => {
    
    if (!value ) {
      return setErrorMessage({
        ...errorMessage,
        name: { valid: false, message: '請輸入姓名' },
      });
    }
    if ( value.length > 20 ) {
      return setErrorMessage({
        ...errorMessage,
        name: { valid: false, message: '字數限制為20' },
      });
    }
    setErrorMessage({
      ...errorMessage,
      name: { valid: true, message: '' },
    });
  };
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (name === 'name') {
      checkNameValid(value)
      return setName(value);
    }
    if (name === 'phone') {
      checkPhoneValid(value);
      return setPhone(value);
    }
    if (name === 'email') {
      checkEmailValid(value);
      return setEmail(value);
    }
    if (name === 'address') {
      return setAddress(value);
    }
    if (name === 'city') {
      return setSelectedCity(value);
    }
    if (name === 'district') {
      return setSelectedDistrict(value);
    }
    if (name === 'sameRecipient') {
      setSameRecipient(!sameRecipient);
      if (!sameRecipient) {
        setName(userInfo.realName);
        setPhone(userInfo.phone);
        setEmail(userInfo.email);
        return;
      }
    }
  };
  const checkProductValid = () => {
    checkEmailValid(email)
    checkPhoneValid(phone)
    checkNameValid(name)
  };
  const handleAddRecipient = (e) => {
    checkProductValid()
    isSubmit.current = true;
    for (let prop in errorMessage) {
      if (!errorMessage[prop].valid) {
        return (isSubmit.current = false);
      }
    }
    console.log(isSubmit.current);
    if (isSubmit.current) {
      addRecipient({ name, phone, email, address, orderId: id, cityId: selectedCity, districtId: selectedDistrict }).then((res) => {
        console.log(res);
        if (!res.success) {
          alert(res.message.toString());
          return;
        }
        return window.location.assign(`https://huiming.tw/v1/payments/${id}`);
      });
    }
  };
  return (
    <Root>
      <Container>
        <H3>配送資訊</H3>
        <ReceiverInfoForm>
          <FormHeader>
            <FormTitle>收件人資訊</FormTitle>
            <SameReceiverBtn onChange={handleInputChange} value={sameRecipient} />
          </FormHeader>
          <StyledInput
            inputTitle="姓名"
            name="name"
            inputType="text"
            required={true}
            size="45%"
            value={name}
            onChange={handleInputChange}
            valid={errorMessage['name'].valid}
            errorMessage={errorMessage['name'].message}
            placeholder="請輸入真實姓名"
          />
          <StyledInput
            inputTitle="電子郵件"
            name="email"
            inputType="email"
            required={true}
            size="95%"
            value={email}
            onChange={handleInputChange}
            valid={errorMessage['email'].valid}
            errorMessage={errorMessage['email'].message}
            placeholder="請輸入電子郵件"
          />

          <StyledInput
            inputTitle="手機"
            name="phone"
            inputType="phone"
            required={true}
            size="45%"
            value={phone}
            onChange={handleInputChange}
            valid={errorMessage['phone'].valid}
            errorMessage={errorMessage['phone'].message}
            placeholder="請輸入手機號碼"
          />

          {isLoaded ? (
            <CountryInputs>
              <InputSelect inputTitle="縣市" name="city" required={true} options={cities} onChange={handleInputChange} value={selectedCity} />
              <InputSelect
                inputTitle="區/鄉鎮"
                name="district"
                required={true}
                options={districts}
                onChange={handleInputChange}
                value={selectedDistrict}
              />
            </CountryInputs>
          ) : (
            ''
          )}
          <StyledInput
            inputTitle="地址"
            name="address"
            inputType="text"
            required={true}
            size="95%"
            value={address}
            onChange={handleInputChange}
            valid={errorMessage['address'].valid}
            errorMessage={errorMessage['address'].message}
            placeholder="請輸入正確格式，例如：台灣大道五段 29 巷 8-1 號"
          />
          <InputRadio inputTitle="配送選項" name="" required={true} content="僅限宅配" />
          <InputRadio inputTitle="付款方式" name="" required={true} content="僅限信用卡支付" />
        </ReceiverInfoForm>
        <NextBtn onClick={handleAddRecipient}>下一步</NextBtn>
      </Container>
    </Root>
  );
}
