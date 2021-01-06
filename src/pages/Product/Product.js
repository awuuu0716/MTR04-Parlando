import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import product_pic_1 from '../../img/product_pic_1.webp';
import product_pic_3 from '../../img/carousel_4.webp';
import feature from '../../img/feature.jpg';
import preload from '../../img/preload.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, selectProduct } from '../../redux/reducers/productsSlice';
import { handelStorageAmount } from '../../utils';
import { device } from '../../style/breakpoints';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  @media ${device.Mobiles} {
    flex-direction: column;
    justify-content: center;
    padding: 20px 0;
  }
`;

const BreadcrumbContainer = styled.div`
  font-weight: bold;
  text-align: center;
  a {
    color: #07273c;
  }

  @media ${device.Mobiles} {
    padding: 20px;
  }
  @media ${device.Tablets} {
    text-align: left;
  }
  @media ${device.Desktops} {
    padding: 40px;
  }
`;

const Breadcrumb = styled(Link)`
  font-size: 20px;
`;

const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  @media ${device.Mobiles} {
    flex-direction: column;
    align-items: center;
  }

  @media ${device.Tablets} {
    flex-direction: row;
  }
  
  @media ${device.Desktops} {
    flex-direction: row;
  }
`;

const Thumbnail = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  margin: 2px;
  object-fit: cover;
  cursor: pointer;
  filter: ${(props) => (props.$active ? 'brightness(1)' : 'brightness(0.3)')};
`;

const ProductImgContainer = styled.div`
  position: relative;
  flex: 2;
  height: 450px;
  background: ${(props) => `url(${props.$url}) center/cover no-repeat`};

  @media ${device.Mobiles} {
    text-align: center;
  }

  @media ${device.Tablets} {
    flex: 1;
  }
`;

const ProductImg = styled.img`
  object-fit: cover;

  @media ${device.Mobiles} {
    margin-bottom: 30px;
    width: 100%;
    height: 320px;
  }
  @media ${device.Tablets} {
    height: 370px;
    padding-left: 20px;
  }
  @media ${device.Desktops} {
    padding-left: 0;
    width: 540px;
    height: 470px;
  }
`;

const ArrowLeft = styled.div`
  position: absolute;
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

  @media ${device.Mobiles} {
    top: 40%;
    left: 5%;
  }

  @media ${device.Tablets} {
    top: 40%;
    left: 5%;
  }

  @media ${device.Desktops} {
    top: 45%;
    left: 5%;
  }
`;

const ArrowRight = styled.div`
  position: absolute;
  top: 215px;
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

  @media ${device.Mobiles} {
    top: 40%;
    right: 5%;
  }
  @media ${device.Desktops} {
    top: 45%;
    right: 15%;
  }
`;

const ProductInfomationContainer = styled.div`
  display: flex;
  flex: 1;
  @media ${device.Mobiles} {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
  }
`;

const Name = styled.h1`
  font-size: 32px;
  margin-top: -10px;
  margin-bottom: 0;
  color: #333333;
  @media ${device.Mobiles} {
    margin-bottom: 20px;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
  }
`;

const SubName = styled.p`
  color: #333333;
  margin-bottom: 40px;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  margin-bottom: 0;
  color: #333333;
  @media ${device.Mobiles} {
    display: none;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
  }
`;

const Price = styled.h2`
  color: #333333;
  margin-bottom: 30px;
`;

const Alternative = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
  width: 500px;
  @media ${device.Mobiles} {
    width: auto;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
  }
`;

const Storage = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Option = styled.button`
  display: block;
  width: ${(props) => (props.$active ? 35 : 20)}px;
  height: ${(props) => (props.$active ? 35 : 20)}px;
  border-radius: 50%;
  padding: 5px 10px;
  background: #${(props) => props.$color};
  border: ${(props) => (props.$active ? '3px solid black' : 'none')};
  &:focus {
    outline: none;
  }

  & + & {
    margin-left: 10px;
  }
`;

const Amount = styled.div`
  display: flex;

  @media ${device.Mobiles} {
    margin-bottom: 20px;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
  }
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

  @media ${device.Mobiles} {
    width: 40px;
    height: 40px;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
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

  @media ${device.Mobiles} {
    height: 40px;
    font-size: 20px;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
  }
`;

const AddToCart = styled.button`
  width: 160px;
  height: 40px;
  margin-top: 20px;
  color: #07273c;
  background: rgb(251, 209, 168);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  @media ${device.Mobiles} {
    font-size: 14px;
    width: 120px;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
  }

  &:hover {
    box-shadow: 0 0px 3px #c1c1c1;
  }
`;

