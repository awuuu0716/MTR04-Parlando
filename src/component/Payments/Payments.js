import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { payment } from '../../WebAPI';
const Container = styled.div`
  margin: 80px auto;
  margin-bottom: 40px;
  position: relative;
  height: calc(80vh - 277px);
`;
const H3 = styled.h3`
  font-size: 32px;
  padding-top: 1em;
  font-weight: bold;
`;
const SuccessInfoWrapper = styled.div`
  background-color: rgba(14, 78, 124, 0.2);
  padding: 2em;
  text-align: center;
  width: 50vw;
  margin: 0 auto;
`;
const OrderDesc = styled.p`
  font-size: 28px;
  color: #000;
  margin-top: 80px;
`;
const OrderTips = styled.p`
  color: #7f7f7f;
  font-size: 24px;
  margin-top: 50px;
`;
const OrderLink = styled(Link)`
  color: #169bd5;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
const HomeBtn = styled(Link)`
  margin-top: 40px;
  display: inline-block;
  cursor: pointer;
  color: #07273c;
  font-size: 26px;
  box-shadow: 5px 5px 5px #0e4e7c;
  border-radius: 5px;
  border: 2px solid #07273c;
  padding: 0.5em 1.3em;
  text-decoration: none;
  background-color: white;
  &:hover {
    color: white;
    background-color: #07273c;
    opacity: 0.7;
    text-decoration: none;
  }
`;
const OrderBtn = styled(Link)`
  margin: 40px 0 0 30px;
  display: inline-block;
  cursor: pointer;
  font-size: 26px;
  box-shadow: 5px 5px 5px #0e4e7c;
  border-radius: 5px;
  border: 2px solid #07273c;
  padding: 0.5em 1.3em;
  text-decoration: none;
  color: white;
  background-color: #07273c;
  &:hover {
    text-decoration: none;
    color: white;
    opacity: 0.7;
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  margin: 30px auto;
  justify-content: center;
`;
export default function Payments() {
  const { id } = useParams();
  const [form, setForm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.location =`https://huiming.tw/v1/payments/${id}`
    // payment(id).then((html) => {
    //   const parser = new DOMParser();
    //   const doc = parser.parseFromString(html, 'text/html');
    //   document.body.innerHTML = html;
    //   console.log(html)
    //   console.log(doc)

      // console.log(array);
      // setForm(array);
      // setIsLoaded(true);
    // });
  }, []);

  return (
    <>
      {/* <Container>{isLoaded ? form.map((item) => item) : ''}</Container> */}
    </>
  );
}
