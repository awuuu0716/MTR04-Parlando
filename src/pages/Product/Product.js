import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import product_pic_1 from '../../img/product_pic_1.webp';
import product_pic_2 from '../../img/product_pic_2.webp';
import product_pic_3 from '../../img/carousel_4.webp';
import feature from '../../img/feature.jpg';

const Container = styled.div`
  width: 80vw;
  margin: 50px auto;
`;

const Breadcrumb = styled.div`
  font-weight: bold;
  padding: 40px;

  a {
    color: #07273c;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Thumbnail = styled.img`
  display: block;
  margin: 0 20px;
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  filter: ${(props) => (props.$active ? 'brightness(1)' : 'brightness(0.3)')};
  & + & {
    margin: 20px;
  }
`;

const ProductImgContainer = styled.div`
  position: relative;
`;

const ProductImg = styled.img`
  width: 540px;
  height: 470px;
  margin-right: 60px;
  object-fit: cover;
`;

const ArrowLeft = styled.div`
  position: absolute;
  top: 45%;
  left: 20px;
  width: 30px;
  height: 30px;
  border-top: 5px solid #ddd;
  border-left: 5px solid #ddd;
  transform: rotate(-45deg);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: rotate(-45deg) scale(1.1);
    border-top: 5px solid white;
    border-left: 5px solid white;
  }
`;

const ArrowRight = styled.div`
  position: absolute;
  top: 45%;
  right: 85px;
  width: 30px;
  height: 30px;
  border-top: 5px solid #ddd;
  border-right: 5px solid #ddd;
  transform: rotate(45deg);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: rotate(45deg) scale(1.1);
    border-top: 5px solid white;
    border-right: 5px solid white;
  }
`;

const ProductInfomationContainer = styled.div``;

const Name = styled.h1`
  font-size: 32px;
  margin-top: -10px;
  margin-bottom: 0;
  color: #333333;
`;

const SubName = styled.p`
  color: #333333;
  margin-bottom: 40px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 0;
  color: #333333;
`;

const Price = styled.h2`
  color: #333333;
  margin-bottom: 30px;
`;

const Alternative = styled.div`
  display: flex;
  margin-bottom: 70px;