const Buy = styled.button`
  display: inline-block;
  width: 160px;
  height: 40px;
  margin-left: 20px;
  color: white;
  font-weight: bold;
  background: #07273c;
  box-shadow: 0 0px 3px #c1c1c1;
  border: none;
  border-radius: 5px;
  font-size: 16px;

  @media ${device.Mobiles} {
    font-size: 14px;
    width: 120px;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
  }
`;

const ProductNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 99%;
  margin: 0 auto;
  margin-bottom: 60px;
`;

const FeatureImgsContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
  flex: 1;
`;

const FeaturImgSmall = styled.img`
  display: block;
  width: 300px;
  height: 300px;
  margin: 20px;
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

const Title = styled.h2`
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 2px #737373;
`;

const Specification = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  padding-bottom: 0;
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
  margin: 20px 10px;
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

const PhotosContainer = styled.div`
  flex-wrap: wrap;
  margin-right: 20px;
  max-width: 180px;

  @media ${device.Mobiles} {
    display: none;
  }
  @media ${device.Desktops} {
    display: flex;
  }
`;

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const [picList, setPicList] = useState([]);
  const [nowPicIndex, setNowPicIndex] = useState(0);
  const [amount, setAmount] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [models, setModels] = useState([]);
  const [storage, setStorage] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const { pathname } = useLocation();

  const handleShowModal = (state) => {
    setIsShowModal(state);
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProduct(id)).then((res) => {
<<<<<<< HEAD
      console.log(res.photos)
      setPicList(
        res.photos.map((photo, index) => {
          if (index === 0)
            return { src: photo.url, isActive: true  };
          return { src: photo.url, isActive: false };
=======
      
      setPicList(
        res.photos.map((url, index) => {
          if (index === 0)
            return { src: url, isActive: true, id: `photo-${index}` };
          return { src: url, isActive: false, id: `photo-${index}` };
>>>>>>> 7bf173a5a16989417faf14ebdb92e88cf03865ce
        })
      );
      setModels(res.models);
      setSelectedModel(res.models[0].colorChip);
      setStorage(res.models[0].storage);
    });
  }, [dispatch, id]);

  return (
    <>
      <Container>
        <BreadcrumbContainer>
          <Breadcrumb to="/products/all">Products</Breadcrumb>
          <span> &#062; </span>
          <Breadcrumb to={pathname}>{product.productName}</Breadcrumb>
        </BreadcrumbContainer>

        <ProductContainer>
          <PhotosContainer>
            {picList.map((data, index) => (
              <Thumbnail
                $active={data.isActive}
                src={data.src}
                onClick={() => handleChangePic(index)}
                key={data.id}
              />
            ))}
          </PhotosContainer>

          <ProductImgContainer
            $url={picList.length > 0 ? picList[nowPicIndex].src : preload}
          >
            <ArrowLeft onClick={prePic} />
            <ArrowRight onClick={nextPic} />
          </ProductImgContainer>

          <ProductInfomationContainer>
            <Name>{product.productName}</Name>
            <Label>Price</Label>
            <Price>NT${product.price}</Price>
            <Label>Model</Label>
            <Alternative>
              {models.map((model) => (
                <Option
                  $color={model.colorChip}
                  $active={selectedModel === model.colorChip}
                  onClick={() => {
                    setSelectedModel(model.colorChip);
                    setStorage(model.storage);
                  }}
                  key={`model-${model.colorChip}`}
                />
              ))}
            </Alternative>
            <Storage>庫存狀況: {storage}</Storage>
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

      {/* <ProductNav>
        <Anchor to={`${pathname}#feature`}>概觀</Anchor>
        <Anchor to={`${pathname}#spec`}>規格</Anchor>
        <Anchor to={`${pathname}#support`}>支援</Anchor>
      </ProductNav>

      <Container>
        <div>
          <Feature id="feature">FEATURES</Feature>
          <FeatureDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo.
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
        </div>
      </Container>

      <Modal $isShowModal={isShowModal}>
        <h5>加入成功！</h5>
        <Actions>
          <CloseModalButton onClick={() => handleShowModal(false)}>
            返回
          </CloseModalButton>
          <CheckoutButton to="/">結帳</CheckoutButton>
        </Actions>
      </Modal> */}
    </>
  );
}
