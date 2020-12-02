import styled from 'styled-components';
import { Link } from 'react-router-dom';
// 此處 webp 畫質失真嚴重, 先用 jpg 頂著
import promotion_1 from '../../img/promotion_1.jpg';
import promotion_2 from '../../img/promotion_2.jpg';
import arrow from '../../img/arrow.svg';
import arrow_hover from '../../img/arrow_hover.svg';


const Root = styled.div`
  height: 161vh
`

const Container = styled.div`
  position: relative;
  width: 80%;
  margin: 80px auto;
`;

const TrapezoidTop = styled.div`
  width: 42vw;
  height: 0;
  border-width: 0 20vw 750px 0;
  border-style: none solid solid;
  border-color: transparent transparent #07273c;
`;

const TrapezoidBottom = styled.div`
  position: absolute;
  right: 0;
  width: 42vw;
  height: 0;
  border-width: 0 0 750px 20vw;
  border-style: none solid solid;
  border-color: transparent black #07273c;
`;

const PromotionImgTop = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  height: 750px;
  z-index: -1;
  display: block;
  width: auto;
  height: 100%;
  object-fit: cover;
`;

const PromotionImgBottom = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 750px;
  z-index: -1;
  display: block;
  object-fit: cover;
`;

const DescriptionContainerTop = styled.div`
  position: absolute;
  top: 240px;
  left: 6vw;
`;

const DescriptionContainerBottom = styled.div`
  position: absolute;
  top: 240px;
  right: 3vw;
`;

const H4 = styled.h4`
  color: white;
`;

const H1 = styled.h1`
  font-size: 48px;
  color: rgb(251, 209, 168);
`;

const Divider = styled.div`
  width: 40px;
  border-top: 5px solid #ccc;
  margin: 20px 0;
`;

const DescriptionText = styled.p`
  width: 451px;
  font-size: 24px;
  color: white;
`;

const Arrow = styled.div`
  display: inline-block;
  width: 50px;
  height: 25px;
  background: url(${arrow});
  transform: translate(40px, 2px);
`;

const BuyNow = styled(Link)`
  position: relative;
  top: 100px;
  font-size: 32px;
  color: white;
  text-decoration: none;

  &:hover {
    color: rgb(251, 209, 168);
    text-decoration: none;

    ${Arrow} {
      background: url(${arrow_hover});
    }
  }
`;

export default function Promotion() {
  return (
    <Root>
      <Container>
        <TrapezoidTop></TrapezoidTop>
        <PromotionImgTop src={promotion_1} />
        <DescriptionContainerTop>
          <H4>SOME MODEL</H4>
          <H1>Heading</H1>
          <Divider />
          <DescriptionText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum
          </DescriptionText>
          <BuyNow to="/">
            BUY NOW <Arrow />
          </BuyNow>
        </DescriptionContainerTop>
      </Container>

      <Container>
        <TrapezoidBottom></TrapezoidBottom>
        <PromotionImgBottom src={promotion_2} />
        <DescriptionContainerBottom>
          <H4>SOME MODEL</H4>
          <H1>Heading</H1>
          <Divider />
          <DescriptionText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum
          </DescriptionText>
          <BuyNow to="/">
            BUY NOW <Arrow />
          </BuyNow>
        </DescriptionContainerBottom>
      </Container>
    </Root>
  );
}