`;

const Option = styled.button`
  width: 100px;
  height: 40px;
  margin: 10px;
  margin-left: 0;
  background: ${(props) => (props.$active ? '#07273c' : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#333333')};
  border: 1px solid #07273c;
  border-radius: 5px;
  box-shadow: 0 0px 6px #ababab;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &:hover {
    background: white;
    color: #333333;
  }
`;

const Amount = styled.div`
  display: flex;
`;

const AmountButton = styled.button`
  width: 50px;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background: #07273c;
  border: none;
  transition: all 0.1s linear;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const AmountShow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
`;

const AddToCart = styled.button`
  width: 160px;
  height: 40px;
  margin-top: 20px;
  color: #07273c;
  background: rgb(251, 209, 168);
  box-shadow: 0 0px 3px #c1c1c1;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const Buy = styled.button`
  display: inline-block;
  width: 160px;
  height: 40px;
  margin-left: 20px;
  color: white;
  font-weight: bold;
  background: #495f6e;
  box-shadow: 0 0px 3px #c1c1c1;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const ProductNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80px;
  background: #9bb7ca;
`;

const Anchor = styled(HashLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
  text-shadow: 2px 2px 2px #737373;
  border-bottom: 4px solid transparent;
  width: 100px;
  margin: 0 50px;
  height: 80px;
  cursor: pointer;

  &:hover {
    color: white;
    text-decoration: none;
    border-bottom: 4px solid #495f6e;
  }
`;

const Feature = styled.h1`
  text-align: center;
  margin-top: 80px;
`;

const FeatureDescription = styled.p`
  text-align: center;
  font-size: 18px;
`;

const FeaturImgBig = styled.img`
  display: block;
  margin: 0 auto;
  margin-bottom: 60px;
`;

const FeatureImgsContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1280px;
  justify-content: space-between;
`;

const FeaturImgSmall = styled.img`
  display: block;
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-top: 50px;
  padding-left: 40px;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #9bb7ca;
`;

const Title = styled.h1`
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 2px #737373;
`;

const Specification = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 60px 30px;
`;

const SpecificationTopic = styled.h2`
  font-size: 24px;
  margin: 20px;
`;

const SpecificationMinorTopic = styled.h3`
  font-weight: normal;
  font-size: 24px;
  margin: 20px 0 0 20px;
`;

const SpecificationContent = styled.p`
  padding: 20px;
  padding-top: 0;
  font-size: 18px;
`;

const Support = styled.div`
  padding: 30px 30px;
`;

const SupportTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: ${(props) => (props.$isShowModal ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  width: 500px;
  padding: 80px 0;
  border: 1px solid #226592;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  box-shadow: 3px 3px 5px #b2cee0;

  h5 {
    font-weight: bold;
    margin-bottom: 60px;
  }
`;

const CloseModalButton = styled.button`
  width: 120px;
  height: 50px;
  background: #07273c;
  border: none;
  color: white;
  border-radius: 5px;
  margin-right: 30px;
  box-shadow: 3px 3px 5px #b2cee0;
`;

const CheckoutButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  background: #495f6e;
  border: none;
  border-radius: 5px;
  color: white;
  box-shadow: 3px 3px 5px #b2cee0;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const Actions = styled.div`
  display: flex;
`;

export default function Product() {
  const [picList, setPicList] = useState([
    { src: product_pic_1, isActive: true },
    { src: product_pic_2, isActive: false },
    { src: product_pic_1, isActive: false },
    { src: product_pic_2, isActive: false },
  ]);
  const [nowPicIndex, setNowPicIndex] = useState(0);
  const [amount, setAmount] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [color, setColor] = useState('DARK');
  const { pathname } = useLocation();

  const handleShowModal = (state) => {
    setIsShowModal(state);
  };

  const chooseColor = (color) => setColor(color);

  const addAmount = () => setAmount(amount + 1);

  const minusAmount = () => setAmount(amount - 1 <= 0 ? 1 : amount - 1);

  const handleChangePic = (picIndex) => {
    setNowPicIndex(picIndex);
    setPicList(
      picList.map((data, index) => {
        if (index !== picIndex) return { ...data, isActive: false };
        return { ...data, isActive: true };
      })
    );
  };

  const nextPic = () => {
    if (nowPicIndex + 1 >= picList.length) {
      setPicList(
        picList.map((data, index) => {
          if (index === 0) return { ...data, isActive: true };
          return { ...data, isActive: false };
        })
      );
      setNowPicIndex(0);
    } else {
      setPicList(
        picList.map((data, index) => {
          if (index === nowPicIndex + 1) return { ...data, isActive: true };
          return { ...data, isActive: false };
        })
      );
      setNowPicIndex(nowPicIndex + 1);
    }
  };

  const prePic = () => {
    if (nowPicIndex - 1 < 0) {
      setPicList(
        picList.map((data, index) => {
          if (index === picList.length - 1) return { ...data, isActive: true };
          return { ...data, isActive: false };
        })
      );
      setNowPicIndex(picList.length - 1);
    } else {
      setPicList(
        picList.map((data, index) => {
          if (index === nowPicIndex - 1) return { ...data, isActive: true };
          return { ...data, isActive: false };
        })
      );
      setNowPicIndex(nowPicIndex - 1);
    }
  };

  return (
    <>
      <Container>
        <Breadcrumb>
          <Link to="/products">Products</Link>
          <span> &#062; </span>
          <Link to={pathname}>productName</Link>
        </Breadcrumb>
        <ProductContainer>
          <div>
            {picList.map((data, index) => (
              <Thumbnail
                $active={data.isActive}
                src={data.src}
                onClick={() => handleChangePic(index)}
              />
            ))}
          </div>

          <ProductImgContainer>
            <ArrowLeft onClick={prePic} />
            <ProductImg src={picList[nowPicIndex].src}></ProductImg>
            <ArrowRight onClick={nextPic} />
          </ProductImgContainer>

          <ProductInfomationContainer>
            <Name>Product's Name</Name>
            <SubName>SOMETHING SOMETHING</SubName>
            <Label>Price</Label>
            <Price>NT$1000</Price>
            <Label>Color</Label>
            <Alternative>
              <Option
                $active={color === 'DARK'}
                onClick={() => chooseColor('DARK')}
              >
                DARK
              </Option>
              <Option
                $active={color === 'CHERRY'}
                onClick={() => chooseColor('CHERRY')}
              >
                CHERRY
              </Option>
              <Option
                $active={color === 'GREEN'}
                onClick={() => chooseColor('GREEN')}
              >
                GREEN
              </Option>
            </Alternative>
            <Amount>
              <AmountButton onClick={minusAmount}>-</AmountButton>
              <AmountShow>{amount}</AmountShow>
              <AmountButton onClick={addAmount}>+</AmountButton>
            </Amount>
            <div>
              <AddToCart onClick={() => handleShowModal(true)}>
                ADD TO CART
              </AddToCart>
              <Buy to="/">BUY</Buy>
            </div>
          </ProductInfomationContainer>
        </ProductContainer>
      </Container>

      <ProductNav>
        <Anchor to={`${pathname}#feature`}>概觀</Anchor>
        <Anchor to={`${pathname}#spec`}>規格</Anchor>
        <Anchor to={`${pathname}#support`}>支援</Anchor>
      </ProductNav>

      <Container>
        <Feature id="feature">FEATURES</Feature>
        <FeatureDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo.
        </FeatureDescription>
        <FeaturImgBig src={feature} />
        <FeatureImgsContainer>
          <FeaturImgSmall src={product_pic_3} />
          <FeaturImgSmall src={product_pic_1} />
          <FeaturImgSmall src={product_pic_3} />
          <FeaturImgSmall src={product_pic_1} />
        </FeatureImgsContainer>

        <TitleContainer id="spec">
          <Title>規格</Title>
        </TitleContainer>

        <Specification>
          <SpecificationTopic>TOPIC</SpecificationTopic>
          <SpecificationMinorTopic>MINOR TOPIC</SpecificationMinorTopic>
          <SpecificationContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet.
          </SpecificationContent>

          <SpecificationTopic>TOPIC</SpecificationTopic>
          <SpecificationMinorTopic>MINOR TOPIC</SpecificationMinorTopic>
          <SpecificationContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet.
          </SpecificationContent>
        </Specification>

        <TitleContainer id="support">
          <Title>支援</Title>
        </TitleContainer>

        <Support>
          <SupportTitle>產品說明文件.PDF</SupportTitle>
          <SupportTitle>聯絡客服</SupportTitle>
        </Support>
      </Container>
      <Modal $isShowModal={isShowModal}>
        <h5>加入成功！</h5>
        <Actions>
          <CloseModalButton onClick={() => handleShowModal(false)}>
            返回
          </CloseModalButton>
          <CheckoutButton>結帳</CheckoutButton>
        </Actions>
      </Modal>
    </>
  );
}
