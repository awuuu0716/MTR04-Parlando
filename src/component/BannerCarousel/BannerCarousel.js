import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import carousel_1 from '../../img/carousel_1.webp';
import carousel_2 from '../../img/carousel_2.webp';
import carousel_3 from '../../img/carousel_3.webp';
import carousel_4 from '../../img/carousel_4.webp';
import carousel_5 from '../../img/carousel_5.webp';

const interval = 3000;

const Img = styled.img`
  height: 847px;
  object-fit: cover;
`

export default function BannerCarousel() {
  return (
    <Carousel pause={false} >
      <Carousel.Item interval={interval}>
        <Img className="d-block w-100" src={carousel_1} alt="slide 1" />
      </Carousel.Item>
      <Carousel.Item interval={interval}>
        <Img className="d-block w-100" src={carousel_2} alt="slide 2" />
      </Carousel.Item>
      <Carousel.Item interval={interval}>
        <Img className="d-block w-100" src={carousel_3} alt="slide 3" />
      </Carousel.Item>
      <Carousel.Item interval={interval}>
        <Img className="d-block w-100" src={carousel_4} alt="slide 4" />
      </Carousel.Item>
      <Carousel.Item interval={interval}>
        <Img className="d-block w-100" src={carousel_5} alt="slide 5" />
      </Carousel.Item>
    </Carousel>
  );
}
