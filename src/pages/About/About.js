import styled from 'styled-components';
import pic_1 from '../../img/huiming.jpg';
import pic_2 from '../../img/summer.jpg';
import pic_3 from '../../img/awu.jpg';
import { Link } from 'react-router-dom';

const Root = styled.div`
  min-height: calc(100vh - 460px);
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  margin: 50px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  grid-gap: 16px;
  justify-content: center;
  margin-top: 50px;
`;

const Card = styled.div`
  text-align: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 2px 2px 4px #ccc;
  border-radius: 5px;
`;

const Pic = styled.div`
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url(${(props) => props.$url}) center/cover;
`;

const Name = styled.a`
  display: block;
  font-weight: bold;
  color: #07273c;
  margin-top: 10px;

  &:hover {
    text-decoration: none;
    color: #07273c;
  }
`;

const Info = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
`;

export default function About() {
  return (
    <Root>
      <Title>關於我們</Title>
      <Container>
        <Card>
          <Pic $url={pic_1} />
          <Name href="https://github.com/hero19931012">Huiming</Name>
          <Info>I'm cold, I'm cold! MARI, MARI! No!</Info>
        </Card>
        <Card>
          <Pic $url={pic_2} />
          <Name href="https://github.com/vick12052002">阿里蓉蓉</Name>
          <Info>
            劈哩啪啦 霹靂啪啦 啪啪啪啦啪 劈哩啪啦 霹靂啪啦 啪啪啪啦啪 劈哩啪啦
            霹靂啪啦 啪啪啪啦啪
          </Info>
        </Card>
        <Card>
          <Pic $url={pic_3} />
          <Name href="https://github.com/awuuu0716">Awu</Name>
          <Info>喵</Info>
        </Card>
      </Container>
    </Root>
  );
}
