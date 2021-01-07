import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BannerCarousel from '../../component/BannerCarousel';
import Promotion from '../../component/Promotion';
import homepage_products_1 from '../../img/homepage_products_1.webp';
import homepage_products_2 from '../../img/homepage_products_2.webp';
import homepage_products_3 from '../../img/homepage_products_3.webp';

const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 200px auto;
  margin-bottom: 0;
`;

const ProductImg = styled.img`
  width: 450px;
  height: 530px;
  object-fit: cover;
`;

const ImgContainer = styled.div`
  position: relative;
`;

const ImgFilter = styled.div`
  position: absolute;
  display: flex;
  width: 450px;
  height: 530px;
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
  width: 620px;
  margin: 0 auto;
  margin-top: 100px;
  border: 1px solid #333;
  border-radius: 50px;
  padding: 5px 0;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  background: #07273C;

  &:hover {
    box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, 0.2);
    color: #FFF;
    text-decoration: none;
    transform: scale(1.01)
  }
`;

export default function HomePage() {
  return (
    <>
      <BannerCarousel />
      <Promotion />
      {/* <ProductsContainer to="/">
        <ImgContainer to="/">
          <ImgFilter>PRODUCT</ImgFilter>
          <ProductImg src={homepage_products_1} />
        </ImgContainer>
        <ImgContainer to="/">
          <ImgFilter>PRODUCT</ImgFilter>
          <ProductImg src={homepage_products_2} />
        </ImgContainer>
        <ImgContainer to="/">
          <ImgFilter>PRODUCT</ImgFilter>
          <ProductImg src={homepage_products_3} />
        </ImgContainer>
      </ProductsContainer> */}
      {/* <LearnMoreButton to="/">LEARN MORE</LearnMoreButton> */}
    </>
  );
}
