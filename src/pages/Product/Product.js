import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import preload from '../../img/preload.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, selectProduct } from '../../redux/reducers/productsSlice';
import { updateCart } from '../../redux/reducers/ordersSlice';
import { getCartToken, setCartToken, getArticle } from '../../utils';
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
    flex-direction: column;
    align-items: center;
  }

  @media ${device.Laptop} {
    flex-direction: row;
    justify-content: space-around;
    padding: 2% 6%;
  }

  @media ${device.Desktops} {
    flex-direction: row;
    justify-content: space-around;
    padding: 2% 10%;
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
  height: 450px;
  background: ${(props) =>
    props.$isLoading
      ? `url(${props.$url}) center/contain no-repeat`
      : `url(${props.$url}) center/cover no-repeat`};

  @media ${device.Mobiles} {
    height: 500px;
    width: 100%;
    text-align: center;
  }
  @media ${device.Tablets} {
    height: 500px;
    width: 500px;
  }
  @media ${device.Desktops} {
    height: 500px;
    width: 600px;
  }
`;

const PhotosContainer = styled.div`
  flex-wrap: wrap;
  max-width: 180px;

  @media ${device.Mobiles} {
    display: none;
  }
  @media ${device.Desktops} {
    display: flex;
  }
`;

const PrePicContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  width: 12%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #0000001c;
  }
`;

const NextPicContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  width: 12%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #0000001c;
  }
`;

const Arrow = styled.div`
  width: 20px;
  height: 20px;
  border-top: 5px solid #ddd;
  border-left: 5px solid #ddd;
  transform: rotate(${(props) => (props.$direction === 'left' ? -45 : 135)}deg);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: rotate(
        ${(props) => (props.$direction === 'left' ? -45 : 135)}deg
      )
      scale(1.1);
    border-top: 5px solid white;
    border-left: 5px solid white;
  }
