import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from '../../component/Footer';
import Transaction from '../../component/Transaction'


export default function TransactionPage() {
  return (
    <>   
      <Transaction/>
      <Footer />
    </>
  );
}
