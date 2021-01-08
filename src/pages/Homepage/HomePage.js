import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/reducers/productsSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BannerCarousel from '../../component/BannerCarousel';
import Promotion from '../../component/Promotion';
import { device } from '../../style/breakpoints';

const ProductsContainer = styled.div`
  display: grid;
  grid-gap: 1%;
  width: 77%;
  margin: 100px auto;
  margin-bottom: 0;
  cursor: pointer;

  @media ${device.Mobiles} {
    grid-template-columns: repeat(auto-fit, 100%);
  }
  @media ${device.Laptop} {
    grid-template-columns: repeat(auto-fit, 32%);
  }

`;

const ImgContainer = styled(Link)`
  position: relative;
  width: 100%;
  height: 480px;
  background: url(${(props) => props.$url}) center/cover no-repeat;
`;

const ImgFilter = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  background: rgba(251, 209, 168, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  color: #07273c;

  &:hover {
    opacity: 1;
  }
`;

const LearnMoreButton = styled(Link)`
  display: block;
  text-decoration: none;

  margin: 0 auto;
  margin-top: 100px;
  border: 1px solid #333;
  border-radius: 50px;
  padding: 5px 0;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  background: #07273c;

  &:hover {
    box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, 0.2);
    color: #fff;
    text-decoration: none;
    transform: scale(1.01);
  }

  @media ${device.Mobiles} {
    width: 320px;
  }
  @media ${device.Laptop} {
    width: 620px;
  }
`;

export default function HomePage() {
  const dispatch = useDispatch();
  const [promotionProducts, setPromotionProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts({ type: 'all', order: 'ASC', sort: 'price' })).then(
      (res) => {
        setPromotionProducts(res.slice(0, 3));
      }
    );
  }, [dispatch]);

  return (
    <>
      <BannerCarousel />
      <Promotion />
      <ProductsContainer id="news">
        {promotionProducts.map((product) => (
          <ImgContainer
            $url={product.photos[0].url}
            to={`/product/${product.id}`}
            key={product.id}
          >
            <ImgFilter>{product.productName}</ImgFilter>
          </ImgContainer>
        ))}
      </ProductsContainer>
      <LearnMoreButton to="/products/all">LEARN MORE</LearnMoreButton>
    </>
  );
}
