import styled from 'styled-components';
import { Link } from 'react-router-dom';
import promotion_1 from '../../img/promotion_new1.jpg';
import promotion_2 from '../../img/promotion_new2.jpg';
import arrow from '../../img/arrow.svg';
import { device } from '../../style/breakpoints';

const Root = styled.div``;

const Container = styled.div`
  position: relative;

  max-height: 880px;
  margin: 80px auto;
  background: url(${(props) => props.$url}) no-repeat center/cover;

  @media ${device.Mobiles} {
    width: 80vw;
    height: 50vw;
  }
  @media ${device.Tablets} {
  }
  @media ${device.Laptop} {
  }
  @media ${device.Desktops} {
    width: 76vw;
    height: 45vw;
  }
`;

const DescriptionContainerTop = styled.div`
  position: absolute;

  @media ${device.Mobiles} {
    bottom: 35%;
    left: 50px;
  }
  @media ${device.Tablets} {
    bottom: 35%;
    left: 50px;
  }
  @media ${device.Laptop} {
    bottom: 35%;
    left: 50px;
  }
  @media ${device.Desktops} {
    left: 90px;
  }
`;

const DescriptionContainerBottom = styled.div`
  position: absolute;

  @media ${device.Mobiles} {
    top: 54px;
    right: 3vw;
    p {
      width: 200px;
    }
  }
  @media ${device.Tablets} {
    top: 54px;
    right: 3vw;
  }
  @media ${device.Laptop} {
    top: 105px;
    right: 3vw;

    p {
      width: 264px;
    }
  }
  @media ${device.Desktops} {
    top: 200px;
    right: 7vw;
  }
`;

const H4 = styled.h4`
  color: white;
  @media ${device.Mobiles} {
    font-size: 1.2rem;
  }
  @media ${device.Laptop} {
    font-size: 1.5rem;
  }
`;

const H1 = styled.h1`
  color: rgb(251, 209, 168);

  @media ${device.Mobiles} {
    font-size: 2rem;
  }
  @media ${device.Laptop} {
    font-size: 2.5rem;
  }
`;

const Divider = styled.div`
  width: 40px;
  border-top: 5px solid #ccc;
  margin: 20px 0;
`;

const DescriptionText = styled.p`
  width: 451px;
  color: white;

  @media ${device.Mobiles} {
    font-size: 16px;
  }
  @media ${device.Laptop} {
    font-size: 24px;
  }
`;

const Arrow = styled.div`
  display: inline-block;
  width: 50px;
  height: 25px;
  mask: url(${arrow});
  background-color: white;
  transform: translate(40px, 2px);
`;

const BuyNow = styled(Link)`
  position: relative;
  top: 100px;
 
  color: white;
  text-decoration: none;

  &:hover {
    color: rgb(251, 209, 168);
    text-decoration: none;

    ${Arrow} {
      background-color: rgb(251, 209, 168);
    }
  }

  @media ${device.Mobiles} {
    font-size: 20px;
  }
  @media ${device.Laptop} {
    font-size: 32px;
  }
`;

export default function Promotion() {
  return (
    <Root>
      <Container $url={promotion_1}>
        <DescriptionContainerTop>
          <H4>Wireless-01</H4>
          <H1>真無線耳機</H1>
          <Divider />
          <DescriptionText>不受束博的音樂體驗</DescriptionText>
          <BuyNow to="/products/all">
            了解更多 <Arrow />
          </BuyNow>
        </DescriptionContainerTop>
      </Container>

      <Container $url={promotion_2}>
        <DescriptionContainerBottom>
          <H4>Headphone-01</H4>
          <H1>耳罩式耳機</H1>
          <Divider />
          <DescriptionText>
            最舒適的聆聽體驗。可以隨身帶著走的家庭劇院。
          </DescriptionText>
          <BuyNow to="/products/all">
            了解更多 <Arrow />
          </BuyNow>
        </DescriptionContainerBottom>
      </Container>
    </Root>
  );
}
