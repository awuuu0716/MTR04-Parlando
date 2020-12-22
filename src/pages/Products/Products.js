import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import products_1 from '../../img/products_1.webp';

const Container = styled.div`
  width: 80vw;
  margin: 50px auto;
`;

const Title = styled.h3`
  color: #07273c;
  font-weight: bold;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 80vw;
  border-top: 1px solid #07273c;
  box-shadow: 3px 3px 4px #c5c5c5;
`;

const OptionContainer = styled.div`
  display: flex;
`;

const ProductsOption = styled.div`
  color: #333;
  padding: 30px 50px;
  border-bottom: 2px solid transparent;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid #07273c;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  width: 80vw;
  flex-wrap: wrap;
  margin-top: 100px;
`;

const Product = styled(Link)`
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  align-items: center;
  width: 480px;
  margin: 20px 15px;
  background: rgb(155, 183, 202);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
    box-shadow: 2px 2px 2px #aaa;
    text-decoration: none;
  }
`;

const Img = styled.img`
  width: 400px;
  height: 300px;
  object-fit: cover;
`;

const Name = styled.h4`
  color: white;
  font-size: 24px;
`;

const Description = styled.p`
  color: #7f7f7f;
  font-size: 18px;
`;

const Price = styled.p`
  color: #333;
  font-size: 18px;
`;

const FilterContainer = styled.div`
  margin: 30px 50px;
`;

const PriceFilter = styled.button`
  border: none;
  border-radius: 5px;
  background: ${(props) => (props.$isAcitve ? '#ff5f5f' : 'none')};
  color: ${(props) => (props.$isAcitve ? 'white' : '#333')};
  font-weight: bold;
  padding: 5px 10px;

  & + & {
    margin-left: 20px;
  }

  &:focus {
    outline: none;
  }
`;

const DateFilter = styled.button`
  border: none;
  border-radius: 5px;
  background: ${(props) => (props.$isAcitve ? '#ff5f5f' : 'none')};
  color: ${(props) => (props.$isAcitve ? 'white' : '#333')};
  font-weight: bold;
  padding: 5px 10px;

  & + & {
    margin-left: 20px;
  }

  &:focus {
    outline: none;
  }
`;

export default function Products() {
  const [priceFilter, setPriceFilter] = useState('DESC');
  const [dateFilter, setDateFilter] = useState('DESC');

  const handlePriceFilter = (filter) => {
    setPriceFilter(filter);
  };

  const handleDateFilter = (filter) => {
    setDateFilter(filter);
  };

  return (
    <Container>
      <Title>全部商品</Title>
      <Divider />
      <OptionContainer>
        {/*all 不同的 API */}
        <ProductsOption to="/products">全部商品</ProductsOption>
        <ProductsOption to="/products/acoustics">音響</ProductsOption>
        <ProductsOption to="/products/earbuds">入耳式耳機</ProductsOption>
        <ProductsOption to="/products/headphones">耳罩式耳機</ProductsOption>
        <ProductsOption to="/products/accessories">週邊配件</ProductsOption>
      </OptionContainer>
      <FilterContainer>
        價格排序：
        <PriceFilter
          $isAcitve={priceFilter === 'DESC'}
          onClick={() => handlePriceFilter('DESC')}
        >
          由高到低
        </PriceFilter>
        <PriceFilter
          $isAcitve={priceFilter === 'ASC'}
          onClick={() => handlePriceFilter('ASC')}
        >
          由低到高
        </PriceFilter>
      </FilterContainer>
      <FilterContainer>
        日期：
        <DateFilter
          $isAcitve={dateFilter === 'DESC'}
          onClick={() => handleDateFilter('DESC')}
        >
          由新到舊
        </DateFilter>
        <DateFilter
          $isAcitve={dateFilter === 'ASC'}
          onClick={() => handleDateFilter('ASC')}
        >
          由舊到新
        </DateFilter>
      </FilterContainer>
      <Divider />

      <ProductContainer>
        <Product to="/products/1">
          <Img src={products_1} alt="A product" />
          <Name>PRODUCT NAME</Name>
          <Description>DESCROPTION DESCRIPION</Description>
          <Price>NT$1000</Price>
        </Product>
        <Product>
          <Img src={products_1} alt="A product" />
          <Name>PRODUCT NAME</Name>
          <Description>DESCROPTION DESCRIPION</Description>
          <Price>NT$1000</Price>
        </Product>
        <Product>
          <Img src={products_1} alt="A product" />
          <Name>PRODUCT NAME</Name>
          <Description>DESCROPTION DESCRIPION</Description>
          <Price>NT$1000</Price>
        </Product>
        <Product>
          <Img src={products_1} alt="A product" />
          <Name>PRODUCT NAME</Name>
          <Description>DESCROPTION DESCRIPION</Description>
          <Price>NT$1000</Price>
        </Product>
        <Product>
          <Img src={products_1} alt="A product" />
          <Name>PRODUCT NAME</Name>
          <Description>DESCROPTION DESCRIPION</Description>
          <Price>NT$1000</Price>
        </Product>
      </ProductContainer>
    </Container>
  );
}
