import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModels, selectModels, updateModelStatus, deleteModel, selectErrorMessage } from '../../../redux/reducers/modelsSlice';

const Root = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  @media ${device.Desktops} {
    display: flex;
  }
`;
const Container = styled.div`
  position: relative;
  top: 40px;
  left: 50%;
  max-width: 80%;
  margin-bottom: 40px;
  font-size: 24px;
  transform: translate(-50%);
`;
const Header = styled.div``;
const Title = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.titleColor};
  margin: 0 16px 20px 40px;
  display: inline-block;
`;
const TableWrapper = styled.div`
  width: 400px;
  overflow: auto;
  @media ${device.Tablets} {
    width: unset;
  }
`;
const StyledTable = styled.table`
  margin: 0 auto;
  border: none;
  text-align: center;
  font-size: 14px;
  thead {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    border-top: 1px solid ${(props) => props.theme.borderColor};
    tr th {
      font-size: 14px;
      color: ${(props) => props.theme.textColor};
      padding: 26px;
    }
  }

  tbody {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    tr td {
      background-color: white;
      padding: 20px;
      align-items: center;
      font-size: 1.2em;
    }
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ColorChip = styled.div`
  width: 40px;
  height: 20px;
  background-color: #${(props) => props.$color};
`;

const Buttons = ({ isShow, handleModelDelete, id, handleModelIsShow }) => {
  return (
    <ButtonGroup>
      <Link to={`/backstage/edit-model/${id}`}>
        <ButtonLight $size={'s'}>編輯</ButtonLight>
      </Link>
      <ButtonLight $size={'s'} onClick={() => handleModelIsShow({ id, isShow })}>
        {isShow === 1 ? '下架' : '上架'}
      </ButtonLight>
      <ButtonLight $size={'s'} onClick={() => handleModelDelete(id)}>
        刪除
      </ButtonLight>
    </ButtonGroup>
  );
};
export default function ProductModelsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const models = useSelector(selectModels);
  const errorMessage = useSelector(selectErrorMessage);
  const [update, setUpdate] = useState(false);
  const handleModelDelete = (id) => {
    dispatch(deleteModel(id)).then(() => setUpdate(!update));
  };
  const handleModelIsShow = ({ id, isShow }) => {
    dispatch(updateModelStatus({ id, isShow })).then(() => setUpdate(!update));
  };
  useEffect(() => dispatch(getModels(id)), [dispatch, id, update]);
  return (
    <Root>
      <Aside />
      <Container>
        <Header>
          <Title>商品型號</Title>
          <Link to={`/backstage/add-model/${id}/only-model`}>
            <ButtonLight $size={'s'}>新增型號</ButtonLight>
          </Link>
          <Link to="/backstage/products">
            <ButtonLight $size={'s'}>返回</ButtonLight>
          </Link>
        </Header>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Model ID</th>
                <th>Name</th>
                <th>Color</th>
                <th>In stock</th>
                <th>Sell</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {models.length !== 0 &&
                models.map(
                  (model) =>
                    model.isDeleted === 0 && (
                      <tr key={model.id}>
                        <td>{model.id}</td>
                        <td>{model.modelName}</td>
                        <td>
                          <ColorChip $color={model.colorChip} />
                        </td>
                        <td>{model.storage}</td>
                        <td>{model.sell}</td>
                        <td>{model.isShow ? '已上架' : '未上架'}</td>
                        <td>
                          <Buttons isShow={model.isShow} id={model.id} handleModelDelete={handleModelDelete} handleModelIsShow={handleModelIsShow} />
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </StyledTable>
          {models.length === 0 && <p>{'無資料' || errorMessage}</p>}
        </TableWrapper>
      </Container>
    </Root>
  );
}
