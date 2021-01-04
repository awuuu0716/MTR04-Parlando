import styled from 'styled-components';
import { device } from '../../style/breakpoints';
export const Ul = styled.ul`
  width: 80vw;
  padding: 0;
  line-height: 2em;
  @media ${device.Tablets} {
    width: ${(props) => props.$width};
    line-height: normal;
  }
`;

export const Li = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  list-style: none;
  font-size: 20px;
  border: 1px solid #d4d4d4;

  & + & {
    border-top: 0;
  }
  @media ${device.Tablets} {
    flex-direction: row;
  }
`;

export const Header = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #cfdce5;
  flex: 1;
  width: 100%;
  @media ${device.Tablets} {
    width: unset;
  }
`;

export const HeaderFat = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #cfdce5;
  flex: 1;
  width: 100%;
  @media ${device.Tablets} {
    width: unset;
  }
`;

export const Info = styled.div`
  text-align: center;
  flex: ${(props) => props.$flex};
`;

export const OrderContent = styled.p`
  margin: 0;
  padding: 10px;
`;
