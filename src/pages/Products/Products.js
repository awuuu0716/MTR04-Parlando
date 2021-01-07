import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  selectProducts,
} from '../../redux/reducers/productsSlice';
import noImage from '../../img/noImage.svg';

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

const ProductsOption = styled(Link)`
  color: #333;
  padding: 30px 50px;
  border-bottom: 2px solid transparent;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: #333;
    border-bottom: 2px solid #07273c;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 480px);
  grid-gap: 16px;
  justify-content: center;
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
  animation: fade-in 0.6s linear;

  &:hover {
    transform: scale(1.01);
    box-shadow: 2px 2px 2px #aaa;
    text-decoration: none;
  }
`;

const Img = styled.img`
  width: 400px;
  height: 300px;
  object-fit: ${(props) => (props.$isNoImage ? 'contain' : 'cover')};
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
  const { type } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [sortFilter, setSortFilter] = useState('price');
  const [order, setOrder] = useState('ASC');
  const isLoading = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProducts({ type, order, sort: sortFilter })).then(() => {
      isLoading.current = false;
    });
  }, [dispatch, type, sortFilter, order]);

  return (
    <Container>
      <Title>全部商品</Title>
      <Divider />
      <OptionContainer>
        <ProductsOption to="/products/all">全部商品</ProductsOption>
        <ProductsOption to="/products/1">耳罩式耳機</ProductsOption>
        <ProductsOption to="/products/2">入耳式耳機</ProductsOption>
        <ProductsOption to="/products/3">音響</ProductsOption>
        <ProductsOption to="/products/4">週邊配件</ProductsOption>
      </OptionContainer>
      <FilterContainer>
        <PriceFilter
          $isAcitve={sortFilter === 'price'}
          onClick={() => setSortFilter('price')}
        >
          照價格排序
        </PriceFilter>
        <PriceFilter
          $isAcitve={sortFilter === 'createdAt'}
          onClick={() => setSortFilter('createdAt')}
        >
          照日期排序
        </PriceFilter>
      </FilterContainer>
      <FilterContainer>
        <DateFilter $isAcitve={order === 'ASC'} onClick={() => setOrder('ASC')}>
          升序
        </DateFilter>
        <DateFilter
          $isAcitve={order === 'DESC'}
          onClick={() => setOrder('DESC')}
        >
          降序
        </DateFilter>
      </FilterContainer>
      <Divider />

      <ProductContainer>
        {products.map((data) => {
          return (
            <Product to={`/product/${data.id}`} key={data.id}>
              <Img
                src={data.photos.length === 0 ? noImage : data.photos[0].url}
                alt={data.type}
                $isNoImage={data.photos.length === 0}
              />
              <Name>{data.productName}</Name>
              <Price>NT${data.price}</Price>
            </Product>
          );
        })}
      </ProductContainer>
    </Container>
  );
}
