import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
export default function Transaction() {
	return (
		<>
			<Container>
				<SuccessInfoWrapper>
					<H3>訂單成立</H3>
					<OrderDesc>
						您的訂單編號為
						<OrderLink to="/order/xxxxx-12345"> xxxxx-12345</OrderLink>
						<OrderTips>若要查詢訂單狀況，請點選以下查詢訂單</OrderTips>
					</OrderDesc>
				</SuccessInfoWrapper>
				<BtnWrapper>
					<HomeBtn to="/">回到首頁</HomeBtn>
					<OrderBtn to="/order">查詢訂單</OrderBtn>
				</BtnWrapper>
			</Container>
		</>
	);
}