`;

const ProductInfomationContainer = styled.div`
  display: flex;

  @media ${device.Mobiles} {
    margin-top: 50px;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  @media ${device.Tablets} {
    justify-content: space-between;
    width: auto;
    height: 400px;
  }
  @media ${device.Laptop} {
    justify-content: space-between;
    height: 500px;
    margin-top: 0;
  }
  @media ${device.Desktops} {
    width: 400px;
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
  background: rgba(7, 39, 60, 0.2);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background: rgba(7, 39, 60, 0.3);
    box-shadow: 0 0px 3px #c1c1c1;
  }

  @media ${device.Mobiles} {
    font-size: 14px;
    width: 120px;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Desktops} {
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
  border: none;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background: rgba(7, 39, 60, 0.9);
    box-shadow: 0 0px 3px #c1c1c1;
  }

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

const TitleContainer = styled.div`
  display: flex;
  margin-top: 50px;
  padding-left: 40px;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #9bb7ca;
`;

const Title = styled.h3`
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

const Article = (article) => ({ __html: article });

const ArticleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Product() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const [picList, setPicList] = useState([]);
  const [nowPicIndex, setNowPicIndex] = useState(0);
  const [amount, setAmount] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [models, setModels] = useState([]);
  const [storage, setStorage] = useState('');
  const [article, setArticle] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const { pathname } = useLocation();
  let cart = getCartToken();
  const isLoading = useRef(true);

  const handleShowModal = (state) => {
    setIsShowModal(state);
  };

  const addAmount = () => {
    if (amount === 9) return;
    setAmount(amount + 1);
  };

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
    if (isLoading.current) return
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
    if (isLoading.current) return;
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
    isLoading.current = true;
    dispatch(getProduct(id)).then((res) => {
      isLoading.current = false;
      setPicList(
        res.photos.map((url, index) => {
          if (index === 0) return { src: url, isActive: true, id: `photo-${index}` };
          return { src: url, isActive: false, id: `photo-${index}` };
        })
      );
      const modelsData = res.models;
      const defaultColor = res.models.length > 0 ? res.models[0].colorChip : '';
      const defaultModelId =
        res.models.length > 0 ? res.models[0].id : '';
      const defaultStorage = res.models.length > 0 ? modelsData[0].storage : '';

      setSelectedModelId(defaultModelId);
      setArticle(getArticle(res.article));
      setModels(modelsData);
      setSelectedModel(defaultColor);
      setStorage(defaultStorage);
    });
    return () => {
      setModels([]);
      setSelectedModel('');
      setSelectedModelId('');
      setStorage('');
    };
  }, [dispatch, id]);

  const handleAddCart = (goPayment) => {
    const checkHasOrder = cart.filter((item) => item.modelId === selectedModelId);
    if (checkHasOrder.length !== 0) {
      const NewCart = cart.map((data, index) => {
        if (data.modelId === selectedModelId) {
          return {
            ...data,
            count: data.count + amount,
          };
        }
        if (data.modelId !== selectedModelId && index === cart.length - 1) {
          return { productId:id, modelId: selectedModelId, count: amount };
        }
        return data;
      });
      setCartToken(NewCart);
      setIsShowModal(true)
      console.log(isShowModal)
    } else {
      cart.push({ productId:id ,modelId: selectedModelId, count: amount });
      setCartToken(cart);
      dispatch(updateCart());
      setIsShowModal(true)
    }
    if (goPayment) {
      history.push('/shopping-cart');
    }
  };
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
              <Thumbnail $active={data.isActive} src={data.src} onClick={() => handleChangePic(index)} key={data.id} />
            ))}
          </PhotosContainer>

          <ProductImgContainer
            $url={picList.length > 0 ? picList[nowPicIndex].src : preload}
            $isLoading={isLoading.current}
          >
            <PrePicContainer onClick={prePic}>
              <Arrow $direction="left" />
            </PrePicContainer>
            <NextPicContainer onClick={nextPic}>
              <Arrow $direction="right" />
            </NextPicContainer>
          </ProductImgContainer>

          <ProductInfomationContainer>
            <Name>{product.productName}</Name>
            <Label>Price</Label>
            <Price>NT${product.price}</Price>
            <Label>Model</Label>
            <Alternative>
              {models.length > 0
                ? models.map((model) => (
                    <Option
                      $color={model.colorChip}
                      $active={selectedModel === model.colorChip}
                      onClick={() => {
                        setSelectedModel(model.colorChip);
                        setSelectedModelId(model.id);
                        setStorage(model.storage);
                      }}
                      key={`model-${model.colorChip}`}
                    />
                  ))
                : ''}
            </Alternative>
            <Storage>庫存狀況: {storage}</Storage>
            <Amount>
              <AmountButton onClick={minusAmount}>-</AmountButton>
              <AmountShow>{amount}</AmountShow>
              <AmountButton onClick={addAmount}>+</AmountButton>
            </Amount>
            <div>
              <AddToCart onClick={() => handleAddCart(false)}>ADD TO CART</AddToCart>
              <Buy to="/" onClick={() => handleAddCart(true)}>
                BUY
              </Buy>
            </div>
          </ProductInfomationContainer>
        </ProductContainer>
      </Container>

      <ProductNav>
        <Anchor to={`${pathname}#feature`}>概觀</Anchor>
        <Anchor to={`${pathname}#spec`}>規格</Anchor>
        <Anchor to={`${pathname}#support`}>支援</Anchor>
      </ProductNav>

      {/* <Container>
        <div>
          <ArticleContainer dangerouslySetInnerHTML={Article(article)} />
          <TitleContainer id="spec">
            <Title>規格</Title>
          </TitleContainer>

          <Specification>
            <SpecificationTopic>尺寸 / 重量</SpecificationTopic>
            <SpecificationContent>
              耳機: 高 10 公分 x 寬 10 公分 x 深 10 公分 (150 公克) USB 連接線:
              30 公分
            </SpecificationContent>

            <SpecificationTopic>包裝盒內容物</SpecificationTopic>
            <SpecificationContent>
              耳機 USB 充電連接線 音頻連接線 攜帶盒
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
      </Container> */}

      <Modal $isShowModal={isShowModal}>
        <h5>加入成功！</h5>
        <Actions>
          <CloseModalButton onClick={() => handleShowModal(false)}>
            返回
          </CloseModalButton>
          <CheckoutButton to="/shopping-cart">結帳</CheckoutButton>
        </Actions>
      </Modal>
    </>
  );
}
