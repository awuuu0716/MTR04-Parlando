import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Trash } from '../../img/trash.svg';
import product from '../../img/product.jpg';

const Container = styled.div`
	max-width: 1280px;
	margin: 80px auto;
	margin-bottom: 40px;
	position: relative;
`;
const H1 = styled.h1`
	font-size: 48px;
	color: #07273c;
	margin: 0 0 40px 40px;
`;
const StyledTable = styled.table`
	margin: 0 auto;
	border: none;
	text-align: right;
	thead {
		background-color: rgba(14, 78, 123, 0.4);
		tr th {
			font-size: 28px;
			color: #333;
			padding: 0.5rem 2rem;

			&:first-child {
				text-align: left;
				width: 700px;
			}
			&:last-child {
				text-align: center;
			}
		}
	}

	tbody tr td {
		background-color: white;
		padding: 20px;
		align-items: right;

		&:first-child {
			text-align: left;
			display: flex;
			align-items: center;
		}
		&:last-child {
			text-align: center;
		}
	}
	tfoot tr td {
		background-color: #07273c;
		color: white;
		padding: 12px;
		font-size: 28px;
	}
`;
const DeleteBtn = styled(Trash)`
	fill: rgba(7, 39, 60, 0.7);
	width: 30px;
	height: 30px;
	cursor: pointer;

	&:hover {
		fill: red;
	}
`;
const ProductImg = styled.div`
	background: center no-repeat url(${product});
	background-size: 70%;
	width: 100px;
	height: 100px;
`;
const NextBtn = styled(Link)`
	position: absolute;
	bottom: -30%;
	right: 0;
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
		text-decoration: none;
	}
`;

export default function ShoppingCartTable() {
	return (
		<>
			<Container>
				<H1>購物車內容</H1>
				<StyledTable>
					<thead>
						<tr>
							<th>產品名稱</th>
							<th>單價</th>
							<th>訂購數量</th>
							<th>總價</th>
							<th>刪除</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<ProductImg />
								XXX耳機 － 綠色
							</td>
							<td>NT $1000</td>
							<td>2</td>
							<td>NT $2000</td>
							<td>
								<DeleteBtn />
							</td>
						</tr>
						<tr>
							<td>
								<ProductImg />
								XXX耳機 － 黃色
							</td>
							<td>NT $1500</td>
							<td>1</td>
							<td>NT $1500</td>
							<td>
								<DeleteBtn />
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td>總計</td>
							<td>NT $3500</td>
							<td></td>
						</tr>
					</tfoot>
				</StyledTable>
				<NextBtn to="/recipient">我要結帳</NextBtn>
			</Container>
		</>
	);
}
